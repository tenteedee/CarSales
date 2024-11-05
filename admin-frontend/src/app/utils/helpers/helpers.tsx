export function timeToDate(dateString : any) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên phải cộng thêm 1
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}
export function numberFormat(number : any, decimals = 2, decPoint = ".", thousandsSep = ",") {
    if (isNaN(number)) return "0";

    const fixedNumber = Number(number).toFixed(decimals); // Làm tròn số đến số thập phân chỉ định
    const parts = fixedNumber.split("."); // Tách phần nguyên và phần thập phân

    // Thêm dấu phân cách cho phần nguyên
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);

    // Kết hợp phần nguyên và phần thập phân với dấu thập phân
    return parts.join(decPoint);
}