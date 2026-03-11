import axios from 'axios';

const API_URL = 'http://localhost:8000/analyze-sales';

export const analyzeSales = async (file, email) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('email', email);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.detail || 'An error occurred during analysis.');
    }
    throw new Error('Network error. Ensure the backend is running.');
  }
};
