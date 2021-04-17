import '../../locales/config';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import { M88, AltText, SearchBox, BigButtonSecondary, RightArrow, Back, ArrowLeft, Container } from '../Materials';

const Align = styled.div`
    display: flex;
    align-items: center;
`

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
    return (
    <Container>
        <Back to="/"><ArrowLeft/>{t("search.back")}</Back>
        <Align>
            <h2>{t("search.bfStats")}</h2>
            <AltDescription>{t("search.description")}</AltDescription>
        </Align>
        <Align>
            <SearchBox placeholder={t("search.searchPlaceholder")}/>
            <BigButtonSecondary>{t("search.search")} <RightArrow/></BigButtonSecondary>
        </Align>
        <Title>{t("search.gameStatus")}</Title>
        <Description>{t("search.statusDescription")}</Description>
    </Container>
    )
}

export default Search;
