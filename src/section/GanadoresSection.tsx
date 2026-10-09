import React, { useContext, useEffect, forwardRef, useRef } from "react";
import SorteoContext from "../context/SorteoContext";
import FilaGanador from "../components/FilaGanador";
// @ts-ignore
import ConfettiGenerator from "confetti-js";

const GanadoresSection = forwardRef<HTMLDivElement>((props, ref) => {
    const { ganadores, setGanadores, setCantGanadores, setOpciones, setSortear, setMensajeG, setCantRuletasFinalizadas, setFinRuleta, setReset } = useContext(SorteoContext);
    const canvasGanador = useRef(null);

    useEffect(() => {
        if (canvasGanador.current) {
            const confettiConfig = {
                target: canvasGanador.current,
                max: window.innerWidth < 1000 ? 20 : 50,
                size: window.innerWidth < 1000 ? 3 : 7,
                animate: true,
                props: ["square", "triangle", "line"],
                colors: [
                    [255, 46, 125],
                    [139, 92, 246],
                    [34, 211, 238],
                    [253, 214, 126],
                ],
                clock: "50",
                rotate: false,
                width: window.innerWidth < 1000 ? window.innerWidth * 1.5 : window.innerWidth * 0.9,
                height: window.innerWidth < 1000 ? 1500 : 2000,
                start_from_edge: false,
                respawn: true,
            };
            const confetti = new ConfettiGenerator(confettiConfig);
            confetti.render();
        }
    }, []);

    const handleReset = () => {
        setReset(true);
        document.getElementById("genRuletas")?.classList.remove("pointer-events-none");
        const div1 = document.getElementById("preloader-1");
        const div2 = document.getElementById("preloader-2");
        div1?.classList.remove("animateUp");
        div2?.classList.remove("animateDown");
        void div1?.offsetWidth;
        void div2?.offsetWidth;
        div1?.classList.add("animateUpReversa");
        div2?.classList.add("animateDownReversa");

        setTimeout(() => {
            void div1?.offsetWidth;
            void div2?.offsetWidth;
            div1?.classList.remove("animateUpReversa");
            div2?.classList.remove("animateDownReversa");
            void div1?.offsetWidth;
            void div2?.offsetWidth;
            div1?.classList.add("animateUp");
            div2?.classList.add("animateDown");
        }, 600);
        setSortear(false);
        setFinRuleta(false);
        setTimeout(() => {
            setCantGanadores(1);
            setGanadores([]);
            setOpciones([]);
            setMensajeG("");
            setCantRuletasFinalizadas(1);
        }, 300);
    };

    return (
        <div ref={ref} className="relative z-10 w-full lg:w-[33%] min-h-screen lg:min-h-0 p-5 lg:p-6 flex flex-col justify-between items-center gap-5 glass-panel border-r border-white/5">
            <canvas ref={canvasGanador} className="absolute inset-0 w-full h-full pointer-events-none" height={100} width={100}></canvas>

            <header className="w-full">
                <div className="divRainbow rounded-xl p-[2px] shadow-glow-pink">
                    <span className="w-full flex justify-center items-center p-4 bg-night-800 rounded-[10px]">
                        <h1 className="h1 font-display tracking-wider text-5xl sm:text-6xl 2xl:text-7xl">RULETIFY</h1>
                    </span>
                </div>
            </header>

            <div className="rounded-2xl w-full border border-white/10 bg-night-800/60 h-auto p-4 flex flex-col gap-4 justify-center shadow-inner-glow">
                <h2 className="font-display text-center text-3xl sm:text-4xl text-white tracking-wide">
                    GANADORES
                </h2>
                <table className="w-full rounded-xl text-center overflow-hidden border-4 border-night-700">
                    <thead className="font-bold text-lg sm:text-xl">
                        <tr className="bg-night-700/80 h-10 2xl:h-14 text-muted">
                            <th className="px-2 py-2">N°</th>
                            <th className="px-2 py-2 text-left">OPCIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ganadores.map((opcion, index) => (
                            <FilaGanador key={index} nombre={opcion.opcion} color={opcion.color} numero={index + 1}></FilaGanador>
                        ))}
                    </tbody>
                </table>
            </div>

            <button
                onClick={handleReset}
                className="relative z-40 w-[95%] min-h-16 rounded-2xl bg-linear-to-r from-accent-pink to-accent-violet font-display text-2xl tracking-[0.12em] text-white shadow-glow-pink hover:brightness-110 active:scale-95 transition p-[2px]"
            >
                <span className="flex h-full w-full items-center justify-center rounded-2xl bg-night-900/30 px-4 animate-pulse">
                    SORTEAR DE NUEVO
                </span>
            </button>
        </div>
    );
});

export default GanadoresSection;
