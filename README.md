# ✨ AuraAuth • Modern Login & Registration Web Application

A modern, responsive, glassmorphism-styled authentication portal with interactive micro-interactions, dark/light theme switching, and live password strength analysis.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🌟 Key Features

- 🎨 **Glassmorphism UI**: Backdrop blur, glowing gradient meshes, dynamic ambient lighting.
- 🌓 **Dark & Light Mode**: Seamless theme toggle with local storage persistence.
- 🔄 **Dual Tab Switcher**: Smooth animated transition between **Sign In** and **Sign Up**.
- 🔐 **Password Security**:
  - Show / Hide password toggle.
  - Real-time password strength meter with 4 validation rules.
- ⚡ **Demo Quick-Fill**: One-click quick login buttons for Admin and User testing.
- 🌐 **Social Authentication**: Google, GitHub, and Apple buttons.
- 📬 **Forgot Password Flow**: Modal dialog with email reset simulation.
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop screens.
- 🚀 **Interactive Dashboard**: Simulated post-login session view with sign-out.

---

## 📁 Project Structure

```
modern-login-page/
├── index.html       # Main HTML markup & structure
├── styles.css       # Complete design system, glassmorphism & responsive CSS
├── app.js           # Client-side validation, password strength & UI logic
├── server.ps1       # Lightweight local HTTP preview server
└── README.md        # Documentation
```

---

## 💻 How to Run Locally

### Option 1: Direct File Open
Simply double-click `index.html` or open it in any web browser.

### Option 2: Local HTTP Server (PowerShell)
Run the included PowerShell server script:
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1 -Port 3000
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.
