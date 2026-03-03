"Use strict";

// Front-page redirection to Start-page after 5 seconds
if (document.body.classList.contains("front-page")) {
  setTimeout(() => {
    window.location.href = "Start-page.html";
  }, 5000);
}

// Page Transition Logic
document.querySelectorAll(".transition-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("data-target");
    if (!target) return;

    // Optional: Determine direction (e.g., 'left' for "Next", 'right' for "Back")
    const direction = link.getAttribute("data-direction") || "left";

    // Apply exit animation to body
    if (direction === "left") {
      document.body.classList.add("page-out-left");
    } else {
      document.body.classList.add("page-out-right");
    }

    // Wait for the animation to finish before navigating (500ms matches CSS duration)
    setTimeout(() => {
      window.location.href = target;
    }, 500);
  });
});

// Account.html redirection
document.querySelectorAll(".toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const input = toggle.previousElementSibling;

    if (input.type === "password") {
      input.type = "text";
      toggle.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      input.type = "password";
      toggle.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
});
// End of Account.html redirection

document.querySelectorAll(".input-box input").forEach((input) => {
  input.addEventListener("input", () => {
    const wrapper = input.parentElement;

    if (input.value.length > 0) {
      wrapper.classList.add("typing");
    } else {
      wrapper.classList.remove("typing");
    }
  });
});

// OTP Auto-focus logic
const otpInputs = document.querySelectorAll(".otp-input");
otpInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    if (e.target.value.length === 1 && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      otpInputs[index - 1].focus();
    }
  });
});

// Countdown Timer logic
const timerElement = document.querySelector(".expiry-text b");
if (timerElement) {
  let timeLeft = 192; // 3:12 in seconds
  const interval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    if (timeLeft <= 0) clearInterval(interval);
    timeLeft--;
  }, 1000);
}

// Password Validation logic
const passwordInput = document.querySelector(".password-input");
const lengthValidation = document.getElementById("length-validation");
if (passwordInput && lengthValidation) {
  passwordInput.addEventListener("input", () => {
    if (passwordInput.value.length >= 6) {
      lengthValidation.classList.add("valid");
    } else {
      lengthValidation.classList.remove("valid");
    }
  });
}

// Profile Picture Preview logic
const profileInput = document.getElementById("profile-input");
const profilePreview = document.querySelector(".profile-preview");
if (profileInput && profilePreview) {
  profileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        profilePreview.innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
      };
      reader.readAsDataURL(file);
    }
  });
}
