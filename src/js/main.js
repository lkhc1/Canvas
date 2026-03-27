(function () {
  const mqTouch = window.matchMedia("(hover: none)");
  const links = document.querySelectorAll(".material-symbols-outlined");
  if (!links.length) return;

  let armed = null;

  function clearAll() {
    armed = null;
    links.forEach((btn) => {
      btn.classList.remove("active");
      btn.removeAttribute("aria-expanded");
    });
  }

  function isTouchUi() {
    return mqTouch.matches;
  }

  links.forEach((el) => {
    el.addEventListener("click", function (e) {
      if (!isTouchUi()) return;

      if (armed !== this) {
        e.preventDefault();
        clearAll();
        armed = this;
        this.classList.add("active");
        this.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (!isTouchUi()) return;
    if (e.target.closest(".material-symbols-outlined")) return;
    clearAll();
  });

  function onMqChange() {
    if (!mqTouch.matches) clearAll();
  }

  if (mqTouch.addEventListener) {
    mqTouch.addEventListener("change", onMqChange);
  } else if (mqTouch.addListener) {
    mqTouch.addListener(onMqChange);
  }

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      clearAll();
    }
  });
})();