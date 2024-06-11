"use client";
import * as signalR from "@microsoft/signalr";
import { StringDecoder } from "string_decoder";
import {
  closeSignalRConnection,
  startSignalRConnection,
} from "../_provider/signalr.setup";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "../_hooks/useHistory";
import { configPDA } from "../_provider/anchor.setup";
import { program } from "../_provider/anchor.setup";
import { PublicKey } from "@solana/web3.js";
import { useRoulette } from "../_hooks/useRoulette";
import { mintAccs } from "../_data/mint.accs";
import { useWallet } from "@solana/wallet-adapter-react";
import { playerColors } from "../_data/player.colors";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const addToHistory = useHistory((state) => state.addToHistory);
  const addPlayer = useRoulette((state) => state.addPlayer);
  const setWinner = useRoulette((state) => state.setWinner);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Start the SignalR connection when the page mounts
    //addListener();
    if (!hasFetched.current) {
      hasFetched.current = true;
      //addListenerWinner();
      //addListenerEnter();

      startSignalRConnection({
        addToHistory: addToHistory,
        addPlayer: addPlayer,
        setWinner: setWinner,
      });
    }
  }, []);

  return <div>{children}</div>;
};
