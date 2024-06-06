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
      <button onClick={handleEliminar} className=" w-[15%] full-hd:w-[10%] 2k:w-[8%] aspect-square flex justify-center items-center  rounded-sm  bg-red-700 border border-red-800 font-bold text-xl hover:bg-red-900 "><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="48" height="48" viewBox="0 0 24 24" stroke-width="3" stroke="#f92f60" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M18 6l-12 12" />
  <path d="M6 6l12 12" />
</svg></button>
    </li>
  );
}
