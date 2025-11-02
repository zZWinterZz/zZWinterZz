// Small client JS: set year and theme toggle
document.addEventListener('DOMContentLoaded', function () {
  // year
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  // theme handling with persistence
  var btn = document.getElementById('theme-toggle');

  function applyTheme(t){
    if(t === 'dark'){
      document.documentElement.setAttribute('data-theme','dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try{ localStorage.setItem('site-theme', t); }catch(e){}
  }

  // initial theme: prefer stored, else prefers-color-scheme, else light
  try{
    var stored = localStorage.getItem('site-theme');
  }catch(e){var stored = null}
  var initial = stored || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(initial);

  if(btn){
    // update button label to reflect current theme
    function updateButton(){
      var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      btn.textContent = cur === 'dark' ? '☀️' : '🌓';
      btn.setAttribute('aria-pressed', cur === 'dark');
    }
    updateButton();

    btn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = cur === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      updateButton();
    });
  }
});
