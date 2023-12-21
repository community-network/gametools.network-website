import * as React from "react";
import "../../locales/config";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { AlignT, M88 } from "../Materials";
import LanguageSelector from "../../locales/ChangeLanguage";
import AdsComponent, { AdSwitch, AdsEnabled } from "../Ads";

interface FLinkProp {
  href: string;
  name: string;
}

const Background = styled.footer`
  ${M88}
  padding-top: 2rem;
  padding-bottom: 1rem;
  background-color: #00000010;
  margin-bottom: 3rem;
`;

const AdSection = styled.div`
  @media (min-width: 850px) {
    padding-left: 8.33%;
  }
  @media (max-width: 850px) {
    padding-left: 3%;
  }
  margin-bottom: 1rem;
`;

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
`;

const TextGrayP = styled.p`
  ${M88}
  white-space: pre-line;
  color: var(--color-alt-text);
`;

const Text = styled.div`
  @media (min-width: 920px) {
    margin-right: 8rem;
    max-width: 55%;
  }
  margin-bottom: 1.5rem;
`;

const Links = styled.div``;

const TextLink = styled.a`
  color: rgba(255, 255, 255, 0.68);
  text-decoration: none;
  font-weight: bold;
`;

function FLink(props: FLinkProp) {
  return (
    <p>
      <TextLink href={props.href}>{props.name}</TextLink>
    </p>
  );
}

export function Footer(): JSX.Element {
  const { t, i18n } = useTranslation();
  let i = 0;
  const footerLinks = [];
  while (i18n.exists(`footer.links.${i}`)) {
    footerLinks.push({
      header: t(`footer.links.${i}.header`),
      url: t(`footer.links.${i}.url`),
    });
    i += 1;
  }

  return (
    <Background role="contentinfo">
      {AdsEnabled() && (
        <AdSection>
          <h3 className="adv-label" style={{ marginBottom: ".8rem" }}>
            {t("ads.main")}
          </h3>
          <AdsComponent
            dataAdSlot="8911547346"
            style={{ display: "block", height: "80px" }}
          />
        </AdSection>
      )}
      <Section>
        <Text>
          <h3>{t("siteFullName")}</h3>
          <TextGrayP>{t("footer.description")}</TextGrayP>
          <AlignT>
            <LanguageSelector />
            <iframe
              src="https://github.com/sponsors/community-network/button"
              title="Sponsor community-network"
              height="35"
              width="116"
              style={{ border: 0, marginLeft: ".5rem" }}
              loading="lazy"
            />
            <a
              href="https://www.buymeacoffee.com/Gametools"
              style={{ marginLeft: ".5rem" }}
              aria-label="Support us on buy me a coffee button"
            >
              <img
                alt="Support us on buy me a coffee"
                height="32"
                width="121.6"
                src="https://img.buymeacoffee.com/button-api/?text=Support us&emoji=❤️&slug=Gametools&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff"
                loading="lazy"
              />
            </a>
            <AdSwitch />
          </AlignT>
        </Text>
        <Links>
          <h3>{t("footer.LinkName")}</h3>
          {footerLinks.map((key, index) => {
            return <FLink key={index} href={key.url} name={key.header} />;
          })}
        </Links>
      </Section>
    </Background>
  );
}
