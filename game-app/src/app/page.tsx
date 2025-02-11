import { Suspense } from "react";
import Game from "@/components/game";

const Home = () => {
  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Jack-n-Poy</h1>
        </header>
        <main className="flex flex-row p-4">
          <Suspense>
            <Game />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Home;
