$(function () {

  const sections = ["contact", "research", "activity"];
  let currentSection = null;
  let fading = false;

  // Build navigation
  const $nav = $('<div id="navigation"></div>');
  $nav.append('<h4 class="access">navigation</h4>');

  sections.forEach(name => {
    const $link = $(
      `<a href="#${name}" 
          id="nav-${name}" 
          class="navitem">${name}</a>`
    );
    $nav.append($link);
  });

  $("#container").append($nav);

  // Click handling
  $(".navitem").on("click", function (e) {
    e.preventDefault();
    const section = this.id.replace("nav-", "");
    showSection(section);
    history.replaceState(null, "", "#" + section);
  });

  // Hash navigation (back / forward buttons)
  $(window).on("hashchange", function () {
    const hash = location.hash.replace("#", "");
    if (sections.includes(hash)) {
      showSection(hash);
    }
  });

  // Initial load
  const initial = location.hash.replace("#", "");
  if (sections.includes(initial)) {
    showSection(initial);
  }

  function showSection(name) {
    if (fading || currentSection === name) return;
    fading = true;

    const $new = $("#" + name);
    const $old = currentSection ? $("#" + currentSection) : null;

    $(".navitem").removeClass("activebutton");
    $("#nav-" + name).addClass("activebutton");

    if ($old && $old.length) {
      $old.fadeOut("fast", () => fadeInNew());
    } else {
      fadeInNew();
    }

    function fadeInNew() {
      $new.fadeIn("fast", () => {
        $new[0].scrollIntoView({ behavior: "smooth" });
        fading = false;
      });
      currentSection = name;
    }
  }

});
