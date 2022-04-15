import * as React from "react";
import "../../locales/config";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { oldJoinGames } from "../../api/static";
import { ArrowLeft, Back, ButtonLink, Container } from "../Materials";
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
      <Back to="/platoons">
        <ArrowLeft />
        {t("serverSearch.back")}
      </Back>
      <h2>Game launched!</h2>
      <p>{t("servers.joinme.discord")}</p>
      <ButtonLink
        style={{ width: "8rem" }}
        href="https://joinme.click/download"
      >
        {t("servers.joinme.main")}
      </ButtonLink>
    </Container>
  );
}

export default withRouter(Launch);
