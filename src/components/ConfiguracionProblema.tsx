import React, { useState } from 'react';
import type { ProblemaConfig } from '../App';

interface Props {
  onConfigurar: (config: ProblemaConfig) => void;
}

function ConfiguracionProblema({ onConfigurar }: Props) {
  const [numVariables, setNumVariables] = useState(2);
  const [numRestricciones, setNumRestricciones] = useState(2);
  const [tipo, setTipo] = useState<'maximizar' | 'minimizar'>('maximizar');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfigurar({ numVariables, numRestricciones, tipo });
  };

  const handleNumberChange = (
    setter: (value: number) => void,
    value: string
  ) => {
    const parsed = parseInt(value);
    if (!isNaN(parsed) && parsed > 0) {
      setter(parsed);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Características del Problema
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de Variables de Decisión:
          </label>
          <input
            type="number"
            min="1"
            value={numVariables}
            onChange={(e) => handleNumberChange(setNumVariables, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de Restricciones:
            <span className="text-gray-500 text-xs ml-2">
              (Sin incluir no negatividad)
            </span>
          </label>
          <input
            type="number"
            min="1"
            value={numRestricciones}
            onChange={(e) => handleNumberChange(setNumRestricciones, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Optimización:
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="maximizar"
                checked={tipo === 'maximizar'}
                onChange={(e) => setTipo(e.target.value as 'maximizar')}
                className="mr-2"
              />
              Maximizar
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="minimizar"
                checked={tipo === 'minimizar'}
                onChange={(e) => setTipo(e.target.value as 'minimizar')}
                className="mr-2"
              />
              Minimizar
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ConfiguracionProblema;