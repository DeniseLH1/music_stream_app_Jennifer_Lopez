const PRODUCTS = [
    { id: "homerun", title: "Homerun", artist: "Paulo Londra", price: 10000, image: "homerun.jpeg" },
    { id: "back-to-the-game", title: "Back to the game", artist: "Paulo Londra", price: 10000, image: "back-to-the-game.jpeg" },
    { id: "versus", title: "Versus", artist: "Paulo Londra", price: 10000, image: "versus.avif" },
    { id: "visualizate", title: "Visualízate", artist: "Gente de Zona", price: 10000, image: "visualizate.jpeg" },
    { id: "divide", title: "Divide", artist: "Ed Sheeran", price: 10000, image: "divide.jpg" },
    { id: "disco-duro", title: "El disco duro", artist: "Daddy Yankee", price: 10000, image: "Disco-duro.jpeg" },
    { id: "eminem-show", title: "The Eminem Show", artist: "Eminem", price: 10000, image: "eminen-show.jpg" },
    { id: "recovery", title: "Recovery", artist: "Eminem", price: 10000, image: "recovery.jpeg" },
    { id: "soul-intent", title: "Soul Intent", artist: "Eminem", price: 10000, image: "soul intent.jpeg" }
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
