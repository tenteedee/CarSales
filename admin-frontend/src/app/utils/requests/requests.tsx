import {ID} from "../../../_metronic/helpers";
import axios, {AxiosResponse} from "axios";
import {toast} from "react-toastify";
const API_URL = process.env.REACT_APP_API_URL

export const uploadImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (file) {
            const formData = new FormData();
            formData.append("upload", file);

            axios.post(API_URL + "/home/uploads", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((response) => {
                    resolve(response.data.url); // Trả về URL ảnh
                })
                .catch((error) => {
                    console.error("Upload failed:", error);
                    reject(error); // Trả về lỗi nếu upload thất bại
                });
        } else {
            reject("No file provided"); // Trả về lỗi nếu không có file
        }
    });
};
export async function updateState(
    table: string,
    column: string,
    id: ID,
    checked: boolean
): Promise<AxiosResponse<any>> {
    const API_URL = process.env.REACT_APP_API_URL;

    try {
        const response = await axios.post(API_URL + `/home/update-state`, {
            table,
            column,
            id,
            checked,
        });

        toast.success("Cập nhật thông tin thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        return response;
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : "Cập nhật thất bại, vui lòng thử lại!";

        toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        return Promise.reject(error); // Trả về lỗi
    }
}
