---
title: '¿Qué es Keccak256? Explora esta Función Hash Criptográfica y su Uso en Criptomonedas'
coverImage: 'images/image1.png'
category: Popular
subtitle: 'Keccak256 es una función hash criptográfica versátil que ha ganado prominencia debido a su uso en varias criptomonedas, sobre todo Ethereum.'
date: '2023-09-05T16:00:00.000Z'
author: 
- github:explainCKBot
---

Desarrollada como parte de la familia Keccak de funciones hash, Keccak256 fue seleccionada como ganadora del concurso de funciones hash del NIST y posteriormente estandarizada como SHA-3 (Secure Hash Algorithm 3).


## Una Breve Historia de Keccak256

El desarrollo de Keccak256 comenzó en respuesta a la convocatoria del Instituto Nacional de Estándares y Tecnología (NIST) para una nueva función hash criptográfica que sustituyera a los antiguos estándares SHA-1 y SHA-2. Como parte del concurso de funciones hash del NIST, que se celebró entre 2007 y 2012, expertos en criptografía de todo el mundo presentaron sus diseños para su evaluación. Entre ellos se encontraba la familia de funciones hash Keccak, creada por un equipo de criptógrafos dirigido por Guido Bertoni, Joan Daemen, Michaël Peeters y Gilles Van Assche.

Keccak destacó por su diseño innovador, seguridad y eficiencia, lo que hizo que el NIST lo eligiera ganador del concurso en 2012. Posteriormente, Keccak fue estandarizado como la familia de funciones hash SHA-3 en 2015.


## Comprendiendo las funciones hash criptográficas

Las funciones hash criptográficas desempeñan un papel fundamental en la seguridad de la información digital. Toman una entrada de longitud arbitraria y producen una salida de longitud fija, conocida como hash. Las funciones hash poseen varias propiedades esenciales que las hacen adecuadas para aplicaciones criptográficas:



* **Determinista:** La función hash siempre producirá la misma salida para una entrada dada.
* **Resistencia a la preimagen:** Encontrar la entrada original a partir de su hash debería ser computacionalmente inviable.
* **Resistencia a la colisión:** Encontrar dos entradas distintas que produzcan el mismo hash debería ser computacionalmente inviable.
* **Efecto avalancha:** Un pequeño cambio en la entrada debería resultar en un cambio drástico en la salida.


## Cómo Funciona Keccak256

Keccak256 emplea una construcción única llamada construcción de esponja, que consta de dos fases: la fase de absorción y la fase de compresión. En la fase de absorción, el mensaje de entrada se divide en bloques y se procesa iterativamente mediante una función de permutación. Durante esta fase, el mensaje de entrada se "absorbe" en el estado de la función hash. En la fase de compresión, la salida se extrae del estado aplicando la misma función de permutación repetidamente. Este proceso continúa hasta alcanzar la longitud de salida deseada.

La construcción en esponja de Keccak256 ofrece varias ventajas sobre las funciones hash Merkle-Damgård tradicionales, como SHA-1 y SHA-2. Proporciona mayor seguridad frente a determinados tipos de ataques, como los de extensión de longitud, y permite una mayor flexibilidad en la longitud de salida.


### Keccak256 en Criptomonedas

Keccak256 se ha convertido en un componente integral de varias criptomonedas, sobre todo Ethereum. En el contexto de las criptomonedas, Keccak256 desempeña varias funciones fundamentales:



* **Generación de direcciones:** en Ethereum, la dirección de la billetera de un usuario se obtiene mediante el hash de su clave pública utilizando Keccak256. El hash resultante se trunca para producir una dirección única de longitud fija. Este proceso garantiza que sea computacionalmente inviable realizar ingeniería inversa de la clave pública o privada a partir de la dirección de la billetera.
* **Funcionalidad de los contratos inteligentes:** los contratos inteligentes de Ethereum están diseñados para ejecutar operaciones predefinidas basadas en condiciones específicas. Keccak256 se utiliza en estos contratos inteligentes para diversos fines, como verificar firmas digitales, generar números aleatorios y garantizar la integridad de los datos.
* **Minería y consenso:** Keccak256 se emplea en el antiguo algoritmo de minería de prueba de trabajo (PoW) de Ethereum, llamado Ethash. Los mineros compiten para resolver un complejo problema matemático que consiste en crear un hash de los datos de cabecera del bloque y un valor nonce utilizando Keccak256. Cuando un minero encuentra un hash que cumple el objetivo de dificultad de la red, puede enviar su solución y añadir el nuevo bloque a la cadena de bloques. Este proceso asegura la red Ethereum y garantiza el consenso entre los nodos participantes.
* **Seguridad de la cadena de bloques:** las funciones hash criptográficas como Keccak256 son cruciales para mantener la seguridad e integridad de una cadena de bloques. Cada bloque de la cadena de bloques contiene un hash del encabezamiento del bloque anterior. Esto crea una cadena interconectada de bloques, lo que hace que sea computacionalmente inviable para un atacante alterar el contenido de un bloque sin cambiar el contenido de todos los bloques posteriores.
* **Aplicaciones descentralizadas (dApps):** Keccak256 se utiliza en muchas aplicaciones descentralizadas creadas en Ethereum y otras plataformas blockchain. Estas dApps dependen de Keccak256 para operaciones criptográficas, como validación de datos, verificación de identidad y comunicación segura entre partes.


## Conclusión

Keccak256 es una función hash criptográfica robusta y versátil que ha encontrado una amplia adopción en las criptomonedas, en particular dentro del ecosistema Ethereum. Su diseño innovador, sus sólidas propiedades de seguridad y su longitud de salida flexible la convierten en una opción ideal para diversas aplicaciones criptográficas en el mundo de las monedas digitales y la tecnología blockchain en rápida evolución. A medida que el panorama de las criptomonedas siga creciendo y madurando, es probable que el papel de Keccak256 a la hora de garantizar la seguridad, integridad y funcionalidad de estos sistemas se vuelva aún más crítico.
