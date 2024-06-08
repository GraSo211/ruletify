
import React, { createContext, useState, } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';


interface SorteoContextType {
    cantGanadores: number;
    setCantGanadores: Dispatch<SetStateAction<number>>;
    arrayOpciones: string[];
    setArrayOpciones: Dispatch<SetStateAction<string[]>>;
    arrayGanadores: string[];
    setArrayGanadores: Dispatch<SetStateAction<string[]>>;
    arrayColoresGanadores: string[];
    setArrayColoresGanadores: Dispatch<SetStateAction<string[]>>;
    arrayColores: string[];
    setArrayColores: Dispatch<SetStateAction<string[]>>;
    mensajeG:string;
    setMensajeG: Dispatch<SetStateAction<string>>;
    mobilePc:boolean
    sortear: boolean;
    setSortear: Dispatch<SetStateAction<boolean>>;

}


const defaultValues: SorteoContextType = {
    cantGanadores: 1,
    setCantGanadores: () => {},
    arrayOpciones: [""],
    setArrayOpciones: () => {},
    arrayGanadores: [""],
    setArrayGanadores: () => {},
    arrayColoresGanadores: [""],
    setArrayColoresGanadores: () => {},
    arrayColores: [""],
    setArrayColores: () => {},
    mensajeG: "",
    setMensajeG: () => {},
    mobilePc:true,
    sortear: false,
    setSortear: () => {},

};

const SorteoContext = createContext<SorteoContextType>(defaultValues);

export const SorteoProvider = ({ children }: { children: ReactNode }) => {
    const [cantGanadores, setCantGanadores] = useState<number>(1);
    const [arrayOpciones, setArrayOpciones] = useState<string[]>([]);
    const [arrayGanadores, setArrayGanadores] = useState<string[]>([]);
    const [arrayColoresGanadores, setArrayColoresGanadores] = useState<string[]>([]);
    const [arrayColores, setArrayColores] = useState<string[]>([]);
    const [mensajeG, setMensajeG] = useState<string>("");
    const [sortear, setSortear] = useState<boolean>(false);
    const mobilePc = true;

    return (
        <SorteoContext.Provider value={{ cantGanadores, setCantGanadores, arrayOpciones, setArrayOpciones, arrayGanadores, setArrayGanadores, arrayColores, setArrayColores, mensajeG, setMensajeG, mobilePc, sortear, setSortear, arrayColoresGanadores, setArrayColoresGanadores, }}>
            {children}
        </SorteoContext.Provider>
    );  
};

export default SorteoContext;