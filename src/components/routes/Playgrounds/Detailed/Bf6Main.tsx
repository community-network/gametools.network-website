import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { Box } from "../../../Materials";
import {
  MapInfo,
  PlaygroundInfoReturn,
  Tags,
} from "../../../../api/ReturnTypes";
import { PlaygroundOwner } from "./Owner";
import * as styles from "./Main.module.scss";

interface Views {
  loading: boolean;
  error: boolean;
  game: string;
  platform: string;
  stats: PlaygroundInfoReturn;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function Bf6Results(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.stats;
  if (props.error) {
    return (
      <>
        <h1>{t("playgrounds.notFound.main")}</h1>
        <p>{t("playgrounds.notFound.description")}</p>
      </>
    );
  } else if (props.loading) {
    return (
      <Box>
        <h3>{t("loading")}</h3>
      </Box>
    );
  } else {
    const playElement = stats.playElement;
    const playElementDesign = stats.playElementDesign;

    // const createdDate = new Date(0);
    // createdDate.setUTCSeconds(playground?.createdAt?.seconds || 0);

    // const updatedDate = new Date(0);
    // updatedDate.setUTCSeconds(playground?.updatedAt?.seconds || 0);

    return (
      <div>
        <div className={styles.alignServerImg}>
          <div
            className={styles.playgroundImage}
            style={{
              backgroundImage: `url("${playElementDesign?.mapRotation?.maps[0]?.image}")`,
            }}
          >
            <div className={styles.blur}>
              <h1 className={styles.portalLogo}>
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="5rem"
                  height="5rem"
                  viewBox="0 0 40 40"
                  enableBackground="new 0 0 40 40"
                  xmlSpace="preserve"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                >
                  <path
                    id="Icon"
                    fill="white"
                    d="M24.5,12.8L0,39.7L20,5L24.5,12.8z M29,33.3H8.8l-5.8,6.3H40L30.4,23l-5.5,3L29,33.3z M31.1,8.8
    L10.9,31.1l18.3-10L31.1,8.8z"
                  ></path>
                </svg>
              </h1>
            </div>
          </div>
          <div>
            <h2 style={{ lineHeight: 0.5, marginTop: "1.5rem" }}>
              {playElement?.name}
            </h2>
            <p className={styles.description}>
              {playElement?.description?.value}
            </p>
            <p className={styles.description}>
              {t("playgrounds.maxPlayers", {
                amount: playElementDesign?.mapRotation?.maps[0].gameSize,
              })}
              {stats.progressionMode
                ? " - " + t(`playgrounds.types.${stats.progressionMode.value}`)
                : ""}
            </p>
            {/* <p className={styles.description}>
              {t("dateType.createdAt")}: {t("date", { date: createdDate })}
            </p>
            <p className={styles.description}>
              {t("dateType.updatedAt")}: {t("date", { date: updatedDate })}
            </p> */}
          </div>
        </div>
        <h2 style={{ marginTop: "2rem", marginBottom: 0 }}>
          {t("playgrounds.rotation")}
        </h2>
        <div className="align">
          {playElementDesign?.mapRotation?.maps?.map((key: MapInfo, index: number) => {
            return (
              <div className="alignW" key={index}>
                <div style={{ marginRight: ".7rem", marginTop: "10px" }}>
                  <div
                    style={{
                      backgroundColor: "#fff",
                      width: "20px",
                      height: "20px",
                      borderRadius: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                    }}
                  >
                    <span>{index + 1}</span>
                  </div>
                  <div
                    className={styles.mapImage}
                    style={{ backgroundImage: `url("${key.image}")` }}
                  ></div>
                  <div className={styles.playgroundInfo}>
                    <h3
                      style={{
                        marginTop: ".2rem",
                        lineHeight: 0.8,
                        textAlign: "center",
                      }}
                    >
                      {key.mapname}
                    </h3>
                    <p style={{ margin: 0, textAlign: "center" }}>{key.mode}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pageColumn">
          <div className="pageRow">
            <PlaygroundOwner owner={playElement?.creator?.playerCreator?.player} game={props.game} />
          </div>

          {/* <div className="pageRow">
            <h2>{t("playgrounds.tags")}</h2>
            {tags?.map((value: Tags, index: number) => {
              return (
                <div key={index}>
                  <p className={styles.altDescription} key={index}>
                    <b>
                      {capitalizeFirstLetter(
                        value.metadata.translations[0].localizedText,
                      )}
                    </b>
                    : { }
                    {value.metadata.translations[1].localizedText}
                  </p>
                </div>
              );
            })}
            <br></br>
          </div> */}
        </div>
      </div>
    );
  }
}
