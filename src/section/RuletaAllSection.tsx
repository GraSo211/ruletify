import React, { useEffect, useRef, useState } from "react";
import GestorDatosSorteo from "./GestorDatosSorteo";
import GeneradorRuleta from "./GeneradorRuleta";
import SorteoContext from "../context/SorteoContext";
import GanadoresSection from "./GanadoresSection";
import "./RuletaAllSection.css";
import { SwitchTransition, CSSTransition } from "react-transition-group";

type Opciones = {
    opcion: string;
    color: string;
};

export default function RuletaAllSection() {
    const [cantGanadores, setCantGanadores] = useState(1);
    const [opciones, setOpciones] = useState<Opciones[]>([]);
    const [ganadores, setGanadores] = useState<Opciones[]>([]);
    const [mensajeG, setMensajeG] = useState<string>("");
    const [sortear, setSortear] = useState<boolean>(false);
    const [finRuleta, setFinRuleta] = useState<boolean>(false);
    const [cantRuletasFinalizadas, setCantRuletasFinalizadas] = useState(1);
    const nodeRef = useRef<HTMLDivElement>(null);
    const [reset, setReset] = useState<boolean>(false);
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
                    finRuleta,
                    setFinRuleta,
                    cantRuletasFinalizadas,
                    setCantRuletasFinalizadas,
                    reset,
                    setReset,
                }}
            >
                {window.innerWidth > 1024 ? (
                    <>
                        <SwitchTransition>
                            <CSSTransition
                                key={finRuleta ? "true" : "false"}
                                nodeRef={nodeRef}
                                addEndListener={(done) => {
                                    const node = nodeRef.current;
                                    if (node) {
                                        node.addEventListener("transitionend", done, false);
                                    }
                                }}
                                classNames="fade"
                            >
                                {finRuleta ? <GanadoresSection ref={nodeRef}></GanadoresSection> : <GestorDatosSorteo ref={nodeRef}></GestorDatosSorteo>}
                            </CSSTransition>
                        </SwitchTransition>
                        <GeneradorRuleta></GeneradorRuleta>
                    </>
                ) : finRuleta ? (
                    <GanadoresSection></GanadoresSection>
                ) : (
                    <>
                        <GestorDatosSorteo></GestorDatosSorteo>
                        <GeneradorRuleta></GeneradorRuleta>
                    </>
                )}
            </SorteoContext.Provider>
        </div>
    );
}
