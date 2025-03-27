// ------------------------------------------------------------------------------------------------------>

let timesClicked = 1;
const calendarButton = document.getElementById('calendarToggleBtn');
const calendarButtonClose = document.getElementById('event-calendar-close');
calendarButton.onclick = () => { 
    if (timesClicked === 1) {
        const element = document.getElementById('event-calendar-main');
        const yOffset = -5;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
        top: y,
        behavior: 'smooth'
        });
        timesClicked = 1;
    } else {
        timesClicked = 1;
    }
};

calendarButtonClose.onclick = () => { 
    if (timesClicked === 1) {
        const element = document.getElementById('calendarToggleBtn');
        const yOffset = -50;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
        top: y,
        behavior: 'smooth'
        });
        timesClicked = 1;
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

    // ! รับวันเดือนปีปัจจุบัน
    const curDate = new Date();
    let currentYear = curDate.getFullYear();
    let currentMonth = curDate.getMonth();

    // ! ฟังก์ชันแสดงวันที่ในปฏิทิน
    function renderCalendar(year, month, events) {

        const dateShow = document.getElementById('calendar-date');
        const monthDisplay = document.getElementById('calendar-month');
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
        row.className = 'row mx-0 p-0 flex-nowrap';

        // ! เพิ่มคอลัมน์ว่างก่อนวันแรกของเดือน
        for (let i = 0; i < startDay; i++) {
            const col = document.createElement('div');
            col.className = 'col text-center border border-secondary py-5 overflow-hidden fs-5';
            col.style.color = 'transparent';
            col.innerHTML = `0`;
            row.appendChild(col);
        }

        // ! เพิ่มวันที่ลงในปฏิทิน
        for (let day = 1; day <= totalDays; day++) {
            const col = document.createElement('div');

            // ! ตรวจสอบวันที่ปัจจุบัน ถ้าใช่จะเข้าเงื่อนไข
            if (curDate.getDate() === day && curDate.getMonth() === month && curDate.getFullYear() === year) {
                col.className = 'col text-center text-shadow border border-secondary py-5 overflow-hidden fs-5 bg-warning-subtle text-warning-emphasis';
            } else {
                col.className = 'col text-center text-shadow border border-secondary py-5 overflow-hidden fs-5';
            }

            col.innerHTML = `${day}`;

            for (const event of events) {
                const eventDate = new Date(event.dateTime);
                if (eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year) {
                    if (event.type === 'Mission Day') {
                        col.classList.add('position-relative');
                        col.innerHTML += `
                            <span class="position-absolute bottom-0 start-0 w-100 bg-primary bg-opacity-50 fs-6 text-white rounded-top">Mission Day</span>
                        `;
                    } else if (event.type === 'Event') {
                        col.classList.add('position-relative');
                        col.innerHTML += `
                            <span class="position-absolute bottom-0 start-0 w-100 bg-warning bg-opacity-50 fs-6 text-white rounded-top">Event</span>
                        `;
                    } else if (event.type === 'Training') {
                        col.classList.add('position-relative');
                        col.innerHTML += `
                            <span class="position-absolute bottom-0 start-0 w-100 bg-light bg-opacity-50 fs-6 text-white rounded-top">Training</span>
                        `;
                    }

                    col.onmouseover = () => {
                        col.classList.add('fw-bold', 'bg-gradient');
                    }
                    col.onmouseout = () => {
                        col.classList.remove('fw-bold', 'bg-gradient');
                    }
                    col.style = 'cursor: pointer;';

                    // ! สร้างเหตุการณ์เมื่อคลิกที่วันที่ที่มีกิจกรรม
                    col.onclick = () => { 
                        eventOpening(year, month, day, events) 
                        const element = document.getElementById('calendar-event-click');
                        const yOffset = -45;
                        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        
                        window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                        });
                    };
                }
            }

            row.appendChild(col);

            // ! ตรวจสอบว่าแถวเต็มหรือไม่
            if ((startDay + day) % 7 === 0) {
                dateShow.appendChild(row);
                row = document.createElement('div');
                row.className = 'row mx-0 p-0 flex-nowrap';
            }
        }

        // ! เพิ่มคอลัมน์ว่างหลังวันสุดท้ายของเดือน
        for (let i = lastDay.getDay(); i < 6; i++) {
            const col = document.createElement('div');
            col.className = 'col text-center border border-secondary py-5 overflow-hidden fs-5';
            col.style.color = 'transparent';
            col.innerHTML = `0`;
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

    // ! ฟังก์ชันแสดงรูปแบบของวันที่
    function formatDateThai(date) {
        
        //const dayName = getDayName(date.getDay());
        const day = date.getDate();
        const monthName = getMonthName(date.getMonth());
        const year = date.getFullYear() + 543; // ปรับเป็น พ.ศ.
        //const hours = date.getHours().toString().padStart(2, '0'); // ให้เป็น 2 หลัก
        //const minutes = date.getMinutes().toString().padStart(2, '0'); // ให้เป็น 2 หลัก
        //const seconds = date.getSeconds().toString().padStart(2, '0'); // ให้เป็น 2 หลัก
        
        return `${day} ${monthName} ${year}`;
    }

    // ! ฟังก์ชันแสดงกิจกรรมเมื่อคลิกวันที่ที่มีกิจกรรม
    function eventOpening(year, month, date, events) {
        const dateSelect = new Date(year, month, date)
        
        const eventOpen = document.getElementById('calendar-event-click');
        eventOpen.innerHTML = '';
        eventOpen.innerHTML += `
            
            <!-- - Event calendar on click. : Title / Close box - -->
            <div class="row p-0 m-0 mt-5 flex-nowrap">
                <div class="col text-start">
                    <h5 class="fw-bold text-shadow my-auto">${formatDateThai(dateSelect)}</h5>
                </div>
                <div class="col text-end">
                    <button id="calendar-event-click-close" type="button" class="btn-close" aria-label="Close"></button>
                </div>
            </div>

            <hr class="border border-1 border-light rounded opacity-50 my-2">
        `;

        for (const event of events) {
            const eventDate = new Date(event.dateTime);
            const eventImg = '../images/' + event.eventImg;
            const eventDateTime = `วัน${getDayName(eventDate.getDay())}ที่ ${eventDate.getDate()} ${getMonthName(eventDate.getMonth())} ${eventDate.getFullYear()+543} เวลา ${eventDate.getHours()}.${eventDate.getMinutes()} น.`;
            let eventType = '';
            let eventTypeClass = '';
            const eventName = event.eventName;
            const eventAuthor = event.author;

            if (event.type === 'Mission Day') {
                eventType = `Mission Day`;
                eventTypeClass = 'bg-primary';

            } else if (event.type === 'Event') {
                eventType = `Event`;
                eventTypeClass = 'bg-warning';

            } else if (event.type === 'Training') {
                eventType = `Training`;
                eventTypeClass = 'bg-secondary';
            }

            if (eventDate.getDate() === date && eventDate.getMonth() === month && eventDate.getFullYear() === year) {
                eventOpen.innerHTML += `

                    <!-- - Event calendar on click. : Content - -->
                    <div class="row p-0 m-0 flex-lg-nowrap">
                        <div class="col-lg-5 card p-1 me-lg-1 mb-lg-0 mb-1 ">
                            <img src="${eventImg}" alt="event-soon" class="card-img my-auto">
                        </div>
                        <div class="col-lg card text-shadow">
                            <div class="row card-header">
                                <div class="col-lg-9 text-danger fw-bold p-0 mb-2 mb-lg-0">
                                    <p class="my-auto text-lg-start">${eventDateTime}</p>
                                </div>
                                <div class="col-lg-3 fw-bold my-auto p-0 ${eventTypeClass} bg-gradient bg-opacity-50 rounded-top">
                                    ${eventType}
                                </div>
                            </div>
                            <div class="row card-body">
                                <h2 class="text-lg-start fw-bold p-0">${eventName}</h2>
                                <p class="text-lg-start p-0 m-0 text-justify" style="text-indent: 10%;">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima error praesentium explicabo facere omnis ab provident voluptate atque ducimus laudantium quidem delectus, veritatis pariatur magni?
                                </p>
                            </div>
                            <div class="row card-footer">
                                <div class="col-lg-8 fw-bold p-0">
                                    <p class="text-lg-start my-auto"><i class="bi bi-person-circle me-2"></i> สร้างโดย ${eventAuthor}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // ! ปุ่มปิดการแสดงกิจกรรมจากที่คลิกวันที่
        document.getElementById('calendar-event-click-close').onclick = () => {
            document.getElementById('calendar-event-click').innerHTML = '';
            const element = document.getElementById('event-calendar-main');
            const yOffset = -5;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
            top: y,
            behavior: 'smooth'
            });
        }
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

    const eventDesc = getEvents.map(event => ({ ...event }));
    eventDesc.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)); // Sort by Desc

    let numEvents = 3;

    function renderPastEvent(events, numDisplay) {
        const pastEvents = document.getElementById('past-event-content');
        pastEvents.innerHTML = '';

        let iLoop = 1;
        const newPastEvents = [];

        for (const event of events) {
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
                let pastTypeClass = '';
    
                if (event.type === 'Mission Day') {
                    pastEvent_type = `Mission Day`;
                    pastTypeClass = 'bg-primary';

                } else if (event.type === 'Event') {
                    pastEvent_type = `Event`;
                    pastTypeClass = 'bg-warning';

                } else if (event.type === 'Training') {
                    pastEvent_type = `Training`;
                    pastTypeClass = 'bg-secondary';
                }
    
    
                pastEvents.innerHTML += `

                    <!-- - Past events : Content 1 - -->
                    <div class="row p-0 m-0 flex-lg-nowrap">
                        <div class="col-lg-5 card p-1 me-lg-1 mb-lg-0 mb-1 ">
                            <img src="${pastEvent_image}" alt="event-soon" class="card-img my-auto">
                        </div>
                        <div class="col-lg card text-shadow">
                            <div class="row card-header">
                                <div class="col-lg-8 text-danger fw-bold p-0 mb-2 mb-lg-0">
                                    <p class="my-auto text-lg-start">${pastEvent_dateTime}</p>
                                </div>
                                <div class="col-lg-4 fw-bold my-auto p-0 ${pastTypeClass} bg-gradient bg-opacity-50 rounded-top">
                                    ${pastEvent_type}
                                </div>
                            </div>
                            <div class="row card-body">
                                <h2 class="text-lg-start fw-bold p-0">${pastEvent_name}</h2>
                                <p class="text-lg-start p-0 m-0 text-justify" style="text-indent: 10%;">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima error praesentium explicabo facere omnis ab provident voluptate atque ducimus laudantium quidem delectus, veritatis pariatur magni?
                                </p>
                            </div>
                            <div class="row card-footer">
                                <div class="col-lg-8 fw-bold p-0">
                                    <p class="text-lg-start my-auto"><i class="bi bi-person-circle me-2"></i> สร้างโดย ${pastEvent_author}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="border border-1 border-light rounded opacity-50 my-2">
                
                `;
    
                // console.log(event);
    
                iLoop++;
                if (iLoop > numDisplay) break;
            }
    
            if (iLoop <= newPastEvents.length) {
                pastEvents.innerHTML += `

                    <!-- - Past events : Button more past events - -->
                    <div class="row p-0 m-0">
                        <div class="col-lg-12 text-center p-0 mt-2">
                            <button id="button-more-past-event" class="btn btn-outline-light w-100" type="button">ดูเพิ่มเติม</button>
                        </div>
                    </div>
                `;
    
                // กำหนด onclick handler ให้กับปุ่มเมื่อสร้างแล้ว
                document.getElementById('button-more-past-event').onclick = () => {
                    numEvents += 2;
                    renderPastEvent(events, numEvents);
                };
            }

        } else {
            pastEvents.innerHTML = `
    
                <!-- - Past events : Empty - -->
                <div class="row p-0 m-0 flex-lg-nowrap">
                    <div class="col-lg-12 py-5 card p-1 me-lg-1 mb-lg-0 mb-1 ">
                        <h2 class="mb-3"><i class="bi bi-calendar-x"></i></h2>
                        <h4>ไม่มีกิจกรรมที่ผ่านมา</h4>
                    </div>
                </div>

                <hr class="border border-1 border-light rounded opacity-50 my-2">
            
            `;
        }
    }

    renderPastEvent(eventDesc, numEvents);

    // -------------------------------------------------------------------------------------------------->

    const icmEvents = getEvents.map(event => ({ ...event }));

    function icmEventDisplay(events) {

        const eventIncoming = document.getElementById('event-soon-content');
        eventIncoming.innerHTML = '';
        let icmTypeClass = '';
        let icmEvent_dateTime = '';
        let icmEvent_image = '';
        let icmEvent_type = '';
        let icmEvent_name = '';
        let icmEvent_author = '';
        let hasEvent = '';

        for (const event of events) {
            const eventDateTime = new Date(event.dateTime);

            icmEvent_dateTime = '';
            icmEvent_image = '../images/' + event.eventImg;
            icmEvent_type = '';
            icmEvent_name = event.eventName;
            icmEvent_author = event.author;

            if (event.type === 'Mission Day') {
                icmEvent_type = `Mission Day`;
                icmTypeClass = 'bg-primary';

            } else if (event.type === 'Event') {
                icmEvent_type = `Event`;
                icmTypeClass = 'bg-warning';

            } else if (event.type === 'Training') {
                icmEvent_type = `Training`;
                icmTypeClass = 'bg-secondary';
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
                icmEvent_dateTime = `วัน${getDayName(eventDateTime.getDay())}ที่ ${eventDateTime.getDate()} ${getMonthName(eventDateTime.getMonth())} ${eventDateTime.getFullYear()+543} เวลา ${eventDateTime.getHours()}.${eventDateTime.getMinutes()} น.`;
                hasEvent = true;
                break;

            } else {
                hasEvent = false;

            }
        }

        if (hasEvent) {
            eventIncoming.innerHTML = `

                <!-- - Event coming soon content. - -->
                <div class="row p-0 m-0 flex-lg-nowrap">
                    <div class="col-lg-5 card p-1 me-lg-1 mb-lg-0 mb-1 ">
                        <img src="${icmEvent_image}" alt="event-soon" class="card-img my-auto">
                    </div>
                    <div class="col-lg card text-shadow">
                        <div class="row card-header">
                            <div class="col-lg-8 text-danger fw-bold p-0 mb-2 mb-lg-0">
                                <p class="my-auto text-lg-start">${icmEvent_dateTime}</p>
                            </div>
                            <div class="col-lg-4 fw-bold my-auto p-0 ${icmTypeClass} bg-gradient bg-opacity-50 rounded-top">
                                ${icmEvent_type}
                            </div>
                        </div>
                        <div class="row card-body">
                            <h2 class="text-lg-start fw-bold p-0">${icmEvent_name}</h2>
                            <p class="text-lg-start p-0 m-0 text-justify" style="text-indent: 10%;">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima error praesentium explicabo facere omnis ab provident voluptate atque ducimus laudantium quidem delectus, veritatis pariatur magni?
                            </p>
                        </div>
                        <div class="row card-footer">
                            <div class="col-lg-8 fw-bold p-0">
                                <p class="text-lg-start my-auto"><i class="bi bi-person-circle me-2"></i> สร้างโดย ${icmEvent_author}</p>
                            </div>
                        </div>
                    </div>
                </div>
            
            `;
        } else {
            eventIncoming.innerHTML = `
            
                <!-- - Event coming soon empty. - -->
                <div class="row p-0 m-0 flex-lg-nowrap">
                    <div class="col-lg-12 py-5 card p-1 me-lg-1 mb-lg-0 mb-1 ">
                        <h2 class="mb-3"><i class="bi bi-calendar-x"></i></h2>
                        <h4>ไม่มีกิจกรรมที่กำลังจะเกิดขึ้น</h4>
                    </div>
                </div>
            
            `;
        }

    }

    icmEventDisplay(icmEvents);

})

// ------------------------------------------------------------------------------------------------------>