document.addEventListener("DOMContentLoaded", function() 
{

    //Chức năng hiện thêm thành viên Hội đồng Trường
    const showMoreBtn = document.getElementById('showMore-members-button');
    const memberList = document.querySelectorAll('.showMore-members');
    const scrollToId = document.getElementById('principal-table-cards-firstCard');

    memberList.forEach(function(element) {
        element.classList.add('showMore-members-hidden');
    });

    showMoreBtn.addEventListener('click', function()
    {
        if(showMoreBtn.innerText == "Thu gọn")
        {
            memberList.forEach(function(element) {
                element.classList.add('showMore-members-hidden');
            });
            memberList.forEach(function(element) {
                element.style.animation = "hideMembers 1s ease";
            });
            showMoreBtn.innerText = 'Xem thêm thành viên';
            
            scrollToId.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
        }
        else{
            memberList.forEach(function(element) {
                element.classList.remove('showMore-members-hidden');
            });
            memberList.forEach(function(element) {
                element.style.animation = "showMembers 1s ease";
            });
            showMoreBtn.innerText = "Thu gọn";
        }
        
    });

    //Thêm hiệu ứng cho phần: "Lý do nên học NEU"
    const appReasons_images = document.querySelectorAll('.app_Reason-block-img img');
    let timeoutID;

    document.getElementById('app_Reason-grid').addEventListener('mouseover', function() {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function() {
            animateImages(0);
        }, 100);
    });
    
    document.getElementById('app_Reason-grid').addEventListener('mouseout', function() {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
            for (let i = 0; i < appReasons_images.length; ++i) {
                appReasons_images[i].style.animation = "";
            }
        }, 1500);
        
    });
    
    function animateImages(index) {
        if (index >= appReasons_images.length) {
            return; 
        }
        setTimeout(() => {
            appReasons_images[index].style.animation = "upAndDown 1.5s ease";
            animateImages(index + 1);
        }, 300); 
    };

    const gioiThieuLink = document.getElementById('GioiThieuLink');
    const suMenhLink = document.getElementById('SuMenhLink');
    const thanhTuuLink = document.getElementById('ThanhTuuLink');
    const hoiDongLink = document.getElementById('HoiDongTruongLink');
    const khoiNganhLink = document.getElementById('KhoiNganhLink');
    const giangVienLink = document.getElementById('GiangVienLink');
    const industryUnitLink = document.getElementById('showIndustryUnits');

    gioiThieuLink.addEventListener('click', function() {
        window.scrollTo({top: document.getElementById('GioiThieu').offsetTop + 20, behavior: 'smooth'});
    })
    
    suMenhLink.addEventListener('click', function() {
        window.scrollTo({top: document.getElementById('SuMenh').offsetTop + 20, behavior: 'smooth'});
    })
    
    thanhTuuLink.addEventListener('click', function() {
        window.scrollTo({top: document.getElementById('ThanhTuu').offsetTop + 20, behavior: 'smooth'});
    })
    
    hoiDongLink.addEventListener('click', function() {
        window.scrollTo({top: document.getElementById('HoiDongTruong').offsetTop + 20, behavior: 'smooth'});
    })
    
    khoiNganhLink.addEventListener('click', function() {
        window.scrollTo({top: document.getElementById('KhoiNganh').offsetTop + 20, behavior: 'smooth'});
    })
    
    giangVienLink.addEventListener('click', function()
    {
        window.scrollTo({top: document.getElementById('GiangVien').offsetTop + 20, behavior: 'smooth'});
    })

    industryUnitLink.addEventListener('click', function()
    {
        window.scrollTo({top: document.getElementById('app_industryUnits').offsetTop + 20, behavior: 'smooth'});
    })


    //Highlight link của phần đang xem
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
    
        const menuItems = document.querySelectorAll('.app-menu-item a');
        menuItems.forEach((item) =>{
            item.style.color = "black";
            item.style.textDecoration = "none";
        })
    
        menuItems.forEach(function(item) {
            const targetId = item.getAttribute('id').replace('Link', '');
    
            const section = document.getElementById(targetId);
            if (section) {
                if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                    item.style.color = "var(--primary-color)";
                    item.style.textDecoration = "underline";
                } else {
                    item.style.color = "black";
                    item.style.textDecoration = "none";
                }
            }
        });
    });

});

