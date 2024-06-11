import { mintAccs } from "@/app/_data/mint.accs";
import { INFT } from "@/app/_interfaces/nft.interface";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export const NFTCard = ({
  nft,
  handleOnClick,
  hasNum = true,
}: {
  nft: INFT;
  handleOnClick: any;
  hasNum?: boolean;
}) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const mint = nft.mint;
    const mintImg = mintAccs.find((acc) => acc.mint === mint)?.src;
    if (!mintImg) return;
    setImage(mintImg);

    console.log("entree nft is", nft);
  }, []);

  return (
    <div
      onClick={() => handleOnClick(nft)}
      className="min-w-[60px] min-h-[60px] flex flex-col items-center   "
    >
      <div
        className={cn(
          "min-w-[60px] bg-bonk-white min-h-[60px] flex items-center justify-center cursor-pointer " +
            nft.color
        )}
      >
        <Image className="" src={image} alt="nft" width={30} height={30} />
      </div>
      <div
        className={cn("flex w-full ", {
          "justify-between": hasNum,
          "justify-center": !hasNum,
        })}
      >
        {hasNum && <div>{"(" + nft.amount + ")"}</div>}

        <div>{nft.price}$</div>
      </div>
    </div>
  );
};
