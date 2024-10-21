import React, {FC} from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import axios from "axios";

type DataObject = {
    [key: string]: string | undefined; // allow string, null, or undefined values
};

type Props = {
    data: DataObject;
    setData: (data: DataObject) => void;
    fieldName: string;
};
export const CKEditorForm: FC<Props> = ({data, setData, fieldName}) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
                toolbar: [
                    'heading', '|', 'bold', 'italic', 'link', 'blockQuote', 'insertTable', 'mediaEmbed',
                    'bulletedList', 'numberedList', 'undo', 'redo', 'alignment', 'imageUpload'
                ],
                image: {
                    toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
                    upload: {
                        types: ['png', 'jpeg', 'jpg', 'gif']
                    }
                }
            }}
            data={data[fieldName] || ""}
            onChange={(event, editor) => {
                const updatedData = editor.getData();
                setData({...data, [fieldName]: updatedData});
            }}
            onReady={(editor) => {
                editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                    return {
                        upload: () => {
                            return new Promise((resolve, reject) => {
                                const formData = new FormData();
                                loader.file.then((file) => {
                                    if (file) {
                                        const API_URL = process.env.REACT_APP_API_URL;

                                        formData.append('upload', file);
                                        axios.post(API_URL + "/home/uploads", formData, {
                                            headers: {
                                                'Content-Type': 'multipart/form-data',
                                            },
                                        })
                                            .then((response) => {
                                                resolve({
                                                    default: response.data.url,
                                                });
                                            })
                                            .catch((error) => {
                                                reject(error);
                                            });
                                    } else {
                                        reject('No file found');
                                    }
                                });
                            });
                        },
                        abort: () => {
                            // Handle upload aborting if needed
                        },
                    };
                };
            }}
        />
    );
};