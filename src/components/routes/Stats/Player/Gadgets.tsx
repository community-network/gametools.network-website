import * as React from "react";
import { useTranslation } from "react-i18next";
import { MainStatsGadgets } from "../../../../api/ReturnTypes";
import "../../../../locales/config";
import ErrorBoundary from "../../../functions/ErrorBoundary";
import sslFix from "../../../functions/fixEaAssets";
import { BarGraph } from "../../../graphing/bar";
import { Box } from "../../../Materials";
import { ComponentHandling, DynamicSort, Views } from "./Main";
import * as styles from "./Main.module.scss";

export function ViewGadgets(props: Readonly<Views>): React.ReactElement {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortType, setSortType] = React.useState<string>("-kills");
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  let gadgets = [];
  if (!props.isLoading && !props.isError) {
    gadgets = props.stats.gadgets.filter((item: { gadgetName: string }) => {
      return item.gadgetName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    gadgets = gadgets.sort(DynamicSort(sortType));
  }
  return (
    <div className={styles.spacing}>
      <div className="align">
        <h3 className={styles.title}>{t("stats.gadgets")}</h3>
        <div className="alignW">
          <input
            className="smallSearchBox"
            placeholder={t("stats.searchGadget")}
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
            <option value="gadgetName">{t("stats.rows.gadgetName")}</option>
            <option value="type">{t("stats.rows.type")}</option>
            <option value="-kills">{t("stats.rows.kills")}</option>
            <option value="-kpm">{t("stats.rows.killsPerMinute")}</option>
            <option value="-multiKills">{t("stats.rows.multiKills")}</option>
          </select>
        </div>
      </div>
      {gadgets.length > 0 ? (
        <Box>
          {gadgets.map((key: MainStatsGadgets, index: number) => {
            return (
              <div className="column" key={index}>
                <div className="row">
                  <h4>{key?.gadgetName}</h4>
                  <img
                    className={styles.listImage}
                    src={sslFix(key?.image)}
                    loading="lazy"
                  />
                </div>
                <div className="row">
                  <h4>{key?.type}</h4>
                  <p className={styles.description}>{t("stats.rows.type")}</p>
                </div>
                <div className="row">
                  <h4>{numberFormat.format(key?.kills)}</h4>
                  <p className={styles.description}>{t("stats.rows.kills")}</p>
                </div>
                <div className="row">
                  <h4>{numberFormat.format(key?.kpm)}</h4>
                  <p className={styles.description}>
                    {t("stats.rows.killsPerMinute")}
                  </p>
                </div>
                <div className="phoneRow">
                  <h4>{numberFormat.format(key?.multiKills)}</h4>
                  <p className={styles.description}>
                    {t("stats.rows.multiKills")}
                  </p>
                </div>
              </div>
            );
          })}
        </Box>
      ) : (
        <Box>
          <p>{ComponentHandling(t, props)}</p>
        </Box>
      )}
    </div>
  );
}

export function GadgetGraph(props: Readonly<Views>): React.ReactElement {
  const { t } = useTranslation();
  const [graphType, setGraphType] = React.useState<string>("kills");
  const [begin, setBegin] = React.useState<number>(0);
  let i = 0;
  let length = 0;
  const names = [];
  const values = [];
  if (!props.isLoading && !props.isError) {
    length = props.stats.gadgets.length;
    props.stats.gadgets
      .sort(DynamicSort(`-${graphType}`))
      .map((item: MainStatsGadgets) => {
        if (i >= begin && i < begin + 25) {
          names.push(item.gadgetName);
          values.push(item[graphType]);
        }
        i += 1;
      });
  }
  const less = () => setBegin(Math.max(0, begin - 25));
  const more = () => setBegin(Math.min(length - 1, begin + 25));
  return (
    <div className={styles.spacing}>
      <div className="align">
        <h3 className={styles.title}>{t("stats.gadgetGaph")}</h3>
        <div className="alignW" style={{ marginRight: "1rem" }}>
          <select
            aria-label={t("ariaLabels.chartType")}
            className="selectPrimary"
            value={graphType}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setGraphType(ev.target.value)
            }
          >
            <option value="kills">{t("stats.rows.kills")}</option>
            <option value="kpm">{t("stats.rows.killsPerMinute")}</option>
            <option value="multiKills">{t("stats.rows.multiKills")}</option>
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
        <p className={styles.description}>
          {begin + 1}/{Math.min(length, begin + 25)} {t("stats.gadgets")}
        </p>
      </div>
      {names.length > 0 ? (
        <Box>
          <ErrorBoundary>
            <BarGraph
              names={names}
              values={values}
              valueName={graphType}
              loading={props.isLoading}
              error={props.isError}
            />
          </ErrorBoundary>
        </Box>
      ) : (
        <Box>
          <p>{ComponentHandling(t, props)}</p>
        </Box>
      )}
    </div>
  );
}
