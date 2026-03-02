import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Headers({ text }: { text: string }) {
  return (
    <div className={`${poppins.className} flex justify-center items-center w-full animate-slideFromBottom`}>
      <div className="header-line flex-grow h-1 bg-gradient-to-r from-header-line to-transparent rounded-full"></div>
      <div className="header-text text-xl sm:text-2xl md:text-3xl whitespace-nowrap px-2 sm:px-4 text-center bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent font-bold">
        {text}
      </div>
      <div className="header-line flex-grow h-1 bg-gradient-to-r from-transparent to-header-line rounded-full"></div>
    </div>
  );
}