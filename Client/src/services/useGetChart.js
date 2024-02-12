import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
const { VITE_API_URL } = import.meta.env

export default function useGetChart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { access_token } = useSelector((state) => state.userSlice)

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios({
            method: "GET",
            url: `${VITE_API_URL}/chart`,
            headers: `Bearer ${access_token}`
        })
            .then((res) => {
                console.log(res.data)
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
                setError(true);
            });
        //eslint-disable-next-line
    }, []);

    return { loading, error, data };
}
