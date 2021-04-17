import '../../locales/config';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import background from '../../assets/img/bfv-thelasttiger-2-extra.jpg';

const Image = styled.div`
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('${background}');
`

const Blur = styled.div`
    height: 100vh;
    background: radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4872) 100%);
`

const Welcome = styled.div`
    position: absolute;
    bottom: 20%;
    padding-left: 8.33%;
    max-width: 25em;
`

const Gamestats = styled.div`

`

const Faq = styled.div`
    padding-top: 1rem;
    padding-bottom: 5rem;
    padding-left: 8.33%;
`

const FaqSection = styled.div`
    padding-top: 0.25rem;
`

const WelcomeHeader = styled.h1`
    font-size: 48px;
`

function Home() {
    const { t, i18n } = useTranslation();
    let i = 0;
    let faqItems = []
    while (i18n.exists(`home.faq.${i}`)) {
        faqItems.push({question:t(`home.faq.${i}.question`), answer:t(`home.faq.${i}.answer`)})
        i+=1
    }
    return (
        <div>
            <Image>
                <Blur>
                    <Welcome>
                        <WelcomeHeader>{t("siteName")}</WelcomeHeader>
                        <p>{t("siteDescription")}</p>
                    </Welcome>
                </Blur>
            </Image>
            <Faq>
                <h1>{t("home.faq.header")}</h1>
                {faqItems.map((key, index) => {
                    return (
                        <FaqSection key={index}>
                            <p>{key.question}</p>
                            <p>{key.answer}</p>
                        </FaqSection>
                    )
                })}
            </Faq>
        </div>
    )
}

export default Home;