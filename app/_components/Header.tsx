"use client";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

export const Header = () => {
  return (
    <div className="h-24 bg-bonk-black w-full flex justify-between items-center">
      <Image
        src="/logo.png"
        alt="logo"
        width={64}
        height={64}
        className="ml-6"
      />
      <div className="mr-10">
        <WalletMultiButton></WalletMultiButton>
      </div>
    </div>
  );
};
