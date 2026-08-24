/**
 * AuraAuth - Modern Authentication Logic & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const tabSignIn = document.getElementById('tabSignIn');
  const tabSignUp = document.getElementById('tabSignUp');
  const tabIndicator = document.getElementById('tabIndicator');
  const cardTitle = document.getElementById('cardTitle');
  const cardSubtitle = document.getElementById('cardSubtitle');
  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');
  const authCard = document.getElementById('authCard');
  const dashboardCard = document.getElementById('dashboardCard');
  const logoutBtn = document.getElementById('logoutBtn');

  // Demo buttons
  const quickDemoAdmin = document.getElementById('quickDemoAdmin');
  const quickDemoUser = document.getElementById('quickDemoUser');

  // Password toggles
  const signInPasswordToggle = document.getElementById('signInPasswordToggle');
  const signUpPasswordToggle = document.getElementById('signUpPasswordToggle');
  const signInPassword = document.getElementById('signInPassword');
  const signUpPassword = document.getElementById('signUpPassword');

  // Sign In inputs & errors
  const signInEmail = document.getElementById('signInEmail');
  const signInEmailError = document.getElementById('signInEmailError');
  const signInPasswordError = document.getElementById('signInPasswordError');
  const signInSubmitBtn = document.getElementById('signInSubmitBtn');

  // Sign Up inputs & errors
  const signUpName = document.getElementById('signUpName');
  const signUpNameError = document.getElementById('signUpNameError');
  const signUpEmail = document.getElementById('signUpEmail');
  const signUpEmailError = document.getElementById('signUpEmailError');
  const signUpPasswordError = document.getElementById('signUpPasswordError');
  const agreeTerms = document.getElementById('agreeTerms');
  const signUpTermsError = document.getElementById('signUpTermsError');
  const signUpSubmitBtn = document.getElementById('signUpSubmitBtn');

  // Password strength elements
  const strengthBars = [
    document.getElementById('bar1'),
    document.getElementById('bar2'),
    document.getElementById('bar3'),
    document.getElementById('bar4'),
  ];
  const strengthValue = document.getElementById('strengthValue');
  const ruleLength = document.getElementById('ruleLength');
  const ruleNumber = document.getElementById('ruleNumber');
  const ruleUpper = document.getElementById('ruleUpper');
  const ruleSpecial = document.getElementById('ruleSpecial');

  // Forgot password modal
  const forgotModal = document.getElementById('forgotModal');
  const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
  const closeForgotModal = document.getElementById('closeForgotModal');
  const forgotForm = document.getElementById('forgotForm');
  const forgotEmail = document.getElementById('forgotEmail');
  const forgotEmailError = document.getElementById('forgotEmailError');
  const forgotSubmitBtn = document.getElementById('forgotSubmitBtn');

  // Social buttons
  const googleLogin = document.getElementById('googleLogin');
  const githubLogin = document.getElementById('githubLogin');
  const appleLogin = document.getElementById('appleLogin');

  // Dashboard elements
  const dashUserName = document.getElementById('dashUserName');
  const dashUserEmail = document.getElementById('dashUserEmail');
  const dashAvatar = document.getElementById('dashAvatar');

  // --- 1. Theme Switcher ---
  const savedTheme = localStorage.getItem('aura_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('aura_theme', newTheme);
    showToast(`Switched to ${newTheme} mode`, 'info');
  });

  // --- 2. Tab Switcher Logic ---
  function switchTab(mode) {
    clearErrors();
    if (mode === 'signup') {
      tabSignIn.classList.remove('active');
      tabSignUp.classList.add('active');
      tabSignIn.setAttribute('aria-selected', 'false');
      tabSignUp.setAttribute('aria-selected', 'true');
      tabIndicator.classList.add('signup');

      signInForm.classList.remove('active');
      signUpForm.classList.add('active');

      cardTitle.textContent = 'Create your account';
      cardSubtitle.textContent = 'Start your 14-day free trial today';
    } else {
      tabSignUp.classList.remove('active');
      tabSignIn.classList.add('active');
      tabSignUp.setAttribute('aria-selected', 'false');
      tabSignIn.setAttribute('aria-selected', 'true');
      tabIndicator.classList.remove('signup');

      signUpForm.classList.remove('active');
      signInForm.classList.add('active');

      cardTitle.textContent = 'Welcome back';
      cardSubtitle.textContent = 'Sign in to your account to continue';
    }
  }

  tabSignIn.addEventListener('click', () => switchTab('signin'));
  tabSignUp.addEventListener('click', () => switchTab('signup'));

  // --- 3. Password Visibility Toggles ---
  function setupPasswordToggle(button, input) {
    button.addEventListener('click', () => {
      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');
      button.classList.toggle('showing', isPassword);
    });
  }

  setupPasswordToggle(signInPasswordToggle, signInPassword);
  setupPasswordToggle(signUpPasswordToggle, signUpPassword);

  // --- 4. Password Strength Calculation ---
  signUpPassword.addEventListener('input', () => {
    const val = signUpPassword.value;

    const hasLength = val.length >= 8;
    const hasNumber = /\d/.test(val);
    const hasUpperAndLower = /[a-z]/.test(val) && /[A-Z]/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val);

    // Update checklist UI
    ruleLength.classList.toggle('valid', hasLength);
    ruleNumber.classList.toggle('valid', hasNumber);
    ruleUpper.classList.toggle('valid', hasUpperAndLower);
    ruleSpecial.classList.toggle('valid', hasSpecial);

    // Calculate score (0 to 4)
    const score = [hasLength, hasNumber, hasUpperAndLower, hasSpecial].filter(Boolean).length;

    // Reset bar colors
    strengthBars.forEach(bar => {
      bar.style.background = 'rgba(255, 255, 255, 0.12)';
    });

    const colors = ['#ef4444', '#f97316', '#eab308', '#10b981'];
    const labels = ['Too weak', 'Weak', 'Fair', 'Strong'];

    if (val.length === 0) {
      strengthValue.textContent = 'Too weak';
      strengthValue.style.color = 'var(--text-muted)';
      return;
    }

    const activeColor = colors[Math.max(0, score - 1)] || '#ef4444';
    strengthValue.textContent = labels[Math.max(0, score - 1)] || 'Too weak';
    strengthValue.style.color = activeColor;

    for (let i = 0; i < score; i++) {
      if (strengthBars[i]) {
        strengthBars[i].style.background = activeColor;
      }
    }
  });

  // --- 5. Validation Utilities ---
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).trim().toLowerCase());
  }

  function setError(inputElement, errorElement, message) {
    const group = inputElement.closest('.input-group') || inputElement.parentElement;
    group.classList.add('has-error');
    errorElement.textContent = message;
  }

  function clearError(inputElement, errorElement) {
    const group = inputElement.closest('.input-group') || inputElement.parentElement;
    if (group) group.classList.remove('has-error');
    if (errorElement) errorElement.textContent = '';
  }

  function clearErrors() {
    document.querySelectorAll('.input-group').forEach(g => g.classList.remove('has-error'));
    document.querySelectorAll('.error-msg').forEach(e => e.textContent = '');
  }

  // Clear errors on input
  [signInEmail, signInPassword].forEach(inp => {
    inp.addEventListener('input', () => clearError(inp, document.getElementById(`${inp.id}Error`)));
  });

  [signUpName, signUpEmail, signUpPassword].forEach(inp => {
    inp.addEventListener('input', () => clearError(inp, document.getElementById(`${inp.id}Error`)));
  });

  // --- 6. Quick Demo Autofill ---
  quickDemoAdmin.addEventListener('click', () => {
    switchTab('signin');
    signInEmail.value = 'admin@aura-auth.dev';
    signInPassword.value = 'AdminSecret@2026';
    clearErrors();
    showToast('Admin demo credentials populated!', 'info');
  });

  quickDemoUser.addEventListener('click', () => {
    switchTab('signin');
    signInEmail.value = 'alex.morgan@company.io';
    signInPassword.value = 'UserPass#8821';
    clearErrors();
    showToast('User demo credentials populated!', 'info');
  });

  // --- 7. Sign In Form Submit ---
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;
    const emailVal = signInEmail.value.trim();
    const passVal = signInPassword.value;

    if (!emailVal) {
      setError(signInEmail, signInEmailError, 'Email address is required');
      isValid = false;
    } else if (!validateEmail(emailVal)) {
      setError(signInEmail, signInEmailError, 'Please enter a valid email format');
      isValid = false;
    }

    if (!passVal) {
      setError(signInPassword, signInPasswordError, 'Password is required');
      isValid = false;
    } else if (passVal.length < 6) {
      setError(signInPassword, signInPasswordError, 'Password must be at least 6 characters');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate Network Request
    signInSubmitBtn.classList.add('loading');
    signInSubmitBtn.disabled = true;

    setTimeout(() => {
      signInSubmitBtn.classList.remove('loading');
      signInSubmitBtn.disabled = false;

      // Successful login simulation
      const name = emailVal.split('@')[0].replace('.', ' ');
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
      triggerSuccessAuth(formattedName, emailVal);
    }, 900);
  });

  // --- 8. Sign Up Form Submit ---
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;
    const nameVal = signUpName.value.trim();
    const emailVal = signUpEmail.value.trim();
    const passVal = signUpPassword.value;

    if (!nameVal) {
      setError(signUpName, signUpNameError, 'Full name is required');
      isValid = false;
    }

    if (!emailVal) {
      setError(signUpEmail, signUpEmailError, 'Work email is required');
      isValid = false;
    } else if (!validateEmail(emailVal)) {
      setError(signUpEmail, signUpEmailError, 'Please enter a valid email format');
      isValid = false;
    }

    if (!passVal) {
      setError(signUpPassword, signUpPasswordError, 'Please create a secure password');
      isValid = false;
    } else if (passVal.length < 8) {
      setError(signUpPassword, signUpPasswordError, 'Password must be at least 8 characters');
      isValid = false;
    }

    if (!agreeTerms.checked) {
      signUpTermsError.textContent = 'Please agree to the Terms of Service to proceed';
      isValid = false;
    }

    if (!isValid) return;

    signUpSubmitBtn.classList.add('loading');
    signUpSubmitBtn.disabled = true;

    setTimeout(() => {
      signUpSubmitBtn.classList.remove('loading');
      signUpSubmitBtn.disabled = false;
      triggerSuccessAuth(nameVal, emailVal);
    }, 1000);
  });

  // --- 9. Post-Login Dashboard Simulation ---
  function triggerSuccessAuth(name, email) {
    showToast(`Welcome back, ${name}!`, 'success');
    
    // Set dashboard user info
    dashUserName.textContent = name;
    dashUserEmail.textContent = email;
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';
    dashAvatar.textContent = initials;

    // Transition view
    authCard.classList.add('hidden');
    dashboardCard.classList.remove('hidden');
  }

  logoutBtn.addEventListener('click', () => {
    dashboardCard.classList.add('hidden');
    authCard.classList.remove('hidden');
    signInPassword.value = '';
    signUpPassword.value = '';
    showToast('You have been signed out successfully.', 'info');
  });

  // --- 10. Social Auth Simulations ---
  function handleSocialLogin(provider) {
    showToast(`Connecting with ${provider}...`, 'info');
    setTimeout(() => {
      triggerSuccessAuth(`${provider} User`, `user@${provider.toLowerCase()}.com`);
    }, 800);
  }

  googleLogin.addEventListener('click', () => handleSocialLogin('Google'));
  githubLogin.addEventListener('click', () => handleSocialLogin('GitHub'));
  appleLogin.addEventListener('click', () => handleSocialLogin('Apple'));

  // --- 11. Forgot Password Modal ---
  forgotPasswordBtn.addEventListener('click', () => {
    forgotModal.classList.remove('hidden');
    forgotEmail.value = signInEmail.value || '';
    forgotEmailError.textContent = '';
    forgotEmail.focus();
  });

  closeForgotModal.addEventListener('click', () => {
    forgotModal.classList.add('hidden');
  });

  forgotModal.addEventListener('click', (e) => {
    if (e.target === forgotModal) {
      forgotModal.classList.add('hidden');
    }
  });

  forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailVal = forgotEmail.value.trim();
    if (!emailVal || !validateEmail(emailVal)) {
      forgotEmailError.textContent = 'Please provide a valid email address';
      return;
    }

    forgotSubmitBtn.classList.add('loading');
    forgotSubmitBtn.disabled = true;

    setTimeout(() => {
      forgotSubmitBtn.classList.remove('loading');
      forgotSubmitBtn.disabled = false;
      forgotModal.classList.add('hidden');
      showToast(`Password reset link sent to ${emailVal}!`, 'success', 5000);
    }, 900);
  });

  // --- 12. Toast Notification System ---
  window.showToast = function(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    } else {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <span class="toast-msg">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };
});
