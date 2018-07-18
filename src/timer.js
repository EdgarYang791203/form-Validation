$(document).ready(function() {
    var timer = document.getElementById("timer");

    function countdown() {
        timer.textContent = timer.textContent - 1;
        if (timer.textContent > 0) {
            window.setTimeout(countdown, 1000);
        } else {
            window.location = "https://edgaryang791203.github.io/form-Validation/dist/";
            window.clearInterval(countdown);
        }
    }
    countdown();
});