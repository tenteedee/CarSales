import Showroom from "../../models/Showroom.js";

export const queryShowrooms = async (req, res) => {
  const showrooms = await Showroom.findAll({});
  res.json({
    data: showrooms,
  });
};
