import { create } from "zustand";

export interface IPlayer {
  address: string;
  mint: string;
  floorPrice: number;
  color: string;
}

interface RouletteState {
  players: IPlayer[];
  winner: string;
  setPlayers: (players: IPlayer[]) => void;
  addPlayer: (player: IPlayer) => void;
  setWinner: (winner: string) => void;
}

export const useRoulette = create<RouletteState>((set) => ({
  players: [],
  winner: "",
  setPlayers: (players: IPlayer[]) => set((state) => ({ players: players })),
  addPlayer: (player: IPlayer) =>
    set((state) => ({ players: [...state.players, player] })),
  setWinner: (winner: string) => set((state) => ({ winner: winner })),
}));
