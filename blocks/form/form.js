export default async function decorate(block) {
    // Create a form element
    const form = document.createElement("form");
    form.classList.add("feedback-form");
  
    // Create Name input
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.required = true;
  
    // Create Email input
    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email ID";
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.required = true;
  
    // Create Overall Experience dropdown
    const experienceLabel = document.createElement("label");
    experienceLabel.textContent = "Overall Experience";
    const experienceSelect = document.createElement("select");
    experienceSelect.name = "experience";
    experienceSelect.required = true;
    ["Good", "Moderate", "Bad"].forEach(optionText => {
      const option = document.createElement("option");
      option.value = optionText.toLowerCase();
      option.textContent = optionText;
      experienceSelect.appendChild(option);
    });
  
    // Create Comments textarea
    const commentsLabel = document.createElement("label");
    commentsLabel.textContent = "Comments";
    const commentsInput = document.createElement("textarea");
    commentsInput.name = "comments";
    commentsInput.rows = 4;
  
    // Create Submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit Feedback";
  
    // Append all elements to the form
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(experienceLabel);
    form.appendChild(experienceSelect);
    form.appendChild(commentsLabel);
    form.appendChild(commentsInput);
    form.appendChild(submitButton);
    block.appendChild(form);
  
    // Handle form submission
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
  
      try {
        // Replace with your Google Apps Script Web App URL
        const response = await fetch("https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          alert("Thank you for your feedback!");
          form.reset();
        } else {
          throw new Error("Failed to submit feedback.");
        }
      } catch (error) {
        console.error("Error submitting feedback:", error);
        alert("Something went wrong. Please try again later.");
      }
    });
  }
  