socket.emit('request-articles-data');

socket.on('Articles-data', (articles) => {
    const articlesDisplay = document.getElementById('articles-display');
    articlesDisplay.innerHTML = '';

    let countArticle = 1;

    for (const article of articles) {
        let articleTopic = article.topic;
        // let articleAuthor = article.author;
        // let articleDateTime = new Date(article.dateTime);
        let articleLink = article.linkSharing;
        // let articleId = 'article_' + countArticle;

        if (articleLink.includes('/view')) {
            articleLink = articleLink.replace('/view', '/preview');
        } else {
            articleLink += '/preview';
        }

        articlesDisplay.innerHTML += `

            <a href="${article.linkSharing}" target="_blank" class="btn btn-outline-light mb-2 py-3 w-100">
                <span class="d-flex justify-content-between px-2">
                    <div>${countArticle}. ${articleTopic}</div>
                    <div><i class="ri-external-link-line"></i></div>
                </span>
            </a>
        
        `;

        countArticle++;
    }
})