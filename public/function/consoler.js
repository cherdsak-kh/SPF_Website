// # Function custom display by add color and timestamp.
function consoler(hexColor, message) {
    const now = new Date()
    
    // Format the date and time
    const date = now.toLocaleDateString('en-GB') // Format as DD/MM/YYYY
    const time = now.toLocaleTimeString('en-GB', { hour12: false }).replace(/:/g, '.') // Format as HH.MM.SS
    
    const timestamp = `${date} - ${time}`
    
    // Convert hex color to RGB
    const hexToRgb = (hex) => {
        let bigint = parseInt(hex.slice(1), 16)
        let r = (bigint >> 16) & 255
        let g = (bigint >> 8) & 255
        let b = bigint & 255
        return [r, g, b]
    }

    const [r, g, b] = hexToRgb(hexColor)

    // Use 24-bit RGB color
    console.log(`\x1b[38;2;${r};${g};${b}m%s\x1b[0m`, `[ ${timestamp} ] : ${message}`)
    console.log('---------------------------------------------------------------------------------------------------------')
}

module.exports = consoler