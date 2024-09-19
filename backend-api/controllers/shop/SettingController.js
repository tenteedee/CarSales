import Setting from '../../models/Setting.js';

export const getSetting = async (req, res) => {
    try {
        const key = req.params.key;
        const setting = await Setting.findByPk(key, {
            attributes: ['key', 'value'],
        });
        if (!setting) {
            return res.status(404).json({
                message: 'Setting is not available',
            });
        }
        res.status(200).json(setting);
    } catch (err) {
        res.status(500).json({error: err.message || 'Exception error'});
    }
};
