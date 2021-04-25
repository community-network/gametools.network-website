import * as React from "react";
import '../../locales/config';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import "../../assets/scss/App.scss";
import { GetStats } from "../../api/GetStats"
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { M88, AltText, SearchBox, BigButtonSecondary, RightArrow, Back, ArrowLeft, Container, BigSelectSecondary, Align, Box, Column, Row } from '../Materials';

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

interface Views {
    loading: boolean,
    error: boolean,
    stats: { [name: string]: any }
}

function Results(props: Views) {
    const { t, i18n } = useTranslation();
    const stats = props.stats
    if (!props.loading&&!props.error) {
        return (<div>{stats.servers.map((key: any, index: number) => {
            let queue: number = undefined
            queue = key.inQue
            let queueString = ""
            if (queue!==undefined && queue!==0) {
                queueString = `[${queue}]`
            }
            return (
                <Box key={index}>
                    <Align>
                        <div><ServerImage src={key.url}/></div><ServerInfo><h3>{key.server}{key.prefix}</h3><p>{key.playerAmount}/{key.maxPlayers}{key.maxPlayerAmount} {queueString} - {key.mode}{key.mode===undefined?key.map:null}</p></ServerInfo>
                    </Align>
                </Box>
            )
        })}</div>);
    } else {
        return (<Box></Box>);
    }
}

function Search() {
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [gameName, setGameName] = React.useState<string>("bf1");
    const getLanguage = () => window.localStorage.i18nextLng.toLowerCase()
    const { t, i18n } = useTranslation();
    const { isLoading: loading, isError: error, data: stats } = useQuery("stats" + gameName + searchTerm, () => GetStats.server(
        {game: gameName, type: "servers", serverName: searchTerm, lang: getLanguage()}
    ))
    return (
    <Container>
        <Back to="/"><ArrowLeft/>{t("serverSearch.back")}</Back>
        <Align>
            <h2>{t("serverSearch.serverInfo")}</h2>
            <AltDescription>{t("serverSearch.description")}</AltDescription>
        </Align>
        <Align>
            <form>
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
            </form>
        </Align>
        <Title>{t("serverSearch.results")}</Title>
        <Results loading={loading} stats={stats} error={error}/>
    </Container>
    )
}

export default Search;
