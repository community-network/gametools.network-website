import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box } from "../../../Materials";
import { MainStatsWeapon } from "../../../../api/ReturnTypes";
import { Views, DynamicSort } from "./Main";
import { BarGraph } from "../../../graphing/bar";
import ErrorBoundary from "../../../functions/ErrorBoundary";
import sslFix from "../../../functions/fixEaAssets";
import Styles from "./Main.module.scss";

export function ViewWeapons(props: Readonly<Views>): React.ReactElement {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortType, setSortType] = React.useState<string>("-kills");
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  let weapons = [];
  if (!props.loading && !props.error) {
    weapons = props?.stats?.weapons?.filter(
      (item: {
        weaponName: string;
        accuracy: string | number;
        headshots: string | number;
      }) => {
        if (
          typeof item.accuracy == "string" &&
          typeof item.headshots == "string"
        ) {
          item.accuracy = parseInt(item.accuracy.replace("%", ""));
          item.headshots = parseInt(item.headshots.replace("%", ""));
        }
        return item?.weaponName
          ?.toLowerCase()
          .includes(searchTerm?.toLowerCase());
      },
    );
    weapons = weapons.sort(DynamicSort(sortType));
  }
  return (
    <div className={Styles.spacing}>
      <div className="align">
        <h3 className={Styles.title}>{t("stats.weapons")}</h3>
        <div className="alignW">
          <input
            className="smallSearchBox"
            placeholder={t("stats.searchWeapon")}
            value={searchTerm}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setSearchTerm(ev.target.value)
            }
          />
          <select
            className="selectPrimary"
            value={sortType}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setSortType(ev.target.value)
            }
          >
            <option value="weaponName">{t("stats.rows.weaponName")}</option>
            <option value="type">{t("stats.rows.type")}</option>
            <option value="-kills">{t("stats.rows.kills")}</option>
            <option value="-killsPerMinute">
              {t("stats.rows.killsPerMinute")}
            </option>
            <option value="-accuracy">{t("stats.rows.accuracy")}</option>
            <option value="-headshots">{t("stats.rows.headshots")}</option>
          </select>
        </div>
      </div>
      {weapons.length > 0 ? (
        <Box>
          {weapons.map((key: MainStatsWeapon, index: number) => {
            return (
              <div className="column" key={index}>
                <div className="row">
                  <h4>{key?.weaponName}</h4>
                  <img
                    className={Styles.listImage}
                    src={sslFix(key?.image)}
                    loading="lazy"
                  />
                </div>
                {key?.type && (
                  <div className="row">
                    <h4>{key?.type}</h4>
                    <p className={Styles.description}>{t("stats.rows.type")}</p>
                  </div>
                )}
                <div className="row">
                  <h4>{numberFormat.format(key?.kills)}</h4>
                  <p className={Styles.description}>{t("stats.rows.kills")}</p>
                </div>
                <div className="row">
                  <h4>{numberFormat.format(key?.killsPerMinute)}</h4>
                  <p className={Styles.description}>
                    {t("stats.rows.killsPerMinute")}
                  </p>
                </div>
                {key?.accuracy !== undefined && (
                  <div className="tabletRow">
                    <h4>{numberFormat.format(key?.accuracy)}%</h4>
                    <p className={Styles.description}>
                      {t("stats.rows.accuracy")}
                    </p>
                  </div>
                )}
                {key?.damagePerMinute !== undefined && (
                  <div className="tabletRow">
                    <h4>{numberFormat.format(key?.damagePerMinute)}</h4>
                    <p className={Styles.description}>
                      {t("stats.rows.damagePerMinute")}
                    </p>
                  </div>
                )}
                <div className="phoneRow">
                  <h4>{numberFormat.format(key?.headshots)}%</h4>
                  <p className={Styles.description}>
                    {t("stats.rows.headshots")}
                  </p>
                </div>
              </div>
            );
          })}
        </Box>
      ) : (
        <Box>
          <p>{t("loading")}</p>
        </Box>
      )}
    </div>
  );
}

export function WeaponGraph(props: Readonly<Views>): React.ReactElement {
  const { t } = useTranslation();
  const [graphType, setGraphType] = React.useState<string>("kills");
  const [begin, setBegin] = React.useState<number>(0);
  let i = 0;
  let length = 0;
  const names = [];
  const values = [];
  if (!props.loading && !props.error) {
    length = props.stats.weapons.length;
    props.stats.weapons
      .sort(DynamicSort(`-${graphType}`))
      .map((item: MainStatsWeapon) => {
        if (i >= begin && i < begin + 25) {
          names.push(item?.weaponName);
          values.push(item[graphType]);
        }
        i += 1;
      });
  }
  const less = () => setBegin(Math.max(0, begin - 25));
  const more = () => setBegin(Math.min(length - 1, begin + 25));
  return (
    <div className={Styles.spacing}>
      <div className="align">
        <h3 className={Styles.title}>{t("stats.weaponGraph")}</h3>
        <div className="alignW" style={{ marginRight: "1rem" }}>
          <select
            className="selectPrimary"
            value={graphType}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setGraphType(ev.target.value)
            }
          >
            <option value="kills">{t("stats.rows.kills")}</option>
            <option value="killsPerMinute">
              {t("stats.rows.killsPerMinute")}
            </option>
            <option value="accuracy">{t("stats.rows.accuracy")}</option>
            <option value="headshots">{t("stats.rows.headshots")}</option>
          </select>
        </div>
        <p />
        <button
          className="smallButtonSecondary"
          style={{ marginRight: ".5rem" }}
          onClick={less}
        >
          &#60;
        </button>
        <button className="smallButtonSecondary" onClick={more}>
          &#62;
        </button>
        <p className={Styles.description}>
          {begin + 1}/{Math.min(length, begin + 25)} {t("stats.weapons")}
        </p>
      </div>
      {names.length > 0 ? (
        <Box>
          <ErrorBoundary>
            <BarGraph
              names={names}
              values={values}
              valueName={graphType}
              loading={props.loading}
              error={props.error}
            />
          </ErrorBoundary>
        </Box>
      ) : (
        <Box>
          <p>{t("loading")}</p>
        </Box>
      )}
    </div>
  );
}
