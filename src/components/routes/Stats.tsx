import { RouteComponentProps } from "react-router-dom";
import '../../locales/config';
import { useTranslation } from 'react-i18next';
import { GetStats } from "../../api/GetStats"
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { Back, ArrowLeft, Container, SmallButtonSecondary, Align, Box } from '../Materials';
import styled from "styled-components";
import { platformGames } from "../../api/static"

interface Views {
    loading: boolean,
    error: boolean,
    stats: { [name: string]: string }
}

const Spacing = styled.div`
    margin-top: 1rem;
    margin-bottom: 2rem;
`

const OriginProfile = styled.img`
    width: 60px;
    margin-right: 1.5rem;
`

const OriginName = styled.h2`
    line-height: 60%;
`

const OriginDescription = styled.h4`
    line-height: 60%;
`

function ViewOrigin(props: Views) {
    const { t } = useTranslation();
    const stats = props.stats;
    if (!props.loading&&!props.error) {
        return (
            <Spacing>
                <Align>
                    <OriginProfile src={stats.avatar}/>
                    <div>
                        <OriginName>{stats.userName}</OriginName>
                        <OriginDescription>{t("stats.originDescription")}</OriginDescription>
                    </div>
                </Align>
            </Spacing>
        )
    } else {
        return (<div></div>)
    }
}

function ViewStats(props: Views) {
    const { t } = useTranslation();
    const stats = props.stats;
    console.log(stats)
    if (!props.loading&&!props.error) {
        return (
            <Spacing>
                <Box>
                    <h3>{t("stats.overview")}</h3>
                    <p>{t("stats.overviewDescription")}</p>
                    <p>{stats["K/D"]} K/D</p>
                </Box>
            </Spacing>
        )
    } else {
        return (<div></div>)
    }
}

type TParams = { plat: string, eaid: string, game: string }

function Stats({ match }: RouteComponentProps<TParams>) {
    const getLanguage = () => window.localStorage.i18nextLng.toLowerCase()
    const { t } = useTranslation();
    const request = {game: match.params.game, userName: match.params.eaid, lang: getLanguage()}
    const { isLoading: loading, isError: error, data: stats } = useQuery("stats" + request, () => GetStats.stats(request))
    const games = platformGames[match.params.plat];
    return (
    <Container>
        <div>
            <Back to="/stats"><ArrowLeft/>{t("search.back")}</Back>
        </div>
        <ViewOrigin loading={loading} stats={stats} error={error}/>
        {games.map((key, index) => {
            return (
                <SmallButtonSecondary key={index}>{t(`games.${key}`)}</SmallButtonSecondary>
            )
        })}
        <ViewStats loading={loading} stats={stats} error={error}/>
    </Container>
    )
}

export default Stats;
