import * as React from "react";
import "../../locales/config";
import { Link, useHistory, withRouter, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../assets/scss/App.scss";
import { GetStats } from "../../api/GetStats";
import { useQuery } from "react-query";
import {
  AltText,
  SearchBox,
  Back,
  ArrowLeft,
  Container,
  BigSelectSecondary,
  Align,
  AlignW,
  Box,
} from "../Materials";
import { getLanguage } from "../../locales/config";
import { frostbite3 } from "../../api/static";

const Description = styled.p`
  ${AltText}
`;

const AltDescription = styled.p`
  ${AltText}
  margin-left: 24px;
`;

const Title = styled.h2`
  margin-top: 2rem;
`;

interface IServerImage {
  background: string;
}

const ServerImage = styled.div<IServerImage>`
  margin-top: 12px;
  height: 4rem;
  min-width: 7rem;
  margin-right: 1.5rem;
  border-radius: 2px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("${(props) => props.background}");
`;

const Blur = styled.div`
  height: 100%;
  flex-grow: 3;
  border-radius: 2px;
  background: radial-gradient(
    100% 100% at 50% 50%,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.48) 100%
  );
`;

const ServerText = styled.h1`
  font-size: 1.8rem;
  text-align: center;
  padding-top: 2rem;
  line-height: 0;
  margin-top: 0;
`;

const ServerInfo = styled.div`
  margin-top: 16px;
`;

const Spacing = styled.div`
  margin-bottom: 2rem;
`;

interface Views {
  loading: boolean;
  error: boolean;
  game: string;
  stats: { [name: string]: any };
}

function Results(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.stats;
  const ConditionalLink = ({ children, to, condition }) =>
    !!condition && to ? <Link to={to}>{children}</Link> : <>{children}</>;

  if (!props.loading && !props.error) {
    if (stats.servers.length == 0) {
      return (
        <Spacing>
          <Description>{t("resultNotFound")}</Description>
        </Spacing>
      );
    }
    return (
      <Spacing>
        {stats.servers.map((key: any, index: number) => {
          let queue: number = undefined;
          queue = key.inQue;
          let queueString = "";
          if (queue !== undefined && queue !== 0) {
            queueString = `[${queue}]`;
          }
          let region: string = undefined;
          if (key.region !== undefined) {
            region = ` - ${t(`regions.${key.region.toLowerCase()}`)}`;
          }
          let officialString = "";
          if (key.official !== undefined) {
            officialString = key.official ? " - Official" : " - Custom";
          }
          return (
            <ConditionalLink
              to={`/servers/${props.game}/gameid/${key.gameId}/${key.platform}`}
              condition={
                props.game === "bf1" ||
                props.game === "bf3" ||
                (props.game === "bf4" && key.platform == "pc")
              }
              key={index}
            >
              <Box>
                <AlignW>
                  <div>
                    <ServerImage background={key.url}>
                      <Blur>
                        <ServerText>{key.smallMode}</ServerText>
                      </Blur>
                    </ServerImage>
                  </div>
                  <ServerInfo>
                    <h3>
                      {key.server}
                      {key.prefix}
                    </h3>
                    <p>
                      {key.playerAmount}/{key.maxPlayers}
                      {key.maxPlayerAmount} {queueString} - {key.mode}
                      {key.mode === undefined ? key.map : null}
                      {officialString}
                      {region}
                    </p>
                  </ServerInfo>
                </AlignW>
              </Box>
            </ConditionalLink>
          );
        })}
      </Spacing>
    );
  } else {
    return (
      <Box>
        <h3>{t("loading")}</h3>
      </Box>
    );
  }
}

function Search(): React.ReactElement {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [gameName, setGameName] = React.useState<string>("bf1");
  const [region, setRegion] = React.useState<string>("all");
  const [platform, setPlatform] = React.useState<string>("pc");
  const history = useHistory();
  // get info from query ?search &game
  const query = new URLSearchParams(useLocation().search);
  const nameQuery = query.get("search");
  const gameQuery = query.get("game");
  const regionQuery = query.get("region");
  const platformQuery = query.get("platform");
  React.useState(() => {
    if (nameQuery !== null) {
      setSearchTerm(nameQuery);
    }
    if (gameQuery !== null) {
      setGameName(gameQuery);
    }
    if (regionQuery !== null) {
      setRegion(regionQuery);
    }
    if (platformQuery !== null) {
      setPlatform(platformQuery);
    }
  });

  // change top to query
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.append("search", searchTerm);
    } else {
      params.delete("search");
    }
    if (gameName) {
      params.append("game", gameName);
    } else {
      params.delete("game");
    }
    if (region) {
      params.append("region", region);
    } else {
      params.delete("region");
    }
    if (platform) {
      params.append("platform", platform);
    } else {
      params.delete("platform");
    }
    history.push({ search: params.toString() });
  }, [searchTerm, gameName, region, platform, history]);

  const { t } = useTranslation();
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery("servers" + gameName + searchTerm + region + platform, () =>
    GetStats.server({
      game: gameName,
      type: "servers",
      getter: "name",
      serverName: searchTerm,
      lang: getLanguage(),
      region: region,
      platform: platform,
    }),
  );
  return (
    <Container>
      <Back to="/">
        <ArrowLeft />
        {t("serverSearch.back")}
      </Back>
      <Align>
        <h2>{t("serverSearch.serverInfo")}</h2>
        <AltDescription>{t("serverSearch.description")}</AltDescription>
      </Align>
      <Align>
        <SearchBox
          placeholder={t("serverSearch.searchPlaceholder")}
          value={searchTerm}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setSearchTerm(ev.target.value)
          }
        />
        <BigSelectSecondary
          value={gameName}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setGameName(ev.target.value)
          }
        >
          <option value="bf1">{t("games.bf1")}</option>
          <option value="bf2.bf2hub">{t("games.bf2.bf2hub")}</option>
          <option value="bf2.playbf2">{t("games.bf2.playbf2")}</option>
          <option value="bfbc2">{t("games.bfbc2")}</option>
          <option value="bf2142">{t("games.bf2142")}</option>
          <option value="bf1942">{t("games.bf1942")}</option>
          <option value="bfvietnam">{t("games.bfvietnam")}</option>
          <option value="bf3">{t("games.bf3")}</option>
          <option value="bf4">{t("games.bf4")}</option>
          <option value="bfh">{t("games.bfh")}</option>
          <option value="bfv">{t("games.bfv")}</option>
        </BigSelectSecondary>
        <BigSelectSecondary
          disabled={!frostbite3.includes(gameName)}
          value={region}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setRegion(ev.target.value)
          }
        >
          <option value="all">{t("regions.all")}</option>
          <option value="eu">{t("regions.eu")}</option>
          <option value="asia">{t("regions.asia")}</option>
          <option value="nam">{t("regions.nam")}</option>
          <option value="sam">{t("regions.sam")}</option>
          <option value="au">{t("regions.au")}</option>
          <option value="oc">{t("regions.oc")}</option>
        </BigSelectSecondary>
        <BigSelectSecondary
          disabled={!frostbite3.includes(gameName)}
          value={platform}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setPlatform(ev.target.value)
          }
        >
          <option value="pc">{t("platforms.pc")}</option>
          <option value="ps4">{t("platforms.ps4")}</option>
          <option value="xboxone">{t("platforms.xboxone")}</option>
        </BigSelectSecondary>
        {/* <BigButtonSecondary type="submit">{t("serverSearch.search")} <RightArrow/></BigButtonSecondary> */}
      </Align>
      <Title>{t("serverSearch.results")}</Title>
      <Results game={gameName} loading={loading} stats={stats} error={error} />
    </Container>
  );
}

export default withRouter(Search);
