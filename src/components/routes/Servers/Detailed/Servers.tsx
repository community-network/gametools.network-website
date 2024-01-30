import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { useQuery } from "@tanstack/react-query";
import { BackButton } from "../../../Materials";
import { getLanguage } from "../../../../locales/config";
import { Results } from "./Main";
import { useParams } from "react-router-dom";

function Servers(): React.ReactElement {
  const params = useParams();
  const gameId = params.gameid;
  const platform = params.platform;
  const serverName = decodeURIComponent(params.sname).replaceAll('"', '\\"');
  const { t } = useTranslation();

  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery({
    queryKey: ["detailed" + gameId + serverName + platform],
    queryFn: () =>
      GametoolsApi.server({
        game: gameId,
        getter: params.type,
        serverName: serverName,
        lang: getLanguage(),
        platform: platform,
        with_ownername: false,
      }),
  });
  document.title = `${t("siteFullName")} ${t("pageTitle.servers")} | ${
    gameId || t("notApplicable")
  } | ${stats?.prefix || t("loading")}`;
  return (
    <div>
      <div className="container">
        <BackButton
          text={t("servers.back")}
          location={`/servers?game=${gameId}`}
        />
        <Results
          game={gameId}
          loading={loading}
          platform={platform}
          getter={params.type}
          serverName={serverName}
          stats={stats}
          error={error}
        />
      </div>
    </div>
  );
}

export default Servers;
