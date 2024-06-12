import React, { useContext, useEffect, useRef } from "react";
import "../styles/sorteo.css";
import SorteoContext from "../context/SorteoContext";

type Opciones = {
  opcion: string;
  color: string;
};
interface RuletaProps {
  id: string;
  opcionesP: Opciones[];
  nroGanador: number;
  nombreGanador: string;
  anchoAlto: number;
  cantGanador: number;
}

export default function Ruleta({
  id,
  opcionesP,
  nroGanador,
  nombreGanador,
  anchoAlto,
  cantGanador,
}: RuletaProps) {
  const ruletaRef = useRef<HTMLCanvasElement>(null);
  const { setSortear } = useContext(SorteoContext);
  
  const anguloInicialGanador = (360 / opcionesP.length) * nroGanador;
  const anguloFinalGanador = anguloInicialGanador + 360 / opcionesP.length;
  const anguloGanador = nroGanador * (360 / opcionesP.length);
  const diferencia = anguloFinalGanador - anguloInicialGanador;
  const centrador = diferencia / 2 - 30;

  let nroAleatorizarVuelta = Math.floor(Math.random() * (diferencia / 2 - 1));
  const nroAleatorizarSigno = Math.floor(Math.random() * 2);
  if (nroAleatorizarSigno === 0) {
    nroAleatorizarVuelta = -nroAleatorizarVuelta;
  }
  useEffect(() => {
    const vueltaTiempo = window.innerWidth >= 1000 ? 20 : 10;
    const vueltas =
      360 * vueltaTiempo -
      120 -
      anguloGanador -
      centrador +
      nroAleatorizarVuelta;

    const vueltasProperty: string = vueltas + "deg";
    if (ruletaRef.current) {
      ruletaRef.current.style.setProperty("--giro", vueltasProperty);
    }
  }, [opcionesP]);

  function creadorSorteo(
    id: string,
    posicionX: number,
    posicionY: number,
    radio: number,
    opciones: Opciones[]
  ) {
    const canvas = document.getElementById("ruleta" + id) as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");
    if (id !== "0") {
      const canvas = document.getElementById("ruleta" + id);
      canvas?.classList.add("ruleta");
    }

    if (ctx) {
      let anguloFinalInicial = 0;
      for (let i = 0; i < opciones.length; i++) {
        const anguloInicio = anguloFinalInicial;
        const anguloFinal = ((360 / opciones.length) * (i + 1) * Math.PI) / 180;
        anguloFinalInicial = anguloFinal;

        ctx.beginPath();
        const color: string = opciones[i].color;

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
      opcionesP
    );
  }, [opcionesP]);

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
      }, 500);
    }
    if (cantGanador === idNumber + 1) {
      setTimeout(() => {
        document.getElementById("genRuletas")?.classList.add("hidden");
        setSortear(true);
      }, 500);
    }
  }

  return (
    <div
      className="flex flex-col p-1 relative justify-center items-center"
      id={"contenedor-ruleta-" + id}
    >
      <canvas
        width={anchoAlto}
        height={anchoAlto}
        id={"ruleta" + id}
        ref={ruletaRef}
        className="rounded-full relative bg-gray-300 "
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
