import * as React from "react";
import { useTranslation } from "react-i18next";
import { managerPlayers } from "../../../../api/GametoolsApi";
import * as styles from "./AdminMode.module.scss";

export function CheckBan(
  props: Readonly<{
    playerId: string;
    checkBanInfo: managerPlayers;
    checkBanLoading: boolean;
    checkBanError: boolean;
    adminMode: boolean;
    children?:
      | boolean
      | React.ReactChild
      | React.ReactFragment
      | React.ReactPortal;
  }>,
) {
  const { t } = useTranslation();
  const playerInfo = props.checkBanInfo?.bfban[props.playerId];
  const bfeac = props.checkBanInfo?.bfeac?.includes(Number(props.playerId));
  let color = "#ffffff";

  if (playerInfo?.status === 1 || bfeac) {
    color = "#DC143C";
    return (
      <p className={styles.CheckBoxDesc} style={{ color: color }}>
        {t("bfban.platoon")}:{" "}
        {playerInfo?.status === 1 && (
          <a
            style={{ color: color, lineHeight: 0 }}
            href={playerInfo?.url}
            target="_blank"
            rel="noreferrer"
          >
            {t("bfban.main")}
          </a>
        )}
        {playerInfo?.status === 1 && bfeac && <> - </>}
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
      </p>
    );
  }

  const vbanCount = Object.keys(
    props.checkBanInfo?.vban[props.playerId] || {},
  )?.length;
  if (vbanCount > 0 && props.adminMode) {
    color = "#dc5314";
    return (
      <p className={styles.CheckBoxDesc} style={{ color: color }}>
        {t("warn.vban", { amount: vbanCount })}
      </p>
    );
  }

  const usedNameCount =
    props.checkBanInfo?.otherNames[props.playerId]?.usedNames?.length;
  if (usedNameCount > 5 && props.adminMode) {
    color = "#dc5314";
    return (
      <p className={styles.CheckBoxDesc} style={{ color: color }}>
        {t("warn.nameChange", { amount: usedNameCount })}
      </p>
    );
  }

  return <>{props.children}</>;
}
