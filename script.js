const storageKey = 'theme-preference'

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey);
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
}

const reflectPreference = () => {
  document.firstElementChild.setAttribute('data-theme', theme.value);
}

const theme = {
  value: getColorPreference()
}

// Set early so no page flashes
reflectPreference();

window.onload = () => {
  reflectPreference();

  const themeToggleButton = document.querySelector('#theme-toggle');
  themeToggleButton.addEventListener('click', () => {
    theme.value = (theme.value === 'light') ? 'dark' : 'light';
    setPreference();
  });
}

// Sync with system changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches:isDark}) => {
        theme.value = (isDark) ? 'dark' : 'light';
        setPreference();
});

