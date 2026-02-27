// Mock Data for Products
const products = [
    {
        id: 1,
        brand: "Apple",
        name: "iPhone 15 Pro Max",
        price: 499999,
        image: "https://shop.apple.com/v/iphone/home/bu/images/overview/select/iphone_15_pro_max_natural_titanium__e51g3b6n2566_large.png"
    },
    {
        id: 2,
        brand: "Samsung",
        name: "Galaxy S24 Ultra",
        price: 439999,
        image: "https://images.samsung.com/is/image/samsung/p6pim/pk/sm-s928bztqmea/gallery/pk-galaxy-s24-s928-sm-s928bztqmea-539423531?$650_519_PNG$"
    },
    {
        id: 3,
        brand: "Google",
        name: "Pixel 8 Pro",
        price: 289999,
        image: "https://lh3.googleusercontent.com/zWzY1mI9Z8u4yW1H2k8_UeD_3Xf8E0G_E-N7i0Fw9D_4GfB_zXq9W_a_8yQ2D6aF8W9D_4GfB_zXq9W_a_8yQ2D6aF8W9D_4GfB_zXq9W" // Fallback handled via css placeholder if needed
    },
    {
        id: 4,
        brand: "OnePlus",
        name: "OnePlus 12",
        price: 250000,
        image: "https://oasis.opstatics.com/content/dam/oasis/page/2023/global/product/wats/green.png"
    },
    {
        id: 5,
        brand: "Xiaomi",
        name: "Xiaomi 14 Ultra",
        price: 350000,
        image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1708688432.18134768.png"
    },
    {
        id: 6,
        brand: "Samsung",
        name: "Galaxy Z Fold 5",
        price: 489999,
        image: "https://images.samsung.com/is/image/samsung/p6pim/pk/sm-f946bzkgmea/gallery/pk-galaxy-z-fold5-f946-sm-f946bzkgmea-537418701?$650_519_PNG$"
    }
];

// Fallback images logic
const fallbackImg = "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3e%3crect width='200' height='200' fill='%23252525'/%3e%3ctext x='50%25' y='50%25' font-family='sans-serif' font-size='20' fill='%23a0a0a0' text-anchor='middle' dominant-baseline='middle'%3eSmartphone%3c/text%3e%3c/svg%3e";

// Format currency
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0
    }).format(price);
};

// Render Products
const renderProducts = () => {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='${fallbackImg}';">
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
            </div>
            <button class="btn add-to-cart" onclick="addToCart(${product.id})">
                <i class="fa-solid fa-cart-plus"></i> &nbsp; Add to Cart
            </button>
        `;
        productGrid.appendChild(card);
    });
};

// Cart Logic
let cart = [];

const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');

// Toggle Cart Sidebar
const openCart = () => {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('show');
};

const closeCart = () => {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('show');
};

cartIcon.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Add to Cart
const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
        openCart();
    }
};

// Remove from Cart
const removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCart();
};

// Update Cart UI
const updateCart = () => {
    // Update Count
    cartCount.textContent = cart.length;

    // Update Items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty.</div>';
        cartTotalPrice.textContent = 'Rs 0';
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='${fallbackImg}';">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });

    // Update Total
    cartTotalPrice.textContent = formatPrice(total);
};

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Thank you for choosing SK Mobile Zone! Proceeding to the checkout page...');
        cart = [];
        updateCart();
        closeCart();
    } else {
        alert('Your cart is empty!');
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.padding = '0.8rem 0';
        header.style.background = 'rgba(13, 13, 13, 0.95)';
    } else {
        header.style.padding = '1.2rem 0';
        header.style.background = 'rgba(13, 13, 13, 0.85)';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
