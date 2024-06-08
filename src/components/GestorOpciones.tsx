import { hsvToRgb, hexToRgb, colorDistance, rgbToHex } from "../utils/color";
import ElementoOpcion from "../components/ElementoOpcion";
import CartelProblema from "../components/CartelProblema";
import { useContext, useRef, useState, type ChangeEvent } from "react";
import SorteoContext from "../context/SorteoContext";
export default function GestorOpciones() {
  const {
    arrayOpciones,
    setArrayOpciones,
    arrayColores,
    setArrayColores,
    setMensajeG,
  } = useContext(SorteoContext);

  const [texto, setTexto] = useState("");

  const colores = useRef<string[]>([]);

  const inputOpcionRef = useRef<HTMLInputElement>(null);

  function getRandomColor() {
    const threshold = 10;
    const numAzarHue = Math.random();
    const numAzarSat = Math.random() * 0.3 + 0.4;
    const numAzarVal = Math.random() * 0.1 + 0.9;
    const colorRgb = hsvToRgb(numAzarHue, numAzarSat, numAzarVal);
    const colorHex = rgbToHex(colorRgb);

    for (let col of colores.current) {
      const existingColorRgb = hexToRgb(col);
      if (colorDistance(colorRgb, existingColorRgb) < threshold) {
        return getRandomColor();
      }
    }

    colores.current.push(colorHex);
    return colorHex;
  }

  const eliminarOpcion = (index: number) => {
    const nuevasOpciones = arrayOpciones.filter((_, i) => i !== index);
    const nuevosColores = arrayColores.filter((_, i) => i !== index);
    setArrayOpciones(nuevasOpciones);
    setArrayColores(nuevosColores);
    colores.current = colores.current.filter((_, i) => i !== index);
  };

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setTexto(e.currentTarget.value.toUpperCase());
  };

  const handleSubmitInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClickInput();
    }
  };

  const handleClickInput = () => {
    const color = getRandomColor();

    const arrayColoresMediador = [...arrayColores];
    const arrayOpcionesMediador = [...arrayOpciones];

    if (arrayOpciones.includes(texto) || texto === "" || texto === " ") {
      if (texto === "" || texto === " ") setMensajeG("Ingresa un valor!");
      if (arrayOpciones.includes(texto))
        setMensajeG("El valor ingresado ya existe!");
      document.getElementById("cartelProblema")?.classList.remove("hidden");
      document.getElementById("cartelProblema")?.classList.add("fade");

      return;
    }

    arrayOpcionesMediador.push(texto);
    setArrayOpciones(arrayOpcionesMediador);

    arrayColoresMediador.push(color);
    setArrayColores(arrayColoresMediador);

    if (inputOpcionRef.current) {
      inputOpcionRef.current.value = "";
      setTexto("");
      inputOpcionRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col  items-center  overflow-hidden  gap-3  h-full   w-full  p-3  ">
      <h2 className="font-bold text-lg tablet:text-3xl hd:text-xl full-hd:text-3xl 2k:text-4xl text-left self-start text-balance  ">
        <b>INGRESA LAS OPCIONES A SORTEAR:</b>
      </h2>

      <div className="flex flex-col items-center gap-3 max-h-full  w-full flex-1 overflow-hidden">
        <div className="flex flex-row w-full  ">
          <input
            ref={inputOpcionRef}
            onChange={handleText}
            onKeyDown={handleSubmitInput}
            placeholder="Escribe algo!"
            className="text-black  font-bold hd:text-sm full-hd:text-2xl 2k:text-3xl appearance-none p-3 w-[92%] "
          ></input>
          <button
            onClick={handleClickInput}
            className=" w-[15%] full-hd:w-[10%] 2k:w-[8%] aspect-square flex justify-center items-center   bg-blue-600 border font-bold text-xl hover:bg-blue-700 border-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-plus self-center"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="#635994"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
          </button>
        </div>

        <div className="w-full  h-full relative  overflow-x-hidden overflow-y-scroll barra-scroll  ">
          <ul className="w-full   flex flex-col   gap-5 pr-5    ">
            {arrayOpciones.map((opcion, index) => (
              <ElementoOpcion
                key={index}
                texto={opcion}
                color={arrayColores[index]}
                eliminarOpcion={eliminarOpcion}
                index={index}
              ></ElementoOpcion>
            ))}
            <CartelProblema></CartelProblema>
          </ul>
        </div>
      </div>
    </div>
  );
}
