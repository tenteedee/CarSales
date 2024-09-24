// Hàm hỗ trợ tạo links phân trang
export function generatePaginationLinks(req, currentPage, lastPage) {
    const links = [];
    for (let i = 1; i <= lastPage; i++) {
        links.push({
            url: `${req.protocol}://${req.get('host')}${req.path}?page=${i}`,
            label: `${i}`,
            active: i === currentPage
        });
    }
    return links;
}