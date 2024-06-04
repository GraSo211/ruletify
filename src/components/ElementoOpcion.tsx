import { useEffect } from "react";

interface ElementoOpcion{
    texto:string;
    color:string;
    eliminarOpcion : (index:number)=>void ;
    index:number;
}

export default function ElementoOpcion({texto, color,index , eliminarOpcion}:ElementoOpcion) {

    const handleEliminar = ()=>{
        eliminarOpcion(index)
    }
    
    
  return (
    <li className="flex w-full  h-full">
      <p className={`text-white rounded-sm font-bold hd:text-sm full-hd:text-2xl 2k:text-3xl  p-3 w-[92%]`} style={{backgroundColor: color}} >{texto}</p>
      <button onClick={handleEliminar} className=" w-[15%] full-hd:w-[10%] 2k:w-[8%] aspect-square  rounded-sm  bg-red-700 border border-red-800 font-bold text-xl hover:bg-red-900 ">❌</button>
    </li>
  );
}
