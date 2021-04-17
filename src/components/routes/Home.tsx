import '../../locales/config';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import background from '../../assets/img/bfv-thelasttiger-2-extra.jpg';

const Front = styled.div`
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('${background}');
`

const Faq = styled.div`
    position: relative;
    top: 100%;
    left: 8.33%;
`

const FaqSection = styled.div`
    padding-bottom: 0.5rem;
`

function Home() {
    const { t } = useTranslation();
    return (
        <div>
            <Front>
            </Front>
            <Faq>
                <h1>FAQ</h1>
                <FaqSection>
                    <p>Q: Can I use your API?</p>
                    <p>A: Yes, you can. We provide free API without any limitation.</p>
                </FaqSection>
                <FaqSection>
                    <p>Q: You have a Discord bot, but can I make my own?</p>
                    <p>A: We provide great bot for Discord, but if you want to write your own - be free to do so with APIs.</p>
                </FaqSection>
                <FaqSection>
                    <p>Q: Which games are available?</p>
                    <p>A: Our website and API support most of Battlefield games including V, 1, 4, HL, 3 and 2. The Discord bot exclusively support some other games like Division or Destiny 2.</p>
                </FaqSection>
                <FaqSection>
                    <p>Q: Did you use to BF tracker to build it?</p>
                    <p>A: No. We provide independent services.</p>
                </FaqSection>
                <FaqSection>
                    <p>Q: I found an issue or want to suggest changes on the website, where do I need to post it?</p>
                    <p>A: Use our GitHub to post any issues and suggestions.</p>
                </FaqSection>
                <FaqSection>
                    <p>Q: Where to post issues and feature requests for Bot?</p>
                    <p>A: For Bot & API use our Discord.</p>
                </FaqSection>

            </Faq>
        </div>
    )
}

export default Home;