---
title: "¿Cuál es la Diferencia entre Computación y Verificación en una Cadena de Bloques?"
coverImage: 'images/image1.png'
category: Popular
subtitle: 'La tecnología blockchain, en la que se basan criptomonedas como Bitcoin y Ethereum, es un sistema complejo que depende de una miríada de procesos para funcionar con eficacia. Dos de estos procesos clave son la computación y la verificación. Aunque puedan parecer similares, tienen propósitos distintos dentro del ecosistema blockchain.'
date: '2023-11-01T16:00:00.000Z'
author: 
- github:explainCKBot
---


Este artículo pretende profundizar en estos conceptos, destacando las diferencias entre computación y verificación de blockchain y sus respectivos papeles en el mantenimiento de la integridad y funcionalidad de las redes de blockchain.


## Comprendiendo la Computación en las Cadenas de Bloques

La computación se refiere a la ejecución de las instrucciones integradas en transacciones o contratos inteligentes en la cadena de bloques. El proceso de cómputo consume muchos recursos, lo que requiere una potencia de cálculo y una energía considerables, especialmente en el caso de las cadenas de bloques que admiten contratos inteligentes complejos. El proceso de cálculo lo realizan normalmente los productores de bloques (mineros o validadores) que facilitan los cambios de estado mediante la ejecución de transacciones. Sin embargo, es crucial entender que las cadenas de bloques no están diseñadas para ser plataformas computacionales, ya que descentralizan las cosas por replicación en lugar de distribución, lo que significa que la potencia de cálculo de toda la red no escala con más nodos, sino que siempre se limita a la potencia de cálculo de un solo nodo.


## Comprendiendo la Verificación en las Cadenas de Bloques

Por otro lado, la verificación es el proceso de confirmar la validez de las transacciones y bloques en la blockchain. Ésta es la función principal de las cadenas de bloques: actuar como máquinas de verificación. La verificación consiste en comprobar que una transacción cumple las normas del protocolo de la cadena de bloques. A diferencia de la computación, la verificación no cambia directamente el estado de la cadena de bloques, sino que garantiza que un cambio de estado propuesto sea legítimo y cumpla con las reglas del protocolo.


## La Interrelación entre Cálculo y Verificación

Si bien el cálculo y la verificación son procesos distintos, están estrechamente relacionados en el funcionamiento de una red blockchain. La computación es necesaria para ejecutar las instrucciones en las transacciones y contratos inteligentes, lo que genera cambios en el estado de la cadena de bloques. Mientras tanto, la verificación garantiza que estos cambios sean válidos y cumplan con las reglas del protocolo blockchain. Esta interacción entre computación y verificación es crucial para mantener la integridad y seguridad de la cadena de bloques.

En una red blockchain, diferentes entidades son responsables de la computación y la verificación. Los mineros o validadores de la red suelen ser los responsables de la computación. Ejecutan las instrucciones incluidas en las transacciones o contratos inteligentes, lo que provoca cambios en el estado de la cadena de bloques. Por otro lado, los nodos completos de la red son responsables de la verificación. Comprueban cada transacción y bloque con el estado actual de la cadena de bloques para garantizar su validez.

Sin embargo, a medida que las cadenas de bloques crecen y aumenta el número de transacciones, la carga computacional de los mineros puede convertirse en un cuello de botella que limite la escalabilidad de la red. Para resolver este problema, muchas redes de cadenas de bloques están recurriendo a soluciones de capa 2, que son redes o canales secundarios que se sitúan sobre la cadena de bloques base (Capa 1) y descargan la computación de la cadena principal.

Las soluciones de Capa 2 permiten ejecutar transacciones o realizar cálculos fuera de la cadena, reduciendo así la carga computacional de la cadena principal. Este enfoque permite un procesamiento más rápido de las transacciones y una mayor escalabilidad, ya que la cadena principal no se atasca con cada transacción individual, sino que sirve como capa de liquidación final para lotes más grandes de transacciones que se han comprimido en una sola transacción.

Por ejemplo, Lightning Network para Bitcoin y los rollups (optimistic y ZK) para Ethereum, son soluciones de Capa 2 que permiten un procesamiento de transacciones más rápido y escalable. La primera solución utiliza contratos inteligentes para abrir canales de pago entre las partes, permitiéndoles realizar transacciones fuera de la cadena. Sólo cuando se cierra el canal, el estado final de las transacciones se transfiere a la cadena principal. Por otro lado, los rollups agrupan o acumulan múltiples transacciones fuera de la cadena en una única transacción que se envía a un contrato inteligente en la cadena principal (Capa 1) responsable de aceptar estos datos agrupados y garantizar su validez.


## Revisando el Papel de las Cadenas de Bloques de Capa 1

Históricamente, las cadenas de bloques de Capa 1, como Bitcoin y Ethereum, han sido vistas como plataformas que lo abarcan todo. Eran responsables tanto del cálculo (ejecutar transacciones y contratos inteligentes) como de la verificación (garantizar la validez de estas transacciones). Sin embargo, a medida que estas redes crecieron, los problemas de escalabilidad se hicieron evidentes. La doble responsabilidad del cálculo y la verificación dificultaba el procesamiento rápido de un gran volumen de transacciones.

Una perspectiva más moderna sugiere que las blockchains de Capa 1 deberían servir principalmente como plataformas de preservación. Su principal tarea es mantener un registro o "estado" inmutable de todo el sistema. Al centrarse en preservar el estado y verificar los cambios de estado, las cadenas de bloques de Capa 1 pueden garantizar la integridad y seguridad de los datos sin verse abrumadas por las demandas computacionales de la ejecución de transacciones. A la luz de las limitaciones computacionales de la Capa 1, deben utilizarse soluciones de Capa 2. Estas soluciones, como los rollups o los canales de pag y estado, gestionan la mayor parte de la ejecución de las transacciones fuera de la cadena, mientras que dependen de la Capa 1 para la verificación y la liquidación final. Esta división del trabajo permite un procesamiento de las transacciones más rápido y escalable.


Este replanteamiento del papel de las cadenas de bloques de capa 1 representa un cambio de paradigma en el mundo de las cadenas de bloques. Se trata de pasar de un enfoque de "talla única" a una arquitectura más modular y por capas. Al permitir que la Capa 1 se centre en sus puntos fuertes de preservación y verificación y dejar que la Capa 2 se encargue de la computación, todo el ecosistema blockchain puede funcionar de forma más eficiente y eficaz.


## Conclusión

En conclusión, aunque la computación y la verificación de la cadena de bloques puedan parecer similares, desempeñan funciones distintas dentro del ecosistema de la cadena de bloques. La computación ejecuta las instrucciones de las transacciones y los contratos inteligentes, produciendo cambios en el estado de la cadena de bloques. La verificación, por otro lado, confirma la validez de estos cambios, asegurando que se adhieren a las reglas del protocolo blockchain. Comprender las diferencias entre estos procesos y su interacción es crucial para cualquiera que se adentre en el mundo de la tecnología blockchain. Además, replantearse el papel de las cadenas de bloques como plataformas de preservación en lugar de computacionales puede conducir a diseños de cadenas de bloques más eficientes y escalables.
