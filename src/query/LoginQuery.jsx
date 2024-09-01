import axios, {Axios} from "axios";

const server_ip = import.meta.env.VITE_API_IP;

const Kakao_GetAccessToken = async (provider, accesstoken) => {
    try {
        const response = await axios.get(`${server_ip}/api/login/kakao`, {
            withCredentials: true,
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
            withCredentials: true,
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
            withCredentials: true,
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

const Auto_Login = async () => {
    try {
        return await axios.get(`${server_ip}/api/login/auto`, {
            withCredentials: true,
        });
    } catch (error){
        console.error('Error fetching JWT:', error);
        throw error;
    }
}

const Logout_Action = async () => {
    try {
        return await axios.delete(`${server_ip}/api/login/logout`, {
            withCredentials: true,
        });
    } catch (error){
        console.error('Error fetching JWT:', error);
        throw error;
    }
}

const addinfo = async (data) => {
    try {
        return await axios.post(`${server_ip}/api/login/addinfo`, data, {
            withCredentials: true,
        })
    } catch (error) {
        console.log("전송오류")
        throw error;
    }
}

export {Kakao_GetAccessToken,Naver_GetAccessToken,Google_GetAccessToken,Auto_Login,Logout_Action,addinfo};

