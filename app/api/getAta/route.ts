import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
dotenv.config();

function getKeypairFromMnemonic(mnemonic: string): Keypair {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const derivedSeed = derivePath("m/44'/501'/0'/0'", seed.toString("hex")).key;
  const keypair = Keypair.fromSeed(derivedSeed);
  return keypair;
}
const seedPhrase = process.env.SEED_PHRASE;
if (!seedPhrase) {
  throw new Error("Seed phrase not found in environment variables");
}
let authority = getKeypairFromMnemonic(seedPhrase);

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mint = searchParams.get("mint");
  const pda = searchParams.get("pda");
  try {


    if (!mint || pda === null) {
      return NextResponse.json({
        message: "mint required",
      });
    }

    const receiverPubkey = new PublicKey(pda);
    const mintPubkey = new PublicKey(mint);

    let pdaAta = await getOrCreateAssociatedTokenAccount(
      connection,
      authority,
      mintPubkey,
      receiverPubkey,
      true
    );

    return NextResponse.json({ data: pdaAta.address.toBase58() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
