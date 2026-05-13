document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.food-card');
    const modal = document.getElementById('detail-modal');
    const closeBtn = document.querySelector('.close-btn');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Lấy dữ liệu từ thuộc tính data-
            const name = card.getAttribute('data-name');
            const price = card.getAttribute('data-price');
            const desc = card.getAttribute('data-desc');
            const imgSrc = card.querySelector('.img-main').src;

            // Đổ vào Modal
            document.getElementById('modal-name').innerText = name;
            document.getElementById('modal-price-big').innerText = price;
            document.getElementById('modal-desc').innerText = desc;
            document.getElementById('modal-img').src = imgSrc;

            // Hiện Modal
            modal.style.display = 'flex';
        });
    });

    closeBtn.onclick = () => modal.style.display = 'none';

    window.onclick = (e) => {
        if (e.target == modal) modal.style.display = 'none';
    };
});
// Tìm kiếm
if (name.includes(input)) {
    card.style.border = "5px solid green"; // Nếu khớp thì viền xanh
} else {
    card.style.border = "5px solid red";   // Nếu không khớp thì viền đỏ
}
function filterProducts() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    
    // 1. Lọc các thẻ sản phẩm
    let cards = document.querySelectorAll('.food-card');
    cards.forEach(card => {
        let name = card.getAttribute('data-name').toLowerCase();
        if (name.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    // 2. Lọc các Tiêu đề mục (Ví dụ: Thức ăn hạt, Pate...)
    // Giả sử các tiêu đề của bạn nằm trong thẻ h2 hoặc h3 có class chung nào đó
    // Nếu không có class, mình sẽ tìm theo các thẻ tiêu đề nhé
    let sections = document.querySelectorAll('.product-section'); // Thay bằng class bao quanh mỗi khu vực của bạn
    
    // Nếu bạn không chia div theo section, code dưới đây sẽ ẩn các tiêu đề h2 trống
    let titles = document.querySelectorAll('h2'); // Hoặc h3 tùy theo code của bạn
    titles.forEach(title => {
        // Đây là logic nâng cao: Nếu gõ tìm kiếm thì tạm ẩn các tiêu đề đi cho gọn
        if (input !== "") {
            title.style.display = "none"; 
        } else {
            title.style.display = "block";
        }
    });
}