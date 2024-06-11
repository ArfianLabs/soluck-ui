import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { NextResponse } from "next/server";
import { mintAccs } from "../../_data/mint.accs";
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
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");
    const mintIndex = searchParams.get("mintIndex");

    if (!address || mintIndex === null) {
      return NextResponse.json({
        message: "Address and mintIndex are required",
      });
    }

    console.log("mintIndex", mintIndex, mintAccs[Number(mintIndex)].mint);
    console.log("address", address);
    const mint = new PublicKey(mintAccs[Number(mintIndex)].mint);
    const receiverPubkey = new PublicKey(address);

    let receiverATA = await getOrCreateAssociatedTokenAccount(
      connection,
      authority,
      mint,
      receiverPubkey
    );
    const mintAmount = 1;
    await mintTo(
      connection,
      authority,
      mint,
      receiverATA.address,
      authority.publicKey,
      mintAmount
    );

    return NextResponse.json({ data: "NFT minted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
