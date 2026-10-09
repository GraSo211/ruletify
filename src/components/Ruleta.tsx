import React, { useContext, useEffect, useRef } from "react";
import "../styles/sorteo.css";
import SorteoContext from "../context/SorteoContext";

type Opciones = {
    opcion: string;
    color: string;
};

interface RuletaProps {
    id?: string;
    opcionesP: Opciones[];
    nombreGanador: string;
    anchoAlto: number;
    cantGanador: number;
    girar: boolean;
    manejarFinDeGiro: () => void;
    vueltas: number;
    tamañoTexto: string;
    filtroGris: string;
    anchoPestillo: number
}

function crearCirculo(ctx: CanvasRenderingContext2D, posicionX: number, posicionY: number, radio: number, opciones: Opciones[], incremento: number) {
    let anguloFinalInicial = 0;

    for (let i = 0; i < opciones.length; i++) {
        const anguloInicio = anguloFinalInicial;
        const anguloFinal = ((360 / opciones.length) * (i + 1) * Math.PI) / 180;
        anguloFinalInicial = anguloFinal;
        rellenarCirculo(ctx, opciones[i].color, posicionX, posicionY, radio, anguloInicio + incremento, anguloFinal + incremento);
    }
}

function rellenarCirculo(ctx: CanvasRenderingContext2D, color: string, posicionX: number, posicionY: number, radio: number, anguloInicio: number, anguloFinal: number) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(posicionX, posicionY, radio, anguloInicio, anguloFinal);
    ctx.lineTo(posicionX, posicionY);
    ctx.fill();
    ctx.closePath();
}

const Ruleta = function Ruleta({ id, opcionesP, nombreGanador, anchoAlto, girar, manejarFinDeGiro, vueltas, tamañoTexto, filtroGris, anchoPestillo }: RuletaProps) {
    const { sortear, finRuleta, cantRuletasFinalizadas, setCantRuletasFinalizadas, cantGanadores, setReset, reset } = useContext(SorteoContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const spanGanadorRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!finRuleta && reset) {
            setTimeout(() => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                ctx.fillStyle = "#080a10";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                canvas.style.transform = `rotate(0deg)`;
                spanGanadorRef.current?.classList.add("hidden");
            }, 500)
            setReset(false)
        }
    }, [reset]);

    function girarRuleta(canvasRef: React.RefObject<HTMLCanvasElement>, spanGanadorRef: React.RefObject<HTMLCanvasElement>, manejarFinDeGiro: () => void, vueltas: number, id: string | undefined) {
        if (!canvasRef.current || !spanGanadorRef.current) return;
        const canvas = canvasRef.current;
        canvas.classList.add("girar-ruleta");
        canvas.style.setProperty("--giro", `${vueltas}deg`);
        canvas.classList.remove("ruleta");
        setTimeout(() => {
            canvas.classList.remove("girar-ruleta");
            canvas.style.transform = `rotate(${vueltas}deg)`;
            canvas.classList.remove("ruleta");
            if (spanGanadorRef.current && id === undefined) {
                spanGanadorRef.current.classList.remove("hidden");
            } else {
                document.getElementById("ruleta-principal")?.classList.remove("hidden");
            }

            setTimeout(() => {
                manejarFinDeGiro();
                if (cantGanadores !== cantRuletasFinalizadas) document.getElementById("ruleta-principal")?.classList.add("hidden");
            }, 1000);

        }, 5000);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        crearCirculo(ctx, anchoAlto / 2, anchoAlto / 2, anchoAlto * 0.48, opcionesP, 0);
    }, [opcionesP]);

    useEffect(() => {
        if (girar) {
            girarRuleta(canvasRef, spanGanadorRef, manejarFinDeGiro, vueltas, id);
        }
    }, [girar]);

    return (
        <div className="flex flex-col p-1 relative justify-center items-center">
            <img
                src="/triangulo.png"
                width={anchoPestillo}
                className="absolute -top-3 left-1/2 -translate-x-1/2 z-[60] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
                alt="pestillo"
            />
            <canvas
                width={anchoAlto}
                height={anchoAlto}
                className={"rounded-full relative bg-night-900 ring-2 ring-white/10 shadow-glow-pink " + filtroGris}
                ref={canvasRef}
            ></canvas>
            <span
                ref={spanGanadorRef}
                id={"ruleta-" + id}
                className={"text-center text-white absolute font-bold px-4 py-2 rounded-full bg-black/40 backdrop-blur hidden " + tamañoTexto}
            >
                {nombreGanador}
            </span>
        </div>
    );
};

export default Ruleta;
