import { useContext } from "react";
import SorteoContext from "../context/SorteoContext";

export default function CartelProblema() {
    const { mensajeG } = useContext(SorteoContext)
    const handleAnimacionEnd = () => {
    const mensaje = document.getElementById("cartelProblema");
    if (mensaje) {
      mensaje.classList.remove("fadeM");
      mensaje.classList.add("hidden");
    }
  };

  return (
    <span
      onAnimationEnd={handleAnimacionEnd}
      className="w-full h-full absolute  place-content-center hidden  bg-black  font-bold text-3xl text-center  backdrop-blur bg-opacity-50 transition-transform  z-50"
      id="cartelProblema"
    >
      {mensajeG}
    </span>
  );
}
