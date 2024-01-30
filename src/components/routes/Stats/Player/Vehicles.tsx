import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box } from "../../../Materials";
import { MainStatsVehicle } from "../../../../api/ReturnTypes";
import { Views, DynamicSort } from "./Main";
import { BarGraph } from "../../../graphing/bar";
import ErrorBoundary from "../../../functions/ErrorBoundary";
import sslFix from "../../../functions/fixEaAssets";
import Styles from "./Main.module.scss";

export function ViewVehicles(props: Readonly<Views>): React.ReactElement {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortType, setSortType] = React.useState<string>("-kills");
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  let vehicles = [];
  if (!props.loading && !props.error) {
    if (props?.stats?.vehicles) {
      vehicles = props.stats.vehicles.filter(
        (item: { vehicleName: string }) => {
          return item?.vehicleName
            ?.toLowerCase()
            .includes(searchTerm?.toLowerCase());
        },
      );
      vehicles = vehicles.sort(DynamicSort(sortType));
    }
  }
  return (
    <div className={Styles.spacing}>
      <div className="align">
        <h3 className={Styles.title}>{t("stats.vehicles")}</h3>
        <div className="alignW">
          <input
            className="smallSearchBox"
            placeholder={t("stats.searchVehicle")}
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
            <option value="vehicleName">{t("stats.rows.vehicleName")}</option>
            <option value="type">{t("stats.rows.type")}</option>
            <option value="-kills">{t("stats.rows.kills")}</option>
            <option value="-killsPerMinute">
              {t("stats.rows.killsPerMinute")}
            </option>
            <option value="-destroyed">{t("stats.rows.destroyed")}</option>
          </select>
        </div>
      </div>
      {vehicles.length > 0 ? (
        <Box>
          {vehicles.map((key: MainStatsVehicle, index: number) => {
            return (
              <div className="column" key={index}>
                <div className="row">
                  <h4>{key?.vehicleName}</h4>
                  <img
                    className={Styles.listImage}
                    src={sslFix(key?.image)}
                    loading="lazy"
                  />
                </div>
                <div className="row">
                  <h4>{key?.type}</h4>
                  <p className={Styles.description}>{t("stats.rows.type")}</p>
                </div>
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
                <div className="phoneRow">
                  <h4>{numberFormat.format(key?.destroyed)}</h4>
                  <p className={Styles.description}>
                    {t("stats.rows.destroyed")}
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

export function VehicleGraph(props: Readonly<Views>): React.ReactElement {
  const { t } = useTranslation();
  const [graphType, setGraphType] = React.useState<string>("kills");
  const [begin, setBegin] = React.useState<number>(0);
  let i = 0;
  let length = 0;
  const names = [];
  const values = [];
  if (!props.loading && !props.error) {
    length = props.stats.vehicles?.length;
    props.stats.vehicles
      ?.sort(DynamicSort(`-${graphType}`))
      .map((item: MainStatsVehicle) => {
        if (i >= begin && i < begin + 25) {
          names.push(item.vehicleName);
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
        <h3 className={Styles.title}>{t("stats.vehicleGraph")}</h3>
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
            <option value="destroyed">{t("stats.rows.destroyed")}</option>
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
        <div className={Styles.description}>
          {begin + 1}/{Math.min(length, begin + 25)} {t("stats.vehicles")}
        </div>
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
