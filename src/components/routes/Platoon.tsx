import * as React from "react";
import "../../locales/config";
import { Link, RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../assets/scss/App.scss";
import { PlatoonPlayer, PlatoonStats, ServerList } from "../../api/ReturnTypes";
import { bfbanPlayer, GametoolsApi } from "../../api/GametoolsApi";
import { useQuery } from "react-query";
import {
  AltText,
  Back,
  ArrowLeft,
  Container,
  Align,
  AlignW,
  Box,
  Column,
  Row,
  SmallSearchBox,
  SelectPrimary,
  ButtonLink,
  TabletRow,
  SmallestPhoneRow,
} from "../Materials";
import { getLanguage } from "../../locales/config";

const Spacing = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  ${AltText}
  line-height: 1;
  margin: 0.4rem 0;
`;

const DescriptionPart = styled.p`
  ${AltText}
  line-height: 1;
  margin: 0.4rem 0;
`;

const Title = styled.h2`
  margin: 0 33px;
  padding-bottom: 1rem;
`;

const PlatoonTitle = styled.h2`
  @media (min-width: 600px) {
    margin-top: 2.2rem;
  }
  margin-bottom: 0.4rem;
`;

interface IPlatoonImage {
  background: string;
}

const PlatoonImage = styled.div<IPlatoonImage>`
  max-width: 13rem;
  height: 11rem;
  min-width: 11rem;
  display: flex;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("${(props) => props.background}");
  margin-top: 6px;
  border-radius: 10px;
`;

const MemberImage = styled.img`
  max-width: 8rem;
  max-height: 3rem;
  margin-right: 1.5rem;
`;

interface Views {
  loading: boolean;
  error: boolean;
  platform: string;
  platoon: PlatoonStats;
}

function dynamicSort(property: string) {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a: string, b: string): number {
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

function CheckBan(props: {
  playerId: string;
  bfBanList: bfbanPlayer;
  loading: boolean;
  error: boolean;
}) {
  const { t } = useTranslation();
  if (props.loading || props.error) {
    return <></>;
  }

  const playerInfo = props.bfBanList.personaids[props.playerId];
  let color = "#ffffff";

  if (props.playerId in props.bfBanList.personaids) {
    color = "#DC143C";
    return (
      <a
        style={{ color: color, lineHeight: 0 }}
        href={playerInfo.url}
        target="_blank"
        rel="noreferrer"
      >
        {playerInfo.hacker ? t("bfban.platoon") : ""}
      </a>
    );
  }
}

function Members(props: {
  members: PlatoonPlayer[];
  platform: string;
}): React.ReactElement {
  const { t } = useTranslation();
  const platform = props.platform;

  let members = [];
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortType, setSortType] = React.useState<string>("default");

  members = props.members.filter((item: { name: string; role: string }) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  members = members.sort(dynamicSort(sortType));

  const playerIds = members.map((item: { id: string }) => {
    return item.id;
  });
  const {
    isLoading: loading,
    isError: error,
    data: bfBanInfo,
  } = useQuery("bfbanStatsPlatoon" + props.members, () =>
    GametoolsApi.bfbanCheckPlayers({
      getter: "playerid",
      usernames: playerIds,
    }),
  );

  return (
    <Spacing>
      <Align>
        <Title>{t("platoon.members.main")}</Title>
        <AlignW>
          <SmallSearchBox
            placeholder={t("platoon.searchPlayer")}
            value={searchTerm}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setSearchTerm(ev.target.value)
            }
          />
          <SelectPrimary
            value={sortType}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setSortType(ev.target.value)
            }
          >
            <option value="default">{t("platoon.rows.role")}</option>
            <option value="name">{t("platoon.rows.name")}</option>
          </SelectPrimary>
        </AlignW>
      </Align>
      {members !== [] ? (
        <Box>
          <div>
            {members.map((key: PlatoonPlayer, index: number) => {
              return (
                <div key={index} style={{ margin: "0.8rem 0.2rem" }}>
                  <Column style={{ marginTop: 0 }}>
                    <Row>
                      <Link
                        to={`/stats/${platform}/playerid/${
                          key.id
                        }?game=bf1&name=${encodeURIComponent(key.name)}`}
                      >
                        <Align>
                          <MemberImage src={key.avatar} />
                          <h4 style={{ marginTop: "2px", marginBottom: 0 }}>
                            {key.name}
                            <CheckBan
                              playerId={key.id}
                              bfBanList={bfBanInfo}
                              loading={loading}
                              error={error}
                            />
                          </h4>
                        </Align>
                      </Link>
                    </Row>
                    <SmallestPhoneRow>
                      <h4>{t(`platoon.members.${key.role}`)}</h4>
                    </SmallestPhoneRow>
                    <TabletRow>
                      <ButtonLink
                        style={{ marginTop: ".3rem" }}
                        href={`https://gametools.network/stats/${platform}/playerid/${
                          key.id
                        }?game=bf1&name=${encodeURIComponent(key.name)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t("stats.view")}
                      </ButtonLink>
                    </TabletRow>
                  </Column>
                  <hr
                    style={{
                      marginTop: "0.6rem",
                      width: "98%",
                      border: "1px solid #282a3a",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </Box>
      ) : (
        <Box>
          <p>{t("loading")}</p>
        </Box>
      )}
    </Spacing>
  );
}

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

function Servers(props: { servers: ServerList[] }): React.ReactElement {
  const { t } = useTranslation();
  const servers = props.servers;
  if (servers.length == 0) {
    return (
      <Spacing>
        <h2>{t("platoon.servers")}</h2>
        <Description>{t("resultNotFound")}</Description>
      </Spacing>
    );
  }
  return (
    <Spacing>
      <Title>{t("platoon.servers")}</Title>
      {servers.map((key: ServerList, index: number) => {
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
          <Box
            className="box_hover"
            link={`/servers/bf1/gameid/${key.gameId}/${key.platform}`}
            condition={true}
            key={index}
          >
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
        );
      })}
    </Spacing>
  );
}

const AlignPlatoonImg = styled.div`
  @media (min-width: 600px) {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
`;

function Results(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const platoon = props.platoon;

  if (!props.loading && !props.error) {
    return (
      <div>
        <AlignPlatoonImg>
          <PlatoonImage background={platoon.emblem} />
          <div style={{ marginLeft: "0.5rem" }}>
            <PlatoonTitle>
              [{platoon.tag}] {platoon.name}
            </PlatoonTitle>
            <Description>{platoon.currentSize} / 100</Description>
            {platoon.description !== null ? (
              <Description>
                {platoon.description
                  .split(". ")
                  .map(function (descPart: string, idx: number) {
                    return (
                      <DescriptionPart key={idx}>{descPart}. </DescriptionPart>
                    );
                  })}
              </Description>
            ) : (
              <></>
            )}
          </div>
        </AlignPlatoonImg>
        <Members platform={props.platform} members={platoon.members} />
        <Servers servers={platoon.servers} />
      </div>
    );
  } else {
    return (
      <Box>
        <h3>{t("loading")}</h3>
      </Box>
    );
  }
}

type TParams = {
  gid: string;
  plat: string;
};

function Platoon({ match }: RouteComponentProps<TParams>): React.ReactElement {
  const platoonId = match.params.gid;
  const platform = match.params.plat;

  const { t } = useTranslation();
  const {
    isLoading: loading,
    isError: error,
    data: platoon,
  } = useQuery("detailed" + platoonId, () =>
    GametoolsApi.platoon({
      id: platoonId,
      platform: platform,
      lang: getLanguage(),
    }),
  );
  return (
    <div>
      <Container>
        <Back to="/platoons">
          <ArrowLeft />
          {t("platoon.back")}
        </Back>
        <Results
          loading={loading}
          platoon={platoon}
          platform={platform}
          error={error}
        />
      </Container>
    </div>
  );
}

export default Platoon;
