import { Program } from "@coral-xyz/anchor";
import { IDL, SoluckRouletteProgram } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const programId = new PublicKey("7Mf7myQj9Bt5tSeWeD8HN8n5nnqPc3foErLcCfDQ8HTo");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<SoluckRouletteProgram>(IDL, programId, {
  connection,
});

export const [configPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("config")],
  program.programId
);
