var universal = require("./dist/universal");
var express = require("../node_modules/express");
var app = express();
var bodyParser = require("../node_modules/body-parser");
var fileUpload = require("../node_modules/express-fileupload");
var sizeOf = require("../node_modules/image-size");
app.use(fileUpload());
app.use(express.static("./dist"));
app.use(bodyParser.urlencoded({
    extends: false
}));
app.post("/step1.html", (req, res) => {
    if (universal.checkEmail(req.body.Email) &&
        universal.checkPassword(req.body.Password) &&
        universal.checkConfirmPassword(req.body.ConfirmPassword)) {
        res.redirect("/step2.html");
        console.log(req.body);
    } else {
        res.send("error");
    }
});
app.post("/step2.html", (req, res) => {
    if (universal.checkPhone(req.body.Phone) &&
        universal.checkAddress(req.body.Address)) {
        res.redirect("/step3.html");
        console.log(req.body);
    } else {
        res.send("error");
    }
});
app.post("/step4.html", (req, res) => {
    if (universal.checkCardNumber(req.body.CardNumber)) {
        res.redirect("/step5.html");
        console.log(req.body);
    } else {
        res.send("error");
    }
});
app.listen(3000);

//Close javacript => google developer tools setting Disable Javacript
//npm start http://127.0.0.1:3000