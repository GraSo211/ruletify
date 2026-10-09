interface FilaGanadorProps {
    numero: number;
    nombre: string;
    color: string;
}

export default function FilaGanador({ numero, nombre, color }: FilaGanadorProps) {
    return (
        <tr
            className="border-4 h-12 2xl:h-16 border-night-700 font-bold text-lg sm:text-xl"
            style={{ backgroundColor: color, textShadow: "0 1px 2px rgba(255,255,255,0.45)" }}
        >
            <td className="px-3 py-2 text-night-900">{numero}</td>
            <td className="px-3 py-2 text-night-900 text-left">{nombre}</td>
        </tr>
    );
}
