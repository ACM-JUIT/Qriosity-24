import { useState, useEffect } from "react";
import axios from "axios";

export default function useGetChart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios({
            method: "GET",
            url: 'http://localhost:3500/chart',
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
