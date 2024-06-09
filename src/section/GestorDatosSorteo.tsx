import React, { useContext, forwardRef } from "react";
import "../styles/sorteo.css";
import SelectorGanadores from "../components/SelectorGanadores";
import GestorOpciones from "../components/GestorOpciones";
import SorteoContext from "../context/SorteoContext";
import BotonComenzar from "../components/BotonComenzar";

const GestorDatosSorteo = forwardRef<HTMLDivElement>((props, ref) => {
  const { mobilePc } = useContext(SorteoContext);

  return (
    <div
      ref={ref}
      className="bg-[#121317] w-full hd:w-[33%] h-full p-5 flex flex-col justify-start items-center gap-3"
      id="gestorDatos"
    >
      <div className="divRainbow w-full h-[10%] p-1 flex">
        <span className="w-full hd:h-full flex justify-center items-center p-3 bg-[#121317]">
          <h1 className="h1 font-bold text-5xl tablet:text-7xl hd:text-5xl full-hd:text-7xl 2k:text-8xl">
            RULETIFY
          </h1>
        </span>
      </div>

      <SelectorGanadores />
      <GestorOpciones />
      {!mobilePc ? <BotonComenzar /> : ""}
    </div>
  );
});

export default GestorDatosSorteo;