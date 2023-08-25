import * as React from "react";
import "../../locales/config";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { AlignT, M88 } from "../Materials";
import LanguageSelector from "../../locales/ChangeLanguage";

interface FLinkProp {
  href: string;
  name: string;
}

const Background = styled.footer`
  ${M88}
  padding-top: 2rem;
  padding-bottom: 1rem;
  background-color: #00000010;
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
    <Background>
      <Section>
        <Text>
          <h3>{t("siteFullName")}</h3>
          <TextGrayP>{t("footer.description")}</TextGrayP>
          <AlignT>
            <LanguageSelector />
            <a
              href="https://ko-fi.com/I3I8OL4BV"
              target="_blank"
              rel="noreferrer"
            >
              <img
                height="36"
                style={{
                  border: "0px",
                  height: "36px",
                  marginTop: "-2px",
                  marginLeft: ".5rem",
                }}
                src="https://storage.ko-fi.com/cdn/kofi5.png?v=3"
                border="0"
                alt="Buy Me a Coffee at ko-fi.com"
              />
            </a>
            <iframe
              src="https://github.com/sponsors/community-network/button"
              title="Sponsor community-network"
              height="35"
              width="116"
              style={{ border: 0, marginLeft: ".5rem" }}
              loading="lazy"
            />
          </AlignT>
        </Text>
        <Links>
          <h3>Links</h3>
          {footerLinks.map((key, index) => {
            return <FLink key={index} href={key.url} name={key.header} />;
          })}
        </Links>
      </Section>
    </Background>
  );
}
