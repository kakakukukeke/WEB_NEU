// ===========================
// SEARCH BAR - app_search.js
// Fix: hoạt động độc lập với CSS :focus pseudo
// ===========================

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.header__search-input');
    const searchBtn   = document.querySelector('.header__search-btn');
    const historyBox  = document.querySelector('.header__search-history');
    const historyList = document.querySelector('.header__search-history-list');

    if (!searchInput) return;

    // --- Tắt hoàn toàn CSS :focus control bằng cách override ---
    // CSS gốc dùng `input:focus ~ .history { display: block }` nhưng
    // history không phải sibling của input → không work.
    // Ta quản lý hiển thị hoàn toàn bằng JS.
    if (historyBox) {
        historyBox.style.display = 'none';
        // Ghi đè CSS :focus bằng cách thêm class riêng
        historyBox.style.zIndex = '9999999';
    }

    // --- Dữ liệu tìm kiếm nội bộ ---
    const siteData = [
        { title: 'Tuyển sinh Đại học 2025',              url: './admissions.html',                       tag: 'Tuyển sinh'  },
        { title: 'Tuyển sinh Cao học 2025',               url: './admissions.html',                       tag: 'Tuyển sinh'  },
        { title: 'Thông báo lịch thi học kỳ',            url: './tintuc-sukien.html',                    tag: 'Tin tức'     },
        { title: 'Chương trình đào tạo chính quy',        url: './Chuong-trinh-dao-tao.html',             tag: 'Đào tạo'     },
        { title: 'Chương trình tiên tiến chất lượng cao', url: './Chuong-trinh-dao-tao.html',             tag: 'Đào tạo'     },
        { title: 'Đào tạo từ xa',                         url: './Chuong-trinh-dao-tao.html',             tag: 'Đào tạo'     },
        { title: 'Học phí năm học 2025-2026',             url: './sinh-vien.html',                        tag: 'Sinh viên'   },
        { title: 'Học bổng NEU',                          url: './sinh-vien.html',                        tag: 'Sinh viên'   },
        { title: 'Câu lạc bộ sinh viên',                  url: './sinh-vien.html',                        tag: 'Sinh viên'   },
        { title: 'Lịch sự kiện & thông báo',              url: './tintuc-sukien.html',                    tag: 'Sự kiện'     },
        { title: 'Tin tức hoạt động chung',               url: './tintuc-sukien.html',                    tag: 'Tin tức'     },
        { title: 'Hợp tác quốc tế',                       url: './nghien-cuu-va-hop-tac-doi-ngoai.html',  tag: 'Hợp tác'    },
        { title: 'Nghiên cứu khoa học',                   url: './nghien-cuu-va-hop-tac-doi-ngoai.html',  tag: 'Nghiên cứu' },
        { title: 'Giới thiệu Phòng Quản lý Đào tạo',     url: './Gioi-thieu.html',                       tag: 'Giới thiệu' },
        { title: 'Cơ cấu tổ chức NEU',                   url: './Gioi-thieu.html',                       tag: 'Giới thiệu' },
        { title: 'Liên hệ Phòng Quản lý Đào tạo',        url: './lienhe.html',                           tag: 'Liên hệ'    },
        { title: 'NEU Concert 2025',                      url: './tintuc-sukien.html',                    tag: 'Sự kiện'    },
        { title: 'Tạp chí kinh tế giáo dục',             url: './nghien-cuu-va-hop-tac-doi-ngoai.html',  tag: 'Nghiên cứu' },
    ];

    // --- localStorage history ---
    function getHistory() {
        try { return JSON.parse(localStorage.getItem('neu_search_history') || '[]'); }
        catch { return []; }
    }
    function saveHistory(term) {
        let h = getHistory().filter(x => x !== term);
        h.unshift(term);
        localStorage.setItem('neu_search_history', JSON.stringify(h.slice(0, 6)));
    }

    // --- Dropdown kết quả (tạo 1 lần) ---
    let dropdown = document.querySelector('.search-results-dropdown');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'search-results-dropdown';
        searchInput.closest('.header__search-input-wrap').appendChild(dropdown);
    }

    // --- State ---
    let isOpen = false;

    function showHistory() {
        if (!historyList) return;
        const history = getHistory();
        if (history.length === 0) {
            historyList.innerHTML = `
                <li class="header__search-history-item" style="color:#999;font-style:italic;font-size:1.3rem;line-height:38px">
                    Chưa có lịch sử tìm kiếm
                </li>`;
        } else {
            historyList.innerHTML = history.map(h => `
                <li class="header__search-history-item">
                    <a href="javascript:void(0)" class="search-history-link" data-term="${h}">
                        <i class="fa-solid fa-clock-rotate-left" style="margin-right:6px;font-size:11px;color:#999"></i>${h}
                    </a>
                </li>`).join('');
            historyList.querySelectorAll('.search-history-link').forEach(link => {
                link.addEventListener('mousedown', function (e) {
                    e.preventDefault(); // tránh blur trước khi click xử lý
                    searchInput.value = this.dataset.term;
                    doSearch(this.dataset.term, false);
                });
            });
        }
        if (historyBox) historyBox.style.display = 'block';
        dropdown.style.display = 'none';
        isOpen = true;
    }

    function doSearch(query, save = true) {
        query = query.trim();
        if (!query) {
            showHistory();
            return;
        }
        if (save) saveHistory(query);

        if (historyBox) historyBox.style.display = 'none';

        const q = query.toLowerCase();
        const results = siteData.filter(item =>
            item.title.toLowerCase().includes(q) ||
            item.tag.toLowerCase().includes(q)
        );

        if (results.length === 0) {
            dropdown.innerHTML = `<div class="search-no-result">Không tìm thấy kết quả cho "<b>${query}</b>"</div>`;
        } else {
            dropdown.innerHTML = results.map(r =>
                `<a href="${r.url}" class="search-result-item">
                    <span class="search-result-tag">${r.tag}</span>
                    <span class="search-result-title">${r.title}</span>
                </a>`
            ).join('');
        }
        dropdown.style.display = 'block';
        isOpen = true;
    }

    function closeAll() {
        if (historyBox) historyBox.style.display = 'none';
        dropdown.style.display = 'none';
        isOpen = false;
    }

    // --- Events ---
    searchInput.addEventListener('focus', function () {
        if (!this.value.trim()) showHistory();
        else doSearch(this.value, false);
    });

    searchInput.addEventListener('input', function () {
        if (!this.value.trim()) showHistory();
        else doSearch(this.value, false);
    });

    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const q = this.value.trim();
            if (q) doSearch(q, true);
            else showHistory();
        }
        if (e.key === 'Escape') closeAll();
    });

    // Dùng mousedown thay vì click để tránh blur làm ẩn dropdown trước
    searchBtn.addEventListener('mousedown', function (e) {
        e.preventDefault();
        const q = searchInput.value.trim();
        if (q) doSearch(q, true);
        else showHistory();
        searchInput.focus();
    });

    // Đóng khi click bên ngoài
    document.addEventListener('mousedown', function (e) {
        const wrap = searchInput.closest('.header__search');
        if (wrap && !wrap.contains(e.target)) closeAll();
    });
});