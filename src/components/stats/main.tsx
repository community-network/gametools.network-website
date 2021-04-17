import { RouteComponentProps } from "react-router-dom";
import '../../locales/config';
import { useTranslation } from 'react-i18next';
import { GetStats } from "../../api/GetStats"
import { useQuery, useQueryClient, useMutation } from 'react-query';

type TParams = { plat: string, eaid: string, game: string }

function Stats({ match }: RouteComponentProps<TParams>) {
    const getLanguage = () => window.localStorage.i18nextLng
    const { t } = useTranslation();
    const request = {game: match.params.game, userName: match.params.eaid, lang: getLanguage()}
    const { isError: error, data: stats } = useQuery("stats" + request, () => GetStats.stats(request))
    console.log(stats)
    return (
    <div>
        {match.params.plat}
        {match.params.eaid}
        {match.params.game}
    </div>
    )
}

export default Stats;
