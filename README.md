# **Programación Lineal**  
_Un proyecto para resolver ejercicios de **maximización** y **minimización** de manera sencilla y eficiente._

---

## **Clonar el repositorio**
Para obtener una copia local de este proyecto, asegúrate de tener instalado **Git** y ejecuta:

```bash
git clone https://github.com/kikecod/Programacion-lineal
```

## **Configuración del Backend (API)**
1. Navega a la carpeta api:

```bash
cd api
```
2. Cree un entorno virtual
   Asegúrate de tener instalado Python y ejecuta:

```bash
python -m venv venv
```
3.  Activa el entorno virtual:

```bash
.\venv\Scripts\activate
```
Si aparece un error, ejecuta:

```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
Luego intenta activar nuevamente:
```bash
.\venv\Scripts\activate
```
4. Instala las dependencias
   Asegúrate de tener instalado pip y ejecuta:
```bash
pip install fastapi uvicorn pydantic pulp
```
5. Inicia la API:
```bash
   uvicorn main:app --reload
```

## **Configuración del Frontend**
1. Vuelve a la carpeta raiz
```bash
cd ..
```
2. Instala dependencias
   Asegúrate de tener instalado Node.js y ejecuta:
```bash
npm install
```
3. Solucion de problemas(si lo hay)
   Si encuentras errores, corre:
```bash
npm audit fix
```
4. Inicia el servidor del frontend:
  Para iniciar la página web, ejecuta:Para iniciar la página web, ejecuta:
```bash
npm run dev
```
¡Gracias por fijarte y seguir los pasos! 💻✨
=)
