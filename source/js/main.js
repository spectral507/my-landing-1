(function () {
  let openFormButton = document.querySelector('.arrow-down');
  let form = document.querySelector('.form');
  let nav = document.querySelector('.nav');

  if (openFormButton) {
    openFormButton.addEventListener('click', function (e) {
      e.preventDefault();
      ITVDN.form.open();
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (ITVDN.form.isValid()) {
        console.log('All good');
      } else {
        console.log('Is not valid');
      }
    })
  }

  if (nav) {
    nav.addEventListener('click', function (e) {
      let target = e.target;
      if (target.tagName.toLowerCase() !== 'a') {
        return;
      }

      e.preventDefault();
      ITVDN.navigation.toggleToActiveLink(target);
    });
  }
}());
