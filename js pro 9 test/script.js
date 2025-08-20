const langArr = {
  'form-title': { 'uk': 'Форма реєстрації робітника', 'en': 'Worker`s Registration Form' },
  'firstName-label': { 'uk': "Ім'я", 'en': 'Name' },
  'lastName-label': { 'uk': 'Прізвище', 'en': 'Surname' },
  'email-label': { 'uk': 'Електронна пошта', 'en': 'Email' },
  'age-label': { 'uk': 'Вік', 'en': 'Age' },
  'password-label': { 'uk': 'Пароль', 'en': 'Password' },
  'confirm-label': { 'uk': 'Підтвердження пароля', 'en': 'Confirm Password' },
  'register-btn': { 'uk': 'Зареєструватися', 'en': 'Register' },
  'success-msg': { 'uk': 'Реєстрація успішна!', 'en': 'Registration successful!' },
  'error-firstName': { 'uk': 'Мінімум 3 символи', 'en': 'Minimum 3 characters' },
  'error-lastName': { 'uk': 'Мінімум 3 символи', 'en': 'Minimum 3 characters' },
  'error-email': { 'uk': 'Невірний email', 'en': 'Invalid email' },
  'error-age': { 'uk': 'Вік: від 16 до 100', 'en': 'Age: 16–100 yo' },
  'error-password': { 'uk': 'Мінімум 6 символів і 1 цифра', 'en': 'Minimum 6 chars & 1 digit' },
  'error-confirm': { 'uk': 'Паролі не збігаються', 'en': 'Passwords do not match' }
};

const form = document.getElementById("registerForm");
const successMessage = document.getElementById("successMessage");
const langBtn = document.getElementById("langBtn");
const themeBtn = document.getElementById("themeBtn");
let currentLang = 'uk';

const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M6.995 12c0-2.761 2.246-5 5.005-5s5.005 2.239 5.005 5c0 2.761-2.246 5-5.005 5s-5.005-2.239-5.005-5zm13.005-1h-2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zm-16 0h-2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zm7-7v2a1 1 0 1 0 2 0v-2a1 1 0 1 0-2 0zm0 16v2a1 1 0 1 0 2 0v-2a1 1 0 1 0-2 0zm7.071-13.071l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414zm-12.142 12.142l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414zm0-12.142a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414L7.338 6.338a1 1 0 0 0-1.414 0zm12.142 12.142a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 1 0 1.414-1.414l-1.414-1.414a1 1 0 0 0-1.414 0z"/></svg>`;
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M21.752 15.002A9 9 0 1 1 12.998 2.248 7 7 0 0 0 21.752 15.002z"/></svg>`;


function updateLanguage() {
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    if(langArr[key]) el.textContent = langArr[key][currentLang];
  });
  langBtn.textContent = currentLang === 'uk' ? 'EN' : 'UA';
}
updateLanguage();


langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'uk' ? 'en' : 'uk';
  updateLanguage();
});


function updateThemeIcon() {
  themeBtn.innerHTML = document.body.classList.contains('dark') ? sunIcon : moonIcon;
}
updateThemeIcon();
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  updateThemeIcon();
});


const fields = [
  {id:"firstName", min:3, errorKey:'error-firstName'},
  {id:"lastName", min:3, errorKey:'error-lastName'},
  {id:"email", regex:/^[^\s@]+@[^\s@]+\.[^\s@]+$/, errorKey:'error-email'},
  {id:"age", range:[16,100], errorKey:'error-age'},
  {id:"password", regex:/^(?=.*\d).{6,}$/, errorKey:'error-password'},
];


form.addEventListener('submit', function(e){
  e.preventDefault();
  let isValid = true;
  successMessage.textContent = '';

  fields.forEach(f => {
    const input = document.getElementById(f.id);
    const error = input.nextElementSibling;
    input.classList.remove('error-input','success');
    error.textContent = '';

    if(f.min && input.value.trim().length < f.min) {
      error.textContent = langArr[f.errorKey][currentLang];
      input.classList.add('error-input');
      isValid = false;
    } else if(f.regex && !f.regex.test(input.value.trim())) {
      error.textContent = langArr[f.errorKey][currentLang];
      input.classList.add('error-input');
      isValid = false;
    } else if(f.range && (input.value < f.range[0] || input.value > f.range[1])) {
      error.textContent = langArr[f.errorKey][currentLang];
      input.classList.add('error-input');
      isValid = false;
    } else {
      input.classList.add('success');
    }
  });


  const password = document.getElementById('password');
  const confirm = document.getElementById('confirmPassword');
  const confirmError = confirm.nextElementSibling;
  confirm.classList.remove('error-input','success');
  confirmError.textContent = '';

  if(confirm.value !== password.value) {
    confirmError.textContent = langArr['error-confirm'][currentLang];
    confirm.classList.add('error-input');
    isValid = false;
  } else if(confirm.value !== '') {
    confirm.classList.add('success');
  }

  if(isValid) {
    successMessage.textContent = langArr['success-msg'][currentLang];
    form.reset();
    form.querySelectorAll('input').forEach(input => input.classList.remove('success'));
  }
});
