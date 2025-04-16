// Request events data from the server
socket.emit('request-server-info-data');

const serverInfoReload = () => {
    socket.emit('request-server-info-data');
}

// Listen for the server info data from the server
socket.on('server-info-data', (data) => {

    if (!data || data.error) {

        document.getElementById('server-info-box').innerHTML = `
        
            <div class="card-body">
                <h4 class="fw-bold text-shadow text-center py-5"><i class="bi bi-plugin me-2"></i> SERVER OFFLINE.</h4>
            </div>
        
        `;

    } else {

        const serverInfo = data.results;
        document.getElementById('server-info-title').innerHTML = `<i class="bi bi-hdd-stack me-2"></i> ${serverInfo.name}`;

        const pingRanges = [
            { max: 70, icon: '<i class="bi bi-reception-4 me-2 text-success"></i>' },
            { max: 140, icon: '<i class="bi bi-reception-3 me-2 text-success"></i>' },
            { max: 210, icon: '<i class="bi bi-reception-2 me-2 text-warning"></i>' },
            { max: 280, icon: '<i class="bi bi-reception-1 me-2 text-danger"></i>' },
            { max: Infinity, icon: '<i class="bi bi-reception-0 me-2 text-danger"></i>' },
        ];

        const serverPingIcon = pingRanges.find(range => serverInfo.ping <= range.max).icon;

        const players = serverInfo.players;
        let player_list_content = '';
        if (players.length === 0) {
            player_list_content = `
                <div class="row align-items-center">
                    <div class="col-lg-12 text-center">
                        ไม่มีผู้เล่นออนไลน์ในขณะนี้
                    </div>
                </div>
            `;
        } else {

            player_list_content = '';
            for (const player of players) {

                let time = player.raw.time; // หน่วยเป็นวินาที
                let hours = Math.floor(time / 3600);
                let minutes = Math.floor((time % 3600) / 60);
                let seconds = Math.floor(time % 60);

                // ฟังก์ชันแสดงผลตามเงื่อนไข
                let formattedTime = '';
                if (hours > 0) {
                    formattedTime = `${hours} ชม. ${minutes} นาที ${seconds} วินาที`;
                } else if (minutes > 0) {
                    formattedTime = `${minutes} นาที ${seconds} วินาที`;
                } else {
                    formattedTime = `${seconds} วินาที`;
                }

                player_list_content += `
                    <div class="row p-0 mb-2 mx-0">
                        <div class="col-4">
                            <i class="bi bi-person-fill me-2"></i>
                            <span>${player.name}</span>
                        </div>
                        <div class="col">
                            <i class="bi bi-lightning-charge-fill me-2"></i>
                            <span class="me-2"><strong>คะแนน</strong>:</span>
                            <span>${player.raw.score}</span>
                        </div>
                        <div class="col-5">
                            <i class="bi bi-clock-history me-2"></i>
                            <span class="me-2"><strong>เวลา</strong>:</span>
                            <span>${formattedTime}</span>
                        </div>
                    </div>
                `;
            }
        }

        const borderClass = window.innerWidth > 992 ? 'border-end border-2 border-opacity-10' : '';

        document.getElementById('server-info-box').innerHTML = `
            <div class="card-body">
                <div class="row px-3">
                    <div class="col-lg-5 ${borderClass}">
                        <div class="row">
                            <div class="col-7">
                                <p>
                                    <i class="bi bi-hdd-network me-2"></i>
                                    <span class="me-2"><strong>สถานะเซิร์ฟเวอร์</strong>:</span>
                                    <span>ออนไลน์</span>
                                </p>
                            </div>
                            <div class="col-5">
                                <p>
                                    ${serverPingIcon}
                                    <span class="me-2"><strong>ping</strong>:</span>
                                    <span>${serverInfo.ping} ms</span>
                                </p>
                            </div>
                            <div class="col-7">
                                <p>
                                    <i class="bi bi-journal-richtext me-2"></i>
                                    <span class="me-2"><strong>ภารกิจ</strong>:</span>
                                    <span>${serverInfo.raw.game}</span>
                                </p>
                            </div>
                            <div class="col-5">
                                <p>
                                    <i class="bi bi-map me-2"></i>
                                    <span class="me-2"><strong>แผนที่</strong>:</span>
                                    <span>${serverInfo.map}</span>
                                </p>
                            </div>
                            <div class="col-12">
                                <p>
                                    <i class="bi bi-people me-2"></i>
                                    <span class="me-2"><strong>จำนวนผู้เล่น</strong>:</span>
                                    <span>${serverInfo.numplayers}/${serverInfo.maxplayers}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-7">
                        <div class="row ps-lg-2">
                            <div class="col-12">
                                <p>
                                    <i class="bi bi-person-lines-fill me-2"></i>
                                    <strong>รายชื่อผู้เล่นในเซิร์ฟเวอร์</strong>
                                </p>
                            </div>
                            <div id="player-list-box" class="row ps-4 overflow-y-auto">
                                ${player_list_content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="row px-3">
                    <div class="col-lg-6 text-center text-lg-start mb-2 mb-lg-0">
                        <p id="server-info-game-version" class="py-2 m-0">
                            <i class="bi bi-diagram-2 me-2"></i> ${serverInfo.connect}
                            <span class="mx-2">|</span>
                            <i class="bi bi-controller me-2"></i> เกมเวอร์ชัน: ${serverInfo.version}
                        </p>
                    </div>
                    <div class="col-lg-6 text-lg-end text-center p-0 m-0 pe-2">
                        <button class="btn btn-secondary px-3" type="button" onclick="serverInfoReload();">
                            <i class="bi bi-arrow-clockwise me-2"></i>
                            รีเฟรช
                        </button>
                    </div>
                </div>
            </div>
        `;

        if (serverInfo.numplayers < 5) {
            document.getElementById('player-list-box').style.height = "100px";
        } else if (serverInfo.numplayers < 10) {
            document.getElementById('player-list-box').style.height = "150px";
        } else {
            document.getElementById('player-list-box').style.height = "200px";
        }

    }
});