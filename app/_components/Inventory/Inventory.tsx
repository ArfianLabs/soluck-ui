"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { NFTCard } from "./NFT.card";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { INFT } from "@/app/_interfaces/nft.interface";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { mintAccs } from "../../_data/mint.accs";
import { program } from "../../_provider/anchor.setup";
import { configPDA } from "../../_provider/anchor.setup";

export const Inventory = () => {
  const { connection } = useConnection();

  const [userNFTs, setUserNFTs] = useState<INFT[]>([]);
  const [selectedNFTs, setSelectedNFTs] = useState<INFT[]>([]);
  const [isPdaInitialized, setIsPdaInitialized] = useState<boolean>(false);
  const [userPDA, setUserPDA] = useState<PublicKey>();

  const { publicKey, sendTransaction } = useWallet();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (publicKey && !hasFetched.current) {
      hasFetched.current = true;
      getTokenAccounts();
      getPlayerPDA();
    }
  }, [publicKey]);

  const getPlayerPDA = async () => {
    if (!publicKey) return;
    const [winnerPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("roulette"), publicKey.toBuffer()],
      program.programId
    );
    try {
      const isInitialized =
        await program.account.userRouletteData.getAccountInfo(winnerPDA);
      if (isInitialized) {
        setIsPdaInitialized(true);
        setUserPDA(winnerPDA);
      } else {
        setIsPdaInitialized(false);
      }
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  const getTokenAccounts = async () => {
    if (!publicKey) return;
    try {
      for (let mintAcc of mintAccs) {
        const tokenAccounts = await connection.getTokenAccountsByOwner(
          publicKey,
          {
            mint: new PublicKey(mintAcc.mint),
            programId: TOKEN_PROGRAM_ID,
          }
        );
        let nfts: INFT[] = [];
        tokenAccounts.value.forEach((tokenAccount) => {
          const accountData = AccountLayout.decode(tokenAccount.account.data);
          console.log(accountData);
          const amount = Number(accountData.amount);
          if (amount === 0) return;
          const mint = accountData.mint.toBase58();
          const owner = accountData.owner.toBase58();
          const ata = tokenAccount.pubkey.toBase58();
          const src = mintAcc.src;
          const price = mintAcc.price;
          nfts.push({ amount, ata, mint, owner, src, price });
        });
        setUserNFTs((prevNFTs) => {
          const updatedNFTs = [...prevNFTs];
          nfts.forEach((newNFT) => {
            const existingNFTIndex = updatedNFTs.findIndex(
              (nft) => nft.mint === newNFT.mint
            );
            if (existingNFTIndex !== -1) {
              updatedNFTs[existingNFTIndex].amount = newNFT.amount;
            } else {
              updatedNFTs.push(newNFT);
            }
          });
          return updatedNFTs;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMintNFT = async () => {
    if (!publicKey) return;
    try {
      const mintIndex = 3;
      const address = publicKey.toBase58();
      console.log("addressxx", address);
      const url = `/api/mintNFT?address=${address}&mintIndex=${mintIndex}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to mint NFT");
      }

      const data = await response.json();
      getTokenAccounts(); // Refresh the token accounts to show the new NFT*/
    } catch (error) {
      console.error(error);
    }
  };

  const getAta = async (mint: string, pda: string) => {
    const url = `/api/getAta?mint=${mint}&pda=${pda}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to mint NFT");
    }

    const data = await response.json();
    return data.data;
  };

  const handleAddToRoulette = (nft: INFT) => {
    setUserNFTs((prevUserNFTs) => {
      const updatedUserNFTs = prevUserNFTs
        .map((obj) => {
     
           
          if (obj.mint === nft.mint && obj.amount && obj.amount > 0) {
            return { ...obj, amount: obj.amount - 1 };
          }
          return obj;
        })
        .filter((obj) => obj.amount && obj.amount > 0);
      return updatedUserNFTs;
    });

    setSelectedNFTs((prevSelectedNFTs) => {
      const selectedNFTIndex = prevSelectedNFTs.findIndex(
        (selectedNFT) => selectedNFT.mint === nft.mint
      );

    
      if (selectedNFTIndex !== -1) {
        const updatedSelectedNFTs = prevSelectedNFTs.map((obj, index) => {
   
          if (
            index === selectedNFTIndex && // @ts-ignore
            userNFTs[selectedNFTIndex]?.amount !== undefined && userNFTs[selectedNFTIndex].amount > 0
          ) { // @ts-ignore
            return { ...obj, amount: obj.amount + 1 };
          }
          return obj;
        });
        return updatedSelectedNFTs;
      } else {
        return [...prevSelectedNFTs, { ...nft, amount: 1 }];
      }
    });
  };

  const handleRemoveFromRoulette = (nft: INFT) => {
    setSelectedNFTs((prevSelectedNFTs) => {
      const updatedSelectedNFTs = prevSelectedNFTs
        .map((obj) => { // @ts-ignore
          if (obj.mint === nft.mint && obj.amount > 0) { // @ts-ignore
            return { ...obj, amount: obj.amount - 1 };
          }
          return obj;
        }) // @ts-ignore
        .filter((obj) => obj.amount > 0);
      return updatedSelectedNFTs;
    });

    setUserNFTs((prevUserNFTs) => {
      const selectedNFTIndex = prevUserNFTs.findIndex(
        (selectedNFT) => selectedNFT.mint === nft.mint
      );

      if (selectedNFTIndex !== -1) {
        const updatedUserNFTs = prevUserNFTs.map((obj, index) => {
          if (
            index === selectedNFTIndex && // @ts-ignore
            userNFTs[selectedNFTIndex].amount > 0
          ) { // @ts-ignore
            return { ...obj, amount: obj.amount + 1 };
          }
          return obj;
        });
        return updatedUserNFTs;
      } else {
        return [...prevUserNFTs, { ...nft, amount: 1 }];
      }
    });
  };

  const handleEnterRoullette = async () => {
    if (!publicKey) return;

    const configState = await program.account.configData.fetch(configPDA);

    const rouletteCount = configState.rouletteCount.toNumber();

    const [roulettePDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("roulette"), Buffer.from(rouletteCount.toString())],
      program.programId
    );

      if (selectedNFTs.length === 0) return;
      const fromAta = selectedNFTs[0].ata;
      const mint = selectedNFTs[0].mint;

      if (!mint) return;
      const toAta = await getAta(mint, roulettePDA.toBase58());

      if (!toAta) return;

      const rouletteTx = await program.methods
        .enterRoulette()
        .accounts({
          userWinningAccount: userPDA,
          roulette: roulettePDA,
          sender: publicKey,
          fromAta: fromAta,
          toAta: toAta,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .transaction();

      const transactionSignature = await sendTransaction(
        rouletteTx,
        connection
      );
    
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs
        defaultValue="nfts"
        className="w-full p-6 min-h-[500px] max-h-[500px]"
      >
        <div
          onClick={handleMintNFT}
          className="w-[80px] text-white bg-bonk-red font-bold rounded-md p-1 mb-1"
        >
          Mint NFT
        </div>

        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="nfts">
            My NFTs{" "}
            <Image
              className=" ml-4 mb-0.5"
              src={"/yellow_folder.png"}
              alt="nft"
              width={25}
              height={25}
            />
          </TabsTrigger>
          <TabsTrigger value="winnings">
            My Winnings{" "}
            <Image
              className=" ml-4 mb-0.5"
              src={"/orange_folder.png"}
              alt="nft"
              width={25}
              height={25}
            />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="nfts">
          <div className="flex flex-col">
            <div className="flex flex-col gap-8 mt-4">
              <div className="flex gap-8 items-center justify-start ml-2  ">
                {userNFTs.length > 0 &&
                  userNFTs.map((nft, index) => (
                    <NFTCard
                      handleOnClick={handleAddToRoulette}
                      key={index}
                      nft={nft}
                    ></NFTCard>
                  ))}
              </div>
            </div>{" "}
          </div>
        </TabsContent>
        <TabsContent value="winnings">
          <div className="flex flex-col gap-8">
            <div className="flex gap-2">
              <div className="min-w-[60px] min-h-[60px] flex flex-col items-center   ">
                <div
                  className={cn(
                    "min-w-[60px] bg-bonk-white min-h-[60px] flex items-center justify-center cursor-pointer "
                  )}
                >
                  <Image
                    className=""
                    src={"/bonkdog_nft.png"}
                    alt="nft"
                    width={30}
                    height={30}
                  />
                </div>
                <div className={cn("flex w-full justify-between")}>
                  {<div>{"(1)"}</div>}

                  <div>{40}$</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex flex-col items-center h-full mt-16">
        <Tabs
          defaultValue="nfts"
          className="w-full p-6 min-h-[500px] max-h-[500px]"
        >
          <TabsList className="grid   grid-cols-1 bg-gray-900">
            <TabsTrigger value="nfts">
              Roulette Entries{" "}
              <Image
                className=" ml-4 mb-0.5 "
                src={"/pink_folder.png"}
                alt="nft"
                width={25}
                height={25}
              />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="nfts">
            <div className="flex flex-col gap-8">
              <div className="flex gap-2 min-h-[200px]">
                {selectedNFTs.length > 0 &&
                  selectedNFTs.map((nft, index) => (
                    <NFTCard
                      handleOnClick={handleRemoveFromRoulette}
                      key={index}
                      nft={nft}
                    ></NFTCard>
                  ))}
              </div>

              <Button
                className="cursor-pointer mt-auto mx-auto w-32 h-10 bg-white text-gray-900 flex gap-2 transition-colors duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onMouseOver={(e) =>
                  e.currentTarget.classList.add("bg-gray-200")
                }
                onMouseOut={(e) =>
                  e.currentTarget.classList.remove("bg-gray-200")
                }
                onClick={(e) => handleEnterRoullette()}
                onBlur={(e) => e.currentTarget.classList.remove("bg-gray-400")}
              >
                <text>
                  {"Enter Roulette"}
                </text>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
