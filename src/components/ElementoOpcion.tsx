import { useEffect } from "react";

interface ElementoOpcion {
  texto: string;
  color: string;
  eliminarOpcion: (index: number) => void;
  index: number;
}

export default function ElementoOpcion({
  texto,
  color,
  index,
  eliminarOpcion,
}: ElementoOpcion) {
  const handleEliminar = () => {
    eliminarOpcion(index);
  };

  return (
    <li className="flex  w-full h-auto">
      <p
        className="text-white rounded-sm font-bold p-3    w-full"
        style={{ backgroundColor: color }}
      >
        {texto}
      </p>
      <button
        onClick={handleEliminar}
        className="aspect-square flex justify-center items-center  rounded-sm  bg-red-700 border border-red-800  hover:bg-red-900 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-x"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="#f92f60"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
    </li>
  );
}
