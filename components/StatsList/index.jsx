import { useEffect, useState } from "react"
import getVideoStats from "../../shared/utils";
import Image from "next/image";

export default function StatsList() {

    const [stats, setStats] = useState([]);

    const getStats = async () => {
        const newStats = await getVideoStats()
        setStats(newStats);
    };

    useEffect(() => {
        getStats();
        const intervalId = setInterval(getStats, 60_000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="cardlist">
            { stats.map((stat, idx) => (
                <div className="card" key={stat.id}>
                    {idx + 1}.
                    <a href={`https://www.youtube.com/watch?v=${stat.id}`}>{stat.title}</a>
                    <Image src={stat.thumbnail.url} alt="thumb" loading="lazy"  width={480} height={360} />
                    <span>
                        {stat.likes} 👍 
                    </span>
                    <span>
                        {stat.dislikes} 👎 
                    </span>
                    <span>
                        {stat.views} 👀
                    </span>
                </div>
            ))}
        </div>
    )
}