"Use strict";

// Front-page redirection to Start-page after 2 seconds
if (document.body.classList.contains("front-page")) {
  setTimeout(() => {
    document.body.classList.add("page-fade-out");
    setTimeout(() => {
      window.location.href = "Start-page.html";
    }, 300); // 300ms exit animation
  }, 2000);
}

// Page Transition Logic
document.querySelectorAll(".transition-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("data-target");
    if (!target) return;

    // Apply fade-out animation to body
    document.body.classList.add("page-fade-out");

    // Wait for the animation to finish before navigating (300ms matches faster CSS duration)
    setTimeout(() => {
      window.location.href = target;
    }, 300);
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

// Swipe Gesture Navigation
let touchStartX = 0;
let touchEndX = 0;

window.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  false,
);

window.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  false,
);

function handleSwipe() {
  const threshold = 50; // Minimum distance to be considered a swipe
  const deltaX = touchEndX - touchStartX;

  if (deltaX < -threshold) {
    // Swipe Left -> Navigate to NEXT page
    const nextBtn = document.querySelector("button.transition-link");
    if (nextBtn) nextBtn.click();
  } else if (deltaX > threshold) {
    // Swipe Right -> Navigate to PREVIOUS page
    const backBtn = document.querySelector(".fa-arrow-left.transition-link");
    if (backBtn) backBtn.click();
  }
}
