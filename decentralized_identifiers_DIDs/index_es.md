---
title: 'Identificadores Descentralizados (DID): Creando Identidades Blockchain Interoperables, Seguras y Fáciles de Usar'
coverImage: 'images/image1.png'
category: Popular
subtitle: 'Los Identificadores Descentralizados (DID) son un enfoque revolucionario para la gestión de identidades digitales dentro de la tecnología blockchain.'
date: '2023-08-25T16:00:00.000Z'
author: 
- github:explainCKBot
---

Los DID permiten servicios y aplicaciones descentralizadas al proporcionar identificadores únicos, fáciles de usar y seguros. Este artículo explorará dos soluciones DID destacadas construidas en diferentes plataformas blockchain: Ethereum Name Service (ENS), construido sobre Ethereum, y .bit, construido sobre la Capa 1 de Nervos, Common Knowledge Base (CKB).


## ¿Qué Son los Identificadores Descentralizados (DID)?

Los identificadores descentralizados (DID) son un tipo de identificador digital que permite a las personas, organizaciones e incluso dispositivos crear y administrar sus propias identidades únicas y soberanas. A diferencia de los identificadores tradicionales, como nombres de usuario, direcciones de correo electrónico o números de seguridad social, los DID no están controlados por una autoridad centralizada ni sujetos a un único punto de falla. En cambio, los DID son generados, propiedad y administrados por el titular de la identidad, quien puede usarlos para interactuar de forma segura y privada con otras partes en el mundo digital.

Los DID aprovechan el poder de la tecnología blockchain para crear una infraestructura descentralizada, resistente a manipulaciones y altamente segura para la gestión de identidades. Un DID es un identificador único registrado en una cadena de bloques u otro libro de contabilidad distribuido. Puede ser verificado y actualizado de forma independiente por el titular de la identidad sin necesidad de intermediario. Este enfoque descentralizado ofrece numerosos beneficios sobre los sistemas centralizados de gestión de identidades, incluida una mayor seguridad, privacidad y control de usuarios.


### Servicio de Nombres de Ethereum (ENS)

ENS es un sistema de nombres descentralizado construido sobre la cadena de bloques Ethereum que transforma identificadores complejos legibles por máquinas en nombres más fácilmente comprensibles y legibles por humanos. Al asignar nombres como 'alice.eth' a direcciones de Ethereum u otros datos legibles por máquina, ENS simplifica el intercambio y el uso de identidades basadas en blockchain.

La arquitectura de ENS consta de dos componentes principales: el registro y los solucionadores. El registro es un contrato inteligente que mantiene una lista de todos los dominios y subdominios, almacenando información sobre su propietario, resolución y tiempo de vida para fines de almacenamiento en caché. El solucionador es responsable de traducir nombres en direcciones u otros datos, y diferentes solucionadores admiten varios tipos de registros.

Los dominios de ENS se pueden registrar y administrar a través de billeteras compatibles o aplicaciones dedicadas, lo que brinda a los usuarios una interfaz fácil de usar para administrar sus identidades digitales. ENS también admite resolución inversa, lo que permite asociar metadatos con direcciones de Ethereum.


### .bit en Nervos CKB

.bit es un sistema de cuentas descentralizado entre cadenas construido sobre Nervos CKB, una cadena de bloques de Capa 1. Este sistema proporciona un sistema de nombres único con un sufijo .bit que se puede utilizar en varios escenarios, como transferencias de criptomonedas, resolución de nombres de dominio y autenticación de identidad. Las cuentas .bit se pueden registrar y administrar con cualquier dirección de cadena pública o incluso con un correo electrónico.

El sistema .bit consta de cinco componentes principales: protocolo central, guardián, servicio de resolución, SDK del cliente e interfaz de usuario. El protocolo central consta de una serie de contratos inteligentes implementados en Nervos CKB que definen los estándares operativos para las cuentas .bit. El guardián es un conjunto de programas fuera de la cadena responsables de activar transacciones que se ajusten al protocolo central. El servicio de resolución, creado sobre las transacciones de Nervos CKB, brinda servicios de resolución de cuentas al público. El SDK del cliente simplifica la integración de aplicaciones relacionadas con .bit, mientras que la interfaz de usuario permite a los usuarios interactuar con el sistema a través de varias interfaces.

Una característica única del sistema .bit es su amplia compatibilidad, que permite a los usuarios administrar sus activos en Nervos CKB utilizando claves privadas de otras cadenas públicas como Bitcoin o Ethereum. Esto es posible gracias al soporte flexible del algoritmo de firma en la plataforma Nervos CKB.


## Diferencias entre ENS y .bit

ENS y .bit son servicios de nombres descentralizados que aprovechan el poder de la tecnología blockchain para crear un Internet más centrado en el usuario. A pesar de su objetivo común de asignar nombres legibles por humanos a identificadores legibles por máquinas, estos dos sistemas tienen una serie de diferencias clave.

En primer lugar, ENS se basa en la cadena de bloques Ethereum, mientras que .bit se basa en Nervos CKB, una cadena de bloques de Capa 1. Esta diferencia en la tecnología subyacente es importante porque determina la compatibilidad y los casos de uso de cada sistema. ENS está diseñado principalmente para direcciones de Ethereum y recursos relacionados, pero también ofrece soporte para otras direcciones de criptomonedas y hashes de contenido. Por el contrario, .bit proporciona una compatibilidad más amplia al permitir a los usuarios registrarse y administrar sus cuentas utilizando cualquier dirección de cadena pública o incluso una dirección de correo electrónico.

Otra diferencia notable es el sufijo de dominio utilizado por cada sistema. Los dominios ENS llevan el sufijo '.eth', como 'alice.eth', mientras que los dominios .bit utilizan el sufijo '.bit', como 'alice.bit'. Esta distinción es importante para que los usuarios reconozcan con qué sistema de nombres basado en blockchain están interactuando.

La arquitectura de los dos sistemas también difiere. ENS consta de dos componentes principales: el registro y los solucionadores. El registro es esencialmente un contrato inteligente que realiza un seguimiento de todos los dominios y subdominios, registra información sobre el propietario, el solucionador y el tiempo de vida del almacenamiento en caché de cada dominio. Los solucionadores, por otro lado, son responsables de traducir nombres en direcciones. En comparación, .bit presenta cinco componentes principales: protocolo central, guardián, servicio de resolución, SDK del cliente e interfaz de usuario. El protocolo central incluye una serie de Lock Scripts y Type Scripts implementados en Nervos CKB, que establecen cuentas .bit y establecen estándares operativos.

Además, la forma en que funcionan la propiedad y la gestión de cuentas en ENS y .bit es distinta. En ENS, el propietario de un dominio puede ser una cuenta externa (un usuario) o un contrato inteligente. Sin embargo, .bit permite que el propietario o administrador de un dominio sea cualquier clave privada de una cadena pública o incluso una dirección de correo electrónico, ofreciendo mayor flexibilidad a los usuarios.

Finalmente, los mecanismos de resolución utilizados por ENS y .bit son diferentes. ENS emplea un proceso de dos pasos para resolver un nombre. Inicialmente, consulta el registro para identificar al solucionador responsable y luego consulta a ese solucionador para obtener la respuesta. Por otro lado, .bit utiliza un servicio de resolución que resuelve el estado global de .bit en función de transacciones en Nervos CKB, brindando un servicio de resolución de cuentas al público.


## Identificadores Descentralizados (DID) Versus Sistema de Nombres de Dominio (DNS)

Los identificadores descentralizados (DID) y el sistema de nombres de dominio (DNS) comparten un objetivo común: asignar nombres legibles por humanos a identificadores legibles por máquinas. Sin embargo, difieren significativamente en su arquitectura, mecanismos de control y tecnología subyacente.

Cuando se trata de arquitectura, DNS es un sistema jerárquico centralizado supervisado por autoridades confiables como registradores de dominios y la Corporación de Asignación de Nombres y Números de Internet (ICANN). Por el contrario, los DID se basan en arquitecturas descentralizadas y sin confianza que aprovechan la tecnología blockchain. Ethereum Name Service (ENS) y .bit son solo dos ejemplos de DID.

El control y la propiedad son otras áreas en las que estos dos sistemas divergen. Con el DNS, terceros, como los registradores de dominios, suelen gestionar el control y la propiedad de los nombres de dominio, lo que a veces puede dar lugar a problemas como censura, incautaciones de dominios o disputas. Sin embargo, los DID permiten a los usuarios ejercer control directo sobre sus identificadores, lo que minimiza la dependencia de autoridades centralizadas y otorga a los usuarios una mayor autonomía.

Los modelos de seguridad y confianza también son distintos entre DNS y DID. DNS depende de las autoridades certificadoras y otras entidades centralizadas para establecer conexiones seguras, mientras que los DID aprovechan la seguridad inherente de la tecnología blockchain para crear un entorno sin confianza. Esto permite una verificación segura y a prueba de manipulaciones de identidades digitales sin la necesidad de terceros de confianza.

Otra diferencia notable es la compatibilidad multiplataforma. Los DID ofrecen interoperabilidad y compatibilidad entre una variedad de plataformas y aplicaciones, lo que permite a los usuarios administrar sus identificadores en múltiples cadenas de bloques y aplicaciones descentralizadas. Por el contrario, DNS se ocupa principalmente de asignar nombres de dominio a direcciones IP.

La privacidad y el control del usuario están en el centro de la distinción entre DID y DNS. Los DID brindan a los usuarios más control sobre sus identidades digitales, permitiéndoles administrar su información y privacidad sin depender de servicios de terceros. Por otro lado, el DNS depende de servicios centralizados, que no siempre priorizan la privacidad y el control del usuario en la misma medida.


## Conclusión

Los identificadores descentralizados representan un cambio significativo en el funcionamiento de las identidades digitales e Internet. Al aprovechar el poder de la tecnología blockchain, los DID ofrecen mayor seguridad, privacidad y control del usuario en comparación con el modelo DNS tradicional. Con soluciones como ENS y .bit, los usuarios pueden beneficiarse de sistemas de nombres descentralizados que los colocan en el asiento del conductor, lo que les permite una mayor autonomía y flexibilidad en la gestión de sus identidades digitales.
