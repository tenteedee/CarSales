import React, {FC, useEffect, useState} from "react";
import {Settings} from "../core/models";
import {QueryResponse} from "../../../utils/model/models";
import {toast} from "react-toastify";
import {getSettings, updateSettings} from "../core/requests";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon"; // Import the full-featured Balloon editor

type Props = {};
export const GeneralSettings: FC<Props> = () => {
    const [settings, setSettings] = useState<Settings[]>([]);

    useEffect(() => {
        getSettings()
            .then((response: QueryResponse) => {
                setSettings(response.data || []);
            })
            .catch(() => {
                toast.error("Có lỗi xảy ra khi lấy danh sách settings", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }, []);

    const handleInputChange = (key: string, newValue: string) => {
        setSettings((prevSettings) =>
            prevSettings.map((setting) =>
                setting.key === key ? {...setting, value: newValue} : setting
            )
        );
    };

    const handleImageUpload = (key: string, file: File) => {
        setSettings((prevSettings) =>
            prevSettings.map((setting) =>
                setting.key === key
                    ? {
                        ...setting, value: file.name,
                        uploadFile: file
                    }
                    : setting
            )
        );
    };
    const handleRemoveImage = (key: string) => {
        setSettings((prevSettings) =>
            prevSettings.map((setting) =>
                setting.key === key
                    ? {
                        ...setting,
                        value: "",
                        uploadFile: null
                    }
                    : setting
            )
        );
    };

    const handleUpdate = () => {
        const formData = new FormData();
        settings.forEach(({key, value, uploadFile}) => {
            if (uploadFile) {
                formData.append(key || "", uploadFile);  // Append the file object
            } else {
                formData.append(key || "", value || "");  // Append the value if no new file is uploaded
            }
        });

        updateSettings(formData)
            .then((response: QueryResponse) => {
                setSettings(response.data || []);
                toast.success("Cập nhật cài đặt thành công!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((error) => {
                const errorMessage =
                    error && error.response && error.response.data && error.response.data.error
                        ? error.response.data.error
                        : "Cập nhật cài đặt, vui lòng thử lại!";
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };
    const ASSETS_URL = process.env.REACT_APP_ASSETS_URL

    const renderInputField = (setting: Settings) => {
        switch (setting.type) {
            case "text":
                return (
                    <input
                        type="text"
                        name={setting.key}
                        className="form-control"
                        value={typeof setting.value === "string" ? setting.value : ""}
                        onChange={(e) => handleInputChange(setting.key || "", e.target.value)}
                    />
                );
            case "options":
                const optionsArray = setting.attribute ? setting.attribute.split("|") : [];
                return (
                    <select
                        name={setting.key}
                        className="form-control"
                        value={typeof setting.value === "string" ? setting.value : ""}
                        onChange={(e) => handleInputChange(setting.key || "", e.target.value)}
                    >
                        <option value="">Chọn</option>
                        {optionsArray.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );
            case "image":
                return (
                    <>
                        <div className="d-flex align-items-center mb-2">
                            <input
                                type="text"
                                className="form-control me-2"
                                value={typeof setting.value === "string" ? setting.value : ""}
                                disabled={!!setting.uploadFile}
                                onChange={(e) => handleInputChange(setting.key || "", e.target.value)}
                            />
                            <label
                                className="btn btn-secondary btn-sm"
                                style={{padding: "5px 10px"}}
                                onClick={() => document.getElementById(`file-input-${setting.key}`)?.click()}
                            >
                                {setting.uploadFile ? "Đổi hình ảnh" : "Chọn hình ảnh"}
                            </label>
                            {setting.uploadFile && (
                                <label
                                    className="btn btn-danger btn-sm ms-2"
                                    style={{padding: "5px 10px"}}
                                    onClick={() => handleRemoveImage(setting.key || "")}
                                >
                                    Xoá ảnh
                                </label>
                            )}
                            <input
                                type="file"
                                id={`file-input-${setting.key}`}
                                style={{display: "none"}}
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        handleImageUpload(setting.key || "", e.target.files[0]);
                                        e.target.value = "";
                                    }
                                }}
                            />
                        </div>
                    </>
                );
            case "ckeditor":
                return (
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            // Custom toolbar configuration, or leave as default for full capabilities
                            toolbar: [
                                'heading', '|', 'bold', 'italic', 'link', 'blockQuote', 'imageUpload', 'insertTable', 'mediaEmbed',
                                'bulletedList', 'numberedList', 'undo', 'redo', 'alignment'
                            ],
                            // Add additional plugins if needed
                        }}
                        data={typeof setting.value === "string" ? setting.value : ""}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            handleInputChange(setting.key || "", data);
                        }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
                <div className="card-header cursor-pointer">
                    <div className="card-title m-0">
                        <h3 className="fw-bolder m-0">Settings</h3>
                    </div>
                </div>
                <div className="card-body p-9">
                    {settings.map((setting) => (
                        <div className="row mb-7" key={setting.key}>
                            <label className="col-lg-4 fw-bold text-muted">{setting.name}</label>
                            <div className="col-lg-8 fv-row">{renderInputField(setting)}</div>
                        </div>
                    ))}
                    <div className="d-flex my-4">
                        <button className="btn btn-primary" onClick={handleUpdate}>
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
