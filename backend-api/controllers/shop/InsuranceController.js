import Insurance from "./../../models/Insurance.js";
import InsuranceProvider from "./../../models/InsuranceProvider.js";

export const getAllInsuranceProviders = async (req, res) => {
  try {
    const providers = await InsuranceProvider.findAll();
    res.status(200).json(providers);
  } catch (error) {
    console.error("Error fetching insurance providers:", error);
    res.status(500).json({
      message: "An error occurred while fetching insurance providers.",
    });
  }
};

export const getAllInsurances = async (req, res) => {
  try {
    const insurances = await Insurance.findAll({
      attributes: ["id", "name", "description", "type", "type_price", "price"],
      include: [
        {
          model: InsuranceProvider,
          as: "provider",
          attributes: ["name", "phone_number", "email"],
        },
      ],
    });
    res.status(200).json(insurances);
  } catch (error) {
    console.error("Error fetching insurances:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching insurances." });
  }
};