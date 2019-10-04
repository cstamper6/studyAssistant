const app = () => {
    const play = document.querySelector(".play")
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");
    // Remove audio from video
    video.muted = true;

    const timeDisplay = document.querySelector(".time-display");
    const outlineLength = outline.getTotalLength();
    // Set timer to 25 minutes
    let duration = 1499;
    var i = 0;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    play.addEventListener("click", () => {
        checkPlaying(video);
    });

    // Play & pause button impl
    const checkPlaying = video => {
        if (video.paused) {
            video.play();
            play.src = './svg/replay.svg';
            var i = 0;
            timer = setInterval(function () {
                timerImpl(i);
                i++;
            }, 1000);

            function timerImpl(time) {
                let currentTime = time;
                let elapsed = duration - currentTime;
                let seconds = Math.floor(elapsed % 60);
                let minutes = Math.floor(elapsed / 60);
                // Animate circle
                let progress = outlineLength - (currentTime / duration) * outlineLength;
                outline.style.strokeDashoffset = progress;
                // Animate text
                timeDisplay.textContent = `${minutes}:${seconds}`;
                // Handle countdown ending
                if (currentTime > duration) {
                    i++;
                    clearInterval(timer);
                    video.pause();
                    currentTime = 0;
                    play.src = './svg/play.svg'
                    timeDisplay.textContent = `25:00`;
                    outline.style.strokeDashoffset = outlineLength;
                    alert("Session done! Take a break. Restart in a few minutes.");
                }
            }
        } else {
            clearInterval(timer);
            video.pause();
            timeDisplay.textContent = `25:00`;
            outline.style.strokeDashoffset = outlineLength;
            play.src = './svg/play.svg';
        }
    }


    // To-do list impl
    // Add "close" button
    var myNodelist = document.getElementsByTagName("LI");
    var i;
    for (i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }

    // "Close" button impl
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }

    // Add "checked" symbol
    var list = document.querySelector('ul');
    list.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false);

    // Add click listener to "Add" button
    const addBtn = document.querySelector(".addBtn");
    addBtn.addEventListener("click", () => {
        newElement();
    });
    // Create a new list item when clicking on the "Add" button
    function newElement() {
        var li = document.createElement("li");
        var inputValue = document.getElementById("input").value;
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        if (inputValue === '') {
            alert("You must write something!");
        } else {
            document.getElementById("list").appendChild(li);
        }
        document.getElementById("input").value = "";

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);

        for (i = 0; i < close.length; i++) {
            close[i].onclick = function () {
                var div = this.parentElement;
                div.style.display = "none";
            }
        }
    }
}

app();