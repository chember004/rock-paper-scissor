import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { output } from "@/lib/rock-paper-scissor-prototype";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";

export const GameResult = ({
  gameResult,
  playerName,
}: {
  gameResult: output | undefined;
  playerName: number;
}) => {
  if (!gameResult) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">No Result / Something went wrong</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  const { totalNumWins, totalNumTies, winPercentage } = gameResult;
  const playerWinPercentage = winPercentage * 100;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Player {playerName} result</CardTitle>
        <CardDescription>Simulates 10 rounds</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Numbe of wins: {totalNumWins}
            </p>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Number of ties: {totalNumTies}
            </p>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Win percentage: {playerWinPercentage.toFixed()}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
