window.onload = () => {
    const overlay = document.getElementById('loginOverlay');
    
    // Đợi 100ms sau khi load trang để tạo cảm giác mượt
    setTimeout(() => {
        overlay.classList.add('active');
    }, 100);
};