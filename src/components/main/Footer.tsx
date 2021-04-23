import '../../locales/config';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import { M88, AltText } from '../Materials';
import LanguageSelector from "../../locales/ChangeLanguage"

interface FLinkProp {
    href: string,
    name: string
}

const Background = styled.div`
    ${M88}
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: #00000010;
`

const Section = styled.div`
    position: relative;
    @media (min-width: 850px) {
        padding-left: 8.33%;
    }
    @media (max-width: 850px) {
        padding-left: 3%;
    }
    display: flex;
    flex-wrap: wrap;
    max-width: 80%;
`

const TextGrayP = styled.p`
    color: rgba(255, 255, 255, 0.68);
`

const Text = styled.div`
    @media (min-width: 920px) {
        margin-right: 8rem;
        max-width: 60%; 
    }
    margin-bottom: 1.5rem;
`

const Links = styled.div`

`

const TextLink = styled.a`
    color: rgba(255, 255, 255, 0.68);
    text-decoration: none;
    font-weight: bold;
`

function FLink(props: FLinkProp) {
    return (
        <p>
            <TextLink href={props.href}>{props.name}</TextLink>
        </p>
    )
}

export function Footer() {
    const { t, i18n } = useTranslation();
    const urls = [
        "https://github.com/Community-network",
        "https://api.gametools.network/",
        "https://discord.gametools.network/",
        "/privacy/",
        "https://top.gg/bot/714524944783900794"
    ]

    let i = 0;
    let description = []
    while (i18n.exists(`footer.descriptions.${i}`)) {
        description.push(t(`footer.descriptions.${i}`))
        i+=1
    }
    
    return (
        <Background>
            <Section>
                <Text>
                    <h3>{t("siteName")}</h3>
                    {description.map((key, index) => {
                        return (
                            <TextGrayP key={index} >{key}</TextGrayP>
                        )
                    })}
                    <LanguageSelector />
                </Text>
                <Links>
                    <h3>Links</h3>
                    {urls.map((key, index) => {
                        return (
                            <FLink key={index} href={key} name={t(`footer.links.${index}`)}/>
                        )
                    })}
                </Links>
            </Section>
        </Background>
    )
}