import * as React from "react";
import '../../locales/config';
import { Link, RouteComponentProps  } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import "../../assets/scss/App.scss";
import { GetStats } from "../../api/GetStats"
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { M88, AltText, SearchBox, BigButtonSecondary, RightArrow, Back, ArrowLeft, Container, BigSelectSecondary, Align, Box, Column, Row } from '../Materials';

const Description = styled.p`
    ${AltText}
    line-height: 0.5;
`

const AltDescription = styled.p`
    ${AltText}
    margin-left: 24px;
`

const Title = styled.h2`
    margin-top: 2rem;
`

interface IServerImage {
    background: string;
}

const ServerImage = styled.div<IServerImage>`
    height: 6rem;
    width: 9rem;
    display: flex;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('${props => props.background}');
    margin-top: 12px;
    margin-right: 1rem;
`

const Blur = styled.div`
    height: 100%;
    flex-grow: 3;
    background: radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4872) 100%);
`

const ServerText = styled.h1`
    ${AltText}
    text-align: center;
    padding: 1.2rem 0;
`

const MapImage = styled.img`
    margin-top: 12px;
    max-height: 4rem;
    margin-right: 1.5rem;
`

const ServerInfo = styled.div`
    margin-top: 16px;
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
            let queue: number = undefined
            queue = stats.inQue
            let queueString = ""
            if (queue!==undefined && queue!==0) {
                queueString = `[${queue}]`
            }
            return (
                    <div>
                        <Align>
                            <ServerImage background={stats.currentMapImage}><Blur><ServerText>&#9734; {stats.favorites}</ServerText></Blur></ServerImage>
                            <div>
                                <h2>{stats.prefix}</h2>
                                <Description>{stats.description}</Description>
                                <Description>{stats.playerAmount}/{stats.maxPlayers}{stats.maxPlayerAmount} {queueString} - {stats.currentMap}</Description>
                                <Description>{stats.region} / {stats.country} - {stats.mode}</Description>
                            </div>
                        </Align>
                        <Title>{t("servers.rotation")}</Title>
                        {stats.rotation.map((key: any, index: number) => {
                            return (
                                <Box key={index}>
                                    <Align>
                                        <div><MapImage src={key.image}/></div><ServerInfo><h3>{key.mapname}</h3><p>{key.mode}</p></ServerInfo>
                                    </Align>
                                </Box>
                            )})}
                        <Title>{t("servers.settings")}</Title>
                    </div>
            )
        }
    else {
        return (<Box></Box>);
    }
}

type TParams = { gameid: string, sname: string}

function Servers({ match }: RouteComponentProps<TParams>) {
    const gameId = match.params.gameid
    const serverName = match.params.sname

    const getLanguage = () => window.localStorage.i18nextLng.toLowerCase()
    const { t, i18n } = useTranslation();
    const { isLoading: loading, isError: error, data: stats } = useQuery("detailed" + gameId + serverName, () => GetStats.server(
        {game: gameId, type: "detailedserver", serverName: serverName, lang: getLanguage()}
    ))
    return (
    <Container>
        <Back to="/servers"><ArrowLeft/>{t("servers.back")}</Back>
        <Results game={gameId} loading={loading} stats={stats} error={error}/>
    </Container>
    )
}

export default Servers;
