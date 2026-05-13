// --- PHẦN 1: QUẢN LÝ SLIDER (ĐÃ SỬA LỖI VẤP) ---
let slideIndex = 0;
let isPaused = false;
let slideInterval;
const duration = 4000;

const slides = document.querySelectorAll('.slide');
const bars = document.querySelectorAll('.bar');
const btnIcon = document.getElementById('btnIcon');

function showSlides(n) {
    const wrapper = document.getElementById('sliderWrapper');
    // Nếu không có slider (như ở trang danh mục) thì thoát luôn để tránh lỗi
    if (!wrapper || slides.length === 0) return; 

    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    wrapper.style.transform = `translateX(${-slideIndex * 100}%)`;

    bars.forEach(bar => bar.classList.remove('active'));
    if (bars[slideIndex]) {
        bars[slideIndex].classList.add('active');
    }
}

function nextSlide() {
    slideIndex++;
    showSlides(slideIndex);
}

function startAutoPlay() {
    const wrapper = document.getElementById('sliderWrapper');
    if (wrapper) { // Chỉ chạy nếu có slider
        slideInterval = setInterval(nextSlide, duration);
    }
}

function stopAutoPlay() {
    clearInterval(slideInterval);
}

// Chạy slide ngay khi load trang index
startAutoPlay();

// --- PHẦN 2: QUẢN LÝ GIỎ HÀNG (DÙNG CHUNG CHO MỌI TRANG) ---

function addToCartFromModal() {
    // 1. Lấy thông tin từ Modal
    const nameEle = document.getElementById('modal-name');
    const priceEle = document.getElementById('modal-price-big');
    const imgEle = document.getElementById('modal-img');

    if (!nameEle || !priceEle) return; // Bảo vệ nếu không tìm thấy phần tử

    const name = nameEle.innerText;
    const priceText = priceEle.innerText;
    const img = imgEle ? imgEle.src : "";

    // 2. Chuyển giá "195.000đ" -> 195000
    const price = parseInt(priceText.replace(/\D/g, ''));

    // 3. Xử lý LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image: img, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // 4. Cập nhật con số hiển thị và thông báo
    updateCartCount();
    alert("Đã thêm " + name + " vào giỏ hàng thành công!");
    closeModal();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartBadge = document.getElementById('cart-count');
    // Chỉ cập nhật nếu trang có cái icon giỏ hàng (id="cart-count")
    if (cartBadge) {
        cartBadge.innerText = total;
    }
}

function closeModal() {
    const modal = document.getElementById('detail-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Luôn cập nhật số lượng giỏ hàng mỗi khi tải trang bất kỳ
document.addEventListener('DOMContentLoaded', updateCartCount);