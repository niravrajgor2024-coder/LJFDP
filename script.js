const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  formStatus.textContent = "";
  formStatus.className = "";

  // Basic spam check
  if (form.elements["_honey"].value) {
    formStatus.textContent = "Unable to submit this message.";
    formStatus.className = "error";
    return;
  }

  if (!form.reportValidity()) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {
    const formData = new FormData(form);

    const response = await fetch(
      "https://formsubmit.co/ajax/niravrajgor2012@gmail.com",
      {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: formData
      }
    );

    const result = await response.json();

    if (!response.ok || result.success !== "true") {
      throw new Error("Message delivery failed.");
    }

    formStatus.textContent =
      "Thank you! Your message has been sent successfully.";
    formStatus.className = "success";
    form.reset();

  } catch (error) {
    formStatus.textContent =
      "Sorry, your message could not be sent. Please try again later.";
    formStatus.className = "error";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});