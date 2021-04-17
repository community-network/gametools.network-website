import { Link  } from "react-router-dom";
import '../../locales/config';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import { M88, AltText } from '../Materials';

const Container = styled.div`
    padding-left: 8.33%;
`

const ArrowLeft = styled.i`
    border: solid white;
    border-width: 0 1.8px 1.8px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
`

const Back = styled(Link)`
    ${M88}
`

const SearchHead = styled.div`
    display: flex;
`

function Search() {
    const getLanguage = () => window.localStorage.i18nextLng.toLowerCase()
    const { t, i18n } = useTranslation();
    return (
    <Container>
        <Back to="/"><ArrowLeft/>{t("search.back")}</Back>
        <SearchHead>
            <h1>{t("search.bfStats")}</h1>
            <p>{t("search.description")}</p>
        </SearchHead>
    </Container>
    )
}

export default Search;
