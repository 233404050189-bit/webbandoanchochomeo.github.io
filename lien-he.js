window.onload = () => {
    document.getElementById('loginOverlay').classList.add('active');
};

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById('fullname');
    const phone = document.getElementById('phone');
    const agree = document.getElementById('agree');

    // Kiểm tra tên
    if (name.value.trim() === "") {
        name.classList.add('invalid');
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    } else {
        name.classList.remove('invalid');
        document.getElementById('nameError').style.display = 'none';
    }

    // Kiểm tra SĐT đủ 10 số
    if (!/^\d{10}$/.test(phone.value.trim())) {
        phone.classList.add('invalid');
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    } else {
        phone.classList.remove('invalid');
        document.getElementById('phoneError').style.display = 'none';
    }

    if (!agree.checked) {
        document.getElementById('agreeError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('agreeError').style.display = 'none';
    }

    if (isValid) alert("Đặt lịch thành công!");
});