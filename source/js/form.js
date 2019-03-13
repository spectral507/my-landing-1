(function () {
  let me = {};
  let form = document.querySelector('.form-container');
  let closeButton = document.querySelector('.form-close-button');;

  function onClose(e) {
    e.preventDefault();
    me.close();
    closeButton.removeEventListener('click', onClose);
  }

  me.open = function () {
    form.classList.remove('is-hidden');
    closeButton.addEventListener('click', onClose);
  };

  me.close = function () {
    form.classList.add('is-hidden');
  };

  window.form = me;
}());
