import { Stats } from "node:fs";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetStats } from "../../api/GetStats";
import { frostbite3 } from "../../api/static";
import { Box, Align } from '../Materials';


interface GraphData {
    loading: boolean,
    error: boolean,
    stats: { [name: string]: any },
    gameName: string
}

function LineGraph(props: GraphData) {
    if (!props.loading&&!props.error) {
        
        const time = props.stats.data.timeStamps.map((e: string) => {
            const time = new Date(e)
            return time.toLocaleDateString()
        }) 
        const data = (frostbite3.includes(props.gameName)) ? {
                labels: time,
                datasets: [
                    {
                        label: "All players",
                        data: props.stats.data.soldierAmount,
                        fill: false,
                        borderColor: "rgba(75,192,192,0.2)",
                        pointRadius: 0
                    },
                    {
                        label: "Players on dice servers",
                        data: props.stats.data.diceSoldierAmount,
                        fill: false,
                        borderColor: "#49297e",
                        pointRadius: 0
                    },
                    {
                        label: "Players on community servers",
                        data: props.stats.data.communitySoldierAmount,
                        fill: false,
                        borderColor: "#195f08",
                        pointRadius: 0
                    }
                ]
            } : {
                labels: time,
                datasets: [
                    {
                        label: "All players",
                        data: props.stats.data.soldierAmount,
                        fill: false,
                        borderColor: "rgba(75,192,192,0.2)",
                        pointRadius: 0
                    }
                ]
            };

        return (
            <div>
                <Line style={{height: "15rem"}} data={data} type="line" />
            </div>
        )
    } else {
        return (<div></div>)
    }
}

interface GameInfo {
    gameName: string,
    days: string,
    region: string
}

export default function Graph(props: GameInfo) {
    const { isLoading: loading, isError: error, data: stats } = useQuery("servers" + props.days + props.region + props.gameName, () => GetStats.graphs(
        {game: props.gameName, days: props.days, region: props.region}
    ))
    const { t, i18n } = useTranslation();
    
    return (
        <Box>
            <h3>{t(`regions.${props.region}`)}</h3>
            <LineGraph loading={loading} error={error} stats={stats} gameName={props.gameName}/>
        </Box>
    );
}