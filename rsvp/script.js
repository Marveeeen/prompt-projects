// Wait until the full HTML document has loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get references to the form and confirmation message area
  const form = document.getElementById("rsvp-form");
  const confirmation = document.getElementById("confirmation-message");

  // Listen for form submission
  form.addEventListener("submit", function (event) {
    // Prevent the page from reloading after form submission
    event.preventDefault();

    // Get the user's input values
    const email = document.getElementById("email").value;
    const attendance = document.getElementById("attendance").value;

    // Prepare a message based on whether the user is attending
    let message = "";

    // If the user is attending
    if (attendance === "yes") {
      message = `🎉 Thanks for RSVPing, ${email}! We can’t wait to see your meme magic come to life at the GIF Gala!`;
    }
    // If the user is not attending
    else if (attendance === "no") {
      message = `😢 We'll miss you, ${email}. Maybe next meme! Stay awesome!`;
    }
    // If the attendance field is not properly selected (just in case)
    else {
      message = "Please select your attendance option.";
    }

    // Display the message inside the confirmation section
    confirmation.textContent = message;
    confirmation.style.display = "block"; // Unhide the confirmation area
  });
});
