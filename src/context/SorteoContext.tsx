
import React, { createContext, useState, } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';


type Opciones = {
    opcion: string;
    color:string;
}
interface SorteoContextType {
    cantGanadores: number;
    setCantGanadores: Dispatch<SetStateAction<number>>;
    opciones: Opciones[];
    setOpciones: Dispatch<SetStateAction<Opciones[]>>;
    ganadores: Opciones[];
    setGanadores: Dispatch<SetStateAction<Opciones[]>>;
    mensajeG:string;
    setMensajeG: Dispatch<SetStateAction<string>>;
    sortear: boolean;
    setSortear: Dispatch<SetStateAction<boolean>>;
}


const defaultValues: SorteoContextType = {
    cantGanadores: 1,
    setCantGanadores: () => {},
    opciones: [{opcion:"",color:""}],
    setOpciones: () => {},
    ganadores: [{opcion:"",color:""}],
    setGanadores: () => {},
    mensajeG: "",
    setMensajeG: () => {},
    sortear: false,
    setSortear: () => {},

};

const SorteoContext = createContext<SorteoContextType>(defaultValues);

export const SorteoProvider = ({ children }: { children: ReactNode }) => {
    const [cantGanadores, setCantGanadores] = useState<number>(1);
    const [opciones, setOpciones] = useState<Opciones[]>([]);
    const [ganadores, setGanadores] = useState<Opciones[]>([]);
    const [mensajeG, setMensajeG] = useState<string>("");
    const [sortear, setSortear] = useState<boolean>(false);
    

    return (
        <SorteoContext.Provider value={{ cantGanadores, setCantGanadores, opciones, setOpciones, ganadores, setGanadores, mensajeG, setMensajeG, sortear, setSortear, }}>
            {children}
        </SorteoContext.Provider>
    );  
};

export default SorteoContext;