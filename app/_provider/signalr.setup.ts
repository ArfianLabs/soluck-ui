import * as signalR from "@microsoft/signalr";
import { playerColors } from "../_data/player.colors";

let connection: signalR.HubConnection | null = null;

export const startSignalRConnection = ({
  addToHistory,
  addPlayer,
  setWinner,
}: {
  addToHistory: any;
  addPlayer: any;
  setWinner: any;
}) => {
  const url = "http://socket.soluck.io/rouletteHub";
  connection = new signalR.HubConnectionBuilder()
    .withUrl(url)
    .withAutomaticReconnect()
    .build();

  connection
    .start()
    .then(() => {
      if (!connection) return;
      console.log("SignalR Connected");
      connection.on(
        "EnterRoulette",
        (
          owner: String,
          collectionAddress: String,
          userCount: number,
          floorPrice: number,
          isTimerStarted: boolean
        ) => {
          console.log("EnterRoulette", owner, floorPrice, isTimerStarted);
          const historyText =
            owner.slice(0, 4) +
            "..." +
            owner.slice(-4) +
            " entered with " +
            floorPrice +
            "$";
          const player = {
            address: owner,
            mint: collectionAddress,
            floorPrice: floorPrice,
            color: playerColors[userCount],
          };
          addPlayer(player);
          addToHistory(historyText);
          console.log("EnterRoulette", historyText);
        }
      );

      connection.on("FinalizeRoulette", (winner: string) => {
        const historyText =
          winner.slice(0, 4) + "..." + winner.slice(-4) + " Won!";
        console.log("FinalizeRoulette", historyText);
        setWinner(winner);
        setTimeout(() => {
          addToHistory(historyText);
        }, 5000);
      });

      connection.onclose(() => {
        console.log("Closed");
      });
    })
    .catch((error) => {
      console.error("SignalR connection failed:", error);
    });
};

export const closeSignalRConnection = () => {
  if (connection) {
    connection.stop();
    console.log("SignalR connection closed");
  }
};
