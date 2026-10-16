## Tickyiyo

Tickyiyo es una aplicación web moderna diseñada bajo una arquitectura modular de cliente y administración, orientada a la venta y gestión de entradas para conciertos, obras de teatro, festivales y eventos deportivos.

​El proyecto resuelve la necesidad de automatizar la oferta de boletería digital mediante una interfaz intuitiva para el usuario final (con buscador en tiempo real, filtros dinámicos por ciudad y categoría, selector multidivisa y carrito de compras interactivo) y un panel de control robusto para el administrador (gestión CRUD de eventos, categorías y control detallado de transacciones de ventas). Toda la persistencia de datos se gestiona de forma eficiente y nativa utilizando LocalStorage, garantizando una experiencia de usuario fluida sin depender de bases de datos externas pesadas.

## Estructura del Proyecto

​La arquitectura de archivos y carpetas del proyecto se encuentra organizada de la siguiente manera:
```text
Tickyiyo/
│
├── css/
│   ├── usuario.css         # Estilos visuales para la interfaz del cliente
│   ├── ventas.css          # Estilos para la tabla y modales de gestión de ventas
│   └── ...                 # Hojas de estilo adicionales para login y admin
│
├── js/
│   ├── usuario.js          # Lógica principal del cliente (buscador, filtros, carrito, moneda)
│   ├── ventas.js           # Lógica para el renderizado, ordenamiento y detalles de ventas
│   └── ...                 # Scripts de gestión de categorías y eventos del admin
│
├── img/
│   ├── Ticket.png          # Logotipo oficial de la plataforma
│   └── favicon/            # Iconos y recursos gráficos del sitio
│
└── html/
    ├── index.html          # Página principal del usuario (Catálogo y Carrito)
    ├── ventas.html         # Módulo administrativo de control de transacciones
    ├── dashboard.html      # Panel general del administrador
    └── login.html          # Acceso al sistema de gestión
```

## Detalle de los Módulos

​El sistema está dividido en subsistemas interconectados que aseguran el flujo completo de la aplicación:

​1. Módulo de Usuario / Catálogo (index.html & usuario.js)

​Buscador Dinámico en Tiempo Real: Permite buscar eventos o artistas filtrando de manera inmediata sobre los datos locales mediante el evento input.
​Filtros Combinados: Selectores independientes para filtrar eventos por Ciudad y Categoría de forma cruzada utilizando operadores lógicos.
​Carrito de Compras y Modal de Detalle: Permite agregar ítems, modificar cantidades, calcular subtotales de manera reactiva con .reduce() y vaciar o procesar el carrito.
​Conversor de Divisas Dinámico: Posibilidad de alternar la visualización de precios en tiempo real entre Pesos Colombianos (COP) y Dólares (USD).

​2. Módulo de Administración de Eventos y Categorías

​CRUD Completo: Permite al administrador crear, editar (mediante marcas de tiempo con Date.now()) y eliminar categorías y eventos.
​Persistencia Compartida: Sincroniza automáticamente los datos nuevos con la interfaz de usuario mediante LocalStorage y JSON.

​3. Módulo de Gestión de Ventas (ventas.html & ventas.js)

​Historial de Transacciones: Tabla ordenada cronológicamente de forma descendente que muestra la fecha, nombre del cliente, ciudad de origen y total pagado.
​Detalle de Pedido (Modal): Permite inspeccionar a fondo cada factura emitida, desglosando los datos del comprador y la cantidad de entradas adquiridas.
