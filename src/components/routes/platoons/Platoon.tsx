import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import {
  bfbanPlayer,
  bfeacPlayer,
  GametoolsApi,
} from "../../../api/GametoolsApi";
import {
  PlatoonPlayer,
  PlatoonStats,
  ServerList,
} from "../../../api/ReturnTypes";
import "../../../assets/scss/App.scss";
import "../../../locales/config";
import { getLanguage } from "../../../locales/config";
import exportExcel from "../../functions/exportExcel";
import sslFix from "../../functions/fixEaAssets";
import useExternalScript from "../../functions/UseExternalScript";
import { BackButton, Box, ConLink } from "../../Materials";
import * as styles from "./Platoon.module.scss";

interface Views {
  loading: boolean;
  error: boolean;
  platform: string;
  sidebar: boolean;
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
  return <>&nbsp;</>;
}

function SmallExportButton(props: { members: PlatoonPlayer[] }) {
  const externalScript =
    "https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.mini.min.js";
  const { t } = useTranslation();
  const state = useExternalScript(externalScript);
  return (
    <button
      className="smallButton"
      style={{ marginLeft: "1rem" }}
      disabled={state !== "ready"}
      onClick={() => exportExcel({ members: props.members }, "platoon members")}
    >
      {state === "loading"
        ? t("loading")
        : state === "error"
          ? t("externalScriptError")
          : t("export")}
    </button>
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
      <div className="column" style={{ marginTop: 0 }}>
        <div className="row">
          <Link
            to={`/stats/${platform}/playerid/${item?.id}?game=bf1&name=${encodeURIComponent(
              item?.name,
            )}`}
          >
            <div className="align">
              <img
                className={styles.memberImage}
                src={sslFix(
                  item?.avatar ||
                    "https://secure.download.dm.origin.com/production/avatar/prod/1/599/208x208.JPEG",
                )}
                loading="lazy"
              />
              <h4 style={{ marginBottom: 0, ...loadingStyle }}>
                <div>{item?.name}</div>
                <div>{children}</div>
              </h4>
            </div>
          </Link>
        </div>
        <div className="smallestPhoneRow">
          <h4 style={loadingStyle}>
            {item?.id != "loading"
              ? t(`platoon.members.${item?.role}`)
              : t("notApplicable")}
          </h4>
        </div>
        <div className="tabletRow">
          <a
            className="buttonLink"
            style={{ marginTop: ".3rem", ...loadingStyle }}
            href={`https://gametools.network/stats/${platform}/playerid/${item?.id}?game=bf1&name=${encodeURIComponent(
              item?.name,
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            {t("stats.view")}
          </a>
        </div>
      </div>
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
    <div className={styles.spacing}>
      <div className="align">
        <h2 className={styles.title}>{t("platoon.members.main")}</h2>
        <div className="alignW">
          <input
            className="smallSearchBox"
            placeholder={t("platoon.searchPlayer")}
            value={searchTerm}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setSearchTerm(ev.target.value)
            }
          />
          <select
            aria-label={t("ariaLabels.sort")}
            className="selectPrimary"
            value={sortType}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setSortType(ev.target.value)
            }
          >
            <option value="default">{t("platoon.rows.role")}</option>
            <option value="name">{t("platoon.rows.name")}</option>
          </select>
          <SmallExportButton members={members} />
        </div>
      </div>
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
                >
                  <>&nbsp;</>
                </Member>
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
    </div>
  );
}

const handleChildElementClick = (e: { stopPropagation: () => void }) => {
  e.stopPropagation();
  // Do other stuff here
};

function Servers(props: { servers: ServerList[] }): React.ReactElement {
  const { t } = useTranslation();
  const servers = props.servers;
  if (servers?.length <= 0) {
    return (
      <div className={styles.spacing}>
        <h2>{t("platoon.servers")}</h2>
        <p className={styles.description}>{t("resultNotFound")}</p>
      </div>
    );
  }
  return (
    <div className={styles.spacing}>
      <div className="align">
        <h2 className={styles.title} style={{ marginRight: "1rem" }}>
          {t("platoon.servers")}
        </h2>
        <p style={{ margin: 0, marginBottom: "1rem" }}>
          <Trans i18nKey="servers.joinme.info">
            <a href="https://joinme.click/download">
              https://joinme.click/download
            </a>
          </Trans>
        </p>
      </div>
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
            <div className="alignServerImg">
              <div>
                <div
                  className={styles.serverImage}
                  style={{ backgroundImage: `url("${sslFix(key.url)}")` }}
                >
                  <div className={styles.blur}>
                    <h1 className={styles.serverText}>{key.smallMode}</h1>
                  </div>
                </div>
              </div>
              <div className={styles.serverInfo}>
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
              </div>
              <a
                onClick={(e) => handleChildElementClick(e)}
                href={`bf1://${key.gameId}`}
                style={{ alignSelf: "end" }}
              >
                <button
                  className="bigButtonSecondaryBox"
                  style={{ marginBottom: ".6rem" }}
                  type="submit"
                >
                  {t("servers.join")}
                </button>
              </a>
            </div>
          </Box>
        );
      })}
    </div>
  );
}

function Results(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const platoon = props.platoon;
  document.title = `${t("siteFullName")} ${t("pageTitle.platoon")} | ${
    platoon?.name || t("loading")
  }`;
  const ConditionalLink = ({ children, to, condition }: ConLink) =>
    !!condition && to ? <Link to={to}>{children}</Link> : <>{children}</>;

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
        <div className={styles.alignPlatoonImg}>
          <ConditionalLink
            to={`/platoons/${props.platform}/${props.platoon?.id}`}
            condition={props.sidebar}
          >
            <div
              className={styles.platoonImage}
              style={{ backgroundImage: `url("${platoon?.emblem}")` }}
            />
          </ConditionalLink>
          <div style={{ marginLeft: "0.5rem" }}>
            <ConditionalLink
              to={`/platoons/${props.platform}/${props.platoon?.id}`}
              condition={props.sidebar}
            >
              <h2 className={styles.platoonTitle}>
                {props.loading
                  ? t("loading")
                  : `[${platoon?.tag}] ${platoon?.name}`}
              </h2>
            </ConditionalLink>
            <p className={styles.description}>
              {platoon?.currentSize || 0} / 100
            </p>
            {platoon?.description ? (
              <p className={styles.description}>
                {platoon?.description.split(". ").map(function (
                  descPart: string,
                  idx: number,
                ) {
                  return (
                    <p className={styles.descriptionPart} key={idx}>
                      {descPart}.{" "}
                    </p>
                  );
                })}
              </p>
            ) : (
              <p className={styles.description}>{t("notApplicable")}</p>
            )}
          </div>
        </div>
        <div className="pageColumn">
          <div className="pageRow">
            <Members
              loading={props.loading}
              platform={props?.platform}
              members={platoon?.members}
            />
          </div>
          <div className="pageRow">
            <Servers servers={platoon?.servers} />
          </div>
        </div>
      </div>
    );
  }
}

function Platoon(): React.ReactElement {
  const params = useParams();
  const platoonId = params.gid;
  const platform = params.plat;

  const { t } = useTranslation();
  return (
    <div>
      <div className="container">
        <BackButton text={t("platoon.back")} location="/platoons" />
        <PlatoonInfo
          sidebar={false}
          platform={platform}
          platoonId={platoonId}
        />
      </div>
    </div>
  );
}

export function PlatoonInfo(props: {
  platoonId: string;
  platform: string;
  sidebar: boolean;
}): React.ReactElement {
  const { platoonId, platform } = props;

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
    <Results
      sidebar={props.sidebar}
      loading={loading}
      platoon={platoon}
      platform={platform}
      error={error}
    />
  );
}

export default Platoon;
