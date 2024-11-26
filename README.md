# Programacion-lineal
Este proyecto esta destinado a resolver ejercicios de maximizacion y minimizacion
Para clonar este Repositorio use

git clone https://github.com/kikecod/Programacion-lineal

Asegurese que tenga instalado git, una vez clonado el proyecto puede vayase a la carpeta api y cree un entorno virtual

python -m venv venv

Y luego active el entorno virtual

.\venv\Scripts\activate

en caso de que tenga un error ejecute este comando

Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

y luego 

.\venv\Scripts\activate

asegurese tener instalado pip e instale las siguientes librerias

pip install fastapi uvicorn pydantic pulp

y por ultimo, para levantar la api haga correr 

uvicorn main:app --reload

y vaya a la siguiente direccion http://127.0.0.1:8000/docs

Ahora vuelva a la carpeta raiz con cd .. , y asegurese tener instalado npm, corra el siguiente comando

npm install  

En caso de tener errores ingrese el siguiente comando

npm audit fix

para levantar la pagina use 

npm run dev 

http://localhost:5173/ vaya a esa direccion y vera la pagina

