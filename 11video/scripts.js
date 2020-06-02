// Get elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progressBar =  player.querySelector(".progress");
const progress = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipBtns = player.querySelectorAll("[data-skip]");
const sliders = player.querySelectorAll(".player__slider");

// Functions 
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateBtn() {
    const icon = video.paused ? "►":"||";
    toggle.innerHTML = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleSlide() {
    const prop = this.name;
    video[prop] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progress.style.flexBasis = `${percent}%`;
}
function scrub(e) {
    if (!down) return;
    const newTime = video.duration * (e.offsetX / progressBar.offsetWidth);
    video.currentTime = newTime;
} 

// Event listeners
let down = false;
video.addEventListener("click", togglePlay);
video.addEventListener("pause", updateBtn);
video.addEventListener("play", updateBtn);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);
progressBar.addEventListener("click", scrub);
progressBar.addEventListener("mousemove", scrub);
progressBar.addEventListener("mousedown", () => down = true);
progressBar.addEventListener("mouseup", () => down = false);
skipBtns.forEach(button => button.addEventListener("click", skip));
sliders.forEach(range => range.addEventListener("change", handleSlide))