import { RouteComponentProps } from "react-router-dom";
import '../../locales/config';
import { useTranslation } from 'react-i18next';
import { GetStats } from "../../api/GetStats"
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { Back, ArrowLeft, Container, BigButtonSecondary } from '../Materials';

type TParams = { plat: string, eaid: string, game: string }

function Stats({ match }: RouteComponentProps<TParams>) {
    const getLanguage = () => window.localStorage.i18nextLng.toLowerCase()
    const { t, i18n } = useTranslation();
    const request = {game: match.params.game, userName: match.params.eaid, lang: getLanguage()}
    const { isError: error, data: stats } = useQuery("stats" + request, () => GetStats.stats(request))
    console.log(stats)
    return (
    <Container>
        <div>
            <Back to="/stats"><ArrowLeft/>{t("search.back")}</Back>
        </div>
        {/* <img src={stats.avatar}></img> */}
        
        <BigButtonSecondary>Battlefield 1</BigButtonSecondary>
        <button onClick={() => {i18n.changeLanguage("nl_NL")}}>DUTCH</button>
        {getLanguage()}
        {match.params.plat}
        {match.params.eaid}
        {match.params.game}
    </Container>
    )
}

export default Stats;
