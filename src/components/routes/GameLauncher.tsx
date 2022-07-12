import * as React from "react";
import "../../locales/config";
import { oldJoinGames } from "../../api/static";
import { Align, BackButton, ButtonLink, Container } from "../Materials";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

function Launch(): React.ReactElement {
  const params = useParams();
  const { t } = useTranslation();
  if (oldJoinGames.includes(params.gameid)) {
    window.location.href = `${params.gameid}://${params.ip}:${params.port}`;
  }

  return (
    <Container>
      <BackButton text={t("serverSearch.back")} location="/" />
      <h2>{t("servers.joinme.launch")}</h2>
      <p>{t("servers.joinme.discord")}</p>
      <Align style={{ width: "23rem" }}>
        <ButtonLink
          style={{ marginRight: "1rem" }}
          href="https://joinme.click/download"
        >
          {t("servers.joinme.main")}
        </ButtonLink>
        <ButtonLink
          href={`https://joinme.click/g/${params.gameid}/${params.ip}:${params.port}`}
        >
          {t("servers.joinme.invite")}
        </ButtonLink>
      </Align>
    </Container>
  );
}

export default Launch;
