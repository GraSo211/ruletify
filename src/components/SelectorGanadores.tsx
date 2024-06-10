import { useContext, type ChangeEvent } from "react";
import SorteoContext from "../context/SorteoContext";
export default function SelectorGanadores() {
  const { setCantGanadores, arrayOpciones, setMensajeG } =
    useContext(SorteoContext);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const valorSelect = parseInt(e.currentTarget.value);
    if (valorSelect < arrayOpciones.length) {
      setCantGanadores(valorSelect);
      return;
    }
    setMensajeG("Ingresa más opciones.");
    document.getElementById("cartelProblema")?.classList.remove("hidden");
    document.getElementById("cartelProblema")?.classList.add("fadeM");
    const select = document.getElementById(
      "selectGanadores"
    ) as HTMLSelectElement | null;
    if (select) select.value = "1";
    setCantGanadores(1);
  };

  return (
    <>
      <div className=" w-full   p-3 flex flex-col gap-3 justify-center   ">
        <h2 className="font-bold text-left text-sm md:text-base 2xl:text-3xl  text-pretty">
          <b>SELECCIONA LA CANTIDAD DE GANADORES:</b>
        </h2>
        <select
          id="selectGanadores"
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
