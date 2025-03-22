// ------------------------------------------------------------------------------------------------------>

const toggleBtn = document.getElementById('toggleBtn');
const collapseText = document.getElementById('collapseText');

// เปลี่ยนข้อความเป็น "ปิด" เมื่อข้อมูลแสดง
collapseText.addEventListener('shown.bs.collapse', () => {
    toggleBtn.innerHTML = '<i class="bi bi-caret-up-fill"></i>'; // เมื่อขยาย เปลี่ยนข้อความเป็น "ปิด"
});

// เปลี่ยนข้อความกลับเป็น "อ่านเพิ่มเติม" เมื่อข้อมูลถูกยุบ
collapseText.addEventListener('hidden.bs.collapse', () => {
    toggleBtn.innerHTML = 'อ่านเพิ่มเติม'; // เมื่อย่อ เปลี่ยนกลับเป็น "อ่านเพิ่มเติม"
});

// ------------------------------------------------------------------------------------------------------>