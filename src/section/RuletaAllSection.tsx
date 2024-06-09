import React, { useEffect, useState, useRef } from "react";
import GestorDatosSorteo from "./GestorDatosSorteo";
import GeneradorRuleta from "./GeneradorRuleta";
import SorteoContext from "../context/SorteoContext";
import GanadoresSection from "./GanadoresSection";
import "./RuletaAllSection.css";
import { SwitchTransition, CSSTransition } from "react-transition-group";

export default function RuletaAllSection() {
  const [cantGanadores, setCantGanadores] = useState(1);
  const [arrayOpciones, setArrayOpciones] = useState<string[]>([]);
  const [arrayColores, setArrayColores] = useState<string[]>([]);
  const [arrayGanadores, setArrayGanadores] = useState<string[]>([]);
  const [arrayColoresGanadores, setArrayColoresGanadores] = useState<string[]>(
    []
  );
  const [mensajeG, setMensajeG] = useState<string>("");
  const [mobilePc, setMobilePc] = useState<boolean>(true);
  const [sortear, setSortear] = useState<boolean>(false);
  const nodeRef = useRef(null)
  useEffect(() => {
    if (window.innerWidth < 1000) {
      setMobilePc(false);
    }
  }, []);   

  return (
    <div className="w-full h-full flex flex-row">
      <SorteoContext.Provider
        value={{
          cantGanadores,
          setCantGanadores,
          arrayOpciones,
          setArrayOpciones,
          arrayGanadores,
          setArrayGanadores,
          arrayColoresGanadores,
          setArrayColoresGanadores,
          arrayColores,
          setArrayColores,
          mensajeG,
          setMensajeG,
          mobilePc,
          sortear,
          setSortear,
        }}
      >
        <SwitchTransition>
          <CSSTransition
            key={sortear ? "true" : "false"}
            
            addEndListener={(node, done) =>
              node.addEventListener("transitionend", done, false)
            }
            classNames="fade"
          >
            {sortear ? (
              <GanadoresSection  ></GanadoresSection>
            ) : (
              <GestorDatosSorteo ></GestorDatosSorteo>
            )}
          </CSSTransition>
        </SwitchTransition>

        <GeneradorRuleta></GeneradorRuleta>
      </SorteoContext.Provider>
    </div>
  );
}
