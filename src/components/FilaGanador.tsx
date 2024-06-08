interface FilaGanadorProps{
    numero:number;
    nombre:string;
    color:string;
}
export default function FilaGanador({numero, nombre, color}:FilaGanadorProps){
    return(
        <tr className="h-14 hd:h-20 full-hd:h-24 border-4 border-[#191919] font-bold text-2xl hd:text-xl full-hd:text-3xl  " style={{background:color}}>
                        <td>{numero}</td>
                        <td>{nombre}</td>
                    </tr>
    )
}