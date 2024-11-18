from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pulp

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos
class ProblemaConfig(BaseModel):
    numVariables: int
    numRestricciones: int
    tipo: str  # 'maximizar' o 'minimizar'

class Restriccion(BaseModel):
    coeficientes: List[float]
    relacion: str  # '<=', '>=', '='
    valorDerecho: float

class DatosProblema(BaseModel):
    funcionObjetivo: List[float]
    restricciones: List[Restriccion]

class Problema(BaseModel):
    config: ProblemaConfig
    datos: DatosProblema

# Endpoint para resolver el problema
@app.post("/resolver")
async def resolver_problema(problema: Problema):
    try:
        # Crear el problema de programación lineal
        if problema.config.tipo == "maximizar":
            prob = pulp.LpProblem("ProgramacionLineal", pulp.LpMaximize)
        else:
            prob = pulp.LpProblem("ProgramacionLineal", pulp.LpMinimize)

        # Crear variables de decisión
        vars = [pulp.LpVariable(f"X{i+1}", lowBound=0) for i in range(problema.config.numVariables)]

        # Función objetivo
        prob += pulp.lpSum([problema.datos.funcionObjetivo[i] * vars[i] for i in range(len(vars))])

        # Restricciones
        for i, rest in enumerate(problema.datos.restricciones):
            expr = pulp.lpSum([rest.coeficientes[j] * vars[j] for j in range(len(vars))])
            if rest.relacion == "<=":
                prob += expr <= rest.valorDerecho
            elif rest.relacion == ">=":
                prob += expr >= rest.valorDerecho
            elif rest.relacion == "=":
                prob += expr == rest.valorDerecho
            else:
                raise HTTPException(status_code=400, detail=f"Relación desconocida: {rest.relacion}")

        # Resolver el problema
        prob.solve()

        # Validar que el problema tenga solución
        if pulp.LpStatus[prob.status] != "Optimal":
            raise HTTPException(status_code=400, detail="No se encontró solución óptima")

        # Preparar resultados
        resultado = {
            "valorFuncionObjetivo": pulp.value(prob.objective),
            "variables": [
                {
                    "nombre": f"X{i+1}",
                    "valor": pulp.value(var),
                    "costoReducido": var.dj if var.dj is not None else 0.0,
                }
                for i, var in enumerate(vars)
            ],
            "restricciones": [
                {
                    "numero": i+1,
                    "holgura": c.slack if c.slack is not None else 0.0,
                    "precioSombra": c.pi if c.pi is not None else 0.0,
                }
                for i, c in enumerate(prob.constraints.values())
            ],
        }

        return resultado

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)