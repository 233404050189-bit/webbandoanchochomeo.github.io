window.onload = function() {
    renderCart();
};

function renderCart() {
    // Đọc danh sách 'cart' từ kho thay vì cartCount
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const tableBody = document.getElementById('cart-table-body');
    let totalBill = 0;

    if (cart.length > 0) {
        tableBody.innerHTML = ""; // Xóa trắng để vẽ lại từ đầu

        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            totalBill += itemTotal;

            // Vẽ từng dòng cho từng món khác nhau
            tableBody.innerHTML += `
                <tr>
                    <td>
                        <div style="display:flex; align-items:center; gap:10px">
                            <img src="${item.image}" width="50" style="border-radius:5px">
                            <b>${item.name}</b>
                        </div>
                    </td>
                    <td>${item.price.toLocaleString('vi-VN')}đ</td>
                    <td>
                        <div class="quantity-control">
                            <button class="btn-qty" onclick="changeQty(${index}, -1)">-</button>
                            <span class="qty-number">${item.quantity}</span>
                            <button class="btn-qty" onclick="changeQty(${index}, 1)">+</button>
                        </div>
                    </td>
                    <td><b>${itemTotal.toLocaleString('vi-VN')}đ</b></td>
                </tr>`;
        });

        // Cập nhật tổng tiền ở bảng tóm tắt
        document.getElementById('res-subtotal').innerText = totalBill.toLocaleString('vi-VN') + "đ";
        document.getElementById('res-total').innerText = totalBill.toLocaleString('vi-VN') + "đ";
    } else {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:50px">Giỏ hàng trống trơn hà...</td></tr>';
        document.getElementById('res-subtotal').innerText = "0đ";
        document.getElementById('res-total').innerText = "0đ";
    }
}

// Hàm tăng giảm số lượng dựa trên vị trí (index) của món đó trong mảng
function changeQty(index, amount) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart[index].quantity += amount;

    // Nếu số lượng nhỏ hơn 1 thì hỏi khách có muốn xóa món đó không
    if (cart[index].quantity < 1) {
        if(confirm("Ông muốn xóa món này khỏi giỏ hàng à?")) {
            cart.splice(index, 1); // Xóa món tại vị trí index
        } else {
            cart[index].quantity = 1; // Giữ lại ít nhất 1 món
        }
    }

    // Lưu lại danh sách mới vào kho
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Vẽ lại bảng ngay lập tức
    renderCart();
}
// Hàm mở modal thanh toán (Giữ nguyên hoặc thêm vào nếu chưa có)
function openPaymentModal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Giỏ hàng trống, mua đồ đã bạn ơi!");
        return;
    }
    document.getElementById('paymentModal').style.display = 'flex';
}

// Hàm đóng modal
function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// Hàm XÁC NHẬN đơn hàng và QUAY VỀ trang chủ
function confirmOrder() {
    const name = document.getElementById('cus-name').value;
    const phone = document.getElementById('cus-phone').value;

    if (!name || !phone) {
        alert("Bạn điền thiếu tên hoặc số điện thoại rồi!");
        return;
    }

    // 1. Hiện thông báo tượng trưng
    alert(`Cảm ơn bạn! Đơn hàng đã đặt thành công. Hệ thống sẽ chuyển bạn về trang chủ nhé!`);
    
    // 2. Xóa sạch giỏ hàng trong kho
    localStorage.removeItem('cart');
    
    // 3. Chuyển hướng về trang chủ ngay lập tức
    window.location.href = "index.html"; 
}