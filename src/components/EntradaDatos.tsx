import React, { useState } from 'react';
import type { ProblemaConfig, DatosProblema } from '../App';

interface Props {
  config: ProblemaConfig;
  onSubmit: (datos: DatosProblema) => void;
  onBack: () => void;
}

function EntradaDatos({ config, onSubmit, onBack }: Props) {
  const [funcionObjetivo, setFuncionObjetivo] = useState<number[]>(
    Array(config.numVariables).fill(0)
  );
  const [restricciones, setRestricciones] = useState(
    Array(config.numRestricciones).fill(null).map(() => ({
      coeficientes: Array(config.numVariables).fill(0),
      relacion: '<=',
      valorDerecho: 0,
    }))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      funcionObjetivo,
      restricciones,
    });
  };

  const handleNumberChange = (value: string): number => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  const updateFuncionObjetivo = (index: number, valor: string) => {
    const nuevaFuncion = [...funcionObjetivo];
    nuevaFuncion[index] = handleNumberChange(valor);
    setFuncionObjetivo(nuevaFuncion);
  };

  const updateRestriccion = (
    restriccionIndex: number,
    campo: 'coeficientes' | 'relacion' | 'valorDerecho',
    valor: any,
    coeficienteIndex?: number
  ) => {
    const nuevasRestricciones = [...restricciones];
    if (campo === 'coeficientes' && coeficienteIndex !== undefined) {
      nuevasRestricciones[restriccionIndex].coeficientes[coeficienteIndex] = 
        handleNumberChange(valor);
    } else if (campo === 'valorDerecho') {
      nuevasRestricciones[restriccionIndex][campo] = handleNumberChange(valor);
    } else {
      nuevasRestricciones[restriccionIndex][campo] = valor;
    }
    setRestricciones(nuevasRestricciones);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Ingreso de Datos
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Función Objetivo ({config.tipo})
          </h3>
          <div className="flex flex-wrap gap-4">
            {funcionObjetivo.map((coef, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="number"
                  value={coef}
                  onChange={(e) => updateFuncionObjetivo(index, e.target.value)}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="0"
                  step="any"
                />
                <span>X{index + 1}</span>
                {index < funcionObjetivo.length - 1 && <span>+</span>}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Restricciones
          </h3>
          {restricciones.map((restriccion, restriccionIndex) => (
            <div
              key={restriccionIndex}
              className="flex flex-wrap items-center gap-4 mb-4"
            >
              {restriccion.coeficientes.map((coef, coefIndex) => (
                <div key={coefIndex} className="flex items-center gap-2">
                  <input
                    type="number"
                    value={coef}
                    onChange={(e) =>
                      updateRestriccion(
                        restriccionIndex,
                        'coeficientes',
                        e.target.value,
                        coefIndex
                      )
                    }
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="0"
                    step="any"
                  />
                  <span>X{coefIndex + 1}</span>
                  {coefIndex < restriccion.coeficientes.length - 1 && (
                    <span>+</span>
                  )}
                </div>
              ))}
              <select
                value={restriccion.relacion}
                onChange={(e) =>
                  updateRestriccion(restriccionIndex, 'relacion', e.target.value)
                }
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="<=">&le;</option>
                <option value=">=">&ge;</option>
                <option value="=">=</option>
              </select>
              <input
                type="number"
                value={restriccion.valorDerecho}
                onChange={(e) =>
                  updateRestriccion(
                    restriccionIndex,
                    'valorDerecho',
                    e.target.value
                  )
                }
                className="w-24 px-3 py-2 border border-gray-300 rounded-md"
                placeholder="0"
                step="any"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Anterior
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Resolver
          </button>
        </div>
      </form>
    </div>
  );
}

export default EntradaDatos;