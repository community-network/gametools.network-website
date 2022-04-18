import * as React from "react";
import "../../locales/config";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { oldJoinGames } from "../../api/static";
import { Align, BackButton, ButtonLink, Container } from "../Materials";
import { useTranslation } from "react-i18next";

type TParams = {
  gameid: string;
  ip: string;
  port: string;
};

function Launch({ match }: RouteComponentProps<TParams>): React.ReactElement {
  const { t } = useTranslation();
  if (oldJoinGames.includes(match.params.gameid)) {
    window.location.href = `${match.params.gameid}://${match.params.ip}:${match.params.port}`;
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
          href={`https://joinme.click/g/${match.params.gameid}/${match.params.ip}:${match.params.port}`}
        >
          {t("servers.joinme.invite")}
        </ButtonLink>
      </Align>
    </Container>
  );
}

export default withRouter(Launch);
