import Setting from '../../models/Setting.js';

export const getAllSettings = async (req, res) => {
    try {
        // Lấy tất cả các cài đặt
        const settings = await Setting.findAll({
            attributes: ['key', 'value'],
        });
        const settingsObject = {};
        settings.forEach(setting => {
            settingsObject[setting.key] = setting.value;
        });
        res.status(200).json(settingsObject);
    } catch (err) {
        res.status(500).json({ error: err.message || 'Exception error' });
    }
};

