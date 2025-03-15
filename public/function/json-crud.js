const fs = require('fs');

class JsonCRUD {
    constructor(filePath = null) {
        this.filePath = filePath;
    }

    setFilePath(path) {
        this.filePath = path;
    }

    isFilePathSet() {
        if (!this.filePath) {
            console.log('Please call setFilePath before using this function.');
            return false;
        }
        return true;
    }

    readJSONFile() {
        // ตรวจสอบการมีอยู่ของไฟล์ ถ้าไม่มีให้สร้างไฟล์ใหม่พร้อมข้อมูลเริ่มต้น
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([], null, 2), 'utf8');
        }
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    writeJSONFile(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
    }

    generateId(data) {
        const maxId = data.reduce((max, item) => (item.id > max ? item.id : max), 0);
        return maxId + 1;
    }

    createData(newData) {
        if (!this.isFilePathSet()) return;
        const data = this.readJSONFile();

        const newId = this.generateId(data);
        const itemWithId = { id: newId, ...newData };

        data.push(itemWithId);
        this.writeJSONFile(data);
    }

    readData() {
        if (!this.isFilePathSet()) return;
        return this.readJSONFile();
    }

    readDataById(id) {
        if (!this.isFilePathSet()) return;
        const data = this.readJSONFile();
        return data.find(item => item.id === id) || `Data not found this id : ${id}`;
    }

    updateData(id, updatedData) {
        if (!this.isFilePathSet()) return;
        const data = this.readJSONFile();
        const index = data.findIndex(item => item.id === id);
        if (index !== -1) {
            data[index] = { ...data[index], ...updatedData };
            this.writeJSONFile(data);
        } else {
            console.log(`Data not found this id : ${id}`);
        }
    }

    deleteData(id) {
        if (!this.isFilePathSet()) return;
        const data = this.readJSONFile();
        const newData = data.filter(item => item.id !== id);
        this.writeJSONFile(newData);
    }
}

module.exports = { JsonCRUD };
