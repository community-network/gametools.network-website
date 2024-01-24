import * as React from "react";
import "../../../locales/config";
import { Link, useParams } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../../assets/scss/App.scss";
import {
  PlatoonPlayer,
  PlatoonStats,
  ServerList,
} from "../../../api/ReturnTypes";
import {
  bfbanPlayer,
  bfeacPlayer,
  GametoolsApi,
} from "../../../api/GametoolsApi";
import { useQuery } from "@tanstack/react-query";
import {
  AltText,
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
  BigButtonSecondaryBox,
  AlignSeverImg,
  PageRow,
  PageColumn,
  BackButton,
  SmallButton,
} from "../../Materials";
import { getLanguage } from "../../../locales/config";
import exportExcel from "../../functions/exportExcel";
import sslFix from "../../functions/fixEaAssets";
import useExternalScript from "../../functions/UseExternalScript";

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
  min-width: 3rem;
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
  bfbanLoading: boolean;
  bfbanError: boolean;
  bfeacList: bfeacPlayer;
  bfeacLoading: boolean;
  bfeacError: boolean;
}) {
  const { t } = useTranslation();

  const playerInfo = props.bfBanList?.personaids[props.playerId];
  const bfeac = props.bfeacList?.personaids?.includes(Number(props.playerId));
  let color = "#ffffff";

  if (playerInfo?.hacker || bfeac) {
    color = "#DC143C";
    return (
      <>
        <a style={{ color: color, lineHeight: 0 }}>{t("bfban.platoon")}: </a>
        {playerInfo?.hacker && (
          <a
            style={{ color: color, lineHeight: 0 }}
            href={playerInfo?.url}
            target="_blank"
            rel="noreferrer"
          >
            {t("bfban.main")}
          </a>
        )}
        {playerInfo?.hacker && bfeac && (
          <a style={{ color: color, lineHeight: 0 }}> - </a>
        )}
        {bfeac && (
          <a
            style={{ color: color, lineHeight: 0 }}
            href={`https://api.gametools.network/bfeac/get_case_id?player_id=${props.playerId}`}
            target="_blank"
            rel="noreferrer"
          >
            {t("bfeac.main")}
          </a>
        )}
      </>
    );
  }
  return <></>;
}

function SmallExportButton(props: { members: PlatoonPlayer[] }) {
  const externalScript =
    "https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.mini.min.js";
  const { t } = useTranslation();
  const state = useExternalScript(externalScript);
  return (
    <SmallButton
      style={{ marginLeft: "1rem" }}
      disabled={state !== "ready"}
      onClick={() => exportExcel({ members: props.members }, "platoon members")}
    >
      {state === "loading"
        ? t("loading")
        : state === "error"
          ? t("externalScriptError")
          : t("export")}
    </SmallButton>
  );
}

function Member(props: {
  platform: string;
  item: PlatoonPlayer;
  children?: React.ReactElement[] | React.ReactElement;
}): React.ReactElement {
  const { item, platform, children } = props;
  const { t } = useTranslation();

  const loadingStyle = { color: item?.id != "loading" ? "white" : "gray" };

  return (
    <div style={{ margin: "0.8rem 0.2rem" }}>
      <Column style={{ marginTop: 0 }}>
        <Row>
          <Link
            to={`/stats/${platform}/playerid/${item?.id}?game=bf1&name=${encodeURIComponent(
              item?.name,
            )}`}
          >
            <Align>
              <MemberImage src={sslFix(item?.avatar)} loading="lazy" />
              <h4 style={{ ...loadingStyle }}>
                <div>{item?.name}</div>
                <div>{children}</div>
              </h4>
            </Align>
          </Link>
        </Row>
        <SmallestPhoneRow>
          <h4 style={loadingStyle}>
            {item?.id != "loading"
              ? t(`platoon.members.${item?.role}`)
              : t("notApplicable")}
          </h4>
        </SmallestPhoneRow>
        <TabletRow>
          <ButtonLink
            style={{ marginTop: ".3rem", ...loadingStyle }}
            href={`https://gametools.network/stats/${platform}/playerid/${item?.id}?game=bf1&name=${encodeURIComponent(
              item?.name,
            )}`}
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
}

function Members(props: {
  members: PlatoonPlayer[];
  platform: string;
  loading: boolean;
}): React.ReactElement {
  const { t } = useTranslation();

  let members = [];
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortType, setSortType] = React.useState<string>("default");

  members = props.members?.filter((item: { name: string; role: string }) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  members = members?.sort(dynamicSort(sortType));

  const playerIds = members?.map((item: { id: string }) => {
    return item.id;
  });

  const {
    isLoading: bfbanLoading,
    isError: bfbanError,
    data: bfBanInfo,
  } = useQuery({
    queryKey: ["bfbanStatsPlatoon" + props.members],
    queryFn: () =>
      GametoolsApi.bfbanCheckPlayers({
        getter: "playerid",
        usernames: playerIds,
      }),
  });

  const {
    isLoading: bfeacLoading,
    isError: bfeacError,
    data: bfeacInfo,
  } = useQuery({
    queryKey: ["bfeacStatsServerPlayers" + props.members],
    queryFn: () =>
      GametoolsApi.bfeacCheckPlayers({
        playerIds,
      }),
  });

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
          <SmallExportButton members={members} />
        </AlignW>
      </Align>
      <Box>
        <div>
          {props.loading
            ? [...Array(6)].map((key) => (
                <Member
                  platform={props.platform}
                  item={{
                    id: "loading",
                    name: t("loading"),
                    role: "notApplicable",
                    avatar: "",
                  }}
                  key={key}
                />
              ))
            : members.map((key: PlatoonPlayer, index: number) => (
                <Member platform={props.platform} item={key} key={index}>
                  <CheckBan
                    playerId={key?.id}
                    bfBanList={bfBanInfo}
                    bfbanLoading={bfbanLoading}
                    bfbanError={bfbanError}
                    bfeacList={bfeacInfo}
                    bfeacLoading={bfeacLoading}
                    bfeacError={bfeacError}
                  />
                </Member>
              ))}
        </div>
      </Box>
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

const handleChildElementClick = (e: { stopPropagation: () => void }) => {
  e.stopPropagation();
  // Do other stuff here
};

function Servers(props: { servers: ServerList[] }): React.ReactElement {
  const { t } = useTranslation();
  const servers = props.servers;
  if (servers?.length <= 0) {
    return (
      <Spacing>
        <h2>{t("platoon.servers")}</h2>
        <Description>{t("resultNotFound")}</Description>
      </Spacing>
    );
  }
  return (
    <Spacing>
      <Align>
        <Title style={{ marginRight: "1rem" }}>{t("platoon.servers")}</Title>
        <p style={{ margin: 0, marginBottom: "1rem" }}>
          <Trans i18nKey="servers.joinme.info">
            <a href="https://joinme.click/download">
              https://joinme.click/download
            </a>
          </Trans>
        </p>
      </Align>
      {servers?.map((key: ServerList, index: number) => {
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
          officialString = key.official
            ? ` - ${t("serverType.official")}`
            : ` - ${t("serverType.custom")}`;
        }
        return (
          <Box
            className="box_hover"
            link={`/servers/bf1/gameid/${key.gameId}/${key.platform}`}
            condition={true}
            key={index}
          >
            <AlignSeverImg>
              <div>
                <ServerImage background={sslFix(key.url)}>
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
              <a
                onClick={(e) => handleChildElementClick(e)}
                href={`bf1://${key.gameId}`}
                style={{ alignSelf: "end" }}
              >
                <BigButtonSecondaryBox
                  style={{ marginBottom: ".6rem" }}
                  type="submit"
                >
                  {t("servers.join")}
                </BigButtonSecondaryBox>
              </a>
            </AlignSeverImg>
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
  document.title = `${t("siteFullName")} ${t("pageTitle.platoon")} | ${
    platoon?.name || t("loading")
  }`;

  if (props.error) {
    return (
      <>
        <h1>{t("platoon.notFound.main")}</h1>
        <p>{t("platoon.notFound.description")}</p>
      </>
    );
  } else {
    return (
      <div>
        <AlignPlatoonImg>
          <PlatoonImage background={platoon?.emblem} />
          <div style={{ marginLeft: "0.5rem" }}>
            <PlatoonTitle>
              {props.loading
                ? t("loading")
                : `[${platoon?.tag}] ${platoon?.name}`}
            </PlatoonTitle>
            <Description>{platoon?.currentSize || 0} / 100</Description>
            {platoon?.description ? (
              <Description>
                {platoon?.description.split(". ").map(function (
                  descPart: string,
                  idx: number,
                ) {
                  return (
                    <DescriptionPart key={idx}>{descPart}. </DescriptionPart>
                  );
                })}
              </Description>
            ) : (
              <Description>{t("notApplicable")}</Description>
            )}
          </div>
        </AlignPlatoonImg>
        <PageColumn>
          <PageRow>
            <Members
              loading={props.loading}
              platform={props?.platform}
              members={platoon?.members}
            />
          </PageRow>
          <PageRow>
            <Servers servers={platoon?.servers} />
          </PageRow>
        </PageColumn>
      </div>
    );
  }
}

function Platoon(): React.ReactElement {
  const params = useParams();
  const platoonId = params.gid;
  const platform = params.plat;

  const { t } = useTranslation();
  const {
    isLoading: loading,
    isError: error,
    data: platoon,
  } = useQuery({
    queryKey: ["detailed" + platoonId],
    queryFn: () =>
      GametoolsApi.platoon({
        id: platoonId,
        platform: platform,
        lang: getLanguage(),
      }),
  });
  return (
    <div>
      <Container>
        <BackButton text={t("platoon.back")} location="/platoons" />
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
