import * as React from "react";
import { RouteComponentProps, useLocation } from "react-router-dom";
import '../../locales/config';
import { useTranslation } from 'react-i18next';
import { GetStats } from "../../api/GetStats"
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { M96, AlignS, Back, ArrowLeft, Container, Align, Box, SmallSearchBox, AltText, SelectPrimary, Circle, Column, Row } from '../Materials';
import styled from "styled-components";
import { platformGames } from "../../api/static"
import { getLanguage } from "../../locales/config";

interface Views {
    loading: boolean,
    error: boolean,
    game: string,
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

function UrlParams() {
    return new URLSearchParams(useLocation().search);
  }

function ViewOrigin(props: Views) {
    const { t } = useTranslation();
    const stats = props.stats;
    const nameGetter = UrlParams().get("name");
    if (!props.loading&&!props.error) {
        if (stats.userName === null) {
            if (nameGetter !== null) {
                return (
                    <Spacing>
                        <Align>
                            <Circle/>
                            <div>
                                <OriginName>{nameGetter}</OriginName>
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
                                <OriginName>{t("notApplicable")}</OriginName>
                                <OriginDescription>{t("noName")}</OriginDescription>
                            </div>
                        </Align>
                    </Spacing>
                )
            }
        } else {
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
        }
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
    max-width: 8rem;
    max-height: 3rem;
    margin-right: 1.5rem;
`

const Description = styled.p`
    ${AltText}
`

const BottomOfBox = styled.div`
    display: inline-block;
    bottom: 0;
    position: absolute;
    line-height: 0;
`

const WhiteText = styled.span`
    color: white;
    margin-left: .5rem;
`

const BackgroundBar = styled.div`
    width: 100%;
    background-color: #313443;
    border-radius: 2.5px;
`

const Bar = styled.div`
    background-color: #14FED4;
    height: 5px;
    border-radius: 2.5px;
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
                    <AlignS>
                        <div>
                            <h3>{stats["rank"]}</h3>
                            <p>{t("stats.main.rank")}</p>
                        </div>
                    </AlignS>
                    {props.game == "bf1" || props.game == "bfv"?
                        <BackgroundBar>
                            <Bar style={{'width': (100 * stats.currentRankProgress) / stats.totalRankProgress}}></Bar>
                        </BackgroundBar>
                    :null}
                    <p></p>
                    <AlignS>
                        <div>
                            <h3>{stats["killDeath"]}</h3>
                            <p>{t("stats.main.killDeath")}</p>
                        </div>
                        <div>
                            <h3>{stats["killsPerMinute"]}</h3>
                            <p>{t("stats.main.killsPerMinute")}</p>
                        </div>
                        <div>
                            <h3>{stats["winPercent"]}</h3>
                            <p>{t("stats.main.winPercent")}</p>
                        </div>
                        <div>
                            <h3>{stats["bestClass"]}</h3>
                            <p>{t("stats.main.bestClass")}</p>
                        </div>
                        <div>
                            <h3>{stats["Accuracy"]}</h3>
                            <p>{t("stats.main.accuracy")}</p>
                        </div>
                    </AlignS>
                    <p></p>
                    <BottomOfBox>
                        <p>{t("stats.main.timePlayed")} <WhiteText>{stats["timePlayed"]}</WhiteText></p>
                    </BottomOfBox>
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
        weapons = props.stats.weapons.filter((item: {weaponName: string, accuracy: any, headshots: any}) => {
            if (typeof item.accuracy == "string" && typeof item.headshots == "string") {
                item.accuracy = parseInt(item.accuracy.replace("%", ""))
                item.headshots = parseInt(item.headshots.replace("%", ""))
            }
            return item.weaponName.toLowerCase().includes(searchTerm.toLowerCase());
        });
        weapons = weapons.sort(dynamicSort(sortType))
    }
    return (
        <Spacing>
            <Align>
                <Title>{t("stats.weapons")}</Title>
                <SmallSearchBox placeholder={t("stats.searchWeapon")} value={searchTerm} onChange={(ev: React.ChangeEvent<HTMLInputElement>):
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
                    {weapons.map((key: any, index: number) => {
                        return (
                            <Column key={index}>
                                <Row><h4>{key.weaponName}</h4><WeaponImage src={key.image}/></Row>
                                <Row><h4>{key.type}</h4><Description>{t("stats.rows.type")}</Description></Row>
                                <Row><h4>{key.kills}</h4><Description>{t("stats.rows.kills")}</Description></Row>
                                <Row><h4>{key.killsPerMinute}</h4><Description>{t("stats.rows.kpm")}</Description></Row>
                                <Row><h4>{key.accuracy}%</h4><Description>{t("stats.rows.accuracy")}</Description></Row>
                                <Row><h4>{key.headshots}%</h4><Description>{t("stats.rows.headshots")}</Description></Row>
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
                <SmallSearchBox placeholder={t("stats.searchVehicle")} value={searchTerm} onChange={(ev: React.ChangeEvent<HTMLInputElement>):
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
                    {vehicles.map((key: any, index: number) => {
                        return (
                            <Column key={index}>
                                <Row><h4>{key.vehicleName}</h4><WeaponImage src={key.image}/></Row>
                                <Row><h4>{key.type}</h4><Description>{t("stats.rows.type")}</Description></Row>
                                <Row><h4>{key.kills}</h4><Description>{t("stats.rows.kills")}</Description></Row>
                                <Row><h4>{key.killsPerMinute}</h4><Description>{t("stats.rows.kpm")}</Description></Row>
                                <Row><h4>{key.destroyed}</h4><Description>{t("stats.rows.destroyed")}</Description></Row>
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

const InvisableRadioButton = styled.input.attrs({ type: 'radio' })`
    opacity: 0;
    position: fixed;
    width: 0;
`

export const Radio = styled.div` // for next-row
    margin-bottom: 1rem;
    height: 35px;
`

export const SmallButtonRadio = styled.label`
    ${M96}
    background: #1E2132;
    color: var(--color-text);
    border: none;
    margin-bottom: 1rem;
    border-radius: 5px;
    padding: .5rem 1.5rem;
    margin-right: 1rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    font-family: Manrope;
    font-weight: medium;
    font-style: normal;
`

export const UncheckedSmallButtonRadio = styled.label`
    ${M96}
    color: var(--color-text);
    border: none;
    margin-bottom: 1rem;
    border-radius: 5px;
    padding: .5rem 1.5rem;
    margin-right: 1rem;
    font-family: Manrope;
    font-weight: medium;
    font-style: normal;
`

type TParams = { plat: string, type: string, eaid: string}

function Stats({ match }: RouteComponentProps<TParams>) {
    const [game, setGame] = React.useState<string>(platformGames[match.params.plat][0]);
    
    const { t } = useTranslation();
    const { isLoading: loading, isError: error, data: stats } = useQuery("stats" + game + match.params.eaid, () => GetStats.stats(
        {game: game, type: "all", getter: match.params.type, userName: match.params.eaid, lang: getLanguage()}
    ))
    const games = platformGames[match.params.plat];
    return (
    <Container>
        <div>
            <Back to="/stats"><ArrowLeft/>{t("stats.back")}</Back>
        </div>
        <ViewOrigin game={game} loading={loading} stats={stats} error={error}/>
        <Align onChange={(ev: React.ChangeEvent<HTMLInputElement>):
                    void => setGame(ev.target.value)}>
            {games.map((key: string, index: number) => {
                return (
                    <Radio key={index}><InvisableRadioButton id={key} value={key} name="game" defaultChecked={game === key}/>
                        {(game===key)?<SmallButtonRadio htmlFor={key}>{t(`games.${key}`)}</SmallButtonRadio>:
                        <UncheckedSmallButtonRadio htmlFor={key}>{t(`games.${key}`)}</UncheckedSmallButtonRadio>}
                    </Radio>
                )
            })}
        </Align>
        <ViewStats game={game} loading={loading} stats={stats} error={error}/>
        <ViewWeapons game={game} loading={loading} stats={stats} error={error}/>
        <ViewVehicles game={game} loading={loading} stats={stats} error={error}/>
        
    </Container>
    )
}

export default Stats;
