import { useContext, useEffect, useRef } from "react";
import SorteoContext from "../context/SorteoContext";

export default function CartelProblema() {
    const spanCartelProblema = useRef<HTMLSpanElement>(null);
    const { mensajeG, setMensajeG } = useContext(SorteoContext);

    const handleAnimacionEnd = () => {
        if (spanCartelProblema.current) {
            spanCartelProblema.current.classList.remove("fadeM");
            spanCartelProblema.current.classList.add("hidden");
            setMensajeG("");
        }
    };

    useEffect(() => {
        if (mensajeG && spanCartelProblema.current) {
            spanCartelProblema.current.classList.add("fadeM");
            spanCartelProblema.current.classList.remove("hidden");
        }
    }, [mensajeG]);

    return (
        <span
            onAnimationEnd={handleAnimacionEnd}
            className="w-full h-full absolute top-0 left-0 hidden bg-night-900/85 backdrop-blur-md font-display text-3xl md:text-5xl text-center text-white z-[1000] p-6"
            ref={spanCartelProblema}
        >
            <p className="text-gradient">{mensajeG}</p>
        </span>
    );
}
