import '../../locales/config';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import background from '../../assets/img/bfv-thelasttiger-2-extra.jpg';

const Front = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    min-width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    background-image: url('${background}');
`

function Home() {
    const { t } = useTranslation();
    return (
        <div>
            <Front>
            </Front>
        </div>
    )
}

export default Home;