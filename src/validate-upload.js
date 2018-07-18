$(document).ready(function() {
    var $img = $(".img");
    var $msg = $(".msg");
    var $form = $("form");
    var addedFile = [];
    var selectFile = [];

    function showImage(list) {
        $img.find("img").removeAttr("src");
        list.forEach((a, i) => {
            $img.eq(i).find("img").attr("src", URL.createObjectURL(a));
        });
        $(":submit")[`${list.length===3 ? "remove":"add"}Class`]("warn");
    }

    function loadImage() {
        $form[0].reset();
        $msg.val('');
        var task = [];
        if (addedFile.length + selectFile.length <= 3) {
            selectFile.forEach(file => {
                task.push(new Promise((resolve, reject) => {
                    var img = new Image();
                    img.onload = function() {
                        resolve({
                            width: this.width,
                            height: this.height
                        });
                    };
                    img.onerror = function(e) {
                        reject(e.type);
                    };
                    img.src = URL.createObjectURL(file);
                }));
            });
        } else {
            $msg.val('選取超過3張');
        }
        Promise.all(task).then(result => {
            if (universal.checkImage(result)) {
                selectFile.forEach(file => {
                    addedFile.push(file);
                });
                showImage(addedFile);
            } else {
                $msg.val('尺寸超過150x150');
            }
        }).catch(function() {
            $msg.val('檔案格式錯誤');
        });
    }

    $("[type='file']").change(function() {
        selectFile = [].slice.call(this.files);
        loadImage();
    });

    $img.click(function() {
        $msg.val('');
        addedFile.splice($img.index(this), 1);
        showImage(addedFile);
    });

    $("label[for='upload']")
        .on("drag dragstart dragend dragover dragenter dragleave drop", function(e) {
            e.preventDefault();
            e.stopPropagation();
        })
        .on("dragover dragenter", function() {
            $(this).addClass("dragenter");
        })
        .on("dragleave dragend drop", function() {
            $(this).removeClass("dragenter");
        })
        .on("drop", function(e) {
            var files = e.originalEvent.dataTransfer.files;
            selectFile = [].slice.call(files);
            loadImage();
            // Object.keys(files).forEach(function(key) {
            //     var file = files[key];
            //     selectFile.push(file);
            //     console.log(selectFile);
            //     loadImage();
            // });
        });

    $form.submit(function(e) {
        var formData = new FormData;
        addedFile.forEach(file => {
            formData.append("Photo", file);
        });
        $.ajax({
            type: "POST",
            data: formData,
            contentType: false,
            processData: false
        }).done(url => {
            url ? location.href = url : alert("Error");
        });
        e.preventDefault();
        if ($(":submit").hasClass("warn")) {
            $msg.val('未驗證成功');
        } else {
            $(location).attr('href', 'http://127.0.0.1:3000/step4.html');
        }
    });
});