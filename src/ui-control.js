$(document).ready(function() {
    $("[data-toggle='tooltip']").each(function() {
        function showHide(x) {
            x.tooltip(x.hasClass("warn") ? "show" : "hide");
        }
        var $this = $(this);
        new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.attributeName === "class" && showHide($this);
            });
        }).observe(this, {
            attributes: true,
            characterData: false,
            childList: false
        });
        $this.tooltip({
            placement: "right",
            trigger: "manual"
        });
        showHide($this);
    });
    $("[data-from][data-to]").each(function() {
        var $this = $(this);
        var i = $this.data("from");
        for (i; i < $this.data("to") + 1; i++) {
            $this.append(`<option value="${i}">${i}</option>`)
        }
    });
    var $city = $(".city");
    var $region = $(".region");
    $city.length && $region.length && $.getJSON("data.json", data => {
        data.city.forEach((a, i) => {
            $city.append(`<option value="${i}">${a}</option>`);
            $city.change(function() {
                $region.empty();
                data.region[$city.val()].forEach((a, i) => {
                    $region.append(`<option value="${i}">${a}</option>`);
                });
            });
        });
    });
});