"use client";
import { useEffect, useRef, useState } from "react";
//import { Wheel } from "react-custom-roulette";
import Image from "next/image";
import { useWindowSize } from "@uidotdev/usehooks";
import Confetti from "react-confetti";
import { cn } from "../_lib/utils";
import { IPlayer, useRoulette } from "../_hooks/useRoulette";
import { twToHex } from "../_data/player.colors";
import dynamic from "next/dynamic";
import { GetGameState } from "../_api/backend.api";
import { configPDA } from "../_provider/anchor.setup";
import { program } from "../_provider/anchor.setup";
import { PublicKey } from "@solana/web3.js";

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

const backgroundColors = ["#FCE184", "#FFB877", "#FCE184", "#f9dd50"];
const textColors = ["#0b3351"];
const outerBorderColor = "#0F0E0C";
const outerBorderWidth = 5;
const innerBorderColor = "#ffffff";
const innerBorderWidth = 45;
const innerRadius = 0;
const radiusLineColor = "#0F0E0C";
const radiusLineWidth = 4;
const fontFamily = "Nunito";
const fontWeight = "bold";
const fontSize = 25;
const fontStyle = "normal";
const textDistance = 60;
const spinDuration = 0.5;

export const JackpotWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const { width, height } = useWindowSize();
  const [confettiVisible, setConfettiVisible] = useState(false);
  const players = useRoulette((state) => state.players);
  const winner = useRoulette((state) => state.winner);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const addPlayer = useRoulette((state) => state.addPlayer);

  useEffect(() => {
    if (players.length > 0) {
      handleNewPlayer(players[players.length - 1]);
    }
  }, [players]);

  useEffect(() => {
    getGameState();
  }, []);

  useEffect(() => {
    if (winner.length === 44) {
      const winnerIndex = players.findIndex(
        (player) => player.address === winner
      );
      if (winnerIndex === -1) return;
      setPrizeNumber(winnerIndex);
      handleSpinClick();
    }
  }, [winner]);

  const getGameState = async () => {
    const configState = await program.account.configData.fetch(configPDA);
    const rouletteCount = configState.rouletteCount.toNumber();

    const [roulettePDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("roulette"), Buffer.from(rouletteCount.toString())],
      program.programId
    );

    const rouletteState = await program.account.rouletteData.fetch(roulettePDA);

    let existingPlayers;
    const players = rouletteState.players;
    const values = rouletteState.values;

    if (rouletteState.status === 1) {
      existingPlayers = players.map((player, index) => ({
        address: player.toBase58(),
        floorPrice: values[index].toNumber(),
        color: "bg-bonk-orange", // Example color, replace as needed
      }));

      for (let player of existingPlayers) {
        handleNewPlayer(player);
      }
    }
  };

  const handleNewPlayer = (player: any) => {
    const colorMap = {
      "bg-bonk-orange": "#FFA500",
      "bg-bonk-yellow": "#FFFF00",
      "bg-bonk-red": "#FF0000",
    };

    const newPlayer = {
      option: player.address.slice(0, 4) + "..." + player.address.slice(-4),
      optionSize: player.floorPrice, // @ts-ignore
      style: { backgroundColor: colorMap[player.color], textColor: "#0b3351" },
    };

    setDisplayedPlayers((prevDisplayedPlayers) => {
      const firstPlayer = prevDisplayedPlayers[0];
      if (firstPlayer.option === "Waiting for players...") {
        return [newPlayer];
      }
      return [...prevDisplayedPlayers, newPlayer];
    });
  };

  const [displayedPlayers, setDisplayedPlayers] = useState([
    {
      option: "Waiting for players...",
      style: { backgroundColor: "#FCE184", textColor: "#0b3351" },
    },
  ]);

  const handleSpinClick = () => {
    setMustSpin(true);
  };

  return (
    <div className="w-full h-full">
      <div
        className={cn("transition-all duration-1000", {
          invisible: !confettiVisible,
        })}
      >
        <Confetti
          width={width ? width : 1000}
          height={height ? height : 1000}
        />
      </div>
      <div className="relative w-[445px] h-[445px]">
        <Image
          src="/bonk_in_black.png"
          onClick={handleSpinClick}
          alt="logo"
          width={100}
          height={100}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        />
        {typeof window !== "undefined" && (
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={displayedPlayers}
            backgroundColors={backgroundColors}
            textColors={textColors}
            fontFamily={fontFamily}
            fontSize={fontSize}
            fontWeight={fontWeight}
            fontStyle={fontStyle}
            outerBorderColor={outerBorderColor}
            outerBorderWidth={outerBorderWidth}
            innerRadius={innerRadius}
            innerBorderColor={innerBorderColor}
            innerBorderWidth={innerBorderWidth}
            radiusLineColor={radiusLineColor}
            radiusLineWidth={
              displayedPlayers.length === 1 ? 0 : radiusLineWidth
            }
            spinDuration={spinDuration}
            startingOptionIndex={2}
            perpendicularText={true}
            textDistance={textDistance}
            onStopSpinning={() => {
              setMustSpin(false);
            }}
            pointerProps={{
              src: "!.png",
              style: { backgroundColor: "" },
            }}
          ></Wheel>
        )}
        <button
          className="w-[50px] h-[50px] cursor-default"
          onClick={() => setConfettiVisible(true)}
        >
          {" "}
        </button>
      </div>{" "}
    </div>
  );
};
