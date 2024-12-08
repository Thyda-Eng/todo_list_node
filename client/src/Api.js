import axios from 'axios';

const fetchCsrfToken = async () => {
    const response = await axios.get('http://localhost:5000/csrf-token', {
        withCredentials: true,
    });
    return response.data.csrfToken;
};

export { fetchCsrfToken };