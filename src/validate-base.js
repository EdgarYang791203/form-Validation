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
        $submit.hasClass("warn") && (e.stopImmediatePropagation() || e.preventDefault());
    });
});