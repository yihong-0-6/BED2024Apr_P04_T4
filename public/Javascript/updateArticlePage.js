const { response } = require("express");

// Function to load an article for editing
async function loadArticle() {
    // Get the article ID from localStorage
    const articleId = localStorage.getItem("articleToUpdate")

    if (articleId) {

        try {
            // Fetch the article data from your backend API
            const response = await fetch(`http://localhost:3000/articles/${articleId}`); // Use your actual API endpoint
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const article = await response.json();

            // Populate the fields with the article data
            document.getElementById("descriptions").value = article.Description;
            document.getElementById("dates").value = new Date(article.Published_Date).toISOString().substring(0, 10);
            document.getElementById("authors").value = article.Author;
            document.getElementById("articleImage").src = `http://localhost:3000${article.ImageUrl}`;
            document.getElementById("articleImage").alt = article.Title;


        } catch (error) {
            console.error("Error fetching article details: ", error);
            alert("Failed to load the article. Please try again.");
        }
    } else {
        alert("No article data found!");
    }
}

// Function to update an article
async function updateArticle() {

    // Get the article data from localStorage
    const articleId = localStorage.getItem("articleToUpdate")

    if (articleId) {

        // Get the updated values
        const newDescription = document.getElementById("descriptions").value;
        const newDate = document.getElementById("dates").value;
        const newAuthor = document.getElementById("authors").value;

        // Create an Update article detail
        const updatedArticle = {
            Description: newDescription,
            Published_Date: newDate,
            Author: newAuthor
        };

        try {
            // Send the updated data to the server
            const response = await fetch(`http://localhost:3000/articles/${articleId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedArticle)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Display success message
            alert("Article updated successfully!");

            // Redirect back to the article list page
            window.location.href = "industry.html";
        } catch (error) {
            console.error("Error updating article:", error);
            alert("Failed to update the article. Please try again.");
        }
    } else {
        alert("Article not found!");
    }
}

// Load the article when the page is loaded
window.onload = function() {
    loadArticle();
};

// Add an event listener for the update button
document.getElementById("updateButton").addEventListener("click", updateArticle);