import { useContext, useRef, type ChangeEvent } from "react";
import SorteoContext from "../context/SorteoContext";

export default function SelectorGanadores() {
  const { setCantGanadores, opciones, cantGanadores, setMensajeG } = useContext(SorteoContext);
  const selectCantGanadoresRef = useRef<HTMLSelectElement>(null);

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
      <div className="w-full p-1 flex flex-col gap-3">
        <h2 className="font-display text-2xl md:text-3xl text-white tracking-wide">
          Ganadores
        </h2>
        <div className="relative">
          <select
            ref={selectCantGanadoresRef}
            onChange={handleChange}
            id="selectGanadores"
            className="w-full appearance-none rounded-xl bg-night-700 border border-white/10 text-white font-bold p-3 pr-10 2xl:text-xl focus:border-accent-pink focus:ring-1 focus:ring-accent-pink outline-none transition cursor-pointer hover:bg-night-600"
          >
            <option value={1}>1 ganador</option>
            <option value={2}>2 ganadores</option>
            <option value={3}>3 ganadores</option>
            <option value={4}>4 ganadores</option>
            <option value={5}>5 ganadores</option>
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </>
  );
}
