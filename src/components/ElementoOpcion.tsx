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
    <li className="flex w-full h-auto group/item">
      <p
        className="text-white rounded-l-xl font-bold p-3 w-full shadow-inner-glow text-sm md:text-base truncate"
        style={{ backgroundColor: color, textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
      >
        {texto}
      </p>
      <button
        onClick={handleEliminar}
        className="aspect-square flex justify-center items-center rounded-r-xl bg-night-600 border-y border-r border-white/10 text-rose-400 hover:bg-rose-500 hover:text-white transition active:scale-95"
        aria-label="Eliminar opción"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-x"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
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
