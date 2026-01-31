"Use strict";

// Front-page redirection to Start-page after 5 seconds 
if (document.body.classList.contains( "front-page")) {
  setTimeout(() => {
    window.location.href = "/src/Start-page.html";
  }, 5000);
}


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

// Remove e.preventDefault(); if form is valid
