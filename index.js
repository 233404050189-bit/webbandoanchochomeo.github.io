// THANH NGANG VÀ PAUSE
let slideIndex = 0;
let isPaused = false;
let slideInterval;
const duration = 4000; // Thời gian chuyển slide (3 giây)

const slides = document.querySelectorAll('.slide');
const bars = document.querySelectorAll('.bar');
const btnIcon = document.getElementById('btnIcon');

// Hàm hiển thị slide cụ thể
function showSlides(n) {
    // 1. Tìm cái khung chạy ảnh
    const wrapper = document.getElementById('sliderWrapper');
    
    // 2. KIỂM TRA: Nếu trang này không có khung chạy ảnh (như trang Dành cho chó) thì DỪNG LUÔN
    if (!wrapper || slides.length === 0) {
        return; 
    }

    // 3. Nếu có thì mới chạy tiếp các lệnh dưới này
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    // Di chuyển wrapper để trượt ảnh
    wrapper.style.transform = `translateX(${-slideIndex * 100}%)`;

    // Cập nhật trạng thái thanh ngang
    bars.forEach(bar => bar.classList.remove('active'));
    if (bars[slideIndex]) {
        bars[slideIndex].classList.add('active');
    }
}

// Chuyển slide tiếp theo
function nextSlide() {
    slideIndex++;
    showSlides(slideIndex);
}

// Bắt đầu tự động chạy
function startAutoPlay() {
    slideInterval = setInterval(nextSlide, duration);
}

// Dừng tự động chạy
function stopAutoPlay() {
    clearInterval(slideInterval);
}

// Logic cho nút Pause/Play
function togglePlayPause() {
    if (isPaused) {
        // Chuyển sang trạng thái Play
        startAutoPlay();
        btnIcon.className = 'pause-icon'; // Đổi icon thành 2 vạch
        isPaused = false;
    } else {
        // Chuyển sang trạng thái Pause
        stopAutoPlay();
        btnIcon.className = 'play-icon'; // Đổi icon thành hình tam giác
        isPaused = true;
    }
}

// Khi người dùng click trực tiếp vào thanh bar
function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
    // Nếu đang chạy thì reset lại timer để tránh bị chuyển slide ngay lập tức
    if (!isPaused) {
        stopAutoPlay();
        startAutoPlay();
    }
}

// Khởi tạo lần đầu
showSlides(slideIndex);
startAutoPlay();
// ẢNH THỨC ĂN
gsap.registerPlugin(ScrollTrigger);

const comparisonSection = document.querySelector('.comparison-section');
const imgWrapper = document.querySelector('.img-before-wrapper');
const imgBefore = document.querySelector('.img-before');

if (comparisonSection && imgWrapper && imgBefore) {
    // Thiết lập ban đầu
    gsap.set(imgWrapper, { 
        width: "100%", 
        borderRight: "4px solid #ffffff",
        position: "absolute",
        left: 0,
        top: 0
    });
    
    gsap.set(imgBefore, { 
        width: "450px", 
        height: "450px", 
        maxWidth: "none" 
    });

    // HIỆU ỨNG: Thanh trắng chạy từ Phải sang Trái khi lăn chuột
    gsap.to(imgWrapper, {
        width: "0%", // Thay vì 50%, ta để 0% để nó chạy hết qua cái bát luôn
        ease: "none",
        scrollTrigger: {
            trigger: comparisonSection,
            // Bắt đầu khi cái bát vừa xuất hiện
            start: "top center", 
            // Kết thúc khi cái bát chuẩn bị trôi khỏi màn hình
            // Bạn có thể chỉnh "+=500" (cuộn thêm 500px nữa) để thanh chạy chậm lại
            end: "bottom center", 
            scrub: true, 
            markers: false 
        }
    });
}
// MENU
document.addEventListener('DOMContentLoaded', () => {
    // Xử lý tự động cuộn khi click vào các mục có ID (#)
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100, // Cách mép trên 100px để không bị che
                    behavior: 'smooth'
                });
            }
        }, 500);
    }
});
// Chờ trang web tải xong hoàn toàn rồi mới chạy
document.addEventListener('DOMContentLoaded', () => {
    
    const togglePassword = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#password');

    // Kiểm tra nếu có nút thì mới gắn lệnh
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            // Đổi qua lại giữa hiện (text) và ẩn (password)
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Đổi hình icon con mắt
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
});



// 2. Hàm hiển thị sản phẩm ra Grid
function initStore() {
    const container = document.getElementById('featured-products-container');
    if (!container) return;

    container.innerHTML = myProducts.map(p => `
        <div class="food-card" onclick="openModal(${p.id})">
            <div class="image-wrapper">
                <img class="img-main" src="${p.imgMain}">
                <img class="img-hover" src="${p.imgHover}">
            </div>
            <div class="card-info">
                <h3>${p.name}</h3>
                <p class="price">${p.price}</p>
            </div>
        </div>
    `).join('');
}

// 3. Logic đóng/mở Modal
const modal = document.getElementById('detail-modal');

window.openModal = (id) => {
    // 1. Tìm dữ liệu sản phẩm dựa trên ID
    const p = myProducts.find(item => item.id === id);

    // 2. Đổ thông tin vào Modal
    document.getElementById('modal-name').innerText = p.name;
    document.getElementById('modal-price-big').innerText = p.price;
    document.getElementById('modal-desc').innerText = p.desc;
    document.getElementById('modal-img').src = p.imgMain;

    // 3. Cập nhật "Lệnh" cho nút Thêm vào giỏ hàng
    // Tìm cái nút trong Modal (thường nằm trong class .modal-text-area)
    const btnOrder = document.querySelector('.modal-text-area .btn-order');
    
    if (btnOrder) {
        // Gán sự kiện onclick để gọi hàm addToCart với ID đúng của sản phẩm này
        btnOrder.setAttribute('onclick', `addToCart(${p.id})`);
    }

    // 4. Hiện Modal lên
    modal.style.display = 'block';
};
window.addToCart = (productId) => {
    // 1. Lấy dữ liệu từ kho (LocalStorage)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 2. Tìm sản phẩm trong danh sách gốc (myProducts)
    const product = myProducts.find(p => p.id === productId);

    // 3. Kiểm tra xem món này có trong giỏ chưa
    const itemInCart = cart.find(item => item.id === productId);

    if (itemInCart) {
        itemInCart.quantity += 1; // Có rồi thì tăng số lượng
    } else {
        // Chưa có thì thêm mới (copy các thuộc tính và đặt quantity = 1)
        cart.push({ ...product, quantity: 1 });
    }

    // 4. Lưu lại vào kho
    localStorage.setItem('cart', JSON.stringify(cart));

    // 5. Thông báo cho khách và cập nhật con số trên Header
    alert(`Đã thêm ${product.name} vào giỏ hàng thành công! 🐾`);
    
    if (typeof updateCartBadge === 'function') {
        updateCartBadge(); // Cập nhật số lượng trên icon giỏ hàng
    }
};
document.querySelector('.close-btn').onclick = () => modal.style.display = 'none';

window.onclick = (e) => {
    if (e.target == modal) modal.style.display = 'none';
};

// Khởi chạy khi web load xong
document.addEventListener('DOMContentLoaded', initStore);

function showProductDetail(element) {
    // 1. Lấy dữ liệu từ thẻ data- của chính sản phẩm đó
    const name = element.getAttribute('data-name');
    const price = element.getAttribute('data-price');
    const desc = element.getAttribute('data-desc');
    const imgSrc = element.querySelector('.img-main').src; // Lấy ảnh chính

    // 2. Điền thông tin vào Modal
    document.getElementById('modal-name').innerText = name;
    document.getElementById('modal-price-big').innerText = price;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal-img').src = imgSrc;

    // 3. Hiện Modal lên
    document.getElementById('productModal').style.display = 'flex';
}

//Giỏ hàng 
// 1. Hàm mở Modal - Quét thông tin từ data- của thẻ được click
function openModal(element) {
    const name = element.getAttribute('data-name');
    const price = element.getAttribute('data-price');
    const desc = element.getAttribute('data-desc');
    const imgSrc = element.querySelector('.img-main').src;

    document.getElementById('modal-name').innerText = name;
    document.getElementById('modal-price-big').innerText = price;
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal-img').src = imgSrc;

    document.getElementById('productModal').style.display = 'flex';
}

// 2. Hàm đóng Modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

// 3. XỬ LÝ LƯU DANH SÁCH MÓN ĂN (THAY THẾ ĐOẠN CŨ CỦA ÔNG)
document.getElementById('add-to-cart-btn').addEventListener('click', function() {
    const name = document.getElementById('modal-name').innerText;
    const priceText = document.getElementById('modal-price-big').innerText;
    const priceValue = parseInt(priceText.replace(/[^0-9]/g, ''));
    const imgSrc = document.getElementById('modal-img').src;

    // 1. Lấy giỏ hàng từ kho (nếu chưa có thì tạo mảng rỗng [])
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 2. Kiểm tra xem món này đã có trong danh sách chưa
    let foundIndex = cart.findIndex(item => item.name === name);

    if (foundIndex > -1) {
        // Nếu có rồi thì chỉ tăng số lượng của món đó thôi
        cart[foundIndex].quantity += 1;
    } else {
        // Nếu chưa có thì thêm mới nguyên một "đối tượng" vào mảng
        cart.push({
            name: name,
            price: priceValue,
            quantity: 1,
            image: imgSrc
        });
    }

    // 3. Lưu mảng "cart" này vào lại kho
    localStorage.setItem('cart', JSON.stringify(cart));

    // 4. Cập nhật con số hiển thị trên icon giỏ hàng
    if (typeof updateBadge === "function") {
        updateBadge(); 
    } else if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    // 5. Thông báo duy nhất 1 lần
    alert("Đã thêm " + name + " vào giỏ hàng!");
    
    // 6. Đóng bảng Modal
    closeModal();
});

// 4. HÀM ĐỒNG BỘ CON SỐ TRÊN ICON (VIẾT LẠI ĐỂ TÍNH TỔNG TỪ MẢNG)
function updateBadge() {
    const badge = document.getElementById('main-cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Tính tổng số lượng của tất cả các món trong mảng
    let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (badge) badge.innerText = totalQty;
}
function addToCart() {
    // 1. Lấy thông tin từ cái bảng Modal đang mở
    const name = document.getElementById('modal-name').innerText;
    const priceText = document.getElementById('modal-price-big').innerText;
    const img = document.getElementById('modal-img').src;

    // 2. Chuyển giá từ "195.000đ" thành con số để tính toán
    const price = parseInt(priceText.replace(/\D/g, ''));

    // 3. Lấy giỏ hàng hiện tại trong máy ra (nếu chưa có thì tạo mới [])
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 4. Kiểm tra món này đã có trong giỏ chưa?
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1; // Có rồi thì tăng số lượng lên
    } else {
        cart.push({ name, price, image: img, quantity: 1 }); // Chưa có thì thêm mới vào
    }

    // 5. Cất lại vào bộ nhớ máy (LocalStorage)
    localStorage.setItem('cart', JSON.stringify(cart));

    // 6. Cập nhật cái số nhảy (Badge) trên cái giỏ hàng màu xanh
    updateCartCount();

    // 7. Thông báo cho người dùng
    alert("Đã thêm " + name + " vào giỏ hàng thành công!");
    
    // 8. Đóng modal sau khi mua xong (tùy bạn muốn hay không)
    closeModal();
}
function closeModal() {
    const modal = document.getElementById('detail-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function updateCartCount() {
    // Lấy giỏ hàng từ máy ra
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Tìm cái vòng tròn đỏ hiển thị số lượng trên icon giỏ hàng
    const cartBadge = document.getElementById('cart-count');
    
    // KIỂM TRA: Nếu trang này CÓ icon giỏ hàng thì mới hiện số
    if (cartBadge) {
        cartBadge.innerText = total;
    }
    // Nếu không có icon giỏ hàng trên trang này, code sẽ chạy qua êm đẹp, không báo lỗi nữa!
}

// Gọi hàm này khi vừa load trang để nó hiện đúng số lượng cũ
window.onload = updateCartCount;