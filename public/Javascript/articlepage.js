async function fetchArticles() {
    try {
        const response = await fetch("http://localhost:3000/articles");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const articleList = document.getElementById("article-list");

        // Clear existing articles before adding new ones
        articleList.innerHTML = '';

        data.forEach((article) => {
            // Create a table row for each article
            const articleRow = document.createElement("tr");

            // Title and Thumbnail
            const titleCell = document.createElement("td");
            const titleElement = document.createElement("h4");
            titleElement.textContent = article.Title;

            const thumbnailDiv = document.createElement("div");
            thumbnailDiv.classList.add("thumbnail");

            const imgElement = document.createElement("img");
            imgElement.src = `http://localhost:3000${article.ImageUrl}`;
            imgElement.alt = article.Title;
            imgElement.style.width = '350px'; // Ensure images fit within thumbnail
            imgElement.style.height = '250px'; // Maintain aspect ratio

            thumbnailDiv.appendChild(imgElement);
            titleCell.appendChild(titleElement);
            titleCell.appendChild(thumbnailDiv);

            // Description
            const descriptionCell = document.createElement("td");
            const descriptionDiv = document.createElement("div");
            descriptionDiv.classList.add("description");
            const descriptionText = document.createElement("div");
            descriptionText.classList.add("text");
            descriptionText.textContent = article.Description;
            descriptionDiv.appendChild(descriptionText);
            descriptionCell.appendChild(descriptionDiv);

            // Author and Date
            const authorDateCell = document.createElement("td");
            // Convert the Published_Date to a Date object
            const date = new Date(article.Published_Date);

            // Format the date to YYYY-MM-DD (ISO format)
            const formattedDate = date.toLocaleDateString('en-CA'); // 'en-CA' for YYYY-MM-DD format

            authorDateCell.innerHTML = `<b>Author</b>: ${article.Author} <br><br> <b>Published Date</b>: ${formattedDate}`;

            // Actions
            const actionsCell = document.createElement("td");
            const updateButtonElement = document.createElement("button");
            updateButtonElement.textContent = "Update";
            updateButtonElement.onclick = function () {
                // Save the article data in localStorage
                localStorage.setItem("articleToUpdate", article.ID);

                // Redirect to the update page
                window.location.href = "updateArticle.html";
            };
            
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function () {
                // Implement delete functionality here if needed
                alert(`Deleting article: ${article.Title}`);
            };

            actionsCell.appendChild(updateButtonElement);
            actionsCell.appendChild(deleteButton);

            // Append cells to the article row
            articleRow.appendChild(titleCell);
            articleRow.appendChild(descriptionCell);
            articleRow.appendChild(authorDateCell);
            articleRow.appendChild(actionsCell);

            // Append the article row to the list
            articleList.appendChild(articleRow);
        });
    } catch (error) {
        console.error("Error fetching article details:", error);
    }
}

fetchArticles();
