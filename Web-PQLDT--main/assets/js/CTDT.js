document.addEventListener("DOMContentLoaded", function() 
{
    // Thêm hiệu ứng cho tấm ảnh giữa phần overview
    let timeoutId;

    document.getElementById('app_overview-picCardMain').addEventListener('mouseover', function() {
        
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            document.getElementById('app_overview-picContainer-para1').style.transition = "opacity 0.5s ease";
            document.getElementById('app_overview-picContainer-para1').style.opacity = "0";
            document.getElementById('app_overview-picContainer-para2').style.transition = "opacity 0.5s ease";
            document.getElementById('app_overview-picContainer-para2').style.opacity = "0";
            document.getElementById('app_overview-picCardMain').style.transition = "transform 0.6s ease";
            document.getElementById('app_overview-picCardMain').style.transform = "scale(1.2)";
            document.getElementById('app_overview-picCardMain').style.animation = "ShowUp 1s ease";
            document.getElementById('app_overview-picCardMain').style.clipPath = "polygon(50% 0, 100% 33%, 100% 67%, 50% 100%, 0 67%, 0 33%)"
            document.getElementById('midCard-container').style.display = "block";
            document.getElementById('midCard-container').style.animation = "fadein 1.2s ease";
            type();
        }, 300);
        clearTimeout(clearTextTimeOutId);
    });

    document.getElementById('app_overview-picCardMain').addEventListener('mouseout', function() {
        
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            document.getElementById('app_overview-picContainer-para1').style.transition = "opacity 0.5s ease";
            document.getElementById('app_overview-picContainer-para1').style.opacity = "1";
            document.getElementById('app_overview-picContainer-para2').style.transition = "opacity 0.5s ease";
            document.getElementById('app_overview-picContainer-para2').style.opacity = "1";
            document.getElementById('app_overview-picCardMain').style.transition = "transform 0.6s ease";
            document.getElementById('app_overview-picCardMain').style.transform = "scale(1)";
            document.getElementById('app_overview-picCardMain').style.animation = "Down 1s ease";
            document.getElementById('midCard-container').style.opacity = "1";
            document.getElementById('midCard-container').style.animation = "fadeout 0.8s ease";
            document.getElementById('app_overview-picCardMain').style.clipPath = "polygon(0 36%, 40% 36%, 65.5% 0, 100% 67%, 58% 67%, 36% 100%)";
            setTimeout(function(){
            document.getElementById('midCard-container').style.display = "none";},800);
        }, 300);
        clearTextTimeOutId = setTimeout(() => {
            clear();
        }, 5000);
    });
    

    const textElement = document.getElementById('midCard-container-text');
    const textToType = "Đại học kinh tế quốc dân là một trong những trường đại học đào tạo ngành kinh tế hàng đầu tại khu vực miền Bắc. Nơi đây luôn được xem là “ứng cử viên sáng giá” cho các thí sinh lựa chọn theo học ngành kinh tế.";
    const typingSpeed = 20; 
    let charIndex = 0;
    let typingInProgress = false;

    function type() 
    {
        if (!typingInProgress) 
        {
            typingInProgress = true;
            if (charIndex < textToType.length) 
            {
                textElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            }
            typingInProgress = false;
        }
    }
    function clear()
    {
        textElement.textContent = "";
        charIndex = 0;
    }

    

});