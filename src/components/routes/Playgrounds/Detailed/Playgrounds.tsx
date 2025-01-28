import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { useQuery } from "@tanstack/react-query";
import { BackButton } from "../../../Materials";
import { getLanguage } from "../../../../locales/config";
import { Results } from "./Main";
import { useParams } from "react-router";

function Playgrounds(): React.ReactElement {
  const params = useParams();
  const gameId = params.gameid;
  const playground = params.playground;
  const platform = params.platform;
  const { t } = useTranslation();

  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery({
    queryKey: ["playground" + playground + platform],
    queryFn: () =>
      GametoolsApi.playground({
        game: gameId,
        getter: params.type,
        playground: playground,
        lang: getLanguage(),
        with_ownername: false,
      }),
  });
  React.useEffect(() => {
    document.title = `${t("siteFullName")} ${t("pageTitle.playground")} | ${
      stats?.originalPlayground?.settings?.configName?.value || t("loading")
    }`;
  }, [stats]);

  return (
    <div>
      <div className="container">
        <BackButton text={t("playgrounds.back")} location="/playgrounds" />
        <Results
          game={gameId}
          loading={loading}
          platform={platform}
          stats={stats}
          error={error}
        />
      </div>
    </div>
  );
}

export default Playgrounds;
