interface FilaGanadorProps{
    numero:number;
    nombre:string;
    color:string;
}
export default function FilaGanador({numero, nombre, color}:FilaGanadorProps){
    return(
        <tr className="  border-4 h-10 2xl:h-16 border-[#191919] font-bold text-xl sm:text-2xl  " style={{background:color}}>
                        <td>{numero}</td>
                        <td>{nombre}</td>
                    </tr>
    )
}