import { useContext, useRef, type ChangeEvent } from "react";
import SorteoContext from "../context/SorteoContext";
export default function SelectorGanadores() {
  const { setCantGanadores, opciones, cantGanadores,setMensajeG } =useContext(SorteoContext);
  const selectCantGanadoresRef = useRef<HTMLSelectElement>(null) 

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const valorSelect = parseInt(e.currentTarget.value);
    if (valorSelect < opciones.length) {
      setCantGanadores(valorSelect);
      return;
    }
    setMensajeG("Ingresa más opciones.");
    if (selectCantGanadoresRef.current) selectCantGanadoresRef.current.value = "1";
    setCantGanadores(1);
  };

  return (
    <>
      <div className=" w-full   p-3 flex flex-col gap-3 justify-center   ">
        <h2 className="font-bold text-left text-sm md:text-base 2xl:text-3xl  text-pretty">
          <b>SELECCIONA LA CANTIDAD DE GANADORES:</b>
        </h2>
        <select
          ref={selectCantGanadoresRef}
          onChange={handleChange}
          className="text-black font-bold w-full 2xl:text-xl appearance-none p-3 hover:animate-pulse "
        >
          <option value={1}>1 GANADOR</option>
          <option value={2}>2 GANADORES</option>
          <option value={3}>3 GANADORES</option>
          <option value={4}>4 GANADORES</option>
          <option value={5}>5 GANADORES</option>
        </select>
      </div>
    </>
  );
}
