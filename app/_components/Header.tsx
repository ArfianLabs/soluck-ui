import { FaWallet } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="h-24 bg-gray-900 w-full flex justify-between items-center">
      <Image
        src="/logo.png"
        alt="logo"
        width={64}
        height={64}
        className="ml-6"
      />
      <Button className="mr-6 w-32 h-10 bg-white text-gray-900 flex gap-2">
        <text>Connect</text>
        <FaWallet />
      </Button>
    </div>
  );
};
