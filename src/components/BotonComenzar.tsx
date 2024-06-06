import { useContext } from "react";
import SorteoContext from "../context/SorteoContext";


export default function BotonComenzar(){
    const {setMensajeG, arrayOpciones, cantGanadores} = useContext(SorteoContext)
    const handleClick = () => {
        if(arrayOpciones.length < 2){
            setMensajeG("Ingresa al menos 2 opciones.");
            document.getElementById("cartelProblema")?.classList.remove("hidden");
            document.getElementById("cartelProblema")?.classList.add("fade");
            return
        }
        
        const gestorDatos = document.getElementById("gestorDatos");
        gestorDatos?.classList.add("pointer-events-none");
        const canvas = document.getElementById("ruleta0");
        canvas?.classList.add("girar-ruleta");
        canvas?.classList.remove("ruleta");

        if(window.innerWidth < 1000){
            const ruletas = document.getElementById("genRuletas");
            ruletas?.classList.remove("hidden");
            ruletas?.classList.add("grid");
            document.getElementById("gestorDatos")?.classList.add("hidden");
            
    
            for (let i = 1; i < cantGanadores; i++) {
              const constRuleta = document.getElementById("contenedor-ruleta-" + i);
              constRuleta?.classList.add("hidden");
            }
        }
        
    };

    return(
        (<button id="boton" className="text-white font-bold text-2xl mb-10 border border-white w-[95%] h-48 " onClick={handleClick}>
                Girar!
        </button>)
    )
}