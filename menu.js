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