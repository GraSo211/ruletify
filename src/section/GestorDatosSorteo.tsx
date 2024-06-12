import React, { useContext, forwardRef } from "react";
import "../styles/sorteo.css";
import SelectorGanadores from "../components/SelectorGanadores";
import GestorOpciones from "../components/GestorOpciones";
import SorteoContext from "../context/SorteoContext";
import BotonComenzar from "../components/BotonComenzar";

const GestorDatosSorteo = forwardRef<HTMLDivElement>((props, ref) => {
  const {  } = useContext(SorteoContext);

  return (
    <div
      ref={ref}
      className="bg-[#0f1012] w-full lg:w-[33%]  p-5  flex flex-col justify-start items-center gap-3"
      id="gestorDatos"
    >
      <div className="divRainbow w-full  p-1 flex">
        <span className="w-full h-full flex justify-center items-center p-3 bg-[#0f1012]">
          <h1 className="h1 font-bold text-4xl sm:text-5xl  2xl:text-6xl">
            RULETIFY  
          </h1>
        </span>
      </div>

      <SelectorGanadores />
      <GestorOpciones />
      {!true ? <BotonComenzar /> : ""}
    </div>
  );
});

export default GestorDatosSorteo;