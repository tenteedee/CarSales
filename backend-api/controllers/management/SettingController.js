import Setting from "../../models/Setting.js";

export const querySettings = async (req, res) => {
  const settings = await Setting.findAll({});
  res.json({
    data: settings,
  });
};

export const updateSettings = async (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }
  const settings = req.body;
  const files = req.files;

  try {
    for (let key in settings) {
      const value = settings[key];
      let setting = await Setting.findOne({ where: { key } });
      if (setting) {
        if (setting.type === "image" && value != "") {
          const isValidImageUrl = /\.(jpg|jpeg|png|gif|webp)$/.test(value);

          if (!isValidImageUrl) {
            return res
              .status(500)
              .json({ error: "Vui lòng nhập link hình ảnh đúng định dạng" });
          }
        }
        await setting.update({ value });
      }
    }
    for (let fileKey in files) {
      const file = files[fileKey];
      const filePath = `/assets/${file.filename}`;

      let setting = await Setting.findOne({ where: { key: file.fieldname } });

      if (setting) {
        await setting.update({ value: filePath });
      }
    }
    const settingsUpdated = await Setting.findAll({});

    return res
      .status(200)
      .json({ message: "Cập nhật cài đặt thành công!", data: settingsUpdated });
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
    return res
      .status(500)
      .json({ error: "Có lỗi xảy ra khi cập nhật cài đặt" });
  }
};
