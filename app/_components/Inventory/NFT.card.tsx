import Image from "next/image";

export const NFTCard = () => {
  return (
    <div className="min-w-20 w-20 h-20 min-h-20 flex flex-col items-center pr-2">
      <Image src="/nft.png" alt="nft" width={64} height={64} />
      <div>25$</div>
    </div>
  );
};
