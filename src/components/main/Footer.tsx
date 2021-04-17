import '../../locales/config';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";

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

function Link(props) {
    return (
        <p>
            <a href={props.href}>{props.name}</a>
        </p>
    )
}

export function Footer() {
    const { t } = useTranslation();
    return (
        <Section>
            <Text>
                <h1>Game Tools</h1>
                <p>Website is part of the Community Network.
                    Product is Open Source.
                    You can post issues and suggest new code in our GitHub repository.
                    API provided by Community Network and open for public usage.
                    We don’t provide any third-party API.
                    Our backend closed and restricted for public view.
                    </p>
                <p>Battlefield & Origin are registered trademark of Electronic Arts.
                    This website uses data provided pursuant to Electronic Arts’ Battlefield 1 Stats Terms.
                    Trademarks are the property of their respective owners. Game materials copyright Electronic Arts Inc.
                    Electronic Arts has not endorsed and is not responsible for this site or its content.
                    </p>
                <p>Code is under GPL v2 License.
                    Some parts are under Community Network copyright.
                    </p>
            </Text>
            <Links>
                <h1>Links</h1>
                <Link href="https://github.com/Community-network" name="GitHub repository"/>
                <Link href="https://api.gametools.network/" name="Open API"/>
                <Link href="https://discord.gametools.network/" name="Community Network Discord"/>
                <Link href="" name="Privacy Policy"/>
                <Link href="https://top.gg/bot/714524944783900794" name="Discord bot"/>
            </Links>
        </Section>
    )
}