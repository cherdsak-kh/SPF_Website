document.getElementById('rule_2').classList.add('d-none');

document.getElementById('rule_1_btn').onclick = () => {
    document.getElementById('rule_1_btn').classList.add('active');
    document.getElementById('rule_2_btn').classList.remove('active');
    document.getElementById('rule_1').classList.remove('d-none');
    document.getElementById('rule_2').classList.add('d-none');
};

document.getElementById('rule_2_btn').onclick = () => {
    document.getElementById('rule_2_btn').classList.add('active');
    document.getElementById('rule_1_btn').classList.remove('active');
    document.getElementById('rule_2').classList.remove('d-none');
    document.getElementById('rule_1').classList.add('d-none');
};

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
    const rulesDisplay_1 = document.getElementById('rule-display-1');
    rulesDisplay_1.innerHTML = `
        <iframe src="${rulesDisplay[0].linkSharing}" width="75%" height="1200"></iframe>
    `;
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.>
    const rulesDisplay_2 = document.getElementById('rule-display-2');
    rulesDisplay_2.innerHTML = `
        <iframe src="${rulesDisplay[1].linkSharing}" width="75%" height="1200"></iframe>
    `;
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.>

});

// ------------------------------------------------------------------------------------------------------>