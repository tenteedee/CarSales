import React, {FC, useEffect, useState} from "react";
import {Settings} from "../core/models";
import {QueryResponse} from "../../../utils/model/models";
import {toast} from "react-toastify";
import {getSettings, updateSettings} from "../core/requests";

type Props = {};
export const GeneralSettings: FC<Props> = () => {
    const [settings, setSettings] = useState<Settings[]>([]);
    useEffect(() => {
        getSettings()
            .then((response: QueryResponse) => {
                setSettings(response.data || []);
            })
            .catch(() => {
                toast.error('Có lỗi xảy ra khi lấy danh sách settings', {
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
    const handleUpdate = () => {
        const updatedSettings = settings.map(({ key, value }) => ({ key, value }));
        updateSettings(updatedSettings)
            .then(() => {
                toast.success("Cập nhật cài đặt thành công!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            })
            .catch((error) => {
                const errorMessage = error && error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : "Cập nhật cài đặt, vui lòng thử lại!";
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            });
    };
    return (
        <>
            <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                <div className='card-header cursor-pointer'>
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Settings</h3>
                    </div>
                </div>
                <div className='card-body p-9'>
                    {settings.map((setting) => (
                        <div className='row mb-7' key={setting.key}>
                            <label className='col-lg-4 fw-bold text-muted'>{setting.name}</label>
                            <div className='col-lg-8'>
                                <input
                                    type='text'
                                    name={setting.key}
                                    className='form-control'
                                    value={setting.value}
                                    onChange={(e) => handleInputChange(setting.key || "", e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                    <div className='d-flex my-4'>
                        <button className='btn btn-primary' onClick={handleUpdate}>Create</button>
                    </div>
                </div>
            </div>
        </>
    );
}