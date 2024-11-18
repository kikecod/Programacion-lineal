import React, { useEffect } from 'react';
import axios from 'axios';
import type { ProblemaConfig, DatosProblema, Resultado } from '../App';

interface Props {
  config: ProblemaConfig;
  datos: DatosProblema;
  resultado: Resultado | null;
  setResultado: (resultado: Resultado) => void;
  onBack: () => void;
}

function Resultados({ config, datos, resultado, setResultado, onBack }: Props) {
  useEffect(() => {
    const obtenerResultado = async () => {
      try {
        const response = await axios.post('http://localhost:8000/resolver', {
          config,
          datos,
        });
        setResultado(response.data);
      } catch (error) {
        console.error('Error al resolver el problema:', error);
      }
    };

    if (!resultado) {
      obtenerResultado();
    }
  }, [config, datos, resultado, setResultado]);

  if (!resultado) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Solución Óptima
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Valor de la Función Objetivo
          </h3>
          <p className="text-xl font-bold text-indigo-600">
            {resultado.valorFuncionObjetivo.toFixed(3)}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Variables
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500">
                    Variable
                  </th>
                  <th className="px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500">
                    Valor
                  </th>
                  <th className="px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500">
                    Costo Reducido
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {resultado.variables.map((variable) => (
                  <tr key={variable.nombre}>
                    <td className="px-4 py-2">{variable.nombre}</td>
                    <td className="px-4 py-2">{variable.valor.toFixed(3)}</td>
                    <td className="px-4 py-2">
                      {variable.costoReducido.toFixed(3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Análisis de Sensibilidad
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-600 mb-2">
                Rangos de Coeficientes
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500">
                        Variable
                      </th>
                      <th className="px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500">
                        Límite Inferior
                      </th>
                      <th className="px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500">
                        Valor Actual
                      </th>
                      <th className="px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500">
                        Límite Superior
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {resultado.rangosCoeficientes.map((rango) => (
                      <tr key={rango.variable}>
                        <td className="px-4 py-2">{rango.variable}</td>
                        <td className="px-4 py-2">
                          {rango.limiteInferior.toFixed(3)}
                        </td>
                        <td className="px-4 py-2">
                          {rango.valorActual.toFixed(3)}
                        </td>
                        <td className="px-4 py-2">{rango.limiteSuperior}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-600 mb-2">
                Rangos de Restricciones
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500">
                        Restricción
                      </th>
                      <th className="px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500">
                        Límite Inferior
                      </th>
                      <th className="px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500">
                        Valor Actual
                      </th>
                      <th className="px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500">
                        Límite Superior
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {resultado.rangosRestricciones.map((rango) => (
                      <tr key={rango.restriccion}>
                        <td className="px-4 py-2">{rango.restriccion}</td>
                        <td className="px-4 py-2">
                          {rango.limiteInferior.toFixed(3)}
                        </td>
                        <td className="px-4 py-2">
                          {rango.valorActual.toFixed(3)}
                        </td>
                        <td className="px-4 py-2">{rango.limiteSuperior}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Anterior
          </button>
        </div>
      </div>
    </div>
  );
}

export default Resultados;