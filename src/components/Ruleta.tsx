import React, { useContext, useEffect, useRef } from "react";
import "../styles/sorteo.css";
import SorteoContext from "../context/SorteoContext";

interface RuletaProps {
  id: string;
  arrayOpciones: string[];
  arrayColores: string[];
  nroGanador: number;
  nombreGanador: string;
  anchoAlto: number;
  cantGanador: number;
}

export default function Ruleta({
  id,
  arrayOpciones,
  arrayColores,
  nroGanador,
  nombreGanador,
  anchoAlto,
  cantGanador,
}: RuletaProps) {
  const ruletaRef = useRef<HTMLCanvasElement>(null);
  const { setSortear } = useContext(SorteoContext);

  const anguloInicialGanador = (360 / arrayOpciones.length) * nroGanador;
  const anguloFinalGanador = anguloInicialGanador + 360 / arrayOpciones.length;
  const anguloGanador = nroGanador * (360 / arrayOpciones.length);
  const diferencia = anguloFinalGanador - anguloInicialGanador;
  const centrador = diferencia / 2 - 30;

  let nroAleatorizarVuelta = Math.floor(Math.random() * (diferencia / 2 - 1));
  const nroAleatorizarSigno = Math.floor(Math.random() * 2);
  if (nroAleatorizarSigno === 0) {
    nroAleatorizarVuelta = -nroAleatorizarVuelta;
  }
  const vueltas =
    360 * 20 - 120 - anguloGanador - centrador + nroAleatorizarVuelta;

  const vueltasProperty: string = vueltas + "deg";
  useEffect(() => {
    if (ruletaRef.current) {
      ruletaRef.current.style.setProperty("--giro", vueltasProperty);
    }
  }, [vueltasProperty]);

  function creadorSorteo(
    id: string,
    posicionX: number,
    posicionY: number,
    radio: number,
    arrayOpciones: string[],
    arrayColores: string[]
  ) {
    const canvas = document.getElementById("ruleta" + id) as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");
    if (id !== "0") {
      const canvas = document.getElementById("ruleta" + id);
      canvas?.classList.add("ruleta");
    }

    if (ctx) {
      let anguloFinalInicial = 0;
      for (let i = 0; i < arrayOpciones.length; i++) {
        const anguloInicio = anguloFinalInicial;
        const anguloFinal =
          ((360 / arrayOpciones.length) * (i + 1) * Math.PI) / 180;
        anguloFinalInicial = anguloFinal;

        ctx.beginPath();
        const color: string = arrayColores[i];

        ctx.fillStyle = color;

        ctx.arc(posicionX, posicionY, radio, anguloInicio, anguloFinal);

        ctx.lineTo(posicionX, posicionY);

        ctx.fill();
      }
    }
  }

  useEffect(() => {
    creadorSorteo(
      id,
      anchoAlto / 2,
      anchoAlto / 2,
      anchoAlto * 0.48,
      arrayOpciones,
      arrayColores
    );
  }, [arrayOpciones]);

  function handleAnimationEnd(id: string) {
    const idNumber = parseInt(id);
    const canvasSiguiente = document.getElementById("ruleta" + (idNumber + 1));

    const contRuleta = document.getElementById("contenedor-ruleta-" + idNumber);

    const contRuletaSiguiente = document.getElementById(
      "contenedor-ruleta-" + (idNumber + 1)
    );

    const spanGanador = document.getElementById("ganador" + id);

    spanGanador?.classList.remove("hidden");

    canvasSiguiente?.classList.add("girar-ruleta");

    canvasSiguiente?.classList.remove("ruleta");
    //mobile
    if (window.innerWidth < 1000) {
      setTimeout(() => {
        contRuleta?.classList.add("hidden");
        contRuletaSiguiente?.classList.remove("hidden");
      }, 800);
    }
    if (cantGanador === idNumber + 1){
      
      setTimeout(()=>{
        document.getElementById("genRuletas")?.classList.add("hidden")
        setSortear(true);
        
      },800
      )
      
    } 
  }

  return (
    <div
      className="flex flex-col p-3 relative justify-center items-center  after:absolute after:top-[7px] after:z-10 after:left-[calc(50%-32px)] after:border-t-white after:border-l-transparent after:border-r-transparent after:border-l-[32px] after:border-r-[32px] after:border-t-[46px] after:content-[''] before:absolute before:top-[6px] before:z-10 before:left-[calc(50%-35px)] before:border-t-gray-500 before:border-l-transparent before:border-r-transparent before:border-l-[35px] before:border-r-[35px] before:border-t-[50px] before:content-['']"
      id={"contenedor-ruleta-" + id}
    >
      <canvas
        width={anchoAlto}
        height={anchoAlto}
        id={"ruleta" + id}
        ref={ruletaRef}
        className="rounded-full  bg-gray-300 "
        onAnimationEnd={() => {
          handleAnimationEnd(id);
        }}
      ></canvas>
      <span
        id={"ganador" + id}
        className="text-center text-white text-5xl font-bold absolute hidden"
      >
        {nombreGanador}
      </span>
    </div>
  );
}
