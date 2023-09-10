import * as React from "react";
import "../../../locales/config";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../../assets/scss/App.scss";
import { GametoolsApi } from "../../../api/GametoolsApi";
import { useQuery } from "@tanstack/react-query";
import {
  AltText,
  SearchBox,
  Container,
  Align,
  AlignW,
  Box,
  BigSelectSecondary,
  BackButton,
} from "../../Materials";
import { getLanguage } from "../../../locales/config";
import { PlatoonResult, PlatoonSearchResult } from "../../../api/ReturnTypes";
import { useLocalStorage } from "react-use";

const Description = styled.p`
  ${AltText}
`;

const AltDescription = styled.p`
  ${AltText}
  margin-left: 24px;
`;

const Title = styled.h2`
  margin-top: 2rem;
`;

interface IServerImage {
  background: string;
}

const PlatoonImage = styled.div<IServerImage>`
  margin-top: 12px;
  height: 4rem;
  min-width: 4rem;
  margin-right: 1.5rem;
  border-radius: 2px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("${(props) => props.background}");
`;

const PlatoonInfo = styled.div`
  margin-top: 16px;
`;

const Spacing = styled.div`
  margin-bottom: 2rem;
`;

interface Views {
  loading: boolean;
  error: boolean;
  platoons: PlatoonSearchResult;
  platform: string;
}

function PlatoonLoading(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <Box className="box_hover box" link={""} condition={true}>
      <AlignW>
        <div>
          <PlatoonImage background={""}></PlatoonImage>
        </div>
        <PlatoonInfo>
          <h3 style={{ color: "gray" }}>{t("loading")}</h3>
          <p style={{ color: "gray" }}>0 / 0</p>
        </PlatoonInfo>
      </AlignW>
    </Box>
  );
}

function Results(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.platoons;
  if (!props.loading) {
    if (stats?.platoons == undefined || stats?.platoons?.length == 0) {
      return (
        <Spacing>
          <Description>{t("platoonSearch.resultNotFound")}</Description>
        </Spacing>
      );
    }
    return (
      <Spacing>
        {stats?.platoons?.map((key: PlatoonResult, index: number) => {
          return (
            <Box
              className="box_hover box"
              link={`/platoons/${props.platform}/${key.id}`}
              condition={true}
              key={index}
            >
              <AlignW>
                <div>
                  <PlatoonImage background={key.emblem}></PlatoonImage>
                </div>
                <PlatoonInfo>
                  <h3>{key.name}</h3>
                  <p>{key.currentSize} / 100</p>
                </PlatoonInfo>
              </AlignW>
            </Box>
          );
        })}
      </Spacing>
    );
  } else {
    return (
      <>
        {[...Array(3)].map((key) => (
          <PlatoonLoading key={key} />
        ))}
      </>
    );
  }
}

function Search(): React.ReactElement {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [platform, setPlatform] = useLocalStorage<string>(
    "platoonSearch_platform",
    "pc",
  );
  const history = useNavigate();
  // get info from query ?search &game
  const query = new URLSearchParams(useLocation().search);
  const platformQuery = query.get("platform");
  const nameQuery = query.get("search");
  React.useState(() => {
    if (platformQuery !== null) {
      setPlatform(platformQuery);
    }
    if (nameQuery !== null) {
      setSearchTerm(nameQuery);
    }
  });

  // change top to query
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.append("search", searchTerm);
    } else {
      params.delete("search");
    }
    if (platform) {
      params.append("platform", platform);
    } else {
      params.delete("platform");
    }
    history({ search: params.toString() });
  }, [searchTerm, platform, history]);

  const { t } = useTranslation();
  const {
    isLoading: loading,
    isError: error,
    data: platoons,
  } = useQuery(["platoons" + searchTerm + platform], () =>
    GametoolsApi.platoonSearch({
      name: searchTerm,
      platform: platform,
      lang: getLanguage(),
    }),
  );
  return (
    <Container>
      <BackButton text={t("platoonSearch.back")} location="/" />
      <Align>
        <h2>{t("platoonSearch.serverInfo")}</h2>
        <AltDescription>{t("platoonSearch.description")}</AltDescription>
      </Align>
      <Align>
        <SearchBox
          placeholder={t("platoonSearch.searchPlaceholder")}
          value={searchTerm}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setSearchTerm(ev.target.value)
          }
        />
        <BigSelectSecondary
          value={platform}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setPlatform(ev.target.value)
          }
        >
          <option value="pc">{t("platforms.pc")}</option>
          <option value="xboxone">{t("platforms.xboxone")}</option>
          <option value="ps4">{t("platforms.ps4")}</option>
        </BigSelectSecondary>
        {/* <BigButtonSecondary type="submit">{t("serverSearch.search")} <RightArrow/></BigButtonSecondary> */}
      </Align>
      <Title>{t("platoonSearch.results")}</Title>
      <Results
        loading={loading}
        platoons={platoons}
        platform={platform}
        error={error}
      />
    </Container>
  );
}

export default Search;
