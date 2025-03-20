// ------------------------------------------------------------------------------------------------------>

function showLargeImage(src) {
    const largeImg = document.getElementById('imgLarge')
    largeImg.classList.remove('d-none')
    largeImg.classList.add('d-flex')
    largeImg.innerHTML = ''; 

    const imgShow = document.createElement('img')
    imgShow.src = src

    const btnClose = document.createElement('button')
    btnClose.innerHTML = '<i class="bi bi-x-lg"></i>'
    btnClose.className = 'largeImgBtnClose btn btn-outline-danger'
    btnClose.onclick = () => {
        largeImg.classList.remove('d-flex')
        largeImg.classList.add('d-none')
    }

    largeImg.appendChild(imgShow)
    largeImg.appendChild(btnClose)
}

// ------------------------------------------------------------------------------------------------------>

let timesClicked = 1;
document.getElementById('calendarToggleBtn').onclick = () => { 
    if (timesClicked === 1) {
        timesClicked = 2;
        const element = document.getElementById('eventCalendar');
        const yOffset = -15;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });
    } else {
        timesClicked = 1;
    }
};

// ------------------------------------------------------------------------------------------------------>

// Request events data from the server
socket.emit('request-events-data');

// Listen for the server's response with the events data
socket.on('Events-data', (getEvents) => {

    // ! สร้างสำเนาของ events
    const events = getEvents.map(event => ({ ...event }));

    // ! รับวันที่ปัจจุบัน
    const curDate = new Date();
    let currentYear = curDate.getFullYear(); // ปีเริ่มต้น
    let currentMonth = curDate.getMonth(); // ตุลาคม (0-based index)

    // ! ฟังก์ชันแสดงวันที่ในปฏิทิน
    function renderCalendar(year, month, events) {

        const dateShow = document.getElementById('dateShow');
        const monthDisplay = document.getElementById('monthDisplay');
        dateShow.innerHTML = ''; // ล้างวันที่เก่า

        // ! สร้างวันแรกของเดือน
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const totalDays = lastDay.getDate();

        // ! คำนวณวันแรกของสัปดาห์ (0 = Sunday, 1 = Monday, ...)
        const startDay = firstDay.getDay(); // วันแรกของเดือน

        // ! แสดงชื่อเดือนและปี
        monthDisplay.textContent = `${getMonthName(month)} ${year+543}`;

        // ! สร้างแถวแรกที่ว่างเปล่าสำหรับวันที่ก่อนหน้าเดือน
        let row = document.createElement('div');
        row.className = 'row';

        // ! เพิ่มคอลัมน์ว่างก่อนวันแรกของเดือน
        for (let i = 0; i < startDay; i++) {
            const col = document.createElement('div');
            col.className = 'col text-center border border-secondary py-3';
            row.appendChild(col);
        }

        // ! เพิ่มวันที่ลงในปฏิทิน
        for (let day = 1; day <= totalDays; day++) {
            const col = document.createElement('div');
            col.style = 'min-height: 100px;';

            // ! ตรวจสอบวันที่ปัจจุบัน ถ้าใช่จะเข้าเงื่อนไข
            if (curDate.getDate() === day && curDate.getMonth() === month && curDate.getFullYear() === year) {
                col.className = 'col text-center border border-2 border-warning py-3 fw-bold';
            } else {
                col.className = 'col text-center border border-secondary py-3 text-secondary';
            }

            col.innerHTML = `
                <p>${day}</p>
            `;

            for (const event of events) {
                const eventDate = new Date(event.dateTime);
                if (eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year) {
                    if (event.type === 'Mission Day') {
                        col.innerHTML += `
                            <span style="font-size: 0.9rem"><i class="bi bi-circle-fill text-primary"></i></span>
                        `;
                    } else if (event.type === 'Event') {
                        col.innerHTML += `
                            <span style="font-size: 0.9rem"><i class="bi bi-circle-fill text-warning"></i></span>
                        `;
                    } else if (event.type === 'Training') {
                        col.innerHTML += `
                            <span style="font-size: 0.9rem"><i class="bi bi-circle-fill text-light"></i></span>
                        `;
                    }

                    col.onmouseover = () => {
                        col.style.backdropFilter = 'blur(50px)';
                        col.classList.add('text-white');
                    }
                    col.onmouseout = () => {
                        col.style.backdropFilter = '';
                        col.classList.remove('text-white');
                    }
                    col.style = 'min-height: 100px; cursor: pointer;';

                    // ! สร้างเหตุการณ์เมื่อคลิกที่วันที่ที่มีกิจกรรม
                    col.onclick = () => { 
                        eventOpening(year, month, day, events) 
                        document.getElementById('event-open').scrollIntoView({
                            behavior: 'smooth'
                        })
                    };
                }
            }

            row.appendChild(col);

            // ! ตรวจสอบว่าแถวเต็มหรือไม่
            if ((startDay + day) % 7 === 0) {
                dateShow.appendChild(row);
                row = document.createElement('div');
                row.className = 'row';
            }
        }

        // ! เพิ่มคอลัมน์ว่างหลังวันสุดท้ายของเดือน
        for (let i = lastDay.getDay(); i < 6; i++) {
            const col = document.createElement('div');
            col.className = 'col text-center border border-secondary py-3';
            row.appendChild(col);
        }

        // ! เพิ่มแถวสุดท้ายถ้ายังมีวันที่เหลืออยู่
        if (row.children.length > 0) {
            dateShow.appendChild(row);
        }

    }

    // ! ฟังก์ชันเพื่อให้ชื่อวัน
    function getDayName(day) {
        const dayNames = [
            "อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"
        ]
        return dayNames[day];
    }

    // ! ฟังก์ชันเพื่อให้ชื่อเดือน
    function getMonthName(month) {
        const monthNames = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];
        return monthNames[month];
    }

    // ! ฟังก์ชันการเปลี่ยนเดือนก่อนหน้า
    document.getElementById('prevMonthBtn').onclick = () => {
        currentMonth += (-1);
        
        // ! ตรวจสอบให้ปีเปลี่ยนถ้าเดือนเกินขอบเขต
        if (currentMonth > 11) {
            currentMonth = 0; // - กลับไปที่มกราคม
            currentYear++;
        } else if (currentMonth < 0) {
            currentMonth = 11; // - กลับไปที่ธันวาคม
            currentYear--;
        }

        renderCalendar(currentYear, currentMonth, events);
    }

    // ! ฟังก์ชันการเปลี่ยนเดือนถัดไป
    document.getElementById('nextMonthBtn').onclick = () => {
        currentMonth += (1);

        // ! ตรวจสอบให้ปีเปลี่ยนถ้าเดือนเกินขอบเขต
        if (currentMonth > 11) {
            currentMonth = 0; // - กลับไปที่มกราคม
            currentYear++;
        } else if (currentMonth < 0) {
            currentMonth = 11; // - กลับไปที่ธันวาคม
            currentYear--;
        }

        renderCalendar(currentYear, currentMonth, events);
    }

    // ! ฟังก์ชันแสดงกิจกรรมเมื่อคลิกวันที่ที่มีกิจกรรม
    function eventOpening(year, month, date, events) {
        const dateSelect = new Date(year, month, date)
        
        const eventOpen = document.getElementById('event-open');
        eventOpen.innerHTML = '';
        eventOpen.innerHTML += `
            <div class="row px-2">
                <div class="col d-flex align-items-center">
                    <h4 class="fw-bold m-0">${formatDateThai(dateSelect)}</h4>
                </div>
                <div class="col-sm-1 d-flex justify-content-end align-items-center">
                    <div data-bs-theme="dark">
                        <button id="close-event-coming" type="button" class="btn-close" aria-label="Close"></button>
                    </div>
                </div>
            </div>

            <hr>
        `;

        for (const event of events) {
            const eventDate = new Date(event.dateTime);
            const eventImg = '../images/' + event.eventImg;
            const eventDateTime = `วัน${getDayName(eventDate.getDay())}ที่ ${eventDate.getDate()} ${getMonthName(eventDate.getMonth())} ${eventDate.getFullYear()+543} เวลา ${eventDate.getHours()}.${eventDate.getMinutes()} น.`;
            let eventType = '';
            const eventName = event.eventName;
            const eventAuthor = event.author;

            if (event.type === 'Mission Day') {
                eventType = `
                
                    <i class="bi bi-circle-fill text-primary me-2"></i>
                    Mission Day
                
                `;
            } else if (event.type === 'Event') {
                eventType = `
                
                    <i class="bi bi-circle-fill text-warning me-2"></i>
                    Event
                
                `;
            } else if (event.type === 'Training') {
                eventType = `
                
                    <i class="bi bi-circle-fill text-light me-2"></i>
                    Training
                
                `;
            }

            if (eventDate.getDate() === date && eventDate.getMonth() === month && eventDate.getFullYear() === year) {
                eventOpen.innerHTML += `

                    <div class="row px-3">
                        <div class="card p-2 text-bg-secondary bg-transparent border-0">
                            <div class="row">
                                <div class="col-lg-4">
                                    <img src="${eventImg}" class="img-fluid rounded shadow" alt="image" onclick="showLargeImage(this.src)" style="cursor: pointer;">
                                </div>
                                <div class="col-lg-8 pt-3">
                                    <div class="card-header text-danger fw-bold fs-6 border-secondary text-shadow">
                                        ${eventDateTime} 
                                        <span class="mx-3 border border-secondary"></span> 
                                        <span class="text-white">${eventType}</span>
                                    </div>
                                    <div class="card-body fs-1 fw-bold text-shadow pb-0">${eventName}</div>
                                    <div class="card-footer fs-5 border-0 text-shadow"><i class="bi bi-person-circle me-2"></i> สร้างโดย ${eventAuthor}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr>
                `;
            }
        }

        // ! ปุ่มปิดการแสดงกิจกรรมจากที่คลิกวันที่
        document.getElementById('close-event-coming').onclick = () => {
            document.getElementById('event-open').innerHTML = '';
            const element = document.getElementById('eventCalendar');
            const yOffset = -15;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    }

    // ! ฟังก์ชันแสดงรูปแบบของวันที่
    function formatDateThai(date) {
        const days = ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"];
        const months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
        
        const dayName = days[date.getDay()];
        const day = date.getDate();
        const monthName = months[date.getMonth()];
        const year = date.getFullYear() + 543; // ปรับเป็น พ.ศ.
        const hours = date.getHours().toString().padStart(2, '0'); // ให้เป็น 2 หลัก
        const minutes = date.getMinutes().toString().padStart(2, '0'); // ให้เป็น 2 หลัก
        const seconds = date.getSeconds().toString().padStart(2, '0'); // ให้เป็น 2 หลัก
        
        return `${day} ${monthName} ${year}`;
    }

    // เรียกฟังก์ชันแสดงปฏิทินตุลาคม 2567
    renderCalendar(currentYear, currentMonth, events);

    // -------------------------------------------------------------------------------------------------->

    const isYesterday = (date) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        return (
            yesterday.getFullYear() === date.getFullYear() &&
            yesterday.getMonth() === date.getMonth() &&
            yesterday.getDate() === date.getDate()
        ) ? true : false;

    }

    const isToday = (date) => {
        const today = new Date();

        return (
            today.getFullYear() === date.getFullYear() &&
            today.getMonth() === date.getMonth() &&
            today.getDate() === date.getDate()
        ) ? true : false;

    }

    const isTomorrow = (date) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        return (
            tomorrow.getFullYear() === date.getFullYear() &&
            tomorrow.getMonth() === date.getMonth() &&
            tomorrow.getDate() === date.getDate()
        ) ? true : false;

    }

    const isFuture = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // ตั้งเวลาเป็น 0:00:00 สำหรับวันนี้

        const targetDate = new Date(date); // สร้างตัวแปรวันที่เป้าหมาย
        targetDate.setHours(0, 0, 0, 0); // ตั้งเวลาเป็น 0:00:00

        return targetDate > today;
    }

    const isPast = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // ตั้งเวลาเป็น 0:00:00 สำหรับวันนี้

        const targetDate = new Date(date); // สร้างตัวแปรวันที่เป้าหมาย
        targetDate.setHours(0, 0, 0, 0); // ตั้งเวลาเป็น 0:00:00

        return targetDate < today;
    }

    // -------------------------------------------------------------------------------------------------->

    const eventDesc = events.slice(); // สร้างสำเนาของ events
    eventDesc.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)); // Sort by Desc

    let numEvents = 3;

    function renderPastEvent(events, numDisplay) {
        const pastEvents = document.getElementById('past-events');
        pastEvents.innerHTML = '';

        let iLoop = 1;
        const newPastEvents = [];

        for (const event of eventDesc) {
            const eventDateTime = new Date(event.dateTime);
            if (isPast(eventDateTime)) {
                newPastEvents.push(event);
            }
        }

        // console.log(newPastEvents.length);

        if (newPastEvents.length > 0) {

            for (const event of newPastEvents) {

                const eventDateTime = new Date(event.dateTime); 
                let pastEvent_image = '../images/' + event.eventImg;
                let pastEvent_dateTime = `วัน${getDayName(eventDateTime.getDay())}ที่ ${eventDateTime.getDate()} ${getMonthName(eventDateTime.getMonth())} ${eventDateTime.getFullYear()+543} เวลา ${eventDateTime.getHours()}.${eventDateTime.getMinutes()} น.`;
                let pastEvent_type = '';
                let pastEvent_name = event.eventName;
                let pastEvent_author = event.author;
    
                if (event.type === 'Mission Day') {
                    pastEvent_type = `
                    
                        <i class="bi bi-circle-fill text-primary me-2"></i>
                        Mission Day
                    
                    `;
                } else if (event.type === 'Event') {
                    pastEvent_type = `
                    
                        <i class="bi bi-circle-fill text-warning me-2"></i>
                        Event
                    
                    `;
                } else if (event.type === 'Training') {
                    pastEvent_type = `
                    
                        <i class="bi bi-circle-fill text-light me-2"></i>
                        Training
                    
                    `;
                }
    
    
                pastEvents.innerHTML += `

                    <div class="row px-3">
                        <div class="card p-2 text-bg-secondary bg-transparent border-0">
                            <div class="row">
                                <div class="col-lg-4">
                                    <img src="${pastEvent_image}" class="img-fluid rounded shadow" alt="image" onclick="showLargeImage(this.src)" style="cursor: pointer;">
                                </div>
                                <div class="col-lg-8 pt-3">
                                    <div class="card-header text-danger fw-bold fs-6 border-secondary text-shadow">
                                        ${pastEvent_dateTime} 
                                        <span class="mx-3 border border-secondary"></span> 
                                        <span class="text-white">${pastEvent_type}</span>
                                    </div>
                                    <div class="card-body fs-1 fw-bold text-shadow pb-0">${pastEvent_name}</div>
                                    <div class="card-footer fs-5 border-0 text-shadow"><i class="bi bi-person-circle me-2"></i> สร้างโดย ${pastEvent_author}</div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <hr>
                
                `;
    
                // console.log(event);
    
                iLoop++;
                if (iLoop > numDisplay) break;
            }
    
            if (iLoop <= newPastEvents.length) {
                pastEvents.innerHTML += `
                    <div class="d-grid gap-2">
                        <button id="past-event-btn-more" class="btn btn-outline-secondary" type="button">ดูเพิ่มเติม</button>
                    </div>
                `;
    
                // กำหนด onclick handler ให้กับปุ่มเมื่อสร้างแล้ว
                document.getElementById('past-event-btn-more').onclick = () => {
                    numEvents += 2;
                    renderPastEvent(eventDesc, numEvents);
                };
            }

        } else {
            pastEvents.innerHTML = `
    
                <div class="row g-1 px-3">
                    <div class="col d-flex justiy-content-center flex-column p-5">
                        <h1 class="text-center mb-4"><i class="bi bi-calendar2-x"></i></h1>
                        <h5 class="text-center">ไม่มีกิจกรรมที่ผ่านมา</h5>
                    </div>
                </div>

                <hr>
            
            `;
        }
    }

    renderPastEvent(eventDesc, numEvents);

    // -------------------------------------------------------------------------------------------------->

    const icmEvents = events;

    function icmEventDisplay() {

        const eventIncoming = document.getElementById('event-incoming');
        eventIncoming.innerHTML = '';
        let icmEvent_dateTime = '';
        let icmEvent_image = '';
        let icmEvent_type = '';
        let icmEvent_name = '';
        let icmEvent_author = '';
        let hasEvent = '';

        const thaiWeekdays = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
        const thaiMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

        for (const event of icmEvents) {
            const eventDateTime = new Date(event.dateTime);

            icmEvent_dateTime = '';
            icmEvent_image = '../images/' + event.eventImg;
            icmEvent_type = '';
            icmEvent_name = event.eventName;
            icmEvent_author = event.author;

            if (event.type === 'Mission Day') {
                icmEvent_type = `
                
                    <i class="bi bi-circle-fill text-primary me-2"></i>
                    Mission Day
                
                `;
            } else if (event.type === 'Event') {
                icmEvent_type = `
                
                    <i class="bi bi-circle-fill text-warning me-2"></i>
                    Event
                
                `;
            } else if (event.type === 'Training') {
                icmEvent_type = `
                
                    <i class="bi bi-circle-fill text-light me-2"></i>
                    Training
                
                `;
            }
            
            // console.log(eventDateTime);
            // console.log('-----------------------------------------------------------------');
            // console.log('Yesterday ? : ' + isYesterday(eventDateTime));
            // console.log('Today ? : ' + isToday(eventDateTime));
            // console.log('Tomorrow ? : ' + isTomorrow(eventDateTime));
            // console.log('Past ? : ' + isPast(eventDateTime));
            // console.log('Future ? : ' + isFuture(eventDateTime));
            // console.log('-----------------------------------------------------------------');

            if (isToday(eventDateTime)) {
                icmEvent_dateTime = `วันนี้เวลา ${eventDateTime.getHours()}.${eventDateTime.getMinutes()} น.`;
                hasEvent = true;
                break;

            } else if (isTomorrow(eventDateTime)) {
                icmEvent_dateTime = `พรุ่งนี้เวลา ${eventDateTime.getHours()}.${eventDateTime.getMinutes()} น.`;
                hasEvent = true;
                break;

            } else if (isFuture(eventDateTime)) {
                icmEvent_dateTime = `วัน${thaiWeekdays[eventDateTime.getDay()]}ที่ ${eventDateTime.getDate()} ${thaiMonths[eventDateTime.getMonth()]} ${eventDateTime.getFullYear()+543} เวลา ${eventDateTime.getHours()}.${eventDateTime.getMinutes()} น.`;
                hasEvent = true;
                break;

            } else {
                hasEvent = false;

            }
        }

        if (hasEvent) {
            eventIncoming.innerHTML = `

                <div class="row px-3">
                    <div class="card p-2 text-bg-secondary bg-transparent border-0">
                        <div class="row">
                            <div class="col-lg-4">
                                <img src="${icmEvent_image}" class="img-fluid rounded shadow" alt="image" onclick="showLargeImage(this.src)" style="cursor: pointer;">
                            </div>
                            <div class="col-lg-8 pt-3">
                                <div class="card-header text-danger fw-bold fs-6 border-secondary text-shadow">
                                    ${icmEvent_dateTime} 
                                    <span class="mx-3 border border-secondary"></span> 
                                    <span class="text-white">${icmEvent_type}</span>
                                </div>
                                <div class="card-body fs-1 fw-bold text-shadow pb-0">${icmEvent_name}</div>
                                <div class="card-footer fs-5 border-0 text-shadow"><i class="bi bi-person-circle me-2"></i> สร้างโดย ${icmEvent_author}</div>
                            </div>
                        </div>
                    </div>
                </div>
            
            `;
        } else {
            eventIncoming.innerHTML = `
            
                <div class="col d-flex justiy-content-center flex-column p-5">
                    <h1 class="text-center mb-4"><i class="bi bi-calendar2-x"></i></h1>
                    <h5 class="text-center">ไม่มีกิจกรรมที่กำลังจะเกิดขึ้น</h5>
                </div>
            
            `;
        }

    }

    icmEventDisplay();

})

// ------------------------------------------------------------------------------------------------------>