import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../../../assets/scss/App.scss";
import { BigSelectSecondary, Align } from "../../../Materials";
import { Graph, GlobalGraph, OldGameGraph } from "../../../graphing/line";
import { dice, graphGames } from "../../../../api/static";
import { AltDescription } from "./PlayerSearch";

const Title = styled.h2`
  margin-top: 2rem;
`;

export function Graphs(): React.ReactElement {
  const { t } = useTranslation();
  const [platformGraph, setPlatformGraph] = React.useState<string>("pc");
  const [gameGraph, setGraphGame] = React.useState<string>("bfglobal");
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
      </Align>
      {dice.includes(gameGraph) ? (
        <Align>
          <Graph gameName={gameGraph} platform={platformGraph} />
        </Align>
      ) : gameGraph == "bfglobal" ? (
        <GlobalGraph platform={platformGraph} />
      ) : (
        <OldGameGraph gameName={gameGraph} platform={platformGraph} />
      )}
    </>
  );
}
