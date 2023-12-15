# Prueba de inicio de sesión incorrecto en app móvil con Appium

## Descripción

Este proyecto utiliza Appium para probar escenarios de inicio de sesión incorrecto en la aplicación móvil de Codere.

Se enfoca en:

-   Probar a introducir credenciales de usuario inválidas
-   Validar el mensaje de error esperado en cada caso

## Configuración

El proyecto utiliza:

-   WebDriverIO como cliente de Appium
-   Configuración de capabilities de Appium para Android
-   Dispositivo Android como dispositivo de prueba

Archivos clave:

-   `login.js`: contiene todos los casos de prueba
-   `login.json`: datos de entrada de los casos de prueba

## Casos de prueba

Los casos de prueba están configurados en `login.json` con la siguiente estructura:


    [   {   "user":  "usuario_invalido",   "password":  "contraseña_invalida",   "expectedError":  "Mensaje de error esperado"   }  ]

Se prueban múltiples combinaciones de credenciales inválidas.

## Funciones principales

Las funciones en `login.js` realizan las siguientes acciones:

-   `invalidLogin()`: introduce usuario y contraseña inválidos
-   `modalWrongLogin()`: valida el mensaje de error mostrado
-   `runTest()`: ejecuta cada caso de prueba

## Ejecución

Para ejecutar las pruebas:

`node login.js`

Esto ejecutará cada caso de prueba en `login.json`.

## Mejoras futuras

Posibles mejoras:

-   Añadir más casos de prueba para tener en cuenta otras interacciones de la aplicación
-   Probar también en iOS
-   Parametrizar selectores en un archivo aparte
-   Generar reporte de resultados
-   Trabajar con el modelo de Page Object
-   Generar tests de rendimiento
