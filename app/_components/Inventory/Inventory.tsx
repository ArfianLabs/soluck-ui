import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NFTCard } from "./NFT.card";

export const Inventory = () => {
  return (
    <div className="h-full flex flex-col">
      <Tabs
        defaultValue="nfts"
        className="w-full p-6 min-h-[500px] max-h-[500px]"
      >
        <TabsList className="grid w-full grid-cols-2 bg-gray-900">
          <TabsTrigger value="nfts">My NFTs</TabsTrigger>
          <TabsTrigger value="winnings">My Winnings</TabsTrigger>
        </TabsList>
        <TabsContent value="nfts">
          <div className="flex flex-col gap-8">
            <div className="flex gap-2">
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
            </div>
            <div className="flex gap-2">
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
            </div>
            <div className="flex gap-2">
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
            </div>
            <div className="flex gap-2">
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="winnings">
          <div className="flex flex-col gap-8">
            <div className="flex gap-2">
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
            </div>
            <div className="flex gap-2">
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
              <NFTCard></NFTCard>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex flex-col items-center h-full">
        <div>Jackpot Entries</div>
        <div className="flex">
          <NFTCard></NFTCard>
          <NFTCard></NFTCard>
        </div>
      </div>
    </div>
  );
};
