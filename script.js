// const time = Date()
// let ms = time.getMilliseconds()
// let s = time.getSeconds()
// let m = time.getMinutes()
// let h = time.getHours()

document.addEventListener("DOMContentLoaded", function(e){ 
bell = new Audio("bell.mp3");

// get button element and sets a event listener
let startbutton = document.getElementById("buttons")
startbutton.addEventListener("click", (e) => timer(e))

function timer(e){
    // turns off the looping sound and resets it upon a button click
    bell.pause()
    bell.currentTime = 0;

    // removes the button that was created at the end of the countdown 
    document.getElementById(e.target.id).remove()

    // gathers the total time in ms and is placed into timerClock depending on rest or reset
    let time = new Date()
    let ms = time.getMilliseconds();
    let s = time.getSeconds();
    let m = time.getMinutes();
    let h = time.getHours();
    let timerclock; 
    if (e.target.id === "start_button"){
        timerClock = ms + (s*1000) + (m*60*1000) + (h*60*60*1000) + 1200000 // 1200000 = 1200s
    } else if (e.target.id === "rest"){
        timerClock = ms + (s*1000) + (m*60*1000) + (h*60*60*1000) + 20000 // 20000 = 20s
    }

    // creates a loop running every ms
    var changeTime = setInterval(() => countdown(e.target.id), 1)

    function countdown(val) { 

        // gathers the total time in ms and records the difference between now and timerClock
        let now = new Date();
        let ms = now.getMilliseconds();
        let s = now.getSeconds();
        let m = now.getMinutes();
        let h = now.getHours();
        let currentTime = ms + (s*1000) + (m*60*1000) + (h*60*60*1000)
        let timeRemain = timerClock - currentTime 

        // converts the difference into a minute:second:millisecond format
        document.getElementById("timeleft").innerHTML = `${Math.floor(timeRemain/60000 % 60)}:${Math.floor(timeRemain/1000 % 60)}:${Math.floor(timeRemain % 1000)}`

        // if timer reaches 0ms, runs another function and plays a looping sound
        if(timeRemain <= 0){
            stopInterval(val) 
            bell.play()
            bell.loop = true
        }
    }

    function stopInterval(val) { 

        // stops the looping from setInterval
        clearInterval(changeTime)

        // creates a button upon stopping the loop depending on rest or reset
        // repeats event listener upon clicking one of these buttons using it's id attribute 
        let button = document.createElement("button");
        if(val === "start_button"){
            button.innerText = "Rest!";
            button.setAttribute("id","rest")
            startbutton.appendChild(button);   
        } else if (val === "rest") {
            button.innerText = "Restart";
            button.setAttribute("id","start_button")
            startbutton.appendChild(button);   
        }
   
    }
}

})
