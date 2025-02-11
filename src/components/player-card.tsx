"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ItemType } from "./game";
import { useState } from "react";
import { output } from "@/lib/rock-paper-scissor-prototype";
import { GameResult } from "./result";

const FormSchema = z.object({
  selected: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  items: z.custom<ItemType[]>(),
});

export function PlayerCard({
  className,
  playerName,
  mockItems,
  ...props
}: React.ComponentProps<"div"> & {
  mockItems: ItemType[];
  playerName: number;
}) {
  const [gameResult, setGameResult] = useState<output>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selected: "",
      items: [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data before submit", { ...data, items: mockItems });
    const newData = { ...data, items: mockItems };
    try {
      const response = await fetch("http://localhost:8000/api/rps", {
        method: "POST",
        body: JSON.stringify(newData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }
      const res = await response.json();
      console.log("res", res);
      setGameResult(res.data);
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {!gameResult ? (
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-1 p-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="selected"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="font-extrabold">
                        Player {playerName}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="random" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Random
                            </FormLabel>
                          </FormItem>

                          {mockItems.map((item) => (
                            <FormItem
                              key={item.id}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={item.id} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.name}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Simulate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <GameResult playerName={playerName} gameResult={gameResult} />
      )}
    </div>
  );
}
