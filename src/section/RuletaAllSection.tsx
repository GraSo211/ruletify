import React, { useEffect, useState,  } from 'react';
import GestorDatosSorteo from "./GestorDatosSorteo";
import GeneradorRuleta from "./GeneradorRuleta";
import SorteoContext from '../context/SorteoContext';



export default function RuletaAllSection() {
    const [cantGanadores, setCantGanadores] = useState(1);
    const [arrayOpciones, setArrayOpciones] = useState<string[]>([]);
    const [arrayColores, setArrayColores] = useState<string[]>([]);
    const [mensajeG, setMensajeG] = useState<string>("");
    const [mobilePc, setMobilePc]= useState<boolean>(true)

    useEffect(()=>{
        if(window.innerWidth < 1000){
            setMobilePc(false);
        }
    },[])

    

    return (
        <div className="w-full h-full flex flex-row justify-center items-center">
            <SorteoContext.Provider value={{cantGanadores, setCantGanadores, arrayOpciones, setArrayOpciones, arrayColores, setArrayColores, mensajeG, setMensajeG, mobilePc}}>
                <GestorDatosSorteo ></GestorDatosSorteo>
                <GeneradorRuleta></GeneradorRuleta>
            </SorteoContext.Provider>
        </div>
    );
}
