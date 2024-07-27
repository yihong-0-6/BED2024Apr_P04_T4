 document.addEventListener("DOMContentLoaded", async () => {
    const articleId = localStorage.getItem("articleId");
    const articleImageUrl = localStorage.getItem("articleImageUrl"); // Retrieve image URL

    console.log("Article ID:", articleId);
    console.log("Article Image URL:", articleImageUrl);


    if (!articleId) {
        alert("No article selected for update.");
        return;
    }

    // Fetch article details and populate the form
    const fetchArticleDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/articles/${articleId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const article = await response.json();

            // Display the article image and details
            const imgElement = document.getElementById("article-image");
            if (articleImageUrl) {
                imgElement.onerror = () => {
                imgElement.src = `http://localhost:3000${article.ImageUrl}`; // Set a default image
            }} else {
                imgElement.src = `http://localhost:3000${article.ImageUrl}`; // Use the retrieved URL
            }

            // Display the article image and details
            document.getElementById("article-title").textContent = article.Title;
            document.getElementById("article-author").textContent = article.Author;
            document.getElementById("article-published-date").textContent = new Date(article.Published_Date).toLocaleDateString();

            // Populate form with article data
            document.getElementById("article-id").value = article.ID;
            document.getElementById("title").value = article.Title;
            document.getElementById("author").value = article.Author;

        } catch (error) {
            console.error("Error fetching article details:", error);
        }
    };

    await fetchArticleDetails();

    // Handle form submission for updating article
    const updateForm = document.getElementById("update-form");
    updateForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const articleId = document.getElementById("article-id").value;
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;


        console.log("Updating article with data: ", {
            Title: title,
            Author: author,
        });

        try {
            const response = await fetch(`http://localhost:3000/articles/${articleId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Title: title,
                    Author: author,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const result = await response.json();
            document.getElementById("message").textContent = result.message || "Article updated successfully";
            document.getElementById("message").style.color = "#28a745";

            // Update the displayed article details
            document.getElementById("article-title").textContent = title;
            document.getElementById("article-author").textContent = author;
            
            // Optionally redirect back to the articles list page
            setTimeout(() => {
                window.location.href = "./industry.html";
            }, 2000);

        } catch (error) {
            console.error("Error updating article:", error);
            document.getElementById("message").textContent = "Failed to update article.";
            document.getElementById("message").style.color = "#e74c3c";
        }
    });

    const deleteButton = document.getElementById("deleteButton");
    deleteButton.addEventListener("click", async function (e) {
        console.log("button clicked");
    
        const confirmed = confirm(
            "Are you sure you want to delete this article? This action cannot be undone."
        );
        if (!confirmed) {
            return;
        }
    
        const articleId = document.getElementById("article-id").value;
    
        try {
            const response = await fetch(`http://localhost:3000/articles/${articleId}`, {
                method: "DELETE",
            });
    
            if (response.ok) {
                alert("Article deleted successfully.");
                
                // Store the deleted article ID in session storage
                sessionStorage.setItem("deletedArticleId", articleId);
    
                // Optionally redirect the user to another page
                window.location.href = "industry.html";
            } else {
                alert("Failed to delete article.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        }
    });
});