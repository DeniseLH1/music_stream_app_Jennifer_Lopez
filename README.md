# MusicStream

## Descripción del proyecto

MusicStream es un prototipo de tienda y reproductor de música creado como sitio web estático con HTML, CSS y JavaScript nativo. Permite explorar un catálogo de álbumes, consultar fichas de artistas, guardar favoritos, gestionar un carrito y recorrer un checkout de demostración.

El proyecto está escrito en español y no requiere framework ni instalación de dependencias para ejecutarse localmente. El diseño se adapta a pantallas de distintos tamaños. El catálogo incluye listas de canciones verificadas para los álbumes publicados; *El disco duro* se identifica como no publicado, sin presentar una lista inventada. Soul Intent aparece como álbum asociado a Eminem.

> **Estado:** prototipo educativo. El checkout no cobra, no crea pedidos en un servidor y no debe recibir datos reales.

## Sitio publicado

Puedes abrir MusicStream directamente desde su sitio oficial publicado en Netlify, sin instalar dependencias ni iniciar un servidor local:

[Abrir MusicStream](https://music-strea.netlify.app)

## Estructura del proyecto

```text
music_stream_app_Jennifer_Lopez/
├── index.html                    # Página inicial y catálogo
├── Artist/
│   └── Paulo.html                # Redirección a la ficha nueva de Paulo Londra
├── views/
│   ├── artists.html              # Directorio de artistas
│   ├── artist-detail.html        # Plantilla de perfil: ?artist=<id>
│   ├── album-detail.html         # Plantilla de álbum: ?album=<id>
│   ├── library.html              # Favoritos guardados localmente
│   ├── cart.html                  # Carrito
│   ├── payment.html               # Formulario de checkout de demostración
│   ├── success.html               # Resumen del pedido local de demostración
│   └── player.html                # Reproductor de audio de muestra
├── Js/
│   └── store.js                   # Datos del catálogo y lógica de la aplicación
├── Css/
│   ├── main.css                   # Estilos compartidos, encabezado y catálogo
│   ├── artists.css                # Directorio y perfiles de artistas
│   ├── album-details.css          # Detalle del álbum y lista de canciones
│   ├── library.css                # Biblioteca de favoritos
│   ├── cart.css                   # Carrito
│   ├── payment.css                # Checkout de demostración
│   ├── success.css                # Confirmación de compra
│   └── player.css                 # Reproductor
├── css-artist/
│   └── Paulo.css                  # Estilos de la página antigua de Paulo
├── Assets/
│   ├── Art/                       # Fotografías de artistas
│   ├── img/                       # Portadas y otras imágenes
│   ├── icons/                     # Iconos, logotipo y favicon
│   └── sounds/                    # Audio disponible en el prototipo
└── README.md
```

## Módulos y responsabilidades

### Catálogo — `index.html`

- Presenta las tarjetas de los álbumes y sus precios.
- Permite buscar por texto entre los álbumes mostrados.
- Cada tarjeta enlaza a `views/album-detail.html?album=<id>` y permite agregar el álbum al carrito.
- El sidebar lleva a la biblioteca, al carrito y al directorio de artistas.

### Datos y lógica — `Js/store.js`

Es el módulo JavaScript compartido por las páginas. Contiene:

- **Catálogo:** productos, precios, portadas y listas de canciones en `PRODUCTS`.
- **Artistas:** nombres, biografías, géneros e imágenes en `ARTISTS`.
- **Detalle de álbum:** selecciona el álbum usando el parámetro `album`, muestra sus canciones y enlaza a la ficha del artista.
- **Artistas:** genera el directorio y las fichas usando el parámetro `artist`. Las canciones destacadas y los álbumes se derivan de los datos del catálogo.
- **Favoritos y compartir:** guarda álbumes/artistas favoritos en el navegador; comparte la URL con la función del navegador o la copia al portapapeles cuando está disponible.
- **Carrito:** agregar, quitar y cambiar cantidades; actualiza el indicador, subtotal, impuesto de demostración y total.
- **Checkout y confirmación:** valida los campos en el navegador y muestra un resumen local de los álbumes, cantidades y totales.
- **Almacenamiento:** maneja errores de lectura y escritura en `localStorage`.

Claves locales usadas:

| Clave | Contenido |
|---|---|
| `musicstream-cart` | Álbumes y cantidades del carrito |
| `musicstream-favorites` | Identificadores de álbumes y artistas favoritos |
| `musicstream-last-order` | Último resumen de compra de demostración; no incluye datos de tarjeta o dirección |

### Artistas

- `views/artists.html` lista los artistas que tienen álbumes en el catálogo.
- `views/artist-detail.html?artist=<id>` muestra la fotografía disponible, una descripción, canciones destacadas y álbumes asociados.
- Las imágenes se asignan en `ARTISTS` dentro de `Js/store.js`; sus rutas apuntan a `Assets/Art/`.
- `Artist/Paulo.html` conserva una redirección para enlaces antiguos a la página de Paulo Londra.

### Álbumes y reproducción

- `views/album-detail.html?album=<id>` es una plantilla compartida para todos los álbumes.
- Cada canción muestra título y duración cuando el dato está disponible.
- El reproductor utiliza el elemento nativo `<audio>` del navegador. La reproducción está limitada al audio que existe en `Assets/sounds/`; añadir más listas no agrega audio automáticamente.

### Compra de demostración

- `views/cart.html` muestra artículos, cantidades y resumen.
- `views/payment.html` valida en el navegador datos ficticios de tarjeta y facturación. Los campos se usan solo durante esa página y no se envían ni guardan.
- `views/success.html` presenta la última orden de demostración guardada localmente.
- El precio de ejemplo es **Q100.00 por álbum** y el cálculo aplica un **6% de impuesto de demostración**.
- No existe un servidor, proveedor de pagos, inventario ni persistencia compartida entre dispositivos.

### Estilos y recursos

- `Css/main.css` contiene los estilos compartidos, la navegación y el diseño del catálogo.
- Las demás hojas en `Css/` corresponden a sus páginas o módulos.
- `Assets/Art/` contiene las fotografías de artistas; `Assets/img/` contiene portadas; `Assets/icons/` agrupa iconos y favicons; `Assets/sounds/` guarda el audio disponible.

## Cómo ejecutarlo localmente

No hay un proceso de compilación ni dependencias que instalar. Desde la raíz del proyecto, inicia un servidor estático:

```powershell
python -m http.server 8000
```

Abre <http://localhost:8000> en el navegador. También se puede usar la extensión Live Server de VS Code. Se recomienda un servidor local en lugar de abrir los HTML directamente para que las rutas y las funciones del navegador trabajen de forma consistente.

## Fuentes de las listas de canciones

Las listas se cotejaron con las ediciones publicadas de [Back to the game](https://www.deezer.com/album/374050677), [VERSUS](https://www.deezer.com/album/720363791), [Visualízate](https://www.deezer.com/album/12920706), [÷](https://www.deezer.com/album/15478674), [The Eminem Show](https://www.deezer.com/album/103248) y [Recovery](https://www.deezer.com/album/595243). El lanzamiento de *Soul Intent* de 1995 y sus canciones están registrados en [MusicBrainz](https://musicbrainz.org/release/2e7c035b-af5b-4d4b-8d04-7fdf4e85696c).

## Alcance y requisitos antes de producción

Este repositorio es una maqueta de frontend, no una tienda lista para operar. Antes de usarla para ventas reales se necesitaría, como mínimo:

1. Un backend con catálogo, precios, inventario, pedidos y validaciones del lado del servidor.
2. Integración con un proveedor de pagos compatible; nunca recibir ni guardar números de tarjeta o CVC directamente en este sitio.
3. Autenticación y almacenamiento seguro si se necesitan cuentas o bibliotecas sincronizadas.
4. HTTPS, encabezados de seguridad, gestión de secretos y configuración de despliegue.
5. Pruebas automatizadas para catálogo, carrito, checkout y navegación; actualmente el proyecto no incluye una suite de pruebas, linter ni pipeline de integración continua.
6. Revisión de accesibilidad, compatibilidad entre navegadores, derechos de uso de imágenes/audio, privacidad, impuestos y condiciones de venta.

El carrito, los favoritos y el pedido de demostración residen en el almacenamiento del navegador. Pueden borrarse, modificarse o no estar disponibles en otro dispositivo, así que no deben considerarse datos de una transacción real.
