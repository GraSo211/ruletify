import React, { useEffect, useRef, useState } from "react";
import GestorDatosSorteo from "./GestorDatosSorteo";
import GeneradorRuleta from "./GeneradorRuleta";
import SorteoContext from "../context/SorteoContext";
import GanadoresSection from "./GanadoresSection";
import "./RuletaAllSection.css";
import { SwitchTransition, CSSTransition } from "react-transition-group";

type Opciones = {
  opcion: string;
  color:string;
}


export default function RuletaAllSection() {
  const [cantGanadores, setCantGanadores] = useState(1);
  const [opciones, setOpciones] = useState<Opciones[]>([]);
  const [ganadores, setGanadores] = useState<Opciones[]>([]);
  const [mensajeG, setMensajeG] = useState<string>("");
  const [sortear, setSortear] = useState<boolean>(false);
  const nodeRef = useRef<HTMLDivElement>(null);

 




  return (
    <div className="w-full h-full flex flex-row">
      <SorteoContext.Provider
        value={{
          cantGanadores,
          setCantGanadores,
          opciones,
          setOpciones,
          ganadores,
          setGanadores,
          mensajeG,
          setMensajeG,
          sortear,
          setSortear,
        }}
      >
        {true?
          <SwitchTransition>
          <CSSTransition
            key={sortear ? "true" : "false"}
            nodeRef={nodeRef}
            addEndListener={(done) => {
              const node = nodeRef.current;
              if (node) {
                node.addEventListener("transitionend", done, false);
              }
            }}
            classNames="fade"
          >
            {sortear ? (
              <GanadoresSection ref={nodeRef}></GanadoresSection>
            ) : (
              <GestorDatosSorteo ref={nodeRef}></GestorDatosSorteo>
            )}
          </CSSTransition>
        </SwitchTransition>
        
        :


        sortear ? (
          <GanadoresSection></GanadoresSection>
        ) : (
          <GestorDatosSorteo></GestorDatosSorteo>
        )
        }

        <GeneradorRuleta></GeneradorRuleta>
      </SorteoContext.Provider>
    </div>
  );
}
