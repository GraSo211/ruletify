import { useContext, useEffect, useState } from "react";
import Ruleta from "../components/Ruleta";
import SorteoContext from "../context/SorteoContext";
import BotonComenzar from "../components/BotonComenzar";

interface RuletaObject {
    opciones: Opciones[];
    nroGanador: number;
    nombreGanador: string;
    colorGanador: string;
    vueltas: number;
}

type Opciones = {
    opcion: string;
    color: string;
};

export default function GeneradorRuleta() {
    const { cantGanadores, setGanadores, opciones, sortear, setFinRuleta, cantRuletasFinalizadas, setCantRuletasFinalizadas } = useContext(SorteoContext);

    const [indiceRuleta, setIndiceRuleta] = useState<number>(0);
    const [ruletas, setRuletas] = useState<RuletaObject[]>([{ opciones, nroGanador: 0, nombreGanador: "", colorGanador: "", vueltas: 0 }]);
    const [ruletaActual, setRuletaActual] = useState<RuletaObject>({ opciones, nroGanador: 0, nombreGanador: "", colorGanador: "", vueltas: 0 });

    useEffect(() => {
        setIndiceRuleta(0)
        const ruletasAct: RuletaObject[] = [];
        let opcionesRestantes = [...opciones];
        const ganadoresP: Opciones[] = [];

        for (let i = 0; i < cantGanadores; i++) {
            const nroGanador: number = Math.floor(Math.random() * opcionesRestantes.length);
            const colorDelGanador: string = opcionesRestantes[nroGanador]?.color || '';
            const nombreGanador: string = opcionesRestantes[nroGanador]?.opcion || '';
            const vueltas = definirVueltas(opcionesRestantes, nroGanador);

            ruletasAct.push({
                opciones: opcionesRestantes,
                nroGanador,
                nombreGanador,
                colorGanador: colorDelGanador,
                vueltas
            });

            opcionesRestantes = opcionesRestantes.filter((_, index) => index !== nroGanador);
            ganadoresP.push({ opcion: nombreGanador, color: colorDelGanador });
        }

        if (ganadoresP.length > 0) {
            setGanadores(ganadoresP);
        }

        setRuletas(ruletasAct);
    }, [cantGanadores, opciones, setGanadores]);

    useEffect(() => {
        if (ruletas.length) {
            setRuletaActual(ruletas[indiceRuleta]);
        }
    }, [ruletas, indiceRuleta]);

    

    const manejarFinDeGiro = () => {

        if (indiceRuleta < ruletas.length - 1) {
            setIndiceRuleta(indiceRuleta + 1);
        }
        setCantRuletasFinalizadas(cantRuletasFinalizadas+1);

            if(cantGanadores == cantRuletasFinalizadas) setFinRuleta(true)
    };

    function definirVueltas(opciones: Opciones[], nroGanador: number) {
        const anguloInicialGanador = (360 / opciones.length) * nroGanador;
        const anguloFinalGanador = anguloInicialGanador + 360 / opciones.length;
        const diferencia = anguloFinalGanador - anguloInicialGanador;
        const centrador = diferencia / 2 - 30;

        let nroAleatorizarVuelta = Math.floor(Math.random() * (diferencia / 2 - 1));
        if (Math.floor(Math.random() * 2) === 0) {
            nroAleatorizarVuelta = -nroAleatorizarVuelta;
        }

        return 360 * 10 - 120 - anguloInicialGanador - centrador + nroAleatorizarVuelta;
    }

    return (
        <div className="h-full w-full xl:w-[67%] xl:flex flex-col items-start relative p-0 hidden" id="genRuletas">
            <div className="flex flex-row w-full h-[30%] bg-[#0f1012] justify-evenly items-center p-3 gap-5">
                {ruletas.map((ruleta, index) => (
                    <Ruleta
                        key={index}
                        opcionesP={ruleta.opciones}
                        nombreGanador={ruleta.nombreGanador}
                        anchoAlto={window.innerWidth < 1024 ? window.innerWidth / 8 : window.innerWidth / 15}
                        cantGanador={cantGanadores}
                        girar={sortear && indiceRuleta === index}
                        manejarFinDeGiro={manejarFinDeGiro}
                        vueltas={ruleta.vueltas}
                        tamañoTexto="text-sm xl:text-3xl"
                        filtroGris={index !== 0 ? "ruleta" : ""}
                        anchoPestillo={40}
                    />
                ))}
            </div>

            <div className="h-full w-full flex justify-center p-1 flex-row xl:flex-wrap items-center gap-5" id="contRuletas">
                <Ruleta
                    id="principal"
                    opcionesP={ruletaActual.opciones || [{ opcion: "", color: "" }]}
                    nombreGanador={ruletaActual.nombreGanador}
                    anchoAlto={window.innerWidth < 1024 ? window.innerWidth / 1.1 : window.innerWidth / 3.5}
                    cantGanador={cantGanadores}
                    girar={sortear && indiceRuleta === ruletas.indexOf(ruletaActual)}
                    manejarFinDeGiro={manejarFinDeGiro}
                    vueltas={ruletaActual.vueltas}
                    tamañoTexto="text-5xl"
                    filtroGris=""
                    anchoPestillo={80}
                />
            </div>
            {window.innerWidth > 1024 && (
                <div className="w-full h-1/5 flex justify-center mb-1">
                    <BotonComenzar />
                </div>
            )}
        </div>
    );
}
