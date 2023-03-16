import api from './api';

export const uploadImage = async (file, onUploadProgress) => {
    let formData = new FormData();
    formData.append("file", file);

    console.log("entrou na f-upload");

    return api.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
};