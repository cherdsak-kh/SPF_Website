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

        const pingLevel = [
            '<i class="bi bi-reception-0 me-2"></i>',
            '<i class="bi bi-reception-1 me-2"></i>',
            '<i class="bi bi-reception-2 me-2"></i>',
            '<i class="bi bi-reception-3 me-2"></i>',
            '<i class="bi bi-reception-4 me-2"></i>'
        ];

        // คำนวณ ping level โดยใช้ Math.min เพื่อไม่ให้เกิน index ที่มีใน array
        const pingIndex = Math.min(Math.floor(serverInfo.ping / 60), 4);
        const serverPingIcon = pingLevel[4 - pingIndex]; // ยิ่ง ping ต่ำ index ยิ่งสูง

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

                let time = player.time; // หน่วยเป็นวินาที
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
                    <div class="row">
                        <div class="col-4">
                            <i class="bi bi-person-fill me-2"></i>
                            <span>${player.name}</span>
                        </div>
                        <div class="col-4">
                            <i class="bi bi-lightning-charge-fill me-2"></i>
                            <span class="me-2"><strong>คะแนน</strong>:</span>
                            <span>${player.score}</span>
                        </div>
                        <div class="col-4">
                            <i class="bi bi-clock-history me-2"></i>
                            <span class="me-2"><strong>ping</strong>:</span>
                            <span>${formattedTime}</span>
                        </div>
                    </div>
                `;
            }
        }

        document.getElementById('server-info-box').innerHTML = `
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-6 border-end border-2 border-opacity-25">
                        <div class="row">
                            <div class="col-6">
                                <p>
                                    <i class="bi bi-hdd-network me-2"></i>
                                    <span class="me-2"><strong>สถานะเซิร์ฟเวอร์</strong>:</span>
                                    <span>ออนไลน์</span>
                                </p>
                            </div>
                            <div class="col-6">
                                <p>
                                    ${serverPingIcon}
                                    <span class="me-2"><strong>ping</strong>:</span>
                                    <span>${serverInfo.ping}</span>
                                </p>
                            </div>
                            <div class="col-6">
                                <p>
                                    <i class="bi bi-journal-richtext me-2"></i>
                                    <span class="me-2"><strong>ภารกิจ</strong>:</span>
                                    <span>${serverInfo.raw.game}</span>
                                </p>
                            </div>
                            <div class="col-6">
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
                    <div class="col-lg-6">
                        <div class="row">
                            <div class="col-12">
                                <p>
                                    <i class="bi bi-person-lines-fill me-2"></i>
                                    <strong>รายชื่อผู้เล่นในเซิร์ฟเวอร์</strong>
                                </p>
                            </div>
                            <div class="row ps-lg-5 ps-4 overflow-y-auto" style="height: 100px;">
                                ${player_list_content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="row">
                    <div class="col-lg-6">
                        <p id="server-info-game-version" class="py-2 m-0">
                            <i class="bi bi-diagram-2 me-2"></i> ${serverInfo.connect}
                            <span class="mx-2">|</span>
                            <i class="bi bi-controller me-2"></i> เกมเวอร์ชัน: ${serverInfo.version}
                        </p>
                    </div>
                    <div class="col-lg-6 text-end p-0 m-0 pe-2">
                        <button class="btn btn-secondary px-3" type="button" onclick="serverInfoReload();">
                            <i class="bi bi-arrow-clockwise me-2"></i>
                            รีเฟรช
                        </button>
                    </div>
                </div>
            </div>
        `;

    }
});