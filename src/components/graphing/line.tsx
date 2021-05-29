import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetStats } from "../../api/GetStats";
import { newTitles, graphGames } from "../../api/static";
import { Box, Align } from '../Materials';


interface GraphData {
    loading: boolean,
    error: boolean,
    stats: { [name: string]: any },
    gameName: string,
    platform: string
}

function LineGraph(props: GraphData) {
    if (!props.loading&&!props.error) {
        
        const { t, i18n } = useTranslation();
        const time = props.stats.data.timeStamps.map((e: string) => {
            const time = new Date(e)
            return time.toLocaleDateString()
        }) 
        const data = (newTitles.includes(props.gameName)) ? {
                labels: time,
                datasets: [
                    {
                        label: t('stats.graph.all'),
                        data: props.stats.data.soldierAmount,
                        fill: false,
                        borderColor: "rgba(75,192,192,0.2)",
                        pointRadius: 0
                    },
                    {
                        label: t('stats.graph.dice'),
                        data: props.stats.data.diceSoldierAmount,
                        fill: false,
                        borderColor: "#49297e",
                        pointRadius: 0
                    },
                    {
                        label: t('stats.graph.community'),
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
    region: string,
    platform: string
}

export function Graph(props: GameInfo) {
    const { isLoading: loading, isError: error, data: stats } = useQuery("regions" + props.days + props.region + props.gameName + props.platform, () => GetStats.graphs(
        {game: props.gameName, days: props.days, region: props.region, platform: props.platform}
    ))
    const { t, i18n } = useTranslation();
    
    return (
        <Box>
            <h3>{t(`regions.${props.region}`)}</h3>
            <LineGraph loading={loading} error={error} platform={props.platform} stats={stats} gameName={props.gameName} />
        </Box>
    );
}


function GlobalLineGraph(props: GraphData) {
    if (!props.loading&&!props.error) {
        const { t, i18n } = useTranslation();
        const time = props.stats.data.timeStamps.map((e: string) => {
            const time = new Date(e)
            return time.toLocaleDateString()
        }) 
        const games = graphGames[props.platform].filter((e: string) => {
            if (e !== "bfglobal") {
                return e
            }
        })
        const colors = ["#4bc0c0", "#49297e", "#195f08", "#003fc5", "#ae08a7", "#ae0842", "#829a00", "#9a5d00", "#009a96", "#00609a", "#4b009a", "#439a00", "#004b9f"]
        const data = {
            labels: time,
            datasets: 
                games.map((e: string, index: number) => {
                    let gameName = e
                    let gameStuff = e.split(".")
                    if (gameStuff[0] == "bf2") {
                        gameName = gameStuff[1]
                    }
                    return {
                        label: t(`games.${e}`),
                        data: props.stats.data[gameName],
                        fill: false,
                        borderColor: colors[index],
                        pointRadius: 0
                    }
                }) 
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


interface GlobalInfo {
    days: string,
    platform: string
}

export function GlobalGraph(props: GlobalInfo) {
    const { isLoading: loading, isError: error, data: stats } = useQuery("globalRegions" + props.days + props.platform, () => GetStats.graphs(
        {game: "bfglobal", days: props.days, region: "all", platform: props.platform}
    ))

    return (
        <Box>
            <GlobalLineGraph loading={loading} error={error} stats={stats} gameName="bfglobal" platform={props.platform} />
        </Box>
    )
}