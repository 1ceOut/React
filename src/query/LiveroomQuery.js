import axios from "axios";

const server_ip = import.meta.env.VITE_API_IP;

const Getuser = (userid)=>axios.get(`${server_ip}/api/login/getuser`, {
    withCredentials: true,
    params: {
        user_id: userid,
    }
});

const start = (userid)=>axios.get(`${server_ip}/api/login/broadcast`, {
    withCredentials: true,
    params: {
        userid: userid,
    }
});

const end = (userid)=>axios.delete(`${server_ip}/api/login/broadcast`, {
    withCredentials: true,
    params: {
        userid: userid,
    }
});

export {Getuser,start,end}