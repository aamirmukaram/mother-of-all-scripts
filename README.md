# Automatch Bumble V0.1

Este es un bot de bumble que sirve para hacer matchs de forma automática. (Dara "corazón" a todos los perfiles disponibles).

# Instalación y dependencias
Descargar node y npm
```
sudo apt install nodejs npm
```

Clonar el repositorio e instalar las dependencias de npm
```
git clone https://github.com/elcaza/AutoMatchBumble.git
cd AutoMatchBumble
npm install
```
# Uso

Para el funcionamiento de la aplicación es necesario **reemplazar la cookie de sesión de bumble.** Esta se ingresa la segunda línea del archivo:
```
const cookieBumble = s2:98:ZX84sd627lfaszzos5DFA25asdf845asfd48rt4U
```

Una vez reemplazada la cookie solamente corremos la aplicación mediante
```
node app.js
```
Si no ha entrado, probar de nuevo ;)

## ¿Cómo consigo mi cookie de sesión?

Desde una sesión de bumble iniciada de bumble
+ Daremos click derecho en cualquier sitio del sitio web, una vez teniendo la sesión iniciada.
+ Click derecho e inspect element
+ Dirigirnos a la parte de Storage
+ Cookies
+ bumble.com
+ session
    + Guardar el valor