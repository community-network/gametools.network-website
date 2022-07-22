import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../../../assets/scss/App.scss";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { useQuery } from "@tanstack/react-query";
import { AltText, Container, BackButton } from "../../../Materials";
import { getLanguage } from "../../../../locales/config";
import { Results } from "./Main";
import { useParams } from "react-router-dom";

export const Description = styled.p`
  ${AltText}
  line-height: 1;
`;

export const Title = styled.h2`
  margin-top: 2rem;
`;

export const Spacing = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export const OriginProfile = styled.img`
  width: 60px;
  margin-right: 1rem;
`;

export const OriginName = styled.h2`
  line-height: 60%;
  margin-top: 0.4rem;
`;

export const OriginDescription = styled.h4`
  margin: 0;
`;

export interface ConLink {
  children: React.ReactElement<unknown, string>;
  to: string;
  condition: boolean;
}

type TParams = {
  gameid: string;
  type: string;
  sname: string;
  platform: string;
};

function Servers(): React.ReactElement {
  const params = useParams();
  const gameId = params.gameid;
  const platform = params.platform;
  const serverName = unescape(params.sname).replaceAll('"', '\\"');
  const { t } = useTranslation();

  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery(["detailed" + gameId + serverName + platform], () =>
    GametoolsApi.server({
      game: gameId,
      getter: params.type,
      serverName: serverName,
      lang: getLanguage(),
      platform: platform,
    }),
  );
  return (
    <div>
      <Container>
        <BackButton text={t("servers.back")} location="/servers" />
        <Results
          game={gameId}
          loading={loading}
          platform={platform}
          stats={stats}
          error={error}
        />
      </Container>
    </div>
  );
}

export default Servers;
