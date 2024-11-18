import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import ConfiguracionProblema from './components/ConfiguracionProblema';
import EntradaDatos from './components/EntradaDatos';
import Resultados from './components/Resultados';

export interface ProblemaConfig {
  numVariables: number;
  numRestricciones: number;
  tipo: 'maximizar' | 'minimizar';
}

export interface DatosProblema {
  funcionObjetivo: number[];
  restricciones: {
    coeficientes: number[];
    relacion: string;
    valorDerecho: number;
  }[];
}

export interface Resultado {
  valorFuncionObjetivo: number;
  variables: { nombre: string; valor: number; costoReducido: number }[];
  restricciones: { numero: number; holgura: number; precioSombra: number }[];
  rangosCoeficientes: { variable: string; limiteInferior: number; valorActual: number; limiteSuperior: string }[];
  rangosRestricciones: { restriccion: number; limiteInferior: number; valorActual: number; limiteSuperior: string }[];
}

function App() {
  const [paso, setPaso] = useState(1);
  const [config, setConfig] = useState<ProblemaConfig | null>(null);
  const [datos, setDatos] = useState<DatosProblema | null>(null);
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const avanzarPaso = () => setPaso(p => p + 1);
  const retrocederPaso = () => setPaso(p => p - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-indigo-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center gap-2">
          <Calculator size={24} />
          <h1 className="text-2xl font-bold">Programación Lineal</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Paso {paso} de 3
              </h2>
              <div className="flex gap-2">
                {paso > 1 && (
                  <button
                    onClick={retrocederPaso}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Anterior
                  </button>
                )}
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-full bg-indigo-600 rounded transition-all duration-300"
                style={{ width: `${(paso / 3) * 100}%` }}
              />
            </div>
          </div>

          {paso === 1 && (
            <ConfiguracionProblema
              onConfigurar={(config) => {
                setConfig(config);
                avanzarPaso();
              }}
            />
          )}

          {paso === 2 && config && (
            <EntradaDatos
              config={config}
              onSubmit={(datos) => {
                setDatos(datos);
                avanzarPaso();
              }}
              onBack={retrocederPaso}
            />
          )}

          {paso === 3 && config && datos && (
            <Resultados
              config={config}
              datos={datos}
              resultado={resultado}
              setResultado={setResultado}
              onBack={retrocederPaso}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;