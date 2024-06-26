import { toast } from "react-hot-toast";
import { cn } from "../../_lib/utils";

const generalStyle =
  "z-50 font-CeraProMedium space-x-[-20px] justify-evenly font-medium 2xl:text-lg flex xl:h-[80px] xl:text-md xl:w-[380px] 2xl:h-[100px]  2xl:w-[409px] items-center rounded-xl bg-bonk-black text-bonk-white ";

export const SuccessToast = (text: string) => {
  toast.custom(
    <div className={cn("z-50", generalStyle)}>
      <span>{text}</span>
    </div>
  );
};
export const ErrorToast = (text: string) => {
  toast.custom(
    <div className={cn("z-50", generalStyle)}>
      <span>{text}</span>
    </div>
  );
};
export const LoadingToast = (text: string) => {
  toast.custom(
    <div className={cn("z-50", generalStyle)}>
      <span>{text}</span>
    </div>
  );
};

export const PromiseToast = (text: string, promise: any) => {
  toast.promise(
    promise,
    {
      loading: text,
      success: (data) => "Success",
      error: (err) => `Error fetching your NFTs and Game State`,
    },
    {
      position: "bottom-right",
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0F0E0C",
        width: "409px",
        height: "70px",
        color: "#FEF8E2",
      },
      success: {
        duration: 2000,
        icon: "🔥",
      },
    }
  );
};
