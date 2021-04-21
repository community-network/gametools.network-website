import * as React from "react";
import { Link  } from "react-router-dom";
import '../../locales/config';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import "../../assets/scss/App.scss";
import { M88, AltText, SearchBox, BigButtonSecondary, RightArrow, Back, ArrowLeft, Container, BigSelectSecondary, Align } from '../Materials';

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

function Search() {
    const getLanguage = () => window.localStorage.i18nextLng.toLowerCase()
    const { t, i18n } = useTranslation();

    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [platform, setPlatform] = React.useState<string>("pc");
    return (
    <Container>
        <Back to="/"><ArrowLeft/>{t("search.back")}</Back>
        <Align>
            <h2>{t("search.bfStats")}</h2>
            <AltDescription>{t("search.description")}</AltDescription>
        </Align>
        <Align>
            <form>
                <SearchBox placeholder={t("search.searchPlaceholder")} value={searchTerm} onChange={(ev: React.ChangeEvent<HTMLInputElement>):
                    void => setSearchTerm(ev.target.value)}/>
                <BigSelectSecondary value={platform} onChange={(ev: React.ChangeEvent<HTMLSelectElement>):
                        void => setPlatform(ev.target.value)}>
                    <option value="pc">PC</option>
                    <option value="xboxone">XBOX ONE</option>
                    <option value="xbox360">XBOX 360</option>
                    <option value="ps4">PS4</option>
                    <option value="ps3">PS3</option>
                </BigSelectSecondary>
                {searchTerm!==""?
                    <Link to={`/stats/${platform}/${searchTerm}`}>
                        <BigButtonSecondary type="submit">{t("search.search")} <RightArrow/></BigButtonSecondary>
                    </Link>
                // if no name is filled in
                    :<BigButtonSecondary type="submit">{t("search.search")} <RightArrow/></BigButtonSecondary>
                }
            </form>
        </Align>
        <Title>{t("search.gameStatus")}</Title>
        <Description>{t("search.statusDescription")}</Description>
    </Container>
    )
}

export default Search;
