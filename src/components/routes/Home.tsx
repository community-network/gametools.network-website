import '../../locales/config';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import background from '../../assets/img/bfv-thelasttiger-2-extra.png';
import { M88, AltText, Box, Container, Align, PrimaryButtonLink } from '../Materials';

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
    max-width: 40em;
`

const Gamestats = styled.div`

`

const Faq = styled.div`
    ${M88}
    padding-top: 1rem;
    padding-bottom: 5rem;
`

const FaqSection = styled.div`
    padding-top: 0.25rem;
`

const OurToolsSection = styled.div`
    margin-top: 2rem;
`

const WelcomeHeader = styled.h1`
    font-size: 48px;
`

const WelcomeText = styled.p`
    ${AltText}
    font-size: 18px;
`

function Home() {
    const { t, i18n } = useTranslation();
    let i = 0;
    let faqItems = []
    while (i18n.exists(`home.faq.${i}`)) {
        faqItems.push({question:t(`home.faq.${i}.question`), answer:t(`home.faq.${i}.answer`)})
        i+=1
    }
    
    i = 0;
    let hostedAtItems = []
    while (i18n.exists(`home.hostedAt.${i}`)) {
        let b = 0
        let bodies = []
        while (i18n.exists(`home.hostedAt.${i}.${b}`)) {
            bodies.push(t(`home.hostedAt.${i}.${b}`))
            b += 1
        }
        hostedAtItems.push(
            {header:t(`home.hostedAt.${i}.header`), 
            link:t(`home.hostedAt.${i}.link`), 
            url:t(`home.hostedAt.${i}.url`),
            bodies: bodies})
        i+=1
    }

    i = 0;
    let ourSolutions = []
    while (i18n.exists(`home.ourSolutions.${i}`)) {
        let b = 0
        let bodies = []
        while (i18n.exists(`home.ourSolutions.${i}.${b}`)) {
            bodies.push(t(`home.ourSolutions.${i}.${b}`))
            b += 1
        }
        ourSolutions.push(
            {header:t(`home.ourSolutions.${i}.header`), 
            link:t(`home.ourSolutions.${i}.link`), 
            url:t(`home.ourSolutions.${i}.url`),
            bodies: bodies})
        i+=1
    }
    return (
        <div>
            <Image>
                <Blur>
                    <Welcome>
                        <WelcomeHeader>{t("siteName")}</WelcomeHeader>
                        <WelcomeText>{t("siteDescription")}</WelcomeText>
                    </Welcome>
                </Blur>
            </Image>
            <Container>
                <h2 style={{margin: "24px 0 24px 24px"}}>{t("home.hostedAt.header")}</h2>
                <Align>
                    {hostedAtItems.map((key, index) => {
                        return (
                            <Box key={index}>
                                <h3>{key.header}</h3>
                                {key.bodies.map((key, index) => {
                                    return <p key={index}>{key}</p>
                                })}
                                <br></br>
                                <PrimaryButtonLink target="_blank" href={key.url}>{key.link}</PrimaryButtonLink>
                            </Box>
                        )
                    })}
                </Align>
                <h2 style={{margin: "24px 0 24px 24px"}}>{t("home.ourSolutions.header")}</h2>
                <Align>
                    {ourSolutions.map((key, index) => {
                        return (
                            <Box key={index}>
                                <h3>{key.header}</h3>
                                {key.bodies.map((key, index) => {
                                    return <p key={index}>{key}</p>
                                })}
                                <br></br>
                                <PrimaryButtonLink target="_blank" href={key.url}>{key.link}</PrimaryButtonLink>
                            </Box>
                        )
                    })}
                </Align>
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
            </Container>
        </div>
    )
}

export default Home;