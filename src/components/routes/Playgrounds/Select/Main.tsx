import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import "../../../../assets/scss/App.scss";
import "../../../../locales/config";
import { BackButton, RightArrow } from "../../../Materials";
import * as styles from "./Main.module.scss";
import { useLocalStorage } from "@uidotdev/usehooks";

interface IUrl {
  valid_url: boolean;
  playground_id: string;
}

function get_playground_id(test_string: string): IUrl {
  let url: URL;

  try {
    url = new URL(test_string);
  } catch (_) {
    return {
      valid_url: false,
      playground_id: "",
    };
  }

  if (
    url.host !== "portal.battlefield.com" ||
    !url.searchParams.has("playgroundId")
  ) {
    return {
      valid_url: false,
      playground_id: "",
    };
  }

  return {
    valid_url: true,
    playground_id: url.searchParams.get("playgroundId"),
  };
}

function check_valid_playground_id(test_string: string): boolean {
  return !Boolean(
    test_string.search(
      /[a-z0-9]{4,}-[a-z0-9]{4,}-[a-z0-9]{4,}-[a-z0-9]{4,}-[a-z0-9]{4,}/,
    ),
  );
}

function check_valid_shortcode(test_string: string, game: string): boolean {
  if (game == "bf6") {
    return test_string.length == 5;
  }
  return test_string.length == 6;
}

function Main(): React.ReactElement {
  const { t } = useTranslation();
  const [game, setGame] = useLocalStorage<string>("experience_game", "bf6");
  React.useEffect(() => {
    document.title = `${t("siteFullName")} | ${t("getPlaygrounds.main")}`;
  }, []);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  let getter = "playgroundid";
  let playground = "";
  const isUrl = get_playground_id(searchTerm.trim());
  if (isUrl.valid_url) {
    if (check_valid_playground_id(isUrl.playground_id)) {
      playground = isUrl.playground_id;
    }
  } else {
    if (check_valid_playground_id(searchTerm.trim())) {
      playground = searchTerm.trim();
    }
  }

  if (check_valid_shortcode(searchTerm.trim(), game)) {
    getter = "experiencecode";
    playground = searchTerm.trim();
  }

  return (
    <div className="container">
      <BackButton text={t("getPlaygrounds.back")} location="/" />
      <div className="align">
        <h2>{t("getPlaygrounds.main")}</h2>
        <p className={styles.altDescription}>
          {t("getPlaygrounds.description")}
        </p>
      </div>
      <div className="align">
        <form>
          <input
            className="searchBox"
            placeholder={t("getPlaygrounds.getInfo")}
            value={searchTerm}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setSearchTerm(ev.target.value)
            }
          />
          <select
            aria-label={t("ariaLabels.game")}
            className="bigSelectSecondary"
            value={game}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setGame(ev.target.value)
            }
          >
            {["bf2042", "bf6"].map((key: string, index: number) => {
              return (
                <option key={index} value={key}>
                  {t(`games.${key}`)}
                </option>
              );
            })}
          </select>
          {playground !== "" && (
            <Link to={`/playgrounds/${game}/${getter}/${playground}`}>
              <button className="bigButtonSecondary" type="submit">
                {t("getPlaygrounds.show")} <RightArrow />
              </button>
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}

export default Main;
