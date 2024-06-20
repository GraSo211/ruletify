import { useContext, useEffect, useReducer, useRef } from "react";
import SorteoContext from "../context/SorteoContext";

export default function CartelProblema() {
    const spanCartelProblema = useRef<HTMLSpanElement>(null)
    const { mensajeG, setMensajeG } = useContext(SorteoContext)
    const handleAnimacionEnd = () => {
    if (spanCartelProblema.current) {
      spanCartelProblema.current.classList.remove("fadeM");
      spanCartelProblema.current.classList.add("hidden");
      setMensajeG("")
    }
  };
  useEffect(()=>{
    if (mensajeG && spanCartelProblema.current) {
      spanCartelProblema.current.classList.add("fadeM");
      spanCartelProblema.current.classList.remove("hidden");
      
    }
  },[mensajeG])

  return (
    <span
      onAnimationEnd={handleAnimacionEnd}
      className="w-full h-full absolute  top-0 left-0 hidden   bg-black  font-bold text-3xl text-center  backdrop-blur bg-opacity-50 transition-transform  z-[1000]"
      ref={spanCartelProblema}
  
    >
      <p className="w-full h-full">{mensajeG}</p>
    </span>
  );
}
