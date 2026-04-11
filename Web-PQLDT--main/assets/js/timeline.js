
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const details = $$('.app__lich-detail')
const timeLines = $$('.app__lich-timeline-item')
const prevBtn = $('.app__lich-prevBtn')
const nextBtn = $('.app__lich-nextBtn')
const timelineList = $('.app__lich-timeline-list')

var oldIndex = 2;
let translateValue = 0

timeLines.forEach((timeLine, index) => {
    const detail = details[index]
    
    timeLine.onclick = function() {
        
        console.log(oldIndex, index)
        let currentTimeline = $('.app__lich-timeline-item.active')
        let currentDetail = $('.app__lich-detail.active')

        if (index - oldIndex === 1) {
            translateValue = translateValue - 219.13
            timelineList.style.transform = "translateX(" + (translateValue) + "px)"
            oldIndex++
        } else if(index - oldIndex === 2) {
            translateValue = translateValue - 219.13 * 2
            timelineList.style.transform = "translateX(" + (translateValue) + "px)"
            oldIndex += 2
        } else if(index - oldIndex === -1) {
            translateValue = translateValue + 219.13
            timelineList.style.transform = "translateX(" + (translateValue) + "px)"
            oldIndex -= 1
        } else if(index - oldIndex === -2) {
            translateValue += 219.13 * 2
            timelineList.style.transform = "translateX(" + (translateValue) + "px)"
            oldIndex -= 2
        }

        currentTimeline.classList.remove('active')
        currentDetail.classList.remove('active')

        this.classList.add('active')
        detail.classList.add('active')

        
        
    }
});

prevBtn.onclick = function() {
    translateValue = translateValue + 219.13

    var currentTimeline = $('.app__lich-timeline-item.active')
    var currentDetail = $('.app__lich-detail.active')
    currentTimeline.classList.remove('active')
    currentDetail.classList.remove('active')

    timeLines.forEach((timeLine, index) => {
        
        if(index > 0 && timeLine === currentTimeline) {
            timeLines[index - 1].classList.add('active')
            details[index - 1].classList.add('active')
        } 
        else if(index === 0 && timeLine === currentTimeline) {
            timeLines[timeLines.length - 1].classList.add('active')
            details[details.length - 1].classList.add('active')
        }
        if(index - oldIndex === -1) {
            timelineList.style.transform = "translateX(" + (translateValue) + "px)"
        }
    });
    oldIndex -= 1    
}

nextBtn.onclick = function() {
    
    var currentTimeline = $('.app__lich-timeline-item.active')
    var currentDetail = $('.app__lich-detail.active')
    currentTimeline.classList.remove('active')
    currentDetail.classList.remove('active')

    
    translateValue = translateValue - 219.13

    timeLines.forEach((timeLine, index) => {
        
        if(index < timeLines.length - 1 && timeLine === currentTimeline) {
            timeLines[index + 1].classList.add('active')
            details[index + 1].classList.add('active')
        } 
        else if((index === timeLines.length - 1) && timeLine === currentTimeline) {
            console.log('ok')
            timeLines[0].classList.add('active')
            details[0].classList.add('active')
        }
        
        if (index - oldIndex === 1) {
            console.log(translateValue)
            timelineList.style.transform = "translateX(" + (translateValue) + "px)"
        }
    });
    oldIndex++

}
