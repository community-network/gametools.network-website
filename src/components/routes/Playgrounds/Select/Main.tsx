import * as React from "react";
import { Link } from "react-router-dom";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../../../assets/scss/App.scss";
import {
  AltText,
  SearchBox,
  BigButtonSecondary,
  RightArrow,
  Container,
  Align,
  BackButton,
} from "../../../Materials";

export const AltDescription = styled.p`
  ${AltText}
  margin-left: 24px;
`;

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
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [game, setGame] = React.useState<string>("bf2042");
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
    <Container>
      <BackButton text={t("getPlaygrounds.back")} location="/" />
      <Align>
        <h2>{t("getPlaygrounds.main")}</h2>
        <AltDescription>{t("getPlaygrounds.description")}</AltDescription>
      </Align>
      <Align>
        <form>
          <SearchBox
            placeholder={t("getPlaygrounds.getInfo")}
            value={searchTerm}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setSearchTerm(ev.target.value)
            }
          />
          {playground !== "" ? (
            <Link to={`/playgrounds/${game}/${getter}/${playground}`}>
              <BigButtonSecondary type="submit">
                {t("getPlaygrounds.show")} <RightArrow />
              </BigButtonSecondary>
            </Link>
          ) : (
            // if no valid playground is filled in
            <></>
            // <BigButtonSecondary disabled={true} type="submit">
            //   {t("getPlaygrounds.show")} <RightArrow />
            // </BigButtonSecondary>
          )}
        </form>
      </Align>
    </Container>
  );
}

export default Main;
