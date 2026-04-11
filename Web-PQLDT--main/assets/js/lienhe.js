// ===========================
// FORM VALIDATION - lienhe.js
// ===========================

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (!form) return;

    // Helper: show error
    function showError(input, message) {
        const group = input.closest('.form-group');
        let errorEl = group.querySelector('.form-error');
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'form-error';
            group.appendChild(errorEl);
        }
        errorEl.textContent = message;
        input.classList.add('input-error');
        input.classList.remove('input-success');
    }

    // Helper: clear error
    function clearError(input) {
        const group = input.closest('.form-group');
        const errorEl = group.querySelector('.form-error');
        if (errorEl) errorEl.textContent = '';
        input.classList.remove('input-error');
        input.classList.add('input-success');
    }

    // Validate full name
    function validateFullName(input) {
        const val = input.value.trim();
        if (!val) { showError(input, 'Vui lòng nhập họ và tên.'); return false; }
        if (val.length < 3) { showError(input, 'Họ và tên phải có ít nhất 3 ký tự.'); return false; }
        if (/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val)) {
            showError(input, 'Họ và tên không được chứa số hoặc ký tự đặc biệt.');
            return false;
        }
        clearError(input); return true;
    }

    // Validate email
    function validateEmail(input) {
        const val = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val) { showError(input, 'Vui lòng nhập địa chỉ email.'); return false; }
        if (!emailRegex.test(val)) { showError(input, 'Email không hợp lệ (ví dụ: ten@email.com).'); return false; }
        clearError(input); return true;
    }

    // Validate phone
    function validatePhone(input) {
        const val = input.value.trim();
        const phoneRegex = /^(0|\+84)[0-9]{9}$/;
        if (!val) { showError(input, 'Vui lòng nhập số điện thoại.'); return false; }
        if (!phoneRegex.test(val)) { showError(input, 'Số điện thoại không hợp lệ (10 chữ số, bắt đầu bằng 0).'); return false; }
        clearError(input); return true;
    }

    // Validate select
    function validateSelect(input) {
        if (!input.value) { showError(input, 'Vui lòng chọn trường/đơn vị.'); return false; }
        clearError(input); return true;
    }

    // Validate subject
    function validateSubject(input) {
        const val = input.value.trim();
        if (!val) { showError(input, 'Vui lòng nhập tiêu đề.'); return false; }
        if (val.length < 5) { showError(input, 'Tiêu đề phải có ít nhất 5 ký tự.'); return false; }
        clearError(input); return true;
    }

    // Validate message
    function validateMessage(input) {
        const val = input.value.trim();
        if (!val) { showError(input, 'Vui lòng nhập nội dung tin nhắn.'); return false; }
        if (val.length < 10) { showError(input, 'Nội dung phải có ít nhất 10 ký tự.'); return false; }
        clearError(input); return true;
    }

    // Live validation on blur
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const facultyInput = document.getElementById('faculty');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    if (fullNameInput) fullNameInput.addEventListener('blur', () => validateFullName(fullNameInput));
    if (emailInput) emailInput.addEventListener('blur', () => validateEmail(emailInput));
    if (phoneInput) phoneInput.addEventListener('blur', () => validatePhone(phoneInput));
    if (facultyInput) facultyInput.addEventListener('blur', () => validateSelect(facultyInput));
    if (subjectInput) subjectInput.addEventListener('blur', () => validateSubject(subjectInput));
    if (messageInput) messageInput.addEventListener('blur', () => validateMessage(messageInput));

    // Submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const v1 = fullNameInput ? validateFullName(fullNameInput) : true;
        const v2 = emailInput ? validateEmail(emailInput) : true;
        const v3 = phoneInput ? validatePhone(phoneInput) : true;
        const v4 = facultyInput ? validateSelect(facultyInput) : true;
        const v5 = subjectInput ? validateSubject(subjectInput) : true;
        const v6 = messageInput ? validateMessage(messageInput) : true;

        if (v1 && v2 && v3 && v4 && v5 && v6) {
            // Show success
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            form.reset();
            // Remove success classes
            form.querySelectorAll('.input-success').forEach(el => el.classList.remove('input-success'));
            // Hide after 5s
            setTimeout(() => {
                if (successMessage) successMessage.style.display = 'none';
            }, 5000);
        }
    });
});