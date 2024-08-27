import axios from "axios";
import {useState} from "react";


const [saveFoodList, setSaveFoodList] = useState([]);
const server_ip = import.meta.env.VITE_API_IP;

const fetchSavedBarcodes = async () => {
    try {
        const response = await axios.get(`${server_ip}/api/list`);
        setSaveFoodList(response.data);
    } catch (error) {
        console.error('Error fetching saved barcodes', error);
    }
};