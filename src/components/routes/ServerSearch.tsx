import * as React from "react";
import '../../locales/config';
import { Link, useHistory, RouteComponentProps, withRouter, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import "../../assets/scss/App.scss";
import { GetStats } from "../../api/GetStats"
import { useQuery } from 'react-query';
import { AltText, SearchBox, Back, ArrowLeft, Container, BigSelectSecondary, Align,  AlignW, Box } from '../Materials';
import { getLanguage } from "../../locales/config";
import { frostbite3 } from "../../api/static";

const Description = styled.p`
    ${AltText}
`

const AltDescription = styled.p`
    ${AltText}
    margin-left: 24px;
`

const Title = styled.h2`
    margin-top: 2rem;
`

const ServerImage = styled.img`
    margin-top: 12px;
    max-height: 4rem;
    margin-right: 1.5rem;
`

const ServerInfo = styled.div`
    margin-top: 16px;
`

const Spacing = styled.div`
    margin-bottom: 2rem;
`

interface Views {
    loading: boolean,
    error: boolean,
    game: string,
    stats: { [name: string]: any }
}

function Results(props: Views) {
    const { t, i18n } = useTranslation();
    const stats = props.stats
    const ConditionalLink = ({ children, to, condition }) => (!!condition && to)
      ? <Link to={to}>{children}</Link>
      : <>{children}</>;

    if (!props.loading&&!props.error) {
        if (stats.servers.length == 0) {
            return <Spacing><Description>{t("resultNotFound")}</Description></Spacing>
        }
        return (<Spacing>{stats.servers.map((key: any, index: number) => {
            let queue: number = undefined
            queue = key.inQue
            let queueString = ""
            if (queue!==undefined && queue!==0) {
                queueString = `[${queue}]`
            }
            return (
                <ConditionalLink to={`/servers/${props.game}/gameid/${key.gameId}`} condition={props.game === "bf1" || props.game === "bf3" || props.game === "bf4"} key={index}>
                    <Box>
                        <AlignW>
                            <div><ServerImage src={key.url}/></div><ServerInfo><h3>{key.server}{key.prefix}</h3><p>{key.playerAmount}/{key.maxPlayers}{key.maxPlayerAmount} {queueString} - {key.mode}{key.mode===undefined?key.map:null} - {t(`regions.${key.region.toLowerCase()}`)}</p></ServerInfo>
                        </AlignW>
                    </Box>
                </ConditionalLink>
            )
        })}</Spacing>);
    } else {
        return (<Box></Box>);
    }
}

function Search() {
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [gameName, setGameName] = React.useState<string>("bf1");
    const [region, setRegion] = React.useState<string>("all");
    const history = useHistory()
    // get info from query ?search &game
    const query = new URLSearchParams(useLocation().search);
    const nameQuery = query.get("search")
    const gameQuery = query.get("game")
    const regionQuery = query.get("region")
    React.useState(() => {
        if (nameQuery !== null) {
            setSearchTerm(nameQuery)
        }
        if (gameQuery !== null) {
            setGameName(gameQuery)
        }
        if (regionQuery !== null) {
            setRegion(regionQuery)
        }
    })

    // change top to query
    React.useEffect(() => {
        const params = new URLSearchParams()
        if (searchTerm) {
            params.append("search", searchTerm)
        } else {
            params.delete("search")
        }
        if (gameName) {
            params.append("game", gameName)
        } else {
            params.delete("game")
        }
        if (region) {
            params.append("region", region)
        } else {
            params.delete("region")
        }
            history.push({search: params.toString()})
        }, [searchTerm, gameName, region, history])
    
    const { t, i18n } = useTranslation();
    const { isLoading: loading, isError: error, data: stats } = useQuery("servers" + gameName + searchTerm + region, () => GetStats.server(
        {game: gameName, type: "servers", getter: "name", serverName: searchTerm, lang: getLanguage(), region: region}
    ))
    return (
    <Container>
        <Back to="/"><ArrowLeft/>{t("serverSearch.back")}</Back>
        <Align>
            <h2>{t("serverSearch.serverInfo")}</h2>
            <AltDescription>{t("serverSearch.description")}</AltDescription>
        </Align>
        <Align>
            <SearchBox placeholder={t("serverSearch.searchPlaceholder")} value={searchTerm} onChange={(ev: React.ChangeEvent<HTMLInputElement>):
                void => setSearchTerm(ev.target.value)}/>
            <BigSelectSecondary value={gameName} onChange={(ev: React.ChangeEvent<HTMLSelectElement>):
                    void => setGameName(ev.target.value)}>
                <option value="bf1">{t("games.bf1")}</option>
                <option value="bf2.bf2hub">{t("games.bf2.bf2hub")}</option>
                <option value="bf2.playbf2">{t("games.bf2.playbf2")}</option>
                <option value="bfbc2">{t("games.bfbc2")}</option>
                <option value="bf2142">{t("games.bf2142")}</option>
                <option value="bf1942">{t("games.bf1942")}</option>
                <option value="bfvietnam">{t("games.bfvietnam")}</option>
                <option value="bf3">{t("games.bf3")}</option>
                <option value="bf4">{t("games.bf4")}</option>
                <option value="bfh">{t("games.bfh")}</option>
                <option value="bfv">{t("games.bfv")}</option>
            </BigSelectSecondary>
            <BigSelectSecondary disabled={!frostbite3.includes(gameName)} value={region} onChange={(ev: React.ChangeEvent<HTMLSelectElement>):
                    void => setRegion(ev.target.value)}>
                <option value="all">{t("regions.all")}</option>
                <option value="eu">{t("regions.eu")}</option>
                <option value="asia">{t("regions.asia")}</option>
                <option value="nam">{t("regions.na")}</option>
                <option value="sam">{t("regions.sa")}</option>
                <option value="au">{t("regions.au")}</option>
                <option value="oc">{t("regions.oc")}</option>
            </BigSelectSecondary>
            {/* <BigButtonSecondary type="submit">{t("serverSearch.search")} <RightArrow/></BigButtonSecondary> */}
        </Align>
        <Title>{t("serverSearch.results")}</Title>
        <Results game={gameName} loading={loading} stats={stats} error={error}/>
    </Container>
    )
}

export default withRouter(Search);
