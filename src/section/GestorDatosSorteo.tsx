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
      className="relative z-10 w-full lg:w-[33%] min-h-screen lg:min-h-0 p-5 lg:p-6 flex flex-col justify-start items-center gap-5 glass-panel border-r border-white/5"
      id="gestorDatos"
    >
      <header className="w-full">
        <div className="divRainbow rounded-xl p-[2px] shadow-glow-pink">
          <span className="w-full h-full flex justify-center items-center bg-night-800 rounded-[10px] px-4 py-5">
            <h1 className="h1 font-display tracking-wider text-5xl sm:text-6xl 2xl:text-7xl">
              RULETIFY
            </h1>
          </span>
        </div>
        <p className="text-muted text-center mt-2 text-sm 2xl:text-base">
          Crea sorteos al azar con estilo
        </p>
      </header>

      <SelectorGanadores />
      <GestorOpciones />
      {window.innerWidth < 1000 ? <BotonComenzar /> : ""}
    </div>
  );
});

export default GestorDatosSorteo;
