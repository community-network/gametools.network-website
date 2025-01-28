import * as React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { oldJoinGames } from "../../api/static";
import "../../locales/config";
import { BackButton } from "../Materials";

function Launch(): React.ReactElement {
  const params = useParams();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (oldJoinGames.includes(params.gameid)) {
      window.location.href = `${params.gameid}://${params.ip}:${params.port}`;
    }
  }, [oldJoinGames, params]);

  return (
    <div className="container">
      <BackButton text={t("serverSearch.back")} location="/" />
      <h2>{t("servers.joinme.launch")}</h2>
      <p>{t("servers.joinme.discord")}</p>
      <div className="align" style={{ width: "23rem" }}>
        <a
          className="buttonLink"
          style={{ marginRight: "1rem" }}
          href="https://joinme.click/download"
        >
          {t("servers.joinme.main")}
        </a>
        <a
          className="buttonLink"
          href={`https://joinme.click/g/${params.gameid}/${params.ip}:${params.port}`}
        >
          {t("servers.joinme.invite")}
        </a>
      </div>
    </div>
  );
}

export default Launch;
