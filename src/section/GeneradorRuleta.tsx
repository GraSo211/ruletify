import { useContext, useEffect, useState } from "react";
import Ruleta from "../components/Ruleta";

import SorteoContext from "../context/SorteoContext";
import BotonComenzar from "../components/BotonComenzar";

interface RuletaObject {
  opciones: Opciones[];
  nroGanador: number;
  nombreGanador: string;
  colorGanador: string;
}

type Opciones = {
  opcion: string;
  color: string;
};

export default function GeneradorRuleta() {
  const { cantGanadores, setGanadores, opciones } = useContext(SorteoContext);

  const [ruletas, setRuletas] = useState<RuletaObject[]>([{opciones: opciones, nroGanador: 0, nombreGanador: "",colorGanador: ""}]);
  const [number, setNumber] = useState<number>(0);
  useEffect(() => {
    const ruletasAct: RuletaObject[] = [];
    let opcionesRestantes = [...opciones];
    const ganadoresP: Opciones[] = [];

    for (let i = 0; i < cantGanadores; i++) {
      //decidir ganador
      const nroGanador: number = Math.floor(
        Math.random() * opcionesRestantes.length
      );
      const colorDelGanador: string = opcionesRestantes[nroGanador]?.color;
      const nombreGanador: string = opcionesRestantes[nroGanador]?.opcion;
      //agregar ruletas creadas
      ruletasAct.push({
        opciones: opcionesRestantes,
        nroGanador: nroGanador,
        nombreGanador: nombreGanador,
        colorGanador: colorDelGanador,
      });

      //sacamos las opciones que ganaron
      opcionesRestantes = opcionesRestantes.filter(
        (_, index) => index !== nroGanador
      );
      //agregamos los ganadores al array de ganadores
      ganadoresP.push({ opcion: nombreGanador, color: colorDelGanador });
    }

    if (ganadoresP.length > 0) {
      setGanadores(ganadoresP);
    }
    setRuletas(ruletasAct);
  }, [cantGanadores, opciones]);

  return (
    <div
      className="h-full w-full  xl:w-[67%]  xl:flex flex-col  items-center  relative     hidden  "
      id="genRuletas"
    >
      <div className="flex flex-row  w-full bg-[#0f1012]   justify-center items-center p-3  gap-5">
        {ruletas?.map((ruleta, index) => (
          <Ruleta
            key={index}
            id={index.toString()}
            opcionesP={ruleta.opciones}
            nroGanador={ruleta.nroGanador}
            nombreGanador={ruleta.nombreGanador}
            anchoAlto={window.innerWidth / 20}
            cantGanador={cantGanadores}
          ></Ruleta>
        ))}
      </div>

      <div
        className="h-full  w-full  flex justify-center p-1  flex-row xl:flex-wrap items-center gap-5 "
        id="contRuletas"
      >
        <Ruleta
          id={"0"}
          opcionesP={ruletas[number].opciones}
          nroGanador={ruletas[number].nroGanador}
          nombreGanador={ruletas[number].nombreGanador}
          anchoAlto={window.innerWidth / 3}
          cantGanador={cantGanadores}
        ></Ruleta>
      </div>

      {true ? (
        <div className="w-full h-1/5 flex justify-center mt-5 ">
          <BotonComenzar></BotonComenzar>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
