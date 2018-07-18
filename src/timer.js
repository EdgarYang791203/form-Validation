$(document).ready(function() {
    var timer = document.getElementById("timer");

    function countdown() {
        timer.textContent = timer.textContent - 1;
        if (timer.textContent > 0) {
            window.setTimeout(countdown, 1000);
        } else {
            window.location = "https://www.google.com/";
            window.clearInterval(countdown);
        }
    }
    countdown();
});