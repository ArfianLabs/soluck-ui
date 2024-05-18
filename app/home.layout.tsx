import { Header } from "./_components/Header";
import { Inventory } from "./_components/Inventory/Inventory";

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <div className="flex flex-1">
        <div className="w-96 bg-gray-800 text-white">
          <Inventory />
        </div>
        <div className="flex-1 bg-white">{children}</div>
      </div>
    </div>
  );
};
