import '../../locales/config';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";

const Background = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: #00000015;
`

const Section = styled.div`
    position: relative;
    left: 8.33%;
    display: flex;
    flex-wrap: nowrap;
    max-width: 80%;
`

const Text = styled.div`
    max-width: 60%; 
    margin-right: 10rem;
`

const Links = styled.div`

`

function FLink(props) {
    return (
        <p>
            <a href={props.href}>{props.name}</a>
        </p>
    )
}

export function Footer() {
    const { t, i18n } = useTranslation();
    const urls = [
        "https://github.com/Community-network",
        "https://api.gametools.network/",
        "https://discord.gametools.network/",
        "",
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
                    <h1>{t("siteName")}</h1>
                    {description.map((key, index) => {
                        return (
                            <p key={index} >{key}</p>
                        )
                    })}
                </Text>
                <Links>
                    <h1>Links</h1>
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