import { useEffect, useState } from "react";
import axios from "axios";

export default function useRefreshToken() {
    const [refreshing, setRefreshing] = useState(false);

    const refresh = async() => {
        setRefreshing(true);

        try {
            const response = await axios.get("/v1/auth/refresh-token", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
                },
            });

            localStorage.setItem("accessToken", response.data.accessToken);
        } catch (err) {
            console.error(err);
        }

        setRefreshing(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            refresh();
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, []);
}