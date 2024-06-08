import { useContext, useEffect } from "react";
import SorteoContext from "../context/SorteoContext";
import "./BotonComenzar.css";
// @ts-ignore
import ConfettiGenerator from "confetti-js";
export default function BotonComenzar() {
  const { setMensajeG, arrayOpciones, cantGanadores, setSortear } =
    useContext(SorteoContext);
  useEffect(() => {
    const canvasBoton = document.getElementById("canvas-boton");

    if (canvasBoton) {
      const confettiConfig = {
        target: canvasBoton,
        max: window.innerWidth < 1000 ? 20 : 100,
        size: window.innerWidth < 1000 ? 4 : 10,
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
    if (arrayOpciones.length < 2) {
      setMensajeG("Ingresa al menos 2 opciones.");
      document.getElementById("cartelProblema")?.classList.remove("hidden");
      document.getElementById("cartelProblema")?.classList.add("fadeM");
      return;
    }
    document.getElementById("gestorDatos")?.classList.add("pointer-events-none")
    document.getElementById("genRuletas")?.classList.add("pointer-events-none")
    const canvas = document.getElementById("ruleta0");
    canvas?.classList.add("girar-ruleta");
    canvas?.classList.remove("ruleta");

    if (window.innerWidth < 1000) {
      
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

  return (
    <button
      id="boton"
      className="text-white font-bold  bg-gray-700 hover:bg-[#000000] p-1 group/boton  clip  relative text-xl hover:text-2xl hd:text-2xl hd:hover:text-4xl full-hd:text-3xl full-hd:hover:text-5xl mb-10  w-[95%] h-48 "
      onClick={handleClick}
    >
      <div className="w-full h-full grid place-content-center clip bg-[#0b0b0b] group/boton group-hover/boton:bg-[#000000]">
        <canvas
          id="canvas-boton"
          height={100}
          width={100}
          className="absolute  w-full h-full top-0"
        ></canvas>
        <p className="">Girar!</p>
      </div>
    </button>
  );
}
