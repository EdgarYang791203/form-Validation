$(document).ready(function() {
    $("[name='CardNumber']").on("input", function() {
        var $this = $(this)
        $(".visa", ".master").hide();
        $(`.${universal.checkCardNumber(this.value)}`).show();
    }).on("keyup", function(e) { //四個數字空一格
        var n = e.keyCode;
        if (this.value.length < 19 && (n >= 48 && n <= 57) || (n >= 96 && n <= 105)) {
            this.value = this.value.replace(/\s/g, ''); //trim()
            this.value = this.value.replace(/(\d{4})/g, '$1 ');
        }
    });
});