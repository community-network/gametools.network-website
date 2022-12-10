import * as React from "react";
import "../../../../locales/config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { AlignW } from "../../../Materials";
import { PlatoonResult } from "../../../../api/ReturnTypes";
import { Description, Spacing } from "./Servers";
import styled from "styled-components";

const PlatoonEmblem = styled.img`
  width: 100px;
  margin-right: 0.5rem;
`;

export function ServerPlatoon(props: {
  platoon: PlatoonResult;
  platform: string;
}): React.ReactElement {
  const { t } = useTranslation();
  const platoon = props.platoon;
  const platform = props.platform;
  if (platoon === null) {
    return (
      <Spacing>
        <h2>{t("servers.platoon.main")}</h2>
        <p>{t("servers.platoon.none")}</p>
      </Spacing>
    );
  }
  return (
    <Spacing>
      <h2>{t("servers.platoon.main")}</h2>
      <AlignW>
        <Link to={`/platoons/${platform}/${platoon.id}`}>
          <PlatoonEmblem src={platoon.emblem} />
        </Link>
        <div style={{ marginTop: "1rem" }}>
          <h3>
            <Link to={`/platoons/${platform}/${platoon.id}`}>
              {platoon.name}
            </Link>
          </h3>
          {platoon.description !== null ? (
            <Link to={`/platoons/${platform}/${platoon.id}`}>
              <p style={{ maxWidth: "600px" }}>{platoon.description}</p>
            </Link>
          ) : (
            <Link to={`/platoons/${platform}/${platoon.id}`}>
              <Description>{t("stats.platoon.noDescription")}</Description>
            </Link>
          )}
        </div>
      </AlignW>
    </Spacing>
  );
}
