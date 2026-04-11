// ===========================
// DARK MODE - app_darkmode.js
// Đồng bộ qua tất cả trang, không flash khi load
// ===========================

document.addEventListener('DOMContentLoaded', function () {
    const STORAGE_KEY = 'neu_darkmode';

    // Tạo nút dark mode
    function createToggleBtn() {
        if (document.getElementById('darkModeToggle')) return;
        const btn = document.createElement('button');
        btn.id = 'darkModeToggle';
        btn.title = 'Chuyển chế độ tối / sáng';
        btn.innerHTML = `
            <span class="dm-icon dm-sun"><i class="fa-solid fa-sun"></i></span>
            <span class="dm-icon dm-moon"><i class="fa-solid fa-moon"></i></span>
        `;
        document.body.appendChild(btn);
        btn.addEventListener('click', toggleDarkMode);
    }

    function toggleDarkMode() {
        const isDark = document.documentElement.classList.toggle('dark-mode');
        localStorage.setItem(STORAGE_KEY, isDark ? '1' : '0');
        updateBtnIcon(isDark);
    }

    function updateBtnIcon(isDark) {
        const btn = document.getElementById('darkModeToggle');
        if (!btn) return;
        // Hiện sun khi đang dark (để click về light), hiện moon khi light
        btn.querySelector('.dm-sun').style.display = isDark ? 'flex' : 'none';
        btn.querySelector('.dm-moon').style.display = isDark ? 'none' : 'flex';
    }

    // Đọc trạng thái hiện tại (đã apply từ inline script trên <head>)
    const isDark = document.documentElement.classList.contains('dark-mode');

    createToggleBtn();
    updateBtnIcon(isDark);

    // Theo dõi system preference (chỉ khi người dùng chưa chọn thủ công)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem(STORAGE_KEY) === null) {
            document.documentElement.classList.toggle('dark-mode', e.matches);
            updateBtnIcon(e.matches);
        }
    });
});