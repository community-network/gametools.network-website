import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { GetStats } from "../../api/GetStats";
import { newTitles, graphGames } from "../../api/static";
import { Box } from '../Materials';


interface GraphData {
    loading: boolean,
    error: boolean,
    stats: { [name: string]: any },
    gameName: string,
    platform: string,
    timeStamps: [string]
}

function LineGraph(props: GraphData) {
    if (!props.loading&&!props.error) {
        
        const { t } = useTranslation();
        const time = props.timeStamps.map((e: string) => {
            const time = new Date(e)
            return time.toLocaleDateString()
        }) 
        const data = (newTitles.includes(props.gameName)) ? {
                labels: time,
                datasets: [
                    {
                        label: t('stats.graph.all'),
                        data: props.stats.soldierAmount,
                        fill: false,
                        borderColor: "rgba(75,192,192,0.2)",
                        pointRadius: 0
                    },
                    {
                        label: t('stats.graph.dice'),
                        data: props.stats.diceSoldierAmount,
                        fill: false,
                        borderColor: "#49297e",
                        pointRadius: 0
                    },
                    {
                        label: t('stats.graph.community'),
                        data: props.stats.communitySoldierAmount,
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
                        data: props.stats.soldierAmount,
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


function AllPlatformGraph(props: GraphData) {
    if (!props.loading&&!props.error) {
        const { t } = useTranslation();
        const time = props.timeStamps.map((e: string) => {
            const time = new Date(e)
            return time.toLocaleDateString()
        }) 
        console.log(props.platform)
        const data = {
                labels: time,
                datasets: [
                    {
                        label: t('platforms.pc'),
                        data: props.stats.pc.soldierAmount,
                        fill: false,
                        borderColor: "rgba(75,192,192,0.2)",
                        pointRadius: 0
                    },
                    {
                        label: t('platforms.ps4'),
                        data: props.stats.ps4.soldierAmount,
                        fill: false,
                        borderColor: "#49297e",
                        pointRadius: 0
                    },
                    {
                        label: t('platforms.xboxone'),
                        data: props.stats.xboxone.soldierAmount,
                        fill: false,
                        borderColor: "#195f08",
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
    platform: string
}

export function OldGameGraph(props: GameInfo) {
    const { isLoading: loading, isError: error, data: stats } = useQuery("regions" + "7" + "all" + props.gameName + props.platform, () => GetStats.graphs(
        {game: props.gameName, days: "7", region: "all", platform: props.platform}
    ))
    const { t } = useTranslation();
    if (!loading&&!error) {
        return (
            <Box>
                <h3>{t(`regions.all`)}</h3>
                {(props.platform !== "all") ? (
                    <LineGraph timeStamps={stats.data.timeStamps} loading={loading} error={error} platform={props.platform} stats={stats.data} gameName={props.gameName} />
                 ) : (
                    <AllPlatformGraph  timeStamps={stats.data.timeStamps} loading={loading} error={error} platform={props.platform} stats={stats.data} gameName={props.gameName} />
                 )}
            </Box>
        );
    } else {
        return (<div></div>)
    }
}

export function Graph(props: GameInfo) {
    const { isLoading: loading, isError: error, data: stats } = useQuery("regions" + "7" + "multiple" + props.gameName + props.platform, () => GetStats.graphs(
        {game: props.gameName, days: "7", region: "multiple", platform: props.platform}
    ))
    const { t } = useTranslation();
    if (!loading&&!error) {
        return (
            <>
                {Object.keys(stats.data).map((key: string, index: number) => {
                    {if (["timeStamps", "startTime", "endTime"].includes(key)) {
                        return <></>
                    } else {
                        return (
                            <Box key={index}>
                                <h3>{t(`regions.${key.toLowerCase()}`)}</h3>
                                {(props.platform !== "all") ? (
                                    <LineGraph timeStamps={stats.data.timeStamps} loading={loading} error={error} platform={props.platform} stats={stats.data[key]} gameName={props.gameName} />
                                 ) : (
                                    <AllPlatformGraph timeStamps={stats.data.timeStamps} loading={loading} error={error} platform={props.platform} stats={stats.data[key]} gameName={props.gameName} />
                                 )}
                            </Box>
                        )
                    }}
                })}
            </>
        );
    } else {
        return (<div></div>)
    }
}

function GlobalLineGraph(props: GraphData) {
    if (!props.loading&&!props.error) {
        const { t } = useTranslation();
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
    platform: string
}

export function GlobalGraph(props: GlobalInfo) {
    const { isLoading: loading, isError: error, data: stats } = useQuery("globalRegions" + "7" + props.platform, () => GetStats.graphs(
        {game: "bfglobal", days: "7", region: "all", platform: props.platform}
    ))

    return (
        <Box>
            <GlobalLineGraph timeStamps={["none"]} loading={loading} error={error} stats={stats} gameName="bfglobal" platform={props.platform} />
        </Box>
    )
}