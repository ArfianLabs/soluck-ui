"use client";
import Image from "next/image";
import { JackpotWheel } from "./_components/Wheel";

export default function Home() {
  return (
    <div className="bg-whiteish w-full h-full flex pl-32">
      <div className="w-[700px] ">
        <JackpotWheel></JackpotWheel>
      </div>
    </div>
  );
}
