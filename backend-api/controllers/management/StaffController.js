import {generatePaginationLinks} from "../../helper/PagingHelper.js";
import Staff from '../../models/Staff.js';
import StaffRole from '../../models/StaffRole.js';

export const queryStaff = async (req, res) => {
    const perPage = 20;
    const currentPage = parseInt(req.query.page) || 1;
    try {
        const totalStaff = await Staff.count();
        const staffList = await Staff.findAll({
            offset: (currentPage - 1) * perPage, 
            limit: perPage, 
        });
        const pagination = {
            current_page: currentPage,
            first_page_url: `${req.protocol}://${req.get('host')}${req.path}?page=1`,
            from: (currentPage - 1) * perPage + 1,
            last_page: Math.ceil(totalStaff / perPage),
            last_page_url: `${req.protocol}://${req.get('host')}${req.path}?page=${Math.ceil(totalStaff / perPage)}`,
            links: generatePaginationLinks(req, currentPage, Math.ceil(totalStaff / perPage)),
            next_page_url: currentPage < Math.ceil(totalStaff / perPage) ? `${req.protocol}://${req.get('host')}${req.path}?page=${currentPage + 1}` : null,
            path: `${req.protocol}://${req.get('host')}${req.path}`,
            per_page: perPage.toString(),
            prev_page_url: currentPage > 1 ? `${req.protocol}://${req.get('host')}${req.path}?page=${currentPage - 1}` : null,
            to: currentPage * perPage,
            total: totalStaff
        };
        res.json({
            payload: {
                pagination: pagination
            },
            data: staffList
        });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}