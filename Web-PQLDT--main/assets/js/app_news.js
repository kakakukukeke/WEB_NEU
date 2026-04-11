document.addEventListener('DOMContentLoaded', function() 
{
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const newsCards = document.querySelectorAll('.news_card');

    let currentIndex = 0;

    //Hàm hiển thị thẻ tin tức luân phiên và hiệu ứng xuất hiện
    function updateClasses() {
        for (let i = 0; i < newsCards.length; i++) 
        {
            newsCards[i].classList.remove('Show');
        }

        const currentFirstIndex = currentIndex % newsCards.length;
        const currentSecondIndex = (currentIndex + 1) % newsCards.length;

        newsCards[currentFirstIndex].classList.add('Show');
        newsCards[currentSecondIndex].classList.add('Show');

    }
    
    let intervalId; // Biến lưu trữ ID của interval
    let isIntervalRunning = false; // Biến kiểm tra xem interval đã được khởi động chưa

    // Thêm sự kiện: Tự động chuyển sang tin tức khác
    function startInterval() 
    {
        if (!isIntervalRunning) 
        {
            intervalId = setInterval(() => 
            {
                currentIndex = (currentIndex === newsCards.length - 2) ? 0 : newsCards.length - 2;
                setTimeout(updateClasses(), 0.8);
            }, 8000);
            isIntervalRunning = true;
        }
    }

    // Hàm dừng interval nếu người dùng di chuyển và tin tức
    newsCards.forEach(function(newsCard) {
        newsCard.addEventListener('mouseenter', function() {
            clearInterval(intervalId);
            isIntervalRunning = false;
        });
    
        newsCard.addEventListener('mouseleave', function() {
            startInterval();
        });
    });

    // Chuyển sang tin tức khác khi bấm nút
    prevButton.addEventListener('click', function() 
    {
        currentIndex = (currentIndex === 0) ? newsCards.length - 2 : 0;
        setTimeout(updateClasses(),0.8);
        clearInterval(intervalId);
        isIntervalRunning = false;
        startInterval();
    });

    nextButton.addEventListener('click', function() 
    {
        currentIndex = (currentIndex === newsCards.length - 2) ? 0 : newsCards.length - 2;
        setTimeout(updateClasses(),0.8);
        clearInterval(intervalId);
        isIntervalRunning = false;
        startInterval();
    });

    updateClasses();
    startInterval();
})
