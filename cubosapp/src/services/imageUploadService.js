import api from './api';

export const uploadImage = async (file, onUploadProgress) => {
    let formData = new FormData();
    formData.append("file", file);


    return api.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
};