(function () {
  let me = {};
  let form = document.querySelector('.form-container');
  let closeButton = document.querySelector('.form-close-button');;

  function onClose(e) {
    if (e.type === 'click' || (e.type === 'keydown' && e.keyCode === 27)) {
      e.preventDefault();
      me.close();
      closeButton.removeEventListener('click', onClose);
      window.removeEventListener('keydown', onClose);
    }
  }

  me.open = function () {
    form.classList.remove('is-hidden');
    closeButton.addEventListener('click', onClose);
    window.addEventListener('keydown', onClose);
  };

  me.close = function () {
    form.classList.add('is-hidden');
  };

  me.isValid = function () {
    let allCompleted = me.isAllCompleted(document.querySelectorAll('[data-valid="required"]'));
    let isEmail = ITVDN.validation.isEmail(document.querySelector('[data-email]').value);
    let isNumber = ITVDN.validation.isNumber(document.querySelector('[data-number').value);
    return allCompleted && isEmail && isNumber;
  };

  me.isAllCompleted = function (data) {
    let result = true;

    for (let i = 0; i < data.length; i++) {
      if (!ITVDN.validation.isNotEmpty(data[i].value)) {
        result = false;
        break;
      }
    }

    return result;
  };

  window.ITVDN.form = me;
}());
