import { useContext, useEffect, useRef } from "react";
import SorteoContext from "../context/SorteoContext";
import "./BotonComenzar.css";
// @ts-ignore
import ConfettiGenerator from "confetti-js";

export default function BotonComenzar() {
    const { setMensajeG, opciones, cantGanadores, setSortear } = useContext(SorteoContext);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const confettiConfig = {
                target: canvasRef.current,
                max: window.innerWidth < 1000 ? 20 : 100,
                size: window.innerWidth < 1000 ? 4 : 10,
                animate: true,
                props: ["square", "triangle", "line"],
                colors: [
                    [255, 46, 125],
                    [139, 92, 246],
                    [34, 211, 238],
                    [245, 158, 11],
                ],
                clock: "50",
                rotate: false,
                width: window.innerWidth * 5,
                height: window.innerWidth < 1000 ? 500 : 1000,
                start_from_edge: false,
                respawn: true,
            };
            var confetti = new ConfettiGenerator(confettiConfig);
            confetti.render();
        }
    }, []);

    const handleClick = () => {
        if (opciones.length < 2) {
            setMensajeG("Ingresa al menos 2 opciones.");
            return;
        }
        document.getElementById("gestorDatos")?.classList.add("pointer-events-none");
        document.getElementById("genRuletas")?.classList.add("pointer-events-none");
        const canvasElements = document.getElementsByClassName("ruleta-0");
        for (let i = 0; i < canvasElements.length; i++) {
            canvasElements[i].classList.add("girar-ruleta");
        }

        setSortear(true)
        if (window.innerWidth < 1000) {
            const ruletas = document.getElementById("genRuletas");
            ruletas?.classList.remove("hidden");
            ruletas?.classList.add("flex");
            document.getElementById("gestorDatos")?.classList.add("hidden");

            for (let i = 1; i < cantGanadores; i++) {
                const constRuleta = document.getElementById("contenedor-ruleta-" + i);
                constRuleta?.classList.add("hidden");
            }
        }
    };

    return (
        <button
            id="boton"
            className="relative z-10 w-[95%] max-w-xl min-h-20 max-h-40 rounded-2xl overflow-hidden bg-linear-to-r from-accent-pink via-accent-violet to-accent-cyan p-[2px] shadow-glow-pink transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group/boton"
            onClick={handleClick}
        >
            <div className="w-full h-full grid place-content-center rounded-2xl bg-night-900/90 relative overflow-hidden">
                <canvas id="canvas-boton" height={100} width={100} ref={canvasRef} className="absolute w-full h-full top-0 opacity-60"></canvas>
                <span className="relative z-10 flex items-center gap-3 font-display text-3xl tracking-[0.15em] text-white uppercase">
                    ¡Girar!
                </span>
            </div>
        </button>
    );
}
