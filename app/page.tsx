"use client";
import Image from "next/image";
import { JackpotWheel } from "./_components/Wheel";
import { NFTCard } from "./_components/Inventory/NFT.card";
import { useEffect, useRef, useState } from "react";
import { cn } from "./_lib/utils";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Account } from "@solana/spl-token";

import { useHistory } from "./_hooks/useHistory";
import { useRoulette } from "./_hooks/useRoulette";

//quick node
export default function Home() {
  const [seconds, setSeconds] = useState(60); // Initial seconds value
  const gameHistory = useHistory((state) => state.history);
  const players = useRoulette((state) => state.players);


  const [isRunning, setIsRunning] = useState(false); // Control timer state

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else if (prevSeconds === 0) {
          clearInterval(interval);
          return -1;
        } else {
          return prevSeconds;
        }
      });
    }, 1000);

    // Cleanup interval on component unmount or when isRunning changes
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (players.length === 0) return;

    setIsRunning(true);
  }, [players]);

  return (
    <div className="  flex bg-bonk-white w-full h-full   pl-32">
      <div className="min-w-[800px]">
        <div className=" w-full flex items-center justify-center pt-8">
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="h-[70px] w-[500px] flex items-center justify-center text-[45px]">
              <text>
                {players.length === 0
                  ? "Waiting..."
                  : seconds === -1
                  ? "Game is Starting"
                  : "Game Starts in"}
              </text>
            </div>

            <div
              className={cn("flex  ", {
                invisible: seconds === -1 || players.length === 0,
              })}
            >
              <div
                className={cn(
                  "flex flex-col p-2 bg-bonk-white rounded-box text-bonk-black"
                )}
              >
                <span className="countdown font-mono text-5xl">
                  <span
                    style={{ "--value": seconds } as React.CSSProperties}
                  ></span>
                </span>
                sec
              </div>
            </div>
          </div>
        </div>
        <div className="  ml-[100px] mt-[100px] flex  gap-16 ">
          <JackpotWheel></JackpotWheel>
          <div className="flex flex-col mt-16">
            {players.map((player, index) => (
              <div key={index} className=" flex items-center">
                <div className={"w-4 h-4 mr-2 " + player.color}></div>
                <div>
                  {" "}
                  {player.address.slice(0, 4) +
                    "..." +
                    player.address.slice(-4)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-16">
          {players.length > 0 &&
            players.map((player, index) => (
              <div key={index} className=" flex items-center justify-center pt-2">
                <NFTCard 
                  nft={{
                    mint: player.mint,
                    price: player.floorPrice,
                    owner: player.address,
                    color: player.color,
                  }}
                  hasNum={false}
                ></NFTCard>
              </div>
            ))}
        </div>
      </div>

      <div className="flex  h-[273px] min-w-[400px] ml-auto text-bonk-white m-4 rounded-xl">
        <div className="ml-2 mt-2 text-bonk-white relative">
          <Image
            src="/chat_table.svg"
            alt="crate"
            width={400}
            height={273}
            className=""
          />
          <div className="absolute right-1 transform -translate-x-1/2 bottom-0  ">
            <Image
              src="/bonky.svg"
              alt="bonky"
              width={47}
              height={47}
              className="transform scale-x-[-1]"
            />
          </div>
          <div></div>
        </div>

        <div className="absolute mt-8 ml-12 text-bonk-white">
          {gameHistory.length > 0 &&
            gameHistory.map((history, index) => <div key={index}>{history}</div>)}
        </div>
      </div>
    </div>
  );
}
