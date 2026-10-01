/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


// === ระบบค้นหาและแสดงผลการ์ดแบบสมบูรณ์ ===
const searchDatabase = [
     // ---โรงแรม---
    { name: 'Grand Luxury Hotel Bangkok', type: 'โรงแรม', price: 2500, link: 'hotel.html', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80' },
    { name: 'Sea Breeze Resort Phuket', type: 'โรงแรม', price: 4200, link: 'hotel.html', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80' },
    { name: 'Mountain View Chiang Mai', type: 'โรงแรม', price: 1800, link: 'hotel.html', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=500&q=80' },

    // --- ตั๋วเครื่องบิน ---
    { name: 'กรุงเทพ  ➔ ภูเก็ต', type: 'ตั๋วเครื่องบิน', price: 1250, link: 'flight.html', img: 'https://img.wongnai.com/p/800x0/2021/01/04/73764af2818646b6b7b39f35038ea83a.jpg' },
    { name: 'กรุงเทพ  ➔ เชียงใหม่', type: 'ตั๋วเครื่องบิน', price: 1990, link: 'flight.html', img: 'https://img.wongnai.com/p/800x0/2020/12/03/50a00ed174cf49538892f2192961fd29.jpg' },
    { name: 'กรุงเทพ  ➔ เชียงราย', type: 'ตั๋วเครื่องบิน', price: 2500, link: 'flight.html', img: 'https://img.wongnai.com/p/800x0/2021/01/05/2a926f0b160b4f4bb24fc501dc850d99.jpg' },


     // --- ร้านอาหาร ---
    { name: 'SUSHI OMAKASE Bangkok', type: 'ร้านอาหาร', price: 1500, link: 'restaurant.html', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80' },
    { name: 'Beachfront Seafood BBQ Phuket', type: 'ร้านอาหาร', price: 800, link: 'restaurant.html', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80' },
    { name: 'Traditional Lanna Cuisine Chiang Mai', type: 'ร้านอาหาร', price: 500, link: 'restaurant.html', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80' },

    

    // --- สินค้า ---
    { name: 'ภูเขา', type: 'สินค้า', price: 1500000000 , link: 'product3.html', img: 'img/p1.jpg' },
    { name: 'หิน', type: 'สินค้า', price: 1200000000, link: 'product3.html', img: 'https://img.wongnai.com/p/800x0/2020/12/08/9478b6fd60ab4dbca631ee2d619f5e24.jpg' },
    { name: 'เรือ', type: 'สินค้า', price: 97000000, link: 'product3.html', img: 'img/p7.jpg' },
    { name: 'พระพุทธรูป', type: 'สินค้า', price: 65000000, link: 'product3.html', img: 'img/p4.jpg' }





];

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('search-results');

if (searchForm) {
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // ป้องกันหน้าเว็บรีเฟรช
        
        const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";
        
        if (!keyword) {
            alert('กรุณากรอกคำค้นหาก่อนครับ');
            return;
        }

        // กรองข้อมูลตามคำที่พิมพ์ (ค้นหาจากชื่อโรงแรมหรือประเภท)
        const resultData = searchDatabase.filter(item => 
            item.name.toLowerCase().includes(keyword) || item.type.toLowerCase().includes(keyword)
        );

        if (!searchResults) return;
        searchResults.innerHTML = ''; // เคลียร์ผลลัพธ์เก่าทิ้ง
        
        if (resultData.length === 0) {
            searchResults.innerHTML = `<div class="alert alert-warning text-center mt-3">ไม่พบข้อมูลที่ค้นหา</div>`;
            return;
        }

        // สร้างการ์ด (Card) แสดงผล
        let html = '<div class="row g-4" style="margin-top: 110px;">';
        resultData.forEach(item => {
            html += `
                <div class="col-md-4">
                    <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                        <img src="${item.img}" class="card-img-top" style="height: 180px; object-fit: cover;">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <div>
                                <span class="badge bg-primary mb-2">${item.type}</span>
                                <h5 class="card-title fw-bold">${item.name}</h5>
                                <p class="text-success fw-bold">ราคาเริ่มต้น: ฿${item.price.toLocaleString()}</p>
                            </div>
                            <a href="${item.link}" class="btn btn-outline-primary w-100 mt-3 rounded-pill">ไปหน้าจองหริอซื้อสินค้า</a>
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        searchResults.innerHTML = html;
    });
}




// คำสั่งสินค้า
document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript โหลดและทำงานเรียบร้อยแล้ว!");

    // 1. ฟังก์ชันจำลองการโหลดเมนูมาใส่ใน div id="menu-container"
    loadMenu();

    // 2. ฟังก์ชันจัดการปุ่มสั่งซื้อสินค้า (เพิ่ม Event Click ให้กับปุ่มทั้งหมดที่มีคลาส btn-primary)
    handleBuyButtons();
});

// ฟังก์ชันโหลดเมนู (ตัวอย่างการแทรก HTML ผ่าน JS)
function loadMenu() {
    const menuContainer = document.getElementById("menu-container");
    if (menuContainer) {
        // คุณสามารถเปลี่ยนเป็น Navbar หรือเมนูที่ต้องการได้
        menuContainer.innerHTML = `
            
        `;
    }
}

// ฟังก์ชันจัดการคลิกปุ่มสั่งซื้อ (แบบยืดหยุ่น หาปุ่ม .btn-primary ทั้งหน้า)
function handleBuyButtons() {
    const buyButtons = document.querySelectorAll(".btn-primary");

    buyButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();

            // ค้นหาการ์ดสินค้าที่ใกล้ที่สุด หรือดึงข้อมูลจากปุ่มโดยตรง
            const card = this.closest(".col-sm-3") || this.parentElement;
            
            // ดึงชื่อสินค้าและราคา (ตรวจสอบว่ามี h4 และ .text-danger จริงไหม)
            const h4Tag = card.querySelector("h4");
            const priceTag = card.querySelector(".text-danger");

            const productName = h4Tag ? h4Tag.innerText : "สินค้า";
            const productPrice = priceTag ? priceTag.innerText : "0";

            alert(`คุณได้เลือกสั่งซื้อ: ${productName}\nราคา: ${productPrice} บาท\n(เพิ่มลงตะกร้าเรียบร้อยแล้ว!)`);
        });
    });
}









        

    