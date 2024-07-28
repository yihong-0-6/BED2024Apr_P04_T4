// Asynchronous function to fetch articles from the server.
async function fetchArticles() {
    try {
        // Sending an HTTP GET request to the server to retrieve articles from the specified URL.
        const response = await fetch("http://localhost:3000/articles");

        // Checking if the response status is not OK
        // If the status is not OK, throw an error with the status code.
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parsing the response body as JSON data.
        const data = await response.json();

        // Logging the fetched data to the console for debugging purposes.
        console.log(data)

        // Finding the DOM element with the ID "article-list", where articles will be appended.
        const articleList = document.getElementById("article-list");

        // Iterating over each article in the fetched data.
        data.forEach((article) => {

            // Create a table row for each article
            const articleRow = document.createElement("tr");

            // Creating a table cell to hold the article title and thumbnail image.
            const titleCell = document.createElement("td");

            // Creating an h4 element to display the article title.
            const titleElement = document.createElement("h4");

            // Setting the text content of the title element to the article's title.
            titleElement.textContent = article.Title;

            // Creating a div element to contain the thumbnail image.
            const thumbnailDiv = document.createElement("div");

            // Adding the class "thumbnail" to the div for styling purposes.
            thumbnailDiv.classList.add("thumbnail");

            // Creating an img element to display the article's thumbnail image.
            const imgElement = document.createElement("img");

            // Setting the source of the image to the article's ImageUrl property, prefixed with the base URL.
            imgElement.src = `http://localhost:3000${article.ImageUrl}`;
            
            // Setting the alt attribute of the image for accessibility, using the article's title.
            imgElement.alt = article.Title;

            // Setting the width and height of the image to maintain a consistent size.
            imgElement.style.width = '350px';
            imgElement.style.height = '250px'; 

            // Appending the img element to the thumbnail div.
            thumbnailDiv.appendChild(imgElement);

            // Appending the title element and thumbnail div to the title cell.
            titleCell.appendChild(titleElement);
            titleCell.appendChild(thumbnailDiv);


            // Creating a table cell to hold the author and published date information.
            const authorDateCell = document.createElement("td");

            // Converting the Published_Date from the article into a JavaScript Date object.
            const date = new Date(article.Published_Date);

            // Formatting the date as a string in the 'YYYY-MM-DD' format using Canadian English locale.
            const formattedDate = date.toLocaleDateString('en-CA'); // 'en-CA' for YYYY-MM-DD format

            // Setting the inner HTML of the cell to display the author and formatted date.
            // This uses bold tags (<b>) to highlight the labels.
            authorDateCell.innerHTML = `<b>Author</b>: ${article.Author} <br><br> <b>Published Date</b>: ${formattedDate}`;

            // Creating a table cell to hold action buttons (Update and Delete).
            const actionsCell = document.createElement("td");

            // Creating a button element for updating the article.
            const updateButtonElement = document.createElement("button");

            // Setting the button's text content to "Update".
            updateButtonElement.textContent = "Update";

            // Adding an onclick event handler to the update button to trigger the update logic.
            updateButtonElement.onclick = function () {
                // Storing the article's ID in localStorage for later use.
                localStorage.setItem("articleId", article.ID);

                // Retrieving the articleId from localStorage for debugging and verification.
                const articleId = localStorage.getItem("articleId")

                // Logging the stored articleId to the console.
                console.log(articleId)

                // Storing the article's ImageUrl in localStorage for use on the update page.
                localStorage.setItem("articleImagesUrl", `http://localhost:3000${article.ImageUrl}`);

                // Redirecting the user to the update page for editing the selected article.
                window.location.href = "updateArticle.html";
            };
            
            // Creating a button element for deleting the article.
            const deleteButton = document.createElement("button");

            // Setting the button's text content to "Delete".
            deleteButton.textContent = "Delete";

            // Adding an event listener for the click event to handle article deletion.
            deleteButton.addEventListener("click", async function() {
                // Logging a message to the console to indicate the button was clicked.
                console.log("button clicked")

                // Displaying a confirmation dialog to the user to confirm the delete action.
                const confirmed = confirm(
                    "Are you sure you want to delete your article? This action cannot be undone."
                    );

                    // If the user cancels the deletion, exit the function early.
                    if (!confirmed) {
                    return;
                    }
                    
                    // Sending a DELETE request to the server to remove the article identified by the stored ID.
                    await fetch(`/articles/${localStorage.getItem('articleId')}`, {
                    method: "DELETE",
                    })
                    .then((response) => {

                        // Checking if the response indicates a successful deletion.
                        if (response.ok) {
                            // Alerting the user that the article was successfully deleted.
                            alert("Article deleted successfully.");

                            // Redirecting the user to another page, presumably to refresh the list.
                            window.location.href = "./industry.html";
                        } else {
                            // Alerting the user that the deletion failed.
                            alert("Failed to delete article.");
                        }
                    })
                    .catch((error) => {
                        // Logging any errors to the console.
                        console.error("Error:", error);

                        // Alerting the user that an error occurred during the deletion process.
                        alert("An error occurred. Please try again later.");
                    });
            })

            
            // Appending the update and delete buttons to the actions cell.
            actionsCell.appendChild(updateButtonElement);
            actionsCell.appendChild(deleteButton);

            // Appending the constructed cells to the article row.
            articleRow.appendChild(titleCell);
            articleRow.appendChild(authorDateCell);
            articleRow.appendChild(actionsCell);

            // Appending the completed article row to the article list in the DOM.
            articleList.appendChild(articleRow);
        });
    } catch (error) {
        // Catching any errors that occur during the fetch process and logging them to the console.
        console.error("Error fetching article details:", error);
    }
}

// Calling the fetchArticles function to initiate the process of fetching and displaying articles.
fetchArticles();
