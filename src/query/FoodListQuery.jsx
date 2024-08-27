import axios from "axios";
import {useState} from "react";


const [saveFoodList, setSaveFoodList] = useState([]);

const fetchSavedBarcodes = async () => {
    try {
        const response = await axios.get('http://localhost:9000/api/list');
        setSaveFoodList(response.data);
    } catch (error) {
        console.error('Error fetching saved barcodes', error);
    }
};