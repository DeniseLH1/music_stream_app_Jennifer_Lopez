# MusicStream

MusicStream es un prototipo de tienda y reproductor de música creado con HTML y CSS. Las pantallas están separadas en páginas y cada vista tiene su propia hoja de estilos; `Css/main.css` reúne los estilos que se comparten, como el encabezado y la navegación.

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
└── Assets/
    ├── Art/                   # Imagen del artista
    ├── icons/                 # Logo, iconos y favicon
    ├── img/                   # Portadas de álbumes
    └── sounds/                # Archivo de audio
```

## Recorrido entre pantallas

Desde `index.html` se abre el detalle del álbum. Desde allí se puede llegar al reproductor o al carrito. El carrito enlaza con el formulario de pago y este con la pantalla de confirmación. La página de Paulo Londra está en `Artist/Paulo.html`.

Las rutas entre vistas y recursos son relativas a la ubicación de cada archivo. Al agregar nuevas páginas o mover recursos, hay que actualizar esas rutas y sus enlaces correspondientes.

## Cómo está construido

- El contenido de cada vista está escrito directamente en su archivo HTML.
- Los estilos específicos permanecen en `Css/` o `css-artist/`; los elementos compartidos se definen en `Css/main.css`.
- Las portadas, iconos y audio se cargan desde `Assets/`.
- El reproductor utiliza el control nativo `<audio>` del navegador.

Por ahora es una maqueta estática: los álbumes, precios y productos del carrito están escritos en el HTML. Los controles de cantidad, eliminación y pago no procesan una compra real; el botón de pago solo navega a la página de confirmación.
