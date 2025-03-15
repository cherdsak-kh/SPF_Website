socket.emit('request-articles-data');

socket.on('Articles-data', (articles) => {
    const articlesDisplay = document.getElementById('articles-display');
    articlesDisplay.innerHTML = '';

    let countArticle = 1;

    for (const article of articles) {
        let articleTopic = article.topic;
        let articleAuthor = article.author;
        let articleDateTime = new Date(article.dateTime);
        let articleLink = article.linkSharing;
        let articleId = 'article_' + countArticle;

        if (articleLink.includes('/view')) {
            articleLink = articleLink.replace('/view', '/preview');
        } else {
            articleLink += '/preview';
        }
        
        articlesDisplay.innerHTML += `
        
            <div class="accordion mb-2" id="accordion_${countArticle}">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#${articleId}" aria-expanded="false" aria-controls="${articleId}">
                            <span class="fw-bold me-2">${countArticle}.</span> ${articleTopic}
                        </button>
                    </h2>
                    <div id="${articleId}" class="accordion-collapse collapse" data-bs-parent="#accordion_${countArticle}">
                        <div class="row px-5 py-3 d-flex justify-content-between">
                            <div class="articleUploader col">โพสต์โดย : ${articleAuthor}</div>
                            <div class="articleDTUpload col">วันที่โพสต์ ${articleDateTime.getDate()}/${articleDateTime.getMonth()}/${articleDateTime.getFullYear()+543} เวลา ${articleDateTime.getHours()}.${articleDateTime.getMinutes()} น.</div>
                        </div>
                        <div class="accordion-body d-flex justify-content-center pt-0">
                            <iframe src="${articleLink}" width="100%" height="1180" allow="autoplay"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        
        `;

        countArticle++;
    }
})