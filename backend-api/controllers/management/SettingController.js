import Setting from "../../models/Setting.js";

export const querySettings = async (req, res) => {
  const settings = await Setting.findAll({});
  res.json({
    data: settings,
  });
};

export const updateSettings = async (req, res) => {
  const settings = req.body;
  try {
    for (let i = 0; i < settings.length; i++) {
      const { key, value } = settings[i];
      let setting = await Setting.findOne({ where: { key } });
      if (setting) {
        await setting.update({ value });
      }
    }
    return res.status(200).json({ message: "Cập nhật settings thành công!" });
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    return res
      .status(500)
      .json({ error: "Có lỗi xảy ra khi cập nhật settings" });
  }
};
