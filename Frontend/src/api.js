import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const analyzeQuery = async (query, uploadedFile = null) => {
  const response = await axios.post(`${BASE_URL}/analyze`, {
    query: query,
    file: uploadedFile,
  });
  return response.data;
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${BASE_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};