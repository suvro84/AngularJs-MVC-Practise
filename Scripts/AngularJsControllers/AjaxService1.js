

//app.service("ajaxService1", function () {
//    this.$get = function () {
//        return "My Value";
//    };
//});
app.service("ajaxService1", function () {
    this.GetValue = function () {
        return "ajaxService1";
    };

});