// ------------------------------------------------------------------------------------------------------>

socket.emit('request-rules-data');

socket.on('rules-data', (rules) => {
    
    const rulesDisplay = JSON.parse(JSON.stringify(rules));

    for(const rule of rulesDisplay) {
        if (rule.linkSharing.includes('/view')) {
            rule.linkSharing = rule.linkSharing.replace('/view', '/preview');
        } else {
            rule.linkSharing += '/preview';
        }
        console.log(rule.linkSharing);
    }

    // console.log(rulesDisplay);
    // console.log(rules);

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.>
    const rulesDisplay_1 = document.getElementById('rule-1');
    rulesDisplay_1.innerHTML = `
        <div class="col-lg-9 bg-dark rounded-2 p-1 pb-0 mx-auto mt-3 overflow-hidden">
            <iframe src="${rulesDisplay[0].linkSharing}" width="100%" height="1200"></iframe>
        </div>
    `;
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.>
    const rulesDisplay_2 = document.getElementById('rule-2');
    rulesDisplay_2.innerHTML = `
        <div class="col-lg-9 bg-dark rounded-2 p-1 pb-0 mx-auto mt-3 overflow-hidden">
            <iframe src="${rulesDisplay[1].linkSharing}" width="100%" height="1200"></iframe>
        </div>
    `;
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.>

});

// ------------------------------------------------------------------------------------------------------>