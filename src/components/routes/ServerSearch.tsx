import * as React from "react";
import '../../locales/config';
import { Link, useHistory, RouteComponentProps, withRouter, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import "../../assets/scss/App.scss";
import { GetStats } from "../../api/GetStats"
import { useQuery } from 'react-query';
import { AltText, SearchBox, Back, ArrowLeft, Container, BigSelectSecondary, Align,  AlignW, Box } from '../Materials';

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
            return <Spacing><Description>No results found</Description></Spacing>
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
                            <div><ServerImage src={key.url}/></div><ServerInfo><h3>{key.server}{key.prefix}</h3><p>{key.playerAmount}/{key.maxPlayers}{key.maxPlayerAmount} {queueString} - {key.mode}{key.mode===undefined?key.map:null}</p></ServerInfo>
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
    const history = useHistory()
    // get info from query ?search &game
    const query = new URLSearchParams(useLocation().search);
    const nameQuery = query.get("search")
    const gameQuery = query.get("game")
    React.useState(() => {
        if (nameQuery !== null) {
            setSearchTerm(nameQuery)
        }
        if (gameQuery !== null) {
            setGameName(gameQuery)
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
            history.push({search: params.toString()})
        }, [searchTerm, gameName, history])
    
    const getLanguage = () => window.localStorage.i18nextLng.toLowerCase()
    const { t, i18n } = useTranslation();
    const { isLoading: loading, isError: error, data: stats } = useQuery("servers" + gameName + searchTerm, () => GetStats.server(
        {game: gameName, type: "servers", getter: "name", serverName: searchTerm, lang: getLanguage()}
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
                <option value="bf1">Battlefield 1</option>
                <option value="bf2.bf2hub">Battlefield 2 (bf2hub)</option>
                <option value="bf2.playbf2">Battlefield 2 (playbf2)</option>
                <option value="bfbc2">Battlefield BC 2</option>
                <option value="bf2142">Battlefield 2142 (.com)</option>
                <option value="bf1942">Battlefield 1942</option>
                <option value="bfvietnam">Battlefield Vietnam</option>
                <option value="bf3">Battlefield 3</option>
                <option value="bf4">Battlefield 4</option>
                <option value="bfh">Battlefield Hardline</option>
                <option value="bfv">Battlefield 5</option>
            </BigSelectSecondary>
            {/* <BigButtonSecondary type="submit">{t("serverSearch.search")} <RightArrow/></BigButtonSecondary> */}
        </Align>
        <Title>{t("serverSearch.results")}</Title>
        <Results game={gameName} loading={loading} stats={stats} error={error}/>
    </Container>
    )
}

export default withRouter(Search);
