import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import "../../../../assets/scss/App.scss";
import "../../../../locales/config";
import { getLanguage } from "../../../../locales/config";
import { BackButton } from "../../../Materials";
import { Results } from "./Main";

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
    retryDelay: 3,
    retryOnMount: false,
  });
  document.title = `${t("siteFullName")} ${t("pageTitle.servers")} | ${gameId || t("notApplicable")
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
