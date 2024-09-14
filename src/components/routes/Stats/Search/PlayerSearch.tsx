import { useLocalStorage } from "@uidotdev/usehooks";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { platformGames, statsPlatforms } from "../../../../api/static";
import "../../../../assets/scss/App.scss";
import "../../../../locales/config";
import ErrorBoundary from "../../../functions/ErrorBoundary";
import { BackButton, RightArrow } from "../../../Materials";
import { Graphs } from "./Graphs";
import * as styles from "./PlayerSearch.module.scss";

export function StatSearch(): React.ReactElement {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [platform, setPlatform] = useLocalStorage<string>(
    "statSearch_platform",
    "pc",
  );
  const searchBox: React.MutableRefObject<HTMLInputElement> = React.useRef();

  return (
    <form
      style={{
        position: "relative",
      }}
    >
      <div className={styles.alignMain}>
        <div className={styles.alignSearch}>
          <input
            className="homePlayerSearchBox"
            ref={searchBox}
            placeholder={t("playerSearch.searchPlaceholder")}
            value={searchTerm}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setSearchTerm(ev.target.value)
            }
          />
          <select
            aria-label={t("ariaLabels.platform")}
            className="homePlayerBigSelectSecondary"
            value={platform}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setPlatform(ev.target.value)
            }
          >
            {statsPlatforms.map((key, index) => {
              return (
                <option key={index} value={key}>
                  {t(`statPlatforms.${key}`)}
                </option>
              );
            })}
          </select>
        </div>
        {searchTerm !== "" ? (
          <Link
            className={styles.statsLink}
            to={`/stats/${platform}/name/${encodeURIComponent(searchTerm)}`}
          >
            <button className="bigButtonPrimary" type="submit">
              {t("playerSearch.search")} <RightArrow />
            </button>
          </Link>
        ) : (
          // if no name is filled in
          <button className="bigButtonPrimary" type="submit">
            {t("playerSearch.search")} <RightArrow />
          </button>
        )}
      </div>
    </form>
  );
}

function Main(): React.ReactElement {
  return (
    <div className="container">
      <Search />
      <ErrorBoundary>
        <Graphs />
      </ErrorBoundary>
    </div>
  );
}

function Search(): React.ReactElement {
  const { t } = useTranslation();
  document.title = `${t("siteFullName")} | ${t("playerSearch.bfStats")}`;
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [platform, setPlatform] = useLocalStorage<string>(
    "statSearch_platform",
    "pc",
  );
  const [game, setGame] = useLocalStorage<string>("stats_game", "bf1");
  const searchBox: React.MutableRefObject<HTMLInputElement> = React.useRef();
  return (
    <>
      <BackButton text={t("playerSearch.back")} location="/" />
      <div className="align">
        <h2>{t("playerSearch.bfStats")}</h2>
        <p className={styles.altDescription}>{t("playerSearch.description")}</p>
      </div>
      <div className="align">
        <form style={{ position: "relative" }}>
          <input
            className="searchBox"
            ref={searchBox}
            placeholder={t("playerSearch.searchPlaceholder")}
            value={searchTerm}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setSearchTerm(ev.target.value)
            }
          />
          <select
            aria-label={t("ariaLabels.platform")}
            className="bigSelectSecondary"
            value={platform}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setPlatform(ev.target.value)
            }
          >
            {statsPlatforms.map((key, index) => {
              return (
                <option key={index} value={key}>
                  {t(`statPlatforms.${key}`)}
                </option>
              );
            })}
          </select>
          <select
            aria-label={t("ariaLabels.game")}
            className="bigSelectSecondary"
            value={game}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setGame(ev.target.value)
            }
          >
            {platformGames[platform].map((key: string, index: number) => {
              return (
                <option key={index} value={key}>
                  {t(`games.${key}`)}
                </option>
              );
            })}
          </select>
          {searchTerm !== "" ? (
            <Link
              to={`/stats/${platform}/name/${encodeURIComponent(
                searchTerm,
              )}?game=${game}`}
            >
              <button className="bigButtonSecondary" type="submit">
                {t("playerSearch.search")} <RightArrow />
              </button>
            </Link>
          ) : (
            // if no name is filled in
            <button className="bigButtonSecondary" type="submit">
              {t("playerSearch.search")} <RightArrow />
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default Main;
