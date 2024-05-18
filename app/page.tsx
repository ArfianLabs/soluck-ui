"use client";
import Image from "next/image";
import { JackpotChart } from "./_components/Jackpot.chart";

export default function Home() {
  return (
    <div className="bg-whiteish w-full h-full flex pl-32">
      <div className="w-[600px] ">
        <JackpotChart></JackpotChart>
      </div>
    </div>
  );
}
