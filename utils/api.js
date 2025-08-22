 const form = document.getElementById("form");
      const submitButton = document.getElementById("submit-button");
      const messageDiv = document.getElementById("message");
      const fileInput = document.getElementById("fileInput");
      const fileNameDisplay = document.getElementById("fileNameDisplay");

      // Update displayed filename on file selection
      fileInput.addEventListener("change", function () {
        if (this.files && this.files.length > 0) {
          fileNameDisplay.textContent = this.files[0].name;
        } else {
          fileNameDisplay.textContent = "No file selected";
        }
      });

      // Function to handle file upload
      async function uploadFile(file) {
        return new Promise((resolve, reject) => {
          const fr = new FileReader();
          fr.onload = (e) => {
            const data = e.target.result.split(",");
            const obj = {
              fileName: file.name,
              mimeType: data[0].match(/:(\w.+);/)[1],
              data: data[1],
            };
            resolve(obj);
          };
          fr.onerror = reject;
          fr.readAsDataURL(file);
        });
      }

      form.addEventListener("submit", async function (e) {
        e.preventDefault();

        messageDiv.textContent = "Submitting...";
        messageDiv.style.display = "block";
        messageDiv.style.backgroundColor = "beige";
        messageDiv.style.color = "black";
        submitButton.disabled = true;
        submitButton.classList.add("is-loading");

        try {
          const formData = new FormData(this);
          const formDataObj = {};

          // Convert FormData to object
          for (let [key, value] of formData.entries()) {
            formDataObj[key] = value;
          }

          // Handle file upload if a file is selected
          if (fileInput.files.length > 0) {
            const fileObj = await uploadFile(fileInput.files[0]);
            formDataObj.fileData = fileObj; // Add file data to form data
          }

          // Submit form data
          const scriptURL =
            "https://script.google.com/macros/s/AKfycbyMtZVLu3gr2tZ2MlT3y3QQmBq6weYROju8dnsX65AgIhfmZ_pevds-9wHVbp-9_wiA/exec";

          const response = await fetch(scriptURL, {
            redirect: "follow",
            method: "POST",
            body: JSON.stringify(formDataObj),
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
          });

          const data = await response.json();

          if (data.status === "success") {
            messageDiv.textContent =
              data.message || "Data submitted successfully!";
            messageDiv.style.backgroundColor = "#48c78e";
            messageDiv.style.color = "white";
            form.reset();
            fileNameDisplay.textContent = "No file selected";
          } else {
            throw new Error(data.message || "Submission failed");
          }
        } catch (error) {
          console.error("Error:", error);
          messageDiv.textContent = "Error: " + error.message;
          messageDiv.style.backgroundColor = "#f14668";
          messageDiv.style.color = "white";
        } finally {
          submitButton.disabled = false;
          submitButton.classList.remove("is-loading");

          setTimeout(() => {
            messageDiv.textContent = "";
            messageDiv.style.display = "none";
          }, 4000);
        }
      });

      // Enhance cancel button to reset file input display
      const cancelButton = form.querySelector("button.is-danger");
      cancelButton.addEventListener("click", function () {
        form.reset();
        fileNameDisplay.textContent = "No file selected";
        messageDiv.style.display = "none";
      });
