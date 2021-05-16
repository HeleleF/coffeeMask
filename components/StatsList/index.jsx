import { useEffect, useState } from "react"
import getVideoStats from "../../shared/utils";

export default function StatsList() {

    const [stats, setStats] = useState([]);

    const getStats = async () => {
        const newStats = await getVideoStats()
        setStats(newStats);
    };

    useEffect(() => {
        getStats();
        const intervalId = setInterval(getStats, 30_000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <ul>
            { stats.map(stat => <li>{stat.likes} Likes</li>)}
        </ul>
    )
}