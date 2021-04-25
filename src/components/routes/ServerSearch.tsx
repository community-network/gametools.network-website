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
    const [gameName, setGameName] = React.useState<string>("pc");
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
                {searchTerm!==""?
                    <Link to={`/stats/${gameName}/${searchTerm}`}>
                        <BigButtonSecondary type="submit">{t("serverSearch.search")} <RightArrow/></BigButtonSecondary>
                    </Link>
                // if no name is filled in
                    :<BigButtonSecondary type="submit">{t("serverSearch.search")} <RightArrow/></BigButtonSecondary>
                }
            </form>
        </Align>
        <Title>{t("serverSearch.gameStatus")}</Title>
    </Container>
    )
}

export default Search;
