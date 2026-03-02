import { ReactNode } from "react";
import { useState, useEffect } from "react";
export default function Card({children}:{children:ReactNode}){
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(()=>{
        setFadeIn(true);
    },[])
    return <div className={`lg:px-0 pb-5 px-2 min-h-screen flex flex-col items-center duration-4000 ease-in-out ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}>
      <div className={`w-full lg:w-3/4 2xl:w-2/4 min-h-[80vh] pt-12 sm:pt-24 flex flex-col justify-center px-2 sm:px-4`}>
        <div className={`flex flex-col-reverse lg:flex-row lg:items-start justify-center w-full transition-transform`}>
          {children}
        </div>
      </div>
    </div>
}