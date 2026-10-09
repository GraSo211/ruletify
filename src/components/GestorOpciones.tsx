import { hsvToRgb, hexToRgb, colorDistance, rgbToHex } from "../utils/color";
import ElementoOpcion from "../components/ElementoOpcion";
import CartelProblema from "../components/CartelProblema";
import { useContext, useRef, useState, type ChangeEvent } from "react";
import SorteoContext from "../context/SorteoContext";

export default function GestorOpciones() {
    const { opciones, cantGanadores, setCantGanadores, setOpciones, setMensajeG } = useContext(SorteoContext);

    const [texto, setTexto] = useState("");

    const colores = useRef<string[]>([]);

    const inputOpcionRef = useRef<HTMLInputElement>(null);

    function getRandomColor() {
        const threshold = 10;
        const numAzarHue = Math.random();
        const numAzarSat = Math.random() * 0.3 + 0.65;
        const numAzarVal = Math.random() * 0.2 + 0.75;
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
        const nuevasOpciones = opciones.filter((_, i) => i !== index);
        setOpciones(nuevasOpciones);
        if (nuevasOpciones.length > 2 && nuevasOpciones.length <= cantGanadores + 1) {
            const select = document.getElementById("selectGanadores") as HTMLSelectElement | null;

            if (select) select.value = (nuevasOpciones.length - 1).toString();
            setCantGanadores(nuevasOpciones.length - 1);
        }
        if (nuevasOpciones.length <= 2) {
            const select = document.getElementById("selectGanadores") as HTMLSelectElement | null;
            if (select) select.value = "1";
            setCantGanadores(1);
        }
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
        const opcionesAct = [...opciones];

        if (texto === undefined || texto === null || texto.trim() === "") {
            setMensajeG("Ingresa un valor.");
            return;
        }

        for (let i = 0; i < opciones.length; i++) {
            if (opciones[i].opcion === texto) {
                setMensajeG("El valor ingresado ya existe.");
                return;
            }
        }

        opcionesAct.push({ opcion: texto, color: color });
        setOpciones(opcionesAct);

        if (inputOpcionRef.current) {
            inputOpcionRef.current.value = "";
            setTexto("");
            inputOpcionRef.current.focus();
        }
    };

    return (
        <div className="flex flex-col overflow-hidden gap-4 h-full w-full p-1">
            <h2 className="font-display text-2xl md:text-3xl text-white tracking-wide">
                Opciones del sorteo
            </h2>

            <div className="flex flex-col items-center gap-3 max-h-full w-full flex-1 overflow-hidden">
                <div className="flex flex-row w-full gap-2">
                    <input
                        ref={inputOpcionRef}
                        onChange={handleText}
                        onKeyDown={handleSubmitInput}
                        placeholder="Escribe una opción..."
                        className="flex-1 rounded-xl bg-night-700 border border-white/10 text-white placeholder:text-muted font-medium appearance-none p-3 2xl:text-xl focus:border-accent-pink focus:ring-1 focus:ring-accent-pink outline-none transition"
                    />
                    <button
                        onClick={handleClickInput}
                        className="aspect-square flex justify-center items-center rounded-xl bg-gradient-to-br from-accent-violet to-accent-cyan text-white font-bold text-2xl hover:brightness-110 active:scale-95 transition shadow-glow-violet"
                        aria-label="Agregar opción"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-plus self-center"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
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

                <div className="w-full h-full relative overflow-x-hidden overflow-y-scroll barra-scroll pr-2">
                    <ul className="w-full flex flex-col gap-3 pb-2">
                        {opciones.map((opcion, index) => (
                            <ElementoOpcion key={index} texto={opcion.opcion} color={opcion.color} eliminarOpcion={eliminarOpcion} index={index}></ElementoOpcion>
                        ))}
                    </ul>
                    <CartelProblema></CartelProblema>
                </div>
            </div>
        </div>
    );
}
