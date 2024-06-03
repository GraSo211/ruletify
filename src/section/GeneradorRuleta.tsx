import { useEffect, useState } from "react";
import Ruleta from "../components/Ruleta";

interface GeneradorRuletaProps {
    cantGanadores: number;
    arrayOpciones: string[];
    arrayColores: string[];
}
interface RuletaObject {
    arrayOpciones: string[];
    arrayColores: string[];
    nroGanador: number;
    nombreGanador: string;
}

export default function GeneradorRuleta({ cantGanadores, arrayOpciones, arrayColores }: GeneradorRuletaProps) {
    const [tamañoRuleta, setTamañoRuleta] = useState<number>(0);
    const [ruletas, setRuletas] = useState<RuletaObject[]>([]);

    useEffect(() => {
        const nuevasRuletas: RuletaObject[] = [];
        let nuevoTamañoRuleta: number;
        let opcionesRestantes = [...arrayOpciones];
        let coloresRestantes = [...arrayColores];
        let cantidadTamaño = 1;

        for (let i = 0; i < cantGanadores; i++) {
            const nroGanador: number = Math.floor(Math.random() * opcionesRestantes.length);
            const colorDelGanador: string = coloresRestantes[nroGanador];
            const nombreGanador: string = opcionesRestantes[nroGanador];
            nuevasRuletas.push({ arrayOpciones: opcionesRestantes, arrayColores: coloresRestantes, nroGanador: nroGanador, nombreGanador: nombreGanador });
            opcionesRestantes = opcionesRestantes.filter((elem) => elem !== nombreGanador);
            coloresRestantes = coloresRestantes.filter((elem) => elem !== colorDelGanador);

        }

        switch (cantGanadores) {
            case 1:
                cantidadTamaño = 3;
                break;
            case 2:
                cantidadTamaño = 4;
                break;
            default:
                cantidadTamaño = 5;
        }
        if(window.innerWidth <= 500){
            nuevoTamañoRuleta = Math.abs(window.innerWidth / 1.1)
        }else if(window.innerWidth <= 1500){
            nuevoTamañoRuleta = Math.abs(window.innerWidth  /cantidadTamaño*0.9)
        }else if(window.innerWidth <= 3000){
            nuevoTamañoRuleta = window.innerWidth / cantidadTamaño
        }else{
            nuevoTamañoRuleta = window.innerWidth *5
        }
        






        setTamañoRuleta(nuevoTamañoRuleta);
        setRuletas(nuevasRuletas);
    }, [cantGanadores, arrayOpciones, arrayColores]);

    const animacionEnd = () => {
        const mensaje = document.getElementById("mensaje");
        if (mensaje) {
            mensaje.classList.remove("fade");
            
            mensaje.classList.add("hd:hidden");
        }
    };


    const handleClick = () => {
        const gestorDatos = document.getElementById("gestorDatos");
        gestorDatos?.classList.add("pointer-events-none");
        const canvas = document.getElementById("ruleta0");
        canvas?.classList.add("girar-ruleta");
        canvas?.classList.remove("ruleta");

        
    };

    return (
        <div className="h-full w-full hd:w-[67%] hd:flex flex-col justify-center relative items-center  overflow-hidden gap-5 hidden  " id="genRuletas">
            <div className="h-full  w-full flex justify-center  flex-row hd:flex-wrap hd:justify-center items-center  gap-5 " id="contRuletas">
                {ruletas?.map((ruleta, index) => (
                    <Ruleta
                        key={index}
                        id={index.toString()}
                        arrayOpciones={ruleta.arrayOpciones}
                        arrayColores={ruleta.arrayColores}
                        nroGanador={ruleta.nroGanador}
                        nombreGanador={ruleta.nombreGanador}
                        anchoAlto={tamañoRuleta}
                        cantGanador={cantGanadores}
                    ></Ruleta>
                ))}
            </div>

            <button id="boton" className="text-white font-bold text-2xl mb-10 border border-white w-[95%] h-48 hidden hd:block" onClick={handleClick}>
                Girar!
            </button>
            <span
                id="mensaje"
                onAnimationEnd={animacionEnd}
                className="w-full h-full absolute  hd:hidden place-content-center  bg-black rounded-md font-bold text-7xl  backdrop-blur bg-opacity-50 transition-transform hidden z-50 "
            ></span>
        </div>
    );
}
