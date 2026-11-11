# MusicStream

MusicStream es un prototipo de tienda y reproductor de música creado con HTML, CSS y JavaScript nativo. Las pantallas están separadas en páginas y cada vista tiene su propia hoja de estilos; `Css/main.css` reúne los estilos que se comparten, como el encabezado y la navegación.

## Estructura actual

```text
music_stream_app_Jennifer_Lopez/
├── index.html                 # Catálogo de álbumes
├── Artist/
│   └── Paulo.html             # Página del artista Paulo Londra
├── views/
│   ├── album-detail.html      # Detalle de Homerun y canciones
│   ├── player.html            # Reproductor y canciones siguientes
│   ├── cart.html              # Vista del carrito
│   ├── payment.html           # Formulario de pago y resumen
│   └── success.html           # Confirmación de compra
├── Css/
│   ├── main.css               # Estilos compartidos
│   ├── album-details.css      # Detalle del álbum
│   ├── cart.css               # Carrito
│   ├── payment.css            # Pago
│   ├── player.css             # Reproductor
│   └── success.css            # Confirmación
├── css-artist/
│   └── Paulo.css              # Artista
├── Js/
│   └── store.js               # Catálogo, carrito y checkout de demostración
└── Assets/
    ├── Art/                   # Imagen del artista
    ├── icons/                 # Logo, iconos y favicon
    ├── img/                   # Portadas de álbumes
    └── sounds/                # Archivo de audio
```

## Recorrido entre pantallas

Desde `index.html` se pueden buscar álbumes y agregarlos al carrito. El carrito conserva sus productos y cantidades en el almacenamiento local del navegador, y permite modificarlos antes de continuar al checkout de demostración. Al confirmar, se calcula el resumen, se guarda un pedido local y se muestra la confirmación. El detalle de Homerun también permite agregarlo al carrito. La página de Paulo Londra está en `Artist/Paulo.html`.

Las rutas entre vistas y recursos son relativas a la ubicación de cada archivo. Al agregar nuevas páginas o mover recursos, hay que actualizar esas rutas y sus enlaces correspondientes.

## Cómo está construido

- El contenido y las vistas están escritos directamente en HTML; `Js/store.js` conecta el catálogo, carrito y checkout.
- Los estilos específicos permanecen en `Css/` o `css-artist/`; los elementos compartidos se definen en `Css/main.css`.
- Las portadas, iconos y audio se cargan desde `Assets/`.
- El reproductor utiliza el control nativo `<audio>` del navegador.
- El precio de prueba es Q100.00 por álbum y el resumen aplica un impuesto de demostración del 6%.

## Probar localmente

Abre el proyecto desde un servidor local en lugar de abrir los HTML directamente. Por ejemplo, desde la raíz del proyecto ejecuta `python -m http.server 8000` y visita `http://localhost:8000`.

El checkout es solo una demostración local: muestra campos de tarjeta y facturación para practicar con datos inventados, pero no cobra ni envía esos campos a un servidor. La información de tarjeta y dirección solo existe mientras la página está abierta; el pedido guardado incluye únicamente los álbumes, cantidades y totales. No ingreses datos reales. Para vender de verdad se necesita un backend y un proveedor de pagos seguro.
