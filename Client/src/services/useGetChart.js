import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetChart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios({
            method: "GET",
            url: 'https://qriosity-backend.onrender.com/chart',
        })
            .then((res) => {
                console.log(res)
                console.log(res.data)
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
                setError(true);
            });
    }, []);

    return { loading, error, data };
}
