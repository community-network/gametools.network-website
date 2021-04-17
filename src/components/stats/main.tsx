import { RouteComponentProps } from "react-router-dom";
import '../../locales/config';
import { useTranslation } from 'react-i18next';

type TParams = { plat: string, eaid: string, game: string }

function Stats({ match }: RouteComponentProps<TParams>) {
    const { t } = useTranslation();
    return (
    <div>
        {match.params.plat}
        {match.params.eaid}
        {match.params.game}
    </div>
    )
}

export default Stats;