import axios from "axios";

const server_ip = import.meta.env.VITE_API_IP;

const Kakao_GetAccessToken = async (provider, accesstoken) => {
    try {
        const response = await axios.get(`${server_ip}/api/login/kakao`, {
            params: {
                accesstoken: accesstoken
            }
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching JWT:', error);
        throw error; // Rethrow the error for useQuery to handle
    }
};

const Naver_GetAccessToken = async (accesstoken,state) => {
    try {
        const response = await axios.get(`${server_ip}/api/login/naver`, {
            params: {
                accesstoken: accesstoken,
                state: state
            }
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching JWT:', error);
        throw error; // Rethrow the error for useQuery to handle
    }
};

const Google_GetAccessToken = async (accesstoken) => {
    try {
        const response = await axios.get(`${server_ip}/api/login/google`, {
            params: {
                accesstoken: accesstoken,
            }
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching JWT:', error);
        throw error; // Rethrow the error for useQuery to handle
    }
}

export {Kakao_GetAccessToken,Naver_GetAccessToken,Google_GetAccessToken};

