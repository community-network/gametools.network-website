import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import "../../../../assets/scss/App.scss";
import "../../../../locales/config";
import { BackButton, RightArrow } from "../../../Materials";
import * as styles from "./Main.module.scss";

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

function check_valid_shortcode(test_string: string): boolean {
  return test_string.length == 6;
}

function Main(): React.ReactElement {
  const { t } = useTranslation();
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

  if (check_valid_shortcode(searchTerm.trim())) {
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
          {playground !== "" ? (
            <Link to={`/playgrounds/bf2042/${getter}/${playground}`}>
              <button className="bigButtonSecondary" type="submit">
                {t("getPlaygrounds.show")} <RightArrow />
              </button>
            </Link>
          ) : (
            // if no valid playground is filled in
            <></>
            // <button className="bigButtonSecondary" disabled={true} type="submit">
            //   {t("getPlaygrounds.show")} <RightArrow />
            // </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Main;
