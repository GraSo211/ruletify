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
                    [165, 104, 246],
                    [230, 61, 135],
                    [0, 199, 228],
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
        setReset(true)
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
        setTimeout(()=>{
            
        
            setCantGanadores(1);
            setGanadores([]);
            setOpciones([]);
            
            setMensajeG("");
            
            setCantRuletasFinalizadas(1)
            
        },300)

        
    };

    return (
        <div ref={ref} className="bg-[#0f1012]  w-full lg:w-[33%] h-full p-5 flex relative flex-col justify-between items-center gap-3">
            <canvas ref={canvasGanador} className="w-full h-full top-0 absolute" height={100} width={100}></canvas>
            <div className="divRainbow w-full p-1 flex">
                <span className="w-full flex justify-center items-center p-3 bg-[#121317]">
                    <h1 className="h1 font-bold text-4xl sm:text-5xl 2xl:text-6xl">RULETIFY</h1>
                </span>
            </div>
            <div className="rounded-lg w-full border border-white h-auto p-3 flex flex-col gap-3 justify-center">
                <h2 className="font-bold text-center text-xl sm:text-2xl text-pretty">
                    <b>GANADORES</b>
                </h2>
                <table className="bg-[#191919] p-5 rounded-xl text-center overflow-hidden border-4">
                    <thead className="font-bold text-xl sm:text-2xl">
                        <tr className="bg-[#0000000a] h-10 2xl:h-16">
                            <th>N°</th>
                            <th>OPCIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ganadores.map((opcion, index) => (
                            <FilaGanador key={index} nombre={opcion.opcion} color={opcion.color} numero={index + 1}></FilaGanador>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={handleReset} className="bg-[#0b0b0b] z-[40] rounded-xl font-bold border border-white hover:bg-[#000000] p-1 hover:text-2xl mb-10 w-[95%] h-[15%]">
                <b className="animate-pulse">SORTEAR DE NUEVO</b>
            </button>
        </div>
    );
});

export default GanadoresSection;

