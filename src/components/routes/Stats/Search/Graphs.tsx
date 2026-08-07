import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { OpenExternal } from "../../../Materials";
import { Graph, GlobalGraph, OldGameGraph } from "../../../graphing/line";
import { diceGraph, graphGames, graphOptions } from "../../../../api/static";
import styles from "./PlayerSearch.module.scss";

export function Graphs(): React.ReactElement {
  const { t } = useTranslation();
  const [platformGraph, setPlatformGraph] = React.useState<string>("pc");
  const [gameGraph, setGraphGame] = React.useState<string>("bfglobal");
  const [optionGraph, setOptionGraph] = React.useState<string>("amounts");
  return (
    <>
      <div className="align">
        <h2 style={{ marginTop: "2rem" }}>{t("playerSearch.gameStatus")}</h2>
        <p className={styles.altDescription} style={{ marginTop: "2rem" }}>
          {t("playerSearch.zoomInfo")}
        </p>
      </div>
      <div className="align">
        <select
          aria-label={t("ariaLabels.platform")}
          className="bigSelectSecondary"
          value={platformGraph}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void => {
            setPlatformGraph(ev.target.value);
          }}
        >
          <option value="pc">{t("platforms.pc")}</option>
          <option value="xboxone">{t("platforms.xboxone")}</option>
          <option value="ps4">{t("platforms.ps4")}</option>
          <option value="all">{t("platforms.all")}</option>
        </select>
        <select
          aria-label={t("ariaLabels.game")}
          className="bigSelectSecondary"
          value={gameGraph}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setGraphGame(ev.target.value)
          }
        >
          {graphGames[platformGraph].map((key: string, index: number) => {
            return (
              <option key={index} value={key}>
                {t(`games.${key}`)}
              </option>
            );
          })}
        </select>
        <select
          aria-label={t("ariaLabels.chartType")}
          className="bigSelectSecondary"
          disabled={!(gameGraph in graphOptions && platformGraph !== "all")}
          value={optionGraph}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setOptionGraph(ev.target.value)
          }
        >
          {(gameGraph in graphOptions && platformGraph !== "all"
            ? graphOptions[gameGraph]
            : ["amounts"]
          ).map((key: string, index: number) => {
            return (
              <option key={index} value={key}>
                {t(`stats.graph.graphOptions.${key}`)}
              </option>
            );
          })}
        </select>
        <a
          target="_blank"
          href="https://graphs.gametools.network/"
          rel="noreferrer"
        >
          <button className="bigButtonSecondary" type="submit">
            <OpenExternal /> {t("playerSearch.moreGraphs")}
          </button>
        </a>
      </div>
      {diceGraph.includes(gameGraph) ? (
        <div className="align">
          <Graph
            gameName={gameGraph}
            platform={platformGraph}
            graphOptions={platformGraph !== "all" ? optionGraph : "amounts"}
          />
        </div>
      ) : gameGraph == "bfglobal" ? (
        <GlobalGraph platform={platformGraph} />
      ) : (
        <OldGameGraph gameName={gameGraph} platform={platformGraph} />
      )}
    </>
  );
}
