import { useContext, useEffect, useRef } from "react";
import SorteoContext from "../context/SorteoContext";
import FilaGanador from "../components/FilaGanador";
//@ts-ignore
import ConfettiGenerator from "confetti-js";

export default function GanadoresSection() {
  const {
    arrayColoresGanadores,
    arrayGanadores,
    cantGanadores,
    setArrayColores,
    setArrayColoresGanadores,
    setArrayGanadores,
    setCantGanadores,
    setArrayOpciones,
    setSortear,
    setMensajeG,
  } = useContext(SorteoContext);

  useEffect(() => {
    const canvasGanador = document.getElementById("canvas-ganador");

    if (canvasGanador) {
      const confettiConfig = {
        target: canvasGanador,
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
        width:
          window.innerWidth < 1000
            ? window.innerWidth * 1.5
            : window.innerWidth * 0.9,
        height: window.innerWidth < 1000 ? 1500 : 2000,
        start_from_edge: false,
        respawn: true,
      };
      var confetti = new ConfettiGenerator(confettiConfig);
      confetti.render();
    }
  }, []);

  const handleReset = () => {
    document.getElementById("genRuletas")?.classList.remove("pointer-events-none");
    document.getElementById("contenedor-ruleta-0")?.classList.remove("hidden");
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
      setArrayColores([]);
      setArrayOpciones([]);
      setArrayColoresGanadores([]);
      setArrayGanadores([]);
      setCantGanadores(1);
      
      const canvas = document.getElementById("ruleta0") as HTMLCanvasElement;
      const ctx = canvas?.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      setMensajeG("");
      document.getElementById("contenedor-ruleta-0")?.classList.remove("hidden");

      for (let i = 0; i < cantGanadores; i++) {
        const canvas = document.getElementById("ruleta" + i);
        canvas?.classList.remove("girar-ruleta");
        if (i !== 0) canvas?.classList.add("ruleta");
  
        const spanGanador = document.getElementById("ganador" + i);
        spanGanador?.classList.add("hidden");
      }

    }, 600);
    
    
    setSortear(false);
  };

  return (
    <div className="bg-[#121317] w-full hd:w-[33%]  h-full p-5 flex relative   flex-col justify-between items-center gap-3   ">
      <canvas
        id="canvas-ganador"
        className="w-full h-full top-0 absolute"
        height={100}
        width={100}
      ></canvas>
      <div className="divRainbow w-full h-[10%] p-1 flex ">
        <span className="w-full hd:h-full flex justify-center items-center p-3 bg-[#121317]   ">
          <h1 className="h1 font-bold  text-5xl tablet:text-7xl hd:text-5xl full-hd:text-7xl 2k:text-8xl">
            RULETIFY
          </h1>
        </span>
      </div>
      <div className=" rounded-lg w-full border border-white  h-auto p-3 flex flex-col gap-3 justify-center ">
        <h2 className="font-bold text-center  text-lg tablet:text-3xl hd:text-xl full-hd:text-3xl 2k:text-5xl  text-pretty">
          <b>GANADORES</b>
        </h2>
        <table className=" bg-[#191919]  p-5  rounded-xl  text-center overflow-hidden border-4  ">
          <thead className=" font-bold text-2xl hd:text-xl full-hd:text-3xl ">
            <tr className=" h-14 hd:h-20 full-hd:h-24 bg-[#0000000a]">
              <th>N°</th>
              <th>OPCIÓN</th>
            </tr>
          </thead>
          <tbody className="">
            {arrayGanadores.map((opcion, index) => (
              <FilaGanador
                key={index}
                nombre={opcion}
                color={arrayColoresGanadores[index]}
                numero={index + 1}
              ></FilaGanador>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleReset}
        className=" bg-[#0b0b0b] z-[1000] rounded-xl  font-bold  border border-white hover:bg-[#000000] p-1  hover:text-2xl hd:text-2xl hd:hover:text-4xl full-hd:text-3xl full-hd:hover:text-4xl mb-10  w-[95%] h-32 full-hd:h-40  2k:h-48 "
      >
        <b className="animate-pulse">SORTEAR DE NUEVO</b>
      </button>
    </div>
  );
}
