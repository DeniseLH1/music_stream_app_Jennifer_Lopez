const PRODUCTS = [
    {
        id: "homerun", title: "Homerun", artist: "Paulo Londra", price: 10000, image: "homerun.jpeg",
        description: "Homerun es el álbum debut del cantautor argentino Paulo Londra, lanzado en 2019. Incluye canciones como “Adán y Eva” y “Nena maldición”.",
        playableTrackIndexes: [0],
        tracks: [
            ["Adán y Eva", "4:17"], ["Homerun", "2:30"], ["Tal Vez", "4:24"], ["No puedo", "2:55"],
            ["Por eso vine", "2:57"], ["Sólo pienso en ti", "3:51"], ["Forever alone", "3:53"],
            ["Condenado para el millon", "3:42"], ["Nena maldicion", "3:47"], ["Dimelo", "2:47"],
            ["Chica paranormal", "3:16"], ["Maldita abusadora", "3:10"], ["Querido amigo", "2:48"],
            ["Luna llena", "3:00"]
        ]
    },
    {
        id: "back-to-the-game", title: "Back to the game", artist: "Paulo Londra", price: 10000, image: "back-to-the-game.jpeg",
        tracks: [
            ["Chango", "2:34"], ["Plan A", "2:58"], ["Party en el Barrio", "3:56"], ["Luces", "2:52"],
            ["Por Deporte", "2:49"], ["Noche de Novela", "3:11"], ["Nublado", "2:57"], ["A Veces", "3:11"],
            ["Cansado", "3:01"], ["Tenso", "2:50"], ["Ella", "3:33"], ["Julieta", "3:04"],
            ["Ojalá", "2:45"], ["Necio", "3:38"], ["Chance", "3:24"], ["Toc Toc", "2:37"]
        ]
    },
    {
        id: "versus", title: "Versus", artist: "Paulo Londra", price: 10000, image: "versus.avif",
        tracks: [["SIN CADENAS", "2:22"], ["MI VERSIÓN", "2:38"], ["NEXT", "2:01"], ["GLAMPING", "2:21"], ["PVSL", "3:02"], ["GRACIAS", "1:59"]]
    },
    {
        id: "visualizate", title: "Visualízate", artist: "Gente de Zona", price: 10000, image: "visualizate.jpeg",
        tracks: [
            ["La Gozadera (feat. Marc Anthony)", "3:23"], ["Algo Contigo", "3:29"],
            ["Piensas (Dile la Verdad) (feat. Gente de Zona)", "3:48"], ["Por Ti", "3:30"],
            ["La Tentación", "3:18"], ["Que Tú Quieres", "3:40"], ["Más Whisky (feat. Motiff & A&M)", "3:30"],
            ["Tú Me Quemas (feat. Gente de Zona & Los Cadillacs)", "4:29"],
            ["Yo Quiero (Si Tu Te Enamoras) (feat. Pitbull)", "3:28"], ["Traidora (feat. Marc Anthony)", "3:32"],
            ["Tu y Yo", "3:38"], ["La Gozadera (feat. Marc Anthony) Salsa Version", "3:24"],
            ["Traidora (feat. Marc Anthony) Salsa Version", "4:00"]
        ]
    },
    {
        id: "divide", title: "Divide", artist: "Ed Sheeran", price: 10000, image: "divide.jpg",
        tracks: [
            ["Eraser", "3:47"], ["Castle on the Hill", "4:21"], ["Dive", "3:58"], ["Shape of You", "3:53"],
            ["Perfect", "4:23"], ["Galway Girl", "2:50"], ["Happier", "3:27"], ["New Man", "3:09"],
            ["Hearts Don't Break Around Here", "4:08"], ["What Do I Know?", "3:57"],
            ["How Would You Feel (Paean)", "4:40"], ["Supermarket Flowers", "3:41"]
        ]
    },
    {
        id: "disco-duro", title: "El disco duro", artist: "Daddy Yankee", price: 10000, image: "Disco-duro.jpeg",
        description: "El disco fue anunciado, pero no se publicó como un álbum oficial. Los sencillos relacionados no forman una lista completa confirmada.",
        tracklistMessage: "Este álbum no se publicó y no cuenta con una lista oficial completa de canciones."
    },
    {
        id: "eminem-show", title: "The Eminem Show", artist: "Eminem", price: 10000, image: "eminen-show.jpg",
        tracks: [
            ["Curtains Up (Skit)", "0:29"], ["White America", "5:24"], ["Business", "4:11"],
            ["Cleanin' Out My Closet", "4:57"], ["Square Dance", "5:23"], ["The Kiss (Skit)", "1:15"],
            ["Soldier", "3:46"], ["Say Goodbye Hollywood", "4:32"], ["Drips", "4:45"],
            ["Without Me", "4:50"], ["Paul Rosenberg (Skit)", "0:22"], ["Sing For The Moment", "5:39"],
            ["Superman", "5:50"], ["Hailie's Song", "5:20"], ["Steve Berman (Skit)", "0:33"],
            ["When The Music Stops", "4:29"], ["Say What You Say", "5:09"], ["Till I Collapse", "4:57"],
            ["My Dad's Gone Crazy", "4:27"], ["Curtains Close", "1:01"]
        ]
    },
    {
        id: "recovery", title: "Recovery", artist: "Eminem", price: 10000, image: "recovery.jpeg",
        tracks: [
            ["Cold Wind Blows", "5:04"], ["Talkin’ 2 Myself", "5:00"], ["On Fire", "3:33"],
            ["Won't Back Down", "4:26"], ["W.T.P.", "3:58"], ["Going Through Changes", "4:59"],
            ["Not Afraid", "4:11"], ["Seduction", "4:35"], ["No Love", "5:00"], ["Space Bound", "4:39"],
            ["Cinderella Man", "4:39"], ["25 To Life", "4:02"], ["So Bad", "5:25"],
            ["Almost Famous", "4:52"], ["Love The Way You Lie", "4:23"], ["You’re Never Over", "5:06"],
            ["Untitled", "3:14"]
        ]
    },
    {
        id: "soul-intent", title: "Soul Intent", artist: "Soul Intent", price: 10000, image: "soul intent.jpeg",
        description: "Soul Intent fue un grupo de hip hop de Detroit asociado a Eminem y Proof. Su lanzamiento de 1995 contiene dos canciones.",
        tracks: [["F#@!in' Backstabber", "4:45"], ["Biterphobia", "3:38"]]
    }
];

const CART_KEY = "musicstream-cart";
const ORDER_KEY = "musicstream-last-order";
const TAX_RATE = 0.06;
const currency = new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
    minimumFractionDigits: 2
});

function formatPrice(cents) {
    return currency.format(cents / 100);
}

function announce(message, type = "info") {
    let notice = document.querySelector("[data-store-notice]");

    if (!notice) {
        notice = document.createElement("p");
        notice.dataset.storeNotice = "";
        notice.setAttribute("role", "status");
        notice.setAttribute("aria-live", "polite");
        document.querySelector("main")?.prepend(notice);
    }

    notice.dataset.type = type;
    notice.textContent = message;
}

function readStorage(key) {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error(`MusicStream could not read ${key} from local storage.`, error);
        announce("No se pudo acceder al almacenamiento local. Revisa la configuración del navegador.", "error");
        return null;
    }
}

function writeStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`MusicStream could not save ${key} to local storage.`, error);
        announce("No se pudieron guardar los cambios. Revisa el espacio disponible y la configuración del navegador.", "error");
        return false;
    }
}

function getCart() {
    const stored = readStorage(CART_KEY);
    if (!stored) return [];

    try {
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) throw new TypeError("Cart data must be an array.");

        return parsed.flatMap((entry) => {
            const product = PRODUCTS.find((item) => item.id === entry.id);
            const quantity = Number(entry.quantity);
            if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) return [];
            return [{ id: product.id, quantity }];
        });
    } catch (error) {
        console.error("MusicStream found invalid cart data in local storage.", error);
        announce("El carrito guardado estaba dañado y se inició uno nuevo.", "error");
        writeStorage(CART_KEY, []);
        return [];
    }
}

function saveCart(cart) {
    if (!writeStorage(CART_KEY, cart)) return false;
    updateCartCount(cart);
    return true;
}

function updateCartCount(cart = getCart()) {
    document.querySelectorAll("[data-cart-count]").forEach((counter) => {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        counter.textContent = String(count);
        counter.hidden = count === 0;
        counter.setAttribute("aria-label", `${count} productos en el carrito`);
    });
}

function addToCart(id, quantity = 1) {
    const product = PRODUCTS.find((item) => item.id === id);
    if (!product) {
        announce("No se pudo agregar ese álbum al carrito.", "error");
        return false;
    }

    const cart = getCart();
    const existing = cart.find((item) => item.id === id);
    if (existing) {
        existing.quantity = Math.min(99, existing.quantity + quantity);
    } else {
        cart.push({ id, quantity });
    }

    if (!saveCart(cart)) return false;
    announce(`${product.title} se agregó al carrito.`, "success");
    return true;
}

function getOrderTotals(cart) {
    const subtotal = cart.reduce((total, entry) => {
        const product = PRODUCTS.find((item) => item.id === entry.id);
        return total + (product ? product.price * entry.quantity : 0);
    }, 0);
    const tax = Math.round(subtotal * TAX_RATE);
    return { subtotal, tax, total: subtotal + tax };
}

function renderCart() {
    const container = document.querySelector("[data-cart-items]");
    if (!container) return;

    const cart = getCart();
    const checkoutButton = document.querySelector("[data-checkout]");
    container.replaceChildren();

    if (cart.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-cart";
        const title = document.createElement("h2");
        title.textContent = "Tu carrito está esperando música";
        const message = document.createElement("p");
        message.textContent = "Explora la tienda y agrega los álbumes que quieras llevar contigo.";
        const link = document.createElement("a");
        link.className = "continue-link";
        link.href = "../index.html";
        link.textContent = "Volver a la tienda";
        empty.append(title, message, link);
        container.append(empty);
        if (checkoutButton) checkoutButton.disabled = true;
    } else {
        if (checkoutButton) checkoutButton.disabled = false;
        cart.forEach((entry) => {
            const product = PRODUCTS.find((item) => item.id === entry.id);
            const card = document.createElement("article");
            card.className = "cart-card";

            const image = document.createElement("img");
            image.className = "item-thumb";
            image.src = `../Assets/img/${product.image}`;
            image.alt = `Portada de ${product.title}`;

            const details = document.createElement("div");
            details.className = "item-details";
            const title = document.createElement("h3");
            title.textContent = product.title;
            const artist = document.createElement("p");
            artist.textContent = product.artist;
            const tag = document.createElement("span");
            tag.className = "format-tag";
            tag.textContent = "Álbum digital · Demo";
            details.append(title, artist, tag);

            const controls = document.createElement("div");
            controls.className = "item-controls";
            const decrease = document.createElement("button");
            decrease.className = "qty-btn";
            decrease.type = "button";
            decrease.dataset.cartAction = "decrease";
            decrease.dataset.productId = product.id;
            decrease.setAttribute("aria-label", `Quitar una unidad de ${product.title}`);
            decrease.textContent = "−";
            const quantity = document.createElement("span");
            quantity.className = "qty-number";
            quantity.textContent = String(entry.quantity);
            const increase = document.createElement("button");
            increase.className = "qty-btn";
            increase.type = "button";
            increase.dataset.cartAction = "increase";
            increase.dataset.productId = product.id;
            increase.setAttribute("aria-label", `Agregar una unidad de ${product.title}`);
            increase.textContent = "+";
            controls.append(decrease, quantity, increase);

            const price = document.createElement("div");
            price.className = "item-price";
            const lineTotal = document.createElement("span");
            lineTotal.textContent = formatPrice(product.price * entry.quantity);
            const remove = document.createElement("button");
            remove.className = "delete-btn";
            remove.type = "button";
            remove.dataset.cartAction = "remove";
            remove.dataset.productId = product.id;
            remove.setAttribute("aria-label", `Quitar ${product.title} del carrito`);
            remove.textContent = "Quitar";
            price.append(lineTotal, remove);

            card.append(image, details, controls, price);
            container.append(card);
        });
    }

    renderTotals(getOrderTotals(cart));
    updateCartCount(cart);
}

function renderTotals(totals, root = document) {
    root.querySelectorAll("[data-subtotal]").forEach((node) => {
        node.textContent = formatPrice(totals.subtotal);
    });
    root.querySelectorAll("[data-tax]").forEach((node) => {
        node.textContent = formatPrice(totals.tax);
    });
    root.querySelectorAll("[data-total]").forEach((node) => {
        node.textContent = formatPrice(totals.total);
    });
}

function renderCheckout() {
    const container = document.querySelector("[data-checkout-items]");
    if (!container) return;

    const cart = getCart();
    container.replaceChildren();

    cart.forEach((entry) => {
        const product = PRODUCTS.find((item) => item.id === entry.id);
        const row = document.createElement("div");
        row.className = "summary-item";
        const image = document.createElement("img");
        image.src = `../Assets/img/${product.image}`;
        image.alt = `Portada de ${product.title}`;
        const info = document.createElement("div");
        info.className = "item-info";
        const title = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = product.title;
        title.append(strong);
        const artist = document.createElement("small");
        artist.textContent = `${product.artist} · Cantidad: ${entry.quantity}`;
        info.append(title, artist);
        const price = document.createElement("span");
        price.className = "price";
        price.textContent = formatPrice(product.price * entry.quantity);
        row.append(image, info, price);
        container.append(row);
    });

    renderTotals(getOrderTotals(cart));
    const submit = document.querySelector("[data-place-order]");
    if (submit) submit.disabled = cart.length === 0;
    if (cart.length === 0) {
        announce("Tu carrito está vacío. Agrega un álbum antes de continuar.", "error");
    }
}

function renderSuccess() {
    const receipt = document.querySelector("[data-order-receipt]");
    if (!receipt) return;

    const stored = readStorage(ORDER_KEY);
    if (!stored) {
        document.querySelector("[data-success-title]").textContent = "Aún no hay una compra de prueba";
        document.querySelector("[data-success-message]").textContent = "Completa el checkout de demostración para ver aquí el resumen de tu pedido.";
        receipt.hidden = true;
        return;
    }

    try {
        const order = JSON.parse(stored);
        if (!Array.isArray(order.items) || !order.items.length || !order.id) {
            throw new TypeError("Order data is incomplete.");
        }

        const list = document.querySelector("[data-order-items]");
        list.replaceChildren();
        order.items.forEach((entry) => {
            const product = PRODUCTS.find((item) => item.id === entry.id);
            if (!product) return;

            const row = document.createElement("div");
            row.className = "receipt-item";
            const image = document.createElement("img");
            image.src = `../Assets/img/${product.image}`;
            image.alt = `Portada de ${product.title}`;
            const details = document.createElement("div");
            details.className = "receipt-text";
            const title = document.createElement("p");
            const strong = document.createElement("strong");
            strong.textContent = product.title;
            title.append(strong);
            const artist = document.createElement("small");
            artist.textContent = `${product.artist} · Cantidad: ${entry.quantity}`;
            details.append(title, artist);
            const price = document.createElement("span");
            price.className = "receipt-price";
            price.textContent = formatPrice(product.price * entry.quantity);
            row.append(image, details, price);
            list.append(row);
        });

        document.querySelector("[data-order-id]").textContent = order.id;
        renderTotals(order.totals, receipt);
    } catch (error) {
        console.error("MusicStream found invalid order data in local storage.", error);
        document.querySelector("[data-success-title]").textContent = "No se pudo cargar el pedido";
        document.querySelector("[data-success-message]").textContent = "El resumen de esta compra de prueba no está disponible. Puedes iniciar un nuevo recorrido desde la tienda.";
        receipt.hidden = true;
    }
}

function renderAlbumDetail() {
    const cover = document.querySelector("[data-album-cover]");
    if (!cover) return;

    const albumId = new URLSearchParams(window.location.search).get("album") || "homerun";
    const product = PRODUCTS.find((item) => item.id === albumId);
    if (!product) {
        window.location.replace("../index.html");
        return;
    }

    document.title = `${product.title} · MusicStream`;
    cover.src = `../Assets/img/${product.image}`;
    cover.alt = `Portada de ${product.title}`;
    document.querySelector("[data-album-title]").textContent = product.title;
    document.querySelector("[data-album-artist]").textContent = product.artist;

    const addButton = document.querySelector("[data-add-to-cart]");
    addButton.dataset.addToCart = product.id;
    addButton.dataset.defaultLabel = `Agregar álbum al carrito - ${formatPrice(product.price)}`;
    addButton.textContent = addButton.dataset.defaultLabel;

    const breadcrumb = document.querySelector("[data-album-breadcrumb]");
    breadcrumb.textContent = product.title;

    const trackContainer = document.querySelector("[data-track-rows]");
    const playerBar = document.querySelector(".player-bar");
    const artistBio = document.querySelector("[data-artist-bio]");
    trackContainer.replaceChildren();

    if (!product.tracks) {
        const empty = document.createElement("p");
        empty.className = "tracklist-empty";
        empty.textContent = product.tracklistMessage || "La lista de canciones no está disponible por ahora.";
        trackContainer.append(empty);
        playerBar.hidden = true;
        artistBio.textContent = product.description || product.artist;
        return;
    }

    playerBar.hidden = !product.playableTrackIndexes?.length;
    artistBio.textContent = product.description || product.artist;
    product.tracks.forEach((track, index) => {
        const title = Array.isArray(track) ? track[0] : track;
        const duration = Array.isArray(track) ? track[1] || "—" : "—";
        const row = document.createElement("div");
        row.className = "track-row";
        const number = document.createElement("span");
        number.textContent = String(index + 1);
        const trackTitle = document.createElement("span");
        trackTitle.className = "t-title";
        trackTitle.textContent = title;
        const artist = document.createElement("span");
        artist.textContent = product.artist;
        const time = document.createElement("span");
        time.textContent = duration;
        row.append(number, trackTitle, artist, time);

        if (product.playableTrackIndexes?.includes(index)) {
            const link = document.createElement("a");
            link.href = "../views/player.html";
            link.className = "link";
            link.append(row);
            trackContainer.append(link);
        } else {
            trackContainer.append(row);
        }
    });
}

document.addEventListener("click", (event) => {
    const checkoutButton = event.target.closest("[data-checkout]");
    if (checkoutButton) {
        if (getCart().length === 0) {
            announce("Tu carrito está vacío. Agrega un álbum antes de continuar.", "error");
            return;
        }
        window.location.href = "payment.html";
        return;
    }

    const addButton = event.target.closest("[data-add-to-cart]");
    if (addButton) {
        if (addToCart(addButton.dataset.addToCart)) {
            const originalLabel = addButton.dataset.defaultLabel ?? addButton.textContent;
            addButton.dataset.defaultLabel = originalLabel;
            addButton.textContent = "Agregado ✓";
            window.setTimeout(() => {
                addButton.textContent = originalLabel;
            }, 1400);
        }
        return;
    }

    const cartButton = event.target.closest("[data-cart-action]");
    if (!cartButton) return;

    const cart = getCart();
    const entry = cart.find((item) => item.id === cartButton.dataset.productId);
    if (!entry) return;

    switch (cartButton.dataset.cartAction) {
        case "increase":
            entry.quantity = Math.min(99, entry.quantity + 1);
            break;
        case "decrease":
            if (entry.quantity <= 1) {
                announce("La cantidad mínima es una unidad. Usa “Quitar” para eliminar el álbum.");
                return;
            }
            entry.quantity -= 1;
            break;
        case "remove":
            cart.splice(cart.indexOf(entry), 1);
            break;
        default:
            return;
    }

    if (saveCart(cart)) renderCart();
});

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderCart();
    renderCheckout();
    renderSuccess();
    renderAlbumDetail();
    document.querySelectorAll("[data-product-price]").forEach((node) => {
        const product = PRODUCTS.find((item) => item.id === node.dataset.productPrice);
        if (product) node.textContent = formatPrice(product.price);
    });

    const search = document.querySelector("[data-album-search]");
    if (search) {
        search.addEventListener("input", () => {
            const query = search.value.trim().toLocaleLowerCase("es");
            document.querySelectorAll(".categoria.card").forEach((card) => {
                card.hidden = !card.textContent.toLocaleLowerCase("es").includes(query);
            });
        });
    }

    const orderForm = document.querySelector("[data-checkout-form]");
    orderForm?.querySelectorAll("[data-demo-card-number], [data-demo-expiration], [data-demo-cvc]").forEach((input) => {
        input.addEventListener("input", () => {
            input.setCustomValidity("");

            if (input.matches("[data-demo-card-number]")) {
                const digits = input.value.replace(/\D/g, "");
                if (digits.length > 0 && (digits.length < 13 || digits.length > 19)) {
                    input.setCustomValidity("Ingresa entre 13 y 19 dígitos para la tarjeta ficticia.");
                }
            }

            if (input.matches("[data-demo-expiration]") && input.value.length > 0) {
                const match = input.value.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
                if (!match) {
                    input.setCustomValidity("Usa el formato MM/AA, por ejemplo 12/99.");
                } else {
                    const month = Number(match[1]);
                    const year = 2000 + Number(match[2]);
                    const now = new Date();
                    if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
                        input.setCustomValidity("Usa una fecha futura para la tarjeta ficticia.");
                    }
                }
            }

            if (input.matches("[data-demo-cvc]") && input.value.length > 0 && !/^\d{3,4}$/.test(input.value)) {
                input.setCustomValidity("El CVC ficticio debe tener 3 o 4 dígitos.");
            }
        });
    });

    orderForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!orderForm.reportValidity()) return;

        const cart = getCart();
        if (cart.length === 0) {
            announce("Tu carrito está vacío. Agrega un álbum antes de continuar.", "error");
            return;
        }

        const order = {
            id: `MS-${Date.now().toString(36).toUpperCase()}`,
            items: cart,
            totals: getOrderTotals(cart),
            createdAt: new Date().toISOString()
        };

        if (!writeStorage(ORDER_KEY, order)) return;
        if (!saveCart([])) return;
        window.location.href = "success.html";
    });
});
