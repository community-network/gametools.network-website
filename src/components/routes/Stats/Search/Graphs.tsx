import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../../../assets/scss/App.scss";
import {
  BigSelectSecondary,
  Align,
  BigButtonSecondary,
  OpenExternal,
} from "../../../Materials";
import { Graph, GlobalGraph, OldGameGraph } from "../../../graphing/line";
import { diceGraph, graphGames, graphOptions } from "../../../../api/static";
import { AltDescription } from "./PlayerSearch";

const Title = styled.h2`
  margin-top: 2rem;
`;

export function Graphs(): React.ReactElement {
  const { t } = useTranslation();
  const [platformGraph, setPlatformGraph] = React.useState<string>("pc");
  const [gameGraph, setGraphGame] = React.useState<string>("bfglobal");
  const [optionGraph, setOptionGraph] = React.useState<string>("amounts");
  return (
    <>
      <Align>
        <Title>{t("playerSearch.gameStatus")}</Title>
        <AltDescription style={{ marginTop: "2rem" }}>
          {t("playerSearch.zoomInfo")}
        </AltDescription>
      </Align>
      <Align>
        <BigSelectSecondary
          value={platformGraph}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void => {
            setPlatformGraph(ev.target.value);
          }}
        >
          <option value="pc">{t("platforms.pc")}</option>
          <option value="xboxone">{t("platforms.xboxone")}</option>
          <option value="ps4">{t("platforms.ps4")}</option>
          <option value="all">{t("platforms.all")}</option>
        </BigSelectSecondary>
        <BigSelectSecondary
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
        </BigSelectSecondary>
        <BigSelectSecondary
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
        </BigSelectSecondary>
        <a
          target="_blank"
          href="https://graphs.gametools.network/"
          rel="noreferrer"
        >
          <BigButtonSecondary type="submit">
            <OpenExternal /> {t("playerSearch.moreGraphs")}
          </BigButtonSecondary>
        </a>
      </Align>
      {diceGraph.includes(gameGraph) ? (
        <Align>
          <Graph
            gameName={gameGraph}
            platform={platformGraph}
            graphOptions={platformGraph !== "all" ? optionGraph : "amounts"}
          />
        </Align>
      ) : gameGraph == "bfglobal" ? (
        <GlobalGraph platform={platformGraph} />
      ) : (
        <OldGameGraph gameName={gameGraph} platform={platformGraph} />
      )}
    </>
  );
}
