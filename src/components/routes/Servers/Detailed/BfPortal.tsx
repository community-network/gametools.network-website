import * as React from "react";
import { useTranslation } from "react-i18next";
import { BfPortalApi } from "../../../../api/BfPortalApi";
import bfportal_icon from "../../../../assets/icon/bfportal-icon.png";
import { AlignW, Circle } from "../../../Materials";
import { useQuery } from "@tanstack/react-query";
import {
  OriginDescription,
  OriginName,
  OriginProfile,
  Spacing,
} from "./Servers";

export function BfPortalInfo(props: {
  experienceName: string;
}): React.ReactElement {
  const { experienceName } = props;
  const { t } = useTranslation();

  const {
    isLoading: loading,
    isError: error,
    data: data,
  } = useQuery(["bfportalExperience" + experienceName], () =>
    BfPortalApi.experience({
      title: experienceName,
    }),
  );

  if (loading) {
    return (
      <Spacing>
        <h2>{t("servers.bfportal.found")}</h2>
        <AlignW>
          <Circle style={{ marginTop: ".5rem" }} />
          <div>
            <OriginName>{t("loading")}</OriginName>
            <OriginDescription>{t("loading")}</OriginDescription>
          </div>
        </AlignW>
      </Spacing>
    );
  } else if (error) {
    return (
      <Spacing>
        <h2>{t("servers.bfportal.found")}</h2>
        <AlignW>
          <Circle style={{ marginTop: ".5rem" }} />
          <div>
            <OriginName>{t("404")}</OriginName>
            <OriginDescription>{t("servers.bfportal.error")}</OriginDescription>
          </div>
        </AlignW>
      </Spacing>
    );
  }

  if (data.items.length > 0) {
    const experience = data.items[0];
    return (
      <Spacing>
        <h2>{t("servers.bfportal.found")}</h2>
        <a href={experience.meta.html_url} target="_blank" rel="noreferrer">
          <AlignW>
            <OriginProfile src={bfportal_icon} />
            <div>
              <OriginName style={{ marginBottom: "0.25rem" }}>
                {experience.title}
              </OriginName>
              <OriginDescription>
                Experience code: {experience.code}
                <br />
                Likes: {experience.liked_by.length}
              </OriginDescription>
            </div>
          </AlignW>
        </a>
      </Spacing>
    );
  }
}
