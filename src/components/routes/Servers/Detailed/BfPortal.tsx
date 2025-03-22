import * as React from "react";
import { useTranslation } from "react-i18next";
import { BfPortalApi } from "../../../../api/BfPortalApi";
import bfportalIcon from "../../../../assets/icon/bfportal-icon.png?sizes[]=60&format=webp&useResponsiveLoader=true";
import { useQuery } from "@tanstack/react-query";
import * as styles from "./Main.module.scss";
import { GametoolsApi } from "../../../../api/GametoolsApi";

export function BfvPlaygroundInfo(props: {
  playgroundId: string;
  game: string;
}): React.ReactElement {
  const { t } = useTranslation();

  const {
    isLoading: loading,
    isError: error,
    data,
  } = useQuery({
    queryKey: ["playground" + "bfv" + props.playgroundId],
    queryFn: () =>
      GametoolsApi.bfvPlayground({
        game: props.game,
        playgroundId: props.playgroundId,
      }),
    retryDelay: 3,
    retryOnMount: false,
  });

  if (loading) {
    return (
      <div className={styles.spacing}>
        <h2>{t("servers.playground.main")}</h2>
        <div className="alignW">
          <div style={{ marginLeft: "0.5rem" }}>
            <h2 className={styles.originName}>{t("loading")}</h2>
            <h4 className={styles.originDescription}>{t("loading")}</h4>
          </div>
        </div>
      </div>
    );
  } else if (error) {
    return (
      <div className={styles.spacing}>
        <h2>{t("servers.playground.main")}</h2>
        <div className="alignW">
          <div style={{ marginLeft: "0.5rem" }}>
            <h2 className={styles.originName}>{t("404")}</h2>
            <h4 className={styles.originDescription}>{t("error")}</h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.spacing}>
      <h2>{t("servers.playground.main")}</h2>
      <div className="alignW">
        <div style={{ marginLeft: "0.5rem" }}>
          <h2 className={styles.originName}>
            {data?.server?.serverdesc?.serverName}
          </h2>
          <h4 className={styles.originDescription}>
            {data?.server?.serverdesc?.description?.text}
          </h4>
        </div>
      </div>
    </div>
  );
}

export function BfPortalInfo(props: {
  experienceName: string;
}): React.ReactElement {
  const { experienceName } = props;
  const { t } = useTranslation();

  const {
    isLoading: loading,
    isError: error,
    data: data,
  } = useQuery({
    queryKey: ["bfportalExperience" + experienceName],
    queryFn: () =>
      BfPortalApi.experience({
        title: experienceName,
      }),
  });

  if (loading) {
    return (
      <div className={styles.spacing}>
        <h2>{t("servers.bfportal.found")}</h2>
        <div className="alignW">
          <span className="circle" style={{ marginTop: ".5rem" }} />
          <div>
            <h2 className={styles.originName}>{t("loading")}</h2>
            <h4 className={styles.originDescription}>{t("loading")}</h4>
          </div>
        </div>
      </div>
    );
  } else if (error) {
    return (
      <div className={styles.spacing}>
        <h2>{t("servers.bfportal.found")}</h2>
        <div className="alignW">
          <span className="circle" style={{ marginTop: ".5rem" }} />
          <div>
            <h2 className={styles.originName}>{t("404")}</h2>
            <h4 className={styles.originDescription}>
              {t("servers.bfportal.error")}
            </h4>
          </div>
        </div>
      </div>
    );
  }

  if (data.items.length > 0) {
    const experience = data.items[0];
    return (
      <div className={styles.spacing}>
        <h2>{t("servers.bfportal.found")}</h2>
        <a href={experience.meta.html_url} target="_blank" rel="noreferrer">
          <div className="alignW">
            <img
              alt={t("servers.bfportal.main")}
              className={styles.originProfile}
              src={bfportalIcon.src}
              srcSet={bfportalIcon.srcSet}
            />
            <div>
              <h2
                className={styles.originName}
                style={{ marginBottom: "0.25rem" }}
              >
                {experience.title}
              </h2>
              <h4 className={styles.originDescription}>
                Experience code: {experience.code}
                <br />
                Likes: {experience.liked_by.length}
              </h4>
            </div>
          </div>
        </a>
      </div>
    );
  }
}
