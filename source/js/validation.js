(function () {
  let me = {};

  me.isEmail = function (email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  me.isNumber = function (number) {
    let re = /^\d+$/;
    return re.test(number);
  };

  me.isNotEmpty = function (str) {
    return Boolean(str);
  };

  window.ITVDN.validation = me;
}());
