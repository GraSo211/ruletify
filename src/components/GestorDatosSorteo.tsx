import { useEffect, useRef, useState, type ChangeEvent } from "react";
import "../styles/sorteo.css";
import ElementoOpcion from "./ElementoOpcion";
interface GestorDatosSorteoProps {
  obtenerCantGanadores: (cantGanadores: number) => void;
  obtenerArrayOpciones: (arrayOpciones: string[]) => void;
  obtenerArrayColores: (arrayColores: string[]) => void;
}

export default function GestorDatosSorteo({
  obtenerCantGanadores,
  obtenerArrayOpciones,
  obtenerArrayColores,
}: GestorDatosSorteoProps) {
  const [texto, setTexto] = useState("");
  const [ganad, setGanador] = useState(1);
  const [arrayOpciones, setArrayOpciones] = useState<string[]>([]);
  const [arrayColores, setArrayColores] = useState<string[]>([]);
  const inputOpcionRef = useRef<HTMLInputElement>(null);
  const colores = useRef<string[]>([]);

  const eliminarOpcion = (index: number) => {
    const nuevasOpciones = arrayOpciones.filter((_, i) => i !== index);
    const nuevosColores = arrayColores.filter((_, i) => i !== index);
    setArrayOpciones(nuevasOpciones);
    setArrayColores(nuevosColores);
    colores.current = colores.current.filter((_, i) => i !== index);
  };
  
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setTexto(e.currentTarget.value.toUpperCase());
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };


  const handleClick = () => {
    const color = getRandomColor(); 
    const input = document.querySelector("input");

    const arrayColoresMediador = [...arrayColores];
    const arrayOpcionesMediador = [...arrayOpciones];

      if (arrayOpciones.includes(texto) || texto === "" || texto === " ") {
        if(window.innerWidth <= 1000){
            const mensajeMobile = document.getElementById("mensajeMobile");
            if (mensajeMobile) {
              mensajeMobile.classList.add("grid");
              if (texto === "" || texto === " ")
                mensajeMobile.innerHTML = "Ingresa un valor!";
    
              if (arrayOpciones.includes(texto))
                mensajeMobile.innerHTML = "El valor ingresado ya existe!";
              mensajeMobile.classList.remove("hidden");
              mensajeMobile.classList.add("fade");
            }
        }else{
            const mensaje = document.getElementById("mensaje");
            if (mensaje) {
              mensaje.classList.add("grid");
              if (texto === "" || texto === " ")
                mensaje.innerHTML = "Ingresa un valor!";
    
              if (arrayOpciones.includes(texto))
                mensaje.innerHTML = "El valor ingresado ya existe!";
              mensaje.classList.remove("hidden");
              mensaje.classList.add("fade");
            }
    
        }

        return;
      }

 

    arrayOpcionesMediador.push(texto);
    setArrayOpciones(arrayOpcionesMediador);

    arrayColoresMediador.push(color);
    setArrayColores(arrayColoresMediador);
  
    
    if (input) {
      input.value = "";
      setTexto("");
    }
    if (inputOpcionRef.current) inputOpcionRef.current.focus();
  };




  const handleClickMobile = () => {
    if(arrayOpciones.length < 2){
        const mensajeMobile = document.getElementById("mensajeMobile");
        if(mensajeMobile){ mensajeMobile.innerHTML = "Ingresa al menos 2 opciones.";
        mensajeMobile.classList.add("grid");
        mensajeMobile.classList.remove("hidden");
        mensajeMobile.classList.add("fade");
    }
        return
    }

    const ruletas = document.getElementById("genRuletas");
    ruletas?.classList.remove("hidden");
    ruletas?.classList.add("grid");
    const gestorDatos = document.getElementById("gestorDatos");
    gestorDatos?.classList.add("hidden");

    const canvas = document.getElementById("ruleta0");
    canvas?.classList.add("girar-ruleta");
    canvas?.classList.remove("ruleta");
    const contRuleta = document.getElementById("contenedor-ruleta-0");

    contRuleta?.classList.add("mobile");
    for (let i = 1; i < ganad; i++) {
      const constRuleta = document.getElementById("contenedor-ruleta-" + i);
      constRuleta?.classList.add("mobile");
      constRuleta?.classList.add("hidden");
    }
  };

  

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const valorSelect = parseInt(e.currentTarget.value);
    const cantOpciones = arrayOpciones.length;
    if (valorSelect < cantOpciones) {
      obtenerCantGanadores(parseInt(e.target.value));
      setGanador(parseInt(e.target.value));
      return;
    }

    const mensaje = document.getElementById("mensaje");
    const mensajeMobile = document.getElementById("mensajeMobile");
    if (mensaje) mensaje.innerHTML = "Por favor, ingrese más opciones.";
    if (mensajeMobile) mensajeMobile.innerHTML = "Por favor, ingrese más opciones.";
    const select = document.getElementById(
      "selectGanadores"
    ) as HTMLSelectElement | null;
    if (select) select.value = "1";
    setGanador(1);
    obtenerCantGanadores(1);
    if(window.innerWidth <= 1000){
        mensajeMobile?.classList.add("grid");
        mensajeMobile?.classList.remove("hidden");
        mensajeMobile?.classList.add("fade");
    }else{
        mensaje?.classList.add("grid");
        mensaje?.classList.remove("hidden");
        mensaje?.classList.add("fade");
    
    }



  };

  const animacionEnd = () => {
    const mensajeMobile = document.getElementById("mensajeMobile");
    if (mensajeMobile) {
        mensajeMobile.classList.remove("fade");
        
        mensajeMobile.classList.add("hidden");
    }
};

  function hsvToRgb(h: number, s: number, v: number) {
    var r = 0,
      g = 0,
      b = 0;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        (r = v), (g = t), (b = p);
        break;
      case 1:
        (r = q), (g = v), (b = p);
        break;
      case 2:
        (r = p), (g = v), (b = t);
        break;
      case 3:
        (r = p), (g = q), (b = v);
        break;
      case 4:
        (r = t), (g = p), (b = v);
        break;
      case 5:
        (r = v), (g = p), (b = q);
        break;
    }

    return [r * 255, g * 255, b * 255];
  }

  function rgbToHex(c: number[]) {
    const r = Math.round(c[0]);
    const g = Math.round(c[1]);
    const b = Math.round(c[2]);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function colorDistance(c1: number[], c2: number[]) {
    return Math.sqrt(
      Math.pow(c1[0] - c2[0], 2) +
        Math.pow(c1[1] - c2[1], 2) +
        Math.pow(c1[2] - c2[2], 2)
    );
  }

  function hexToRgb(hex: string) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }

  function getRandomColor() {
    const threshold = 10;
    const numAzarHue = Math.random();
    const numAzarSat = Math.random() * 0.3 + 0.4;
    const numAzarVal = Math.random() * 0.1 + 0.9;
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

  useEffect(() => {
    obtenerArrayColores(arrayColores);
  }, [arrayColores, obtenerArrayColores]);

  useEffect(() => {
    obtenerArrayOpciones(arrayOpciones);
  }, [arrayOpciones, obtenerArrayOpciones]);

  return (
    <div
      className="bg-[#121317] w-full hd:w-[33%]  h-full p-5 flex  flex-col justify-start items-center gap-3   "
      id="gestorDatos"
    >
      <div className="divRainbow w-full h-[10%] p-1 flex ">
        <span className="w-full hd:h-full flex justify-center items-center p-3 bg-[#121317]   ">
          <h1 className="h1 font-bold  text-5xl tablet:text-7xl hd:text-5xl full-hd:text-7xl 2k:text-8xl">
            RULETIFY
          </h1>
        </span>
      </div>

      <div className=" w-full  h-auto p-3 flex flex-col gap-3 justify-center   ">
        <h2 className="font-bold text-left text-lg tablet:text-3xl hd:text-xl full-hd:text-3xl 2k:text-4xl  text-pretty">
          <b>SELECCIONA LA CANTIDAD DE GANADORES:</b>
        </h2>
        <select
          id="selectGanadores"
          onChange={handleChange}
          className="text-black font-bold w-full hd:text-sm full-hd:text-2xl 2k:text-3xl appearance-none p-3 hover:animate-pulse "
        >
          <option value={1}>1 GANADOR</option>
          <option value={2}>2 GANADORES</option>
          <option value={3}>3 GANADORES</option>
          <option value={4}>4 GANADORES</option>
          <option value={5}>5 GANADORES</option>
        </select>
      </div>

      <div className="flex flex-col  items-center  overflow-hidden  gap-3  h-full   w-full  p-3  ">
        <h2 className="font-bold text-lg tablet:text-3xl hd:text-xl full-hd:text-3xl 2k:text-4xl text-left self-start text-balance  ">
          <b>INGRESA LAS OPCIONES A SORTEAR:</b>
        </h2>

        <div className="flex flex-col items-center gap-3 max-h-full  w-full flex-1 overflow-hidden">
          <div className="flex flex-row w-full  ">
            <input
              ref={inputOpcionRef}
              onChange={handleText}
              onKeyDown={handleSubmit}
              placeholder="Escribe algo!"
              className="text-black  font-bold hd:text-sm full-hd:text-2xl 2k:text-3xl appearance-none p-3 w-[92%] "
            ></input>
            <button
              onClick={handleClick}
              className=" w-[15%] full-hd:w-[10%] 2k:w-[8%] aspect-square    bg-blue-800 border font-bold text-xl hover:bg-blue-900 border-white"
            >
              ➕
            </button>
          </div>

          <div className="w-full  h-full relative  overflow-x-hidden overflow-y-scroll barra-scroll  ">
            <ul className="w-full   flex flex-col   gap-5 pr-5    ">
              {arrayOpciones.map((opcion,index)=>(
                <ElementoOpcion texto={opcion} color={arrayColores[index]} eliminarOpcion={eliminarOpcion} index={index}></ElementoOpcion>

              ))}
            <span onAnimationEnd={animacionEnd} className="w-full h-full absolute hidden hd:hidden place-content-center  bg-black rounded-md font-bold text-3xl text-center  backdrop-blur bg-opacity-50 transition-transform  z-50" id="mensajeMobile"></span>
            </ul>
            
          </div>
        </div>
      </div>

      <button
        id="boton"
        className="text-white font-bold min-h-[5%] text-2xl mb-10 border  border-white w-[95%] h-48 hd:hidden"
        onClick={handleClickMobile}
      >
        Girar!
      </button>
    </div>
  );
}
