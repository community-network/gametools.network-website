import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { MainStatsWeapon, SusWeapon } from "../../../../api/ReturnTypes";
import { newTitles } from "../../../../api/static";
import "../../../../locales/config";
import sslFix from "../../../functions/fixEaAssets";
import { Box } from "../../../Materials";
import { PlatformViews } from "./Main";
import * as Mainstyles from "./Main.module.scss";
import * as styles from "./Main.module.scss";

function SusWeapon(
  props: Readonly<
    PlatformViews & {
      setSusCount: React.Dispatch<React.SetStateAction<number>>;
    }
  >,
): React.ReactElement {
  const { t } = useTranslation();

  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());

  const {
    isLoading,
    isError,
    error,
    data: stats,
  } = useQuery({
    queryKey: ["susStats" + props.game + props?.stats?.id, props.platform],
    queryFn: () =>
      GametoolsApi.sus({
        game: props.game,
        playerId: props?.stats?.id,
        platform: props.platform,
      }),
  });

  React.useEffect(() => {
    props.setSusCount(stats?.weapons?.length);
  }, [stats]);

  if (!newTitles.includes(props.game)) {
    return <></>;
  }

  if (isError) {
    return (
      <>
        <h3>{t("stats.adminPanel.susWeapons")}</h3>
        <p>{t("stats.error", { error: error })}</p>
      </>
    );
  }

  if (isLoading || stats === undefined) {
    return (
      <>
        <h3>{t("stats.adminPanel.susWeapons")}</h3>
        <p>{t("loading")}</p>
      </>
    );
  }

  const weapons = stats?.weapons || [];

  if (weapons?.length === 0) {
    return (
      <>
        <h3>{t("stats.adminPanel.susWeapons")}</h3>
        <p style={{ color: "gray" }}>{t("resultNotFound")}</p>
      </>
    );
  }

  return (
    <>
      <h3>{t("stats.adminPanel.susWeapons")}</h3>
      {weapons.map((key: SusWeapon & MainStatsWeapon, index: number) => {
        return (
          <div className="column" key={index}>
            <div className="row">
              <h4 className="nameRow">{key?.weaponName}</h4>
              <img
                className={styles.listImage}
                src={sslFix(key?.image)}
                loading="lazy"
              />
            </div>
            {key?.type && (
              <div className="row">
                <h4 className="nameRow">{key?.type}</h4>
                <p className={styles.description}>{t("stats.rows.type")}</p>
              </div>
            )}
            <div className="row">
              <h4>{numberFormat.format(key?.kills)}</h4>
              <p className={styles.description}>{t("stats.rows.kills")}</p>
            </div>
            <div className="row">
              <h4 style={{ color: key?.susReason === "kpm" && "#DC143C" }}>
                {numberFormat.format(key?.killsPerMinute)}
              </h4>
              <p
                style={{ color: key?.susReason === "kpm" && "#DC143C" }}
                className={styles.description}
              >
                {t("stats.rows.killsPerMinute")}
              </p>
            </div>
            {key?.accuracy !== undefined && (
              <div className="smallestPhoneRow">
                <h4
                  style={{ color: key?.susReason === "accuracy" && "#DC143C" }}
                >
                  {numberFormat.format(key?.accuracy)}%
                </h4>
                <p
                  style={{ color: key?.susReason === "accuracy" && "#DC143C" }}
                  className={styles.description}
                >
                  {t("stats.rows.accuracy")}
                </p>
              </div>
            )}
            {key?.damagePerMinute !== undefined && (
              <div className="tabletRow">
                <h4>{numberFormat.format(key?.damagePerMinute)}</h4>
                <p className={styles.description}>
                  {t("stats.rows.damagePerMinute")}
                </p>
              </div>
            )}
            <div className="tabletRow">
              <h4 style={{ color: key?.susReason === "headshot" && "#DC143C" }}>
                {numberFormat.format(key?.headshots)}%
              </h4>
              <p
                style={{ color: key?.susReason === "headshot" && "#DC143C" }}
                className={styles.description}
              >
                {t("stats.rows.headshots")}
              </p>
            </div>
            {key?.hitVKills !== undefined && (
              <div className="phoneRow">
                <h4>{numberFormat.format(key?.hitVKills)}</h4>
                <p className={styles.description}>
                  {t("stats.rows.hitVKills")}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export function AdminPanel(props: Readonly<PlatformViews>): React.ReactElement {
  const [susCount, setSusCount] = React.useState(0);
  const { t } = useTranslation();

  const {
    isLoading,
    isError,
    error,
    data: stats,
  } = useQuery({
    queryKey: ["managerCheckPlayer" + props?.stats?.id],
    queryFn: () =>
      GametoolsApi.managerCheckPlayer({
        playerId: props?.stats?.id,
      }),
  });

  const warningColor =
    stats &&
    (Object.keys(stats?.vban)?.length > 0 ||
      stats?.ingame?.length > 0 ||
      stats?.otherNames?.usedNames?.length > 30 ||
      susCount > 0);

  if (isError) {
    return (
      <div className={Mainstyles.spacing}>
        <Box>
          <h3>{t("stats.adminPanel.main")}</h3>
          <p>{t("stats.error", { error: error })}</p>
        </Box>
      </div>
    );
  }

  if (isLoading || stats === undefined) {
    return (
      <div className={Mainstyles.spacing}>
        <Box>
          <h3>{t("stats.adminPanel.main")}</h3>
          <p>{t("loading")}</p>
        </Box>
      </div>
    );
  }

  return (
    <div className={Mainstyles.spacing}>
      <Box style={{ background: warningColor && "#26181f" }}>
        <h3>{t("stats.adminPanel.main")}</h3>
        {/* <h3>{t("stats.adminPanel.vban.main")}</h3> */}
        <table>
          <tr>
            <th>{t("stats.adminPanel.vban.group")}</th>
            <th>{t("stats.adminPanel.vban.reason")}</th>
            <th>{t("stats.adminPanel.otherNames.main")}</th>
            <th>{t("stats.adminPanel.bannedServer.main")}</th>
          </tr>
          {Array.from(
            Array(
              Math.max(
                Object.keys(stats?.vban)?.length,
                stats?.ingame?.length,
                stats?.otherNames?.usedNames?.length,
              ),
            ),
            (_, i) => {
              // Fill with N/A if not used
              const vbanItem = Object.entries(stats?.vban)[i] || [];
              return (
                <tr>
                  {i === 0 && vbanItem.length === 0 ? (
                    <>
                      <td style={{ color: "gray" }}>{t("notApplicable")}</td>
                      <td style={{ color: "gray" }}>{t("notApplicable")}</td>
                    </>
                  ) : (
                    <>
                      <td>{vbanItem[0]}</td>
                      <td>{vbanItem[1]?.reason}</td>
                    </>
                  )}
                  {i === 0 && stats?.otherNames?.usedNames?.length === 0 ? (
                    <td style={{ color: "gray" }}>{t("notApplicable")}</td>
                  ) : (
                    <td>{stats?.otherNames?.usedNames[i]}</td>
                  )}
                  {i === 0 && stats?.ingame?.length === 0 ? (
                    <td style={{ color: "gray" }}>{t("notApplicable")}</td>
                  ) : (
                    <td>{stats?.ingame[i]}</td>
                  )}
                </tr>
              );
            },
          )}
        </table>
        <div style={{ margin: ".5rem" }} />
        <SusWeapon
          setSusCount={setSusCount}
          platform={props.platform}
          isLoading={false}
          isError={false}
          errors={undefined}
          game={props.game}
          name={props.name}
          stats={props.stats}
        />
      </Box>
    </div>
  );
}