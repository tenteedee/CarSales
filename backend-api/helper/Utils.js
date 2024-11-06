import Setting from "../models/Setting.js";

export function randomPassword(length = 12) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*";

  const allChars = lowercase + uppercase + numbers + specialChars;
  let password = "";

  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
}
export const getSetting = async (key) => {
  try {
    const setting = await Setting.findOne({
      where: { key }, // Tìm giá trị với key
    });

    return setting ? setting.value : ""; // Trả về value nếu tìm thấy, ngược lại trả về ""
  } catch (error) {
    console.error(`Error fetching setting for key "${key}":`, error);
    return "";
  }
};
