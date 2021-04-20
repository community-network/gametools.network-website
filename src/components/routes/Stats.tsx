import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import '../../locales/config';
import { useTranslation } from 'react-i18next';
import { GetStats } from "../../api/GetStats"
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { Back, ArrowLeft, Container, SmallButtonSecondary, Align, Box, SmallSearchBox, AltText, SelectPrimary, Circle } from '../Materials';
import styled from "styled-components";
import { platformGames } from "../../api/static"

interface Views {
    loading: boolean,
    error: boolean,
    stats: { [name: string]: any }
}

export const Spacing = styled.div`
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
        return (
            <Spacing>
                <Align>
                    <Circle/>
                    <div>
                        <OriginName>{t("loading")}</OriginName>
                        <OriginDescription>{t("loading")}</OriginDescription>
                    </div>
                </Align>
            </Spacing>
        )
    }
}

const WeaponImage = styled.img`
    width: 8rem;
    margin-right: 1.5rem;
`

const Description = styled.p`
    ${AltText}
`

const Column = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    margin: 0 auto;
    margin-top: .5rem;
`

const Row = styled.div`
    flex:1;
`

function ViewStats(props: Views) {
    const { t } = useTranslation();
    const stats = props.stats;
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

const Title = styled.h3`
    margin: 0 33px;
    padding-bottom: 1rem;
`

function dynamicSort(property: string) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a: {}, b: {}) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function ViewWeapons(props: Views) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [sortType, setSortType] = React.useState<string>("-kills");
    let weapons = []
    if (!props.loading&&!props.error) {
        weapons = props.stats.weapons.filter((item: {weaponName: string}) => {
            return item.weaponName.toLowerCase().includes(searchTerm.toLowerCase());
        });
        weapons = weapons.sort(dynamicSort(sortType))
    }
    return (
        <Spacing>
            <Align>
                <Title>{t("stats.weapons")}</Title>
                <SmallSearchBox placeholder="Search for weapon" value={searchTerm} onChange={(ev: React.ChangeEvent<HTMLInputElement>):
                    void => setSearchTerm(ev.target.value)}/>
                <SelectPrimary value={sortType} onChange={(ev: React.ChangeEvent<HTMLSelectElement>):
                    void => setSortType(ev.target.value)}>
                        <option value="weaponName">{t("stats.rows.weaponName")}</option>
                        <option value="type">{t("stats.rows.type")}</option>
                        <option value="-kills">{t("stats.rows.kills")}</option>
                        <option value="-killsPerMinute">{t("stats.rows.kpm")}</option>
                        <option value="-accuracy">{t("stats.rows.accuracy")}</option>
                        <option value="-headshots">{t("stats.rows.headshots")}</option>
                </SelectPrimary>
            </Align>
            {weapons !== []? (
                <Box>
                    {weapons.map((key, index) => {
                        return (
                            <Column key={index}>
                                <Row><p>{key.weaponName}</p><WeaponImage src={key.image}/></Row>
                                <Row><p>{key.type}</p><Description>{t("stats.rows.type")}</Description></Row>
                                <Row><p>{key.kills}</p><Description>{t("stats.rows.kills")}</Description></Row>
                                <Row><p>{key.killsPerMinute}</p><Description>{t("stats.rows.kpm")}</Description></Row>
                                <Row><p>{key.accuracy}</p><Description>{t("stats.rows.accuracy")}</Description></Row>
                                <Row><p>{key.headshots}</p><Description>{t("stats.rows.headshots")}</Description></Row>
                            </Column>
                        )
                    })}
                </Box>
            )
            :(<Box>
                <p>{t("loading")}</p>
            </Box>)}
        </Spacing>
    )
}

function ViewVehicles(props: Views) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [sortType, setSortType] = React.useState<string>("-kills");
    let vehicles = []
    if (!props.loading&&!props.error) {
        vehicles = props.stats.vehicles.filter((item: {vehicleName: string}) => {
            return item.vehicleName.toLowerCase().includes(searchTerm.toLowerCase());
        });
        vehicles = vehicles.sort(dynamicSort(sortType))
    }
    return (
        <Spacing>
            <Align>
                <Title>{t("stats.vehicles")}</Title>
                <SmallSearchBox placeholder="Search for vehicle" value={searchTerm} onChange={(ev: React.ChangeEvent<HTMLInputElement>):
                    void => setSearchTerm(ev.target.value)}/>
                    <SelectPrimary value={sortType} onChange={(ev: React.ChangeEvent<HTMLSelectElement>):
                        void => setSortType(ev.target.value)}>
                            <option value="vehicleName">{t("stats.rows.vehicleName")}</option>
                            <option value="type">{t("stats.rows.type")}</option>
                            <option value="-kills">{t("stats.rows.kills")}</option>
                            <option value="-killsPerMinute">{t("stats.rows.kpm")}</option>
                            <option value="-destroyed">{t("stats.rows.destroyed")}</option>
                    </SelectPrimary>
            </Align>
            {vehicles !== []? (
                <Box>
                    {vehicles.map((key, index) => {
                        return (
                            <Column key={index}>
                                <Row><p>{key.vehicleName}</p><WeaponImage src={key.image}/></Row>
                                <Row><p>{key.type}</p><Description>{t("stats.rows.type")}</Description></Row>
                                <Row><p>{key.kills}</p><Description>{t("stats.rows.kills")}</Description></Row>
                                <Row><p>{key.killsPerMinute}</p><Description>{t("stats.rows.kpm")}</Description></Row>
                                <Row><p>{key.destroyed}</p><Description>{t("stats.rows.destroyed")}</Description></Row>
                            </Column>
                        )
                    })}
                </Box>
            )
            :(<Box>
                <p>{t("loading")}</p>
            </Box>)}
    </Spacing>  
    )
}


type TParams = { plat: string, eaid: string, game: string }

function Stats({ match }: RouteComponentProps<TParams>) {
    const getLanguage = () => window.localStorage.i18nextLng.toLowerCase()
    const { t } = useTranslation();
    const statsRequest = {game: match.params.game, type: "stats", userName: match.params.eaid, lang: getLanguage()}
    const { isLoading: loading, isError: error, data: stats } = useQuery("stats" + statsRequest, () => GetStats.stats(statsRequest))
    const weaponRequest = {game: match.params.game, type: "weapons", userName: match.params.eaid, lang: getLanguage()}
    const { isLoading: wloading, isError: werror, data: wstats } = useQuery("weapons" + statsRequest, () => GetStats.stats(weaponRequest))
    const vehicleRequest = {game: match.params.game, type: "vehicles", userName: match.params.eaid, lang: getLanguage()}
    const { isLoading: vloading, isError: verror, data: vstats } = useQuery("vehicles" + statsRequest, () => GetStats.stats(vehicleRequest))
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
        <ViewWeapons loading={wloading} stats={wstats} error={werror}/>
        <ViewVehicles loading={vloading} stats={vstats} error={verror}/>
        
    </Container>
    )
}

export default Stats;
