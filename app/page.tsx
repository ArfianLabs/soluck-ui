"use client";
import Image from "next/image";
import { JackpotWheel } from "./_components/Wheel";
import { NFTCard } from "./_components/Inventory/NFT.card";
//quick node
export default function Home() {
  return (
    <div className="flex bg-whiteish w-full h-full   pl-32">
      <div>
        <div className="  ml-[100px] mt-[100px] flex  gap-16">
          <JackpotWheel></JackpotWheel>
          <div className="flex flex-col mt-16">
            <div>- Beroin99</div>
            <div>- Merdoyovski</div>
            <div>- Berkest</div>
          </div>
        </div>
        <div className="flex gap-2">
          <NFTCard></NFTCard>
          <NFTCard></NFTCard>
          <NFTCard></NFTCard>
          <NFTCard></NFTCard>
          <NFTCard></NFTCard>
          <NFTCard></NFTCard>
          <NFTCard></NFTCard>
        </div>
      </div>

      <div className="bg-white h-full w-[300px] ml-auto ">
        <div className="ml-2 mt-2">
          <div>Merdoyovski entered with 35$</div>
          <div>Beroin99 entered with 35$</div>
          <div>Beroin99 Won!</div>
        </div>
      </div>
    </div>
  );
}
