$(document).ready(function() {
    var status = {};
    var $submit = $(":submit");
    var $valid = $("[data-valid]");
    $valid.not("submit").on("input", function() {
        var $this = $(this);
        var checkName = `check${$this.attr("name")}`;
        var result = universal[checkName]($this.val());
        $this[`${result?"remove":"add"}Class`]("warn");
        status[checkName] = result;
        var ary = Object.keys(status);
        $submit[`${$valid.length===ary.length && ary.map(key=>status[key]).every(val=>val)?"remove":"add"}Class`]("warn");
    });
    $("form").submit(e => {
        if ($submit.hasClass("warn")) {
            alert("請填完整資料...");
        } else {
            e.stopImmediatePropagation();
            e.preventDefault();
            var nextPage = parseInt($submit[0].dataset.page) + 1;
            console.log(nextPage);
            window.location = `https://edgaryang791203.github.io/form-Validation/dist/step${nextPage}.html`;
        }
        //$submit.hasClass("warn") && (e.stopImmediatePropagation() || e.preventDefault());
    });
});