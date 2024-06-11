import { Header } from "./_components/Header";
import { Inventory } from "./_components/Inventory/Inventory";

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <div className="flex flex-1 bg-bonk-white">
        <div className="w-96 h-[950px] min-w-[400px] bg-bonk-black text-white m-4 rounded-xl">
          <Inventory />
        </div>
        <div className="flex-1 bg-black">{children}</div>
      </div>
    </div>
  );
};
