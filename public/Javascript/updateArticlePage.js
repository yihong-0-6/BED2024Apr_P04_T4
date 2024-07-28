 // Listen for the DOMContentLoaded event to ensure the DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", async () => {
    // Retrieve the article ID and image URL stored in local storage
    const articleId = localStorage.getItem("articleId");
    const articleImageUrl = localStorage.getItem("articleImageUrl"); // Retrieve image URL

    // Log the retrieved values for debugging purposes
    console.log("Article ID:", articleId);
    console.log("Article Image URL:", articleImageUrl);

    // Check if an article ID exists; if not, alert the user and stop execution
    if (!articleId) {
        alert("No article selected for update.");
        return;
    }

    // Define an asynchronous function to fetch article details and populate the form
    const fetchArticleDetails = async () => {
        try {
            // Send a GET request to the server to fetch article details by article ID
            const response = await fetch(`http://localhost:3000/articles/${articleId}`);
            
            // Check if the response is not OK (status code outside the range 200-299)
            if (!response.ok) {
                // Throw an error with the HTTP status code for further error handling
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse the JSON response to retrieve the article object
            const article = await response.json();

            // Find the image element in the DOM
            const imgElement = document.getElementById("article-image");

            // Set the image source to the retrieved article image URL
            // Use a fallback URL if the specified URL is not available
            if (articleImageUrl) {
                imgElement.onerror = () => {
                    imgElement.src = `http://localhost:3000${article.ImageUrl}`; // Set a default image
                };
            } else {
                imgElement.src = `http://localhost:3000${article.ImageUrl}`; // Use the retrieved URL
            }

            // Display the article title, author, and published date in the HTML
            document.getElementById("article-title").textContent = article.Title;
            document.getElementById("article-author").textContent = article.Author;
            document.getElementById("article-published-date").textContent = new Date(article.Published_Date).toLocaleDateString();

            // Populate the form fields with article data for editing
            document.getElementById("article-id").value = article.ID;
            document.getElementById("title").value = article.Title;
            document.getElementById("author").value = article.Author;

        } catch (error) {
            // Log any errors encountered during the fetch operation
            console.error("Error fetching article details:", error);
        }
    };

    // Call the function to fetch article details
    await fetchArticleDetails();

    // Handle form submission for updating the article
    const updateForm = document.getElementById("update-form");
    updateForm.addEventListener("submit", async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the updated article ID, title, and author values from the form inputs
        const articleId = document.getElementById("article-id").value;
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;

        // Log the updated data for debugging purposes
        console.log("Updating article with data: ", {
            Title: title,
            Author: author,
        });

        try {
            // Send a PUT request to update the article with the specified ID
            const response = await fetch(`http://localhost:3000/articles/${articleId}`, {
                method: "PUT", // HTTP method for updating resources
                headers: {
                    "Content-Type": "application/json", // Specify JSON content type for the request body
                },
                body: JSON.stringify({
                    Title: title, // Send updated title
                    Author: author, // Send updated author
                }),
            });

            // Check if the response is not OK
            if (!response.ok) {
                // Await the error message from the response and throw an error with details
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            // Await the JSON result from the response (updated article)
            const result = await response.json();

            // Alert the user of a successful update
            alert("Article updated successfully.");
            // Set the message text color to green to indicate success
            document.getElementById("message").style.color = "#28a745";

            // Update the displayed article details with the updated values
            document.getElementById("article-title").textContent = title;
            document.getElementById("article-author").textContent = author;

            // Optionally redirect back to the articles list page after 2 seconds
            setTimeout(() => {
                window.location.href = "./industry.html";
            }, 2000);

        } catch (error) {
            // Log any errors encountered during the update operation
            console.error("Error updating article:", error);
            // Display an error message to the user
            document.getElementById("message").textContent = "Failed to update article.";
            // Set the message text color to red to indicate failure
            document.getElementById("message").style.color = "#e74c3c";
        }
    });

    // Handle the delete button click event for deleting the article
    const deleteButton = document.getElementById("deleteButton");
    deleteButton.addEventListener("click", async function (e) {
        // Log the button click for debugging
        console.log("button clicked");

        // Confirm deletion with the user and check their response
        const confirmed = confirm(
            "Are you sure you want to delete this article? This action cannot be undone."
        );
        
        // If the user cancels the confirmation dialog, return without proceeding
        if (!confirmed) {
            return;
        }

        // Retrieve the article ID from the form input
        const articleId = document.getElementById("article-id").value;

        try {
            // Send a DELETE request to remove the article with the specified ID
            const response = await fetch(`http://localhost:3000/articles/${articleId}`, {
                method: "DELETE", // HTTP method for deleting resources
            });

            // If the response is OK, alert the user and perform post-deletion actions
            if (response.ok) {
                alert("Article deleted successfully.");

                // Store the deleted article ID in session storage
                sessionStorage.setItem("deletedArticleId", articleId);

                // Optionally redirect the user to another page, such as the article list
                window.location.href = "industry.html";
            } else {
                // If the response is not OK, alert the user of the failure
                alert("Failed to delete article.");
            }
        } catch (error) {
            // Log any errors encountered during the deletion operation
            console.error("Error:", error);
            // Alert the user of an error and suggest retrying later
            alert("An error occurred. Please try again later.");
        }
    });
});
