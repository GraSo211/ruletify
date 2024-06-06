
import React, { createContext, useState, } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';


interface SorteoContextType {
    cantGanadores: number;
    setCantGanadores: Dispatch<SetStateAction<number>>;
    arrayOpciones: string[];
    setArrayOpciones: Dispatch<SetStateAction<string[]>>;
    arrayColores: string[];
    setArrayColores: Dispatch<SetStateAction<string[]>>;
    mensajeG:string;
    setMensajeG: Dispatch<SetStateAction<string>>;
    mobilePc:boolean
}


const defaultValues: SorteoContextType = {
    cantGanadores: 1,
    setCantGanadores: () => {},
    arrayOpciones: [""],
    setArrayOpciones: () => {},
    arrayColores: [""],
    setArrayColores: () => {},
    mensajeG: "",
    setMensajeG: () => {},
    mobilePc:true,
};

const SorteoContext = createContext<SorteoContextType>(defaultValues);

export const SorteoProvider = ({ children }: { children: ReactNode }) => {
    const [cantGanadores, setCantGanadores] = useState<number>(1);
    const [arrayOpciones, setArrayOpciones] = useState<string[]>([]);
    const [arrayColores, setArrayColores] = useState<string[]>([]);
    const [mensajeG, setMensajeG] = useState<string>("");
    const mobilePc = true;
    return (
        <SorteoContext.Provider value={{ cantGanadores, setCantGanadores, arrayOpciones, setArrayOpciones, arrayColores, setArrayColores, mensajeG, setMensajeG, mobilePc }}>
            {children}
        </SorteoContext.Provider>
    );
};

export default SorteoContext;