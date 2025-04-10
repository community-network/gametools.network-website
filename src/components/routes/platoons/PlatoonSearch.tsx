import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { GametoolsApi } from "../../../api/GametoolsApi";
import { PlatoonResult, PlatoonSearchResult } from "../../../api/ReturnTypes";
import "../../../assets/scss/App.scss";
import "../../../locales/config";
import { getLanguage } from "../../../locales/config";
import { BackButton, Box } from "../../Materials";
import { PlatoonInfo } from "./Platoon";
import * as styles from "./PlatoonSearch.module.scss";

interface Views {
  loading: boolean;
  error: boolean;
  platoons: PlatoonSearchResult;
  platform: string;
  setPlatoonId: React.Dispatch<React.SetStateAction<string>>;
}

function PlatoonLoading(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <Box className="box_hover box" link={""} condition={true}>
      <div className="alignW">
        <div>
          <div
            className={styles.platoonImage}
            style={{ backgroundImage: `url("")` }}
          ></div>
        </div>
        <div className={styles.platoonInfo}>
          <h3 style={{ color: "gray" }}>{t("loading")}</h3>
          <p style={{ color: "gray" }}>0 / 0</p>
        </div>
      </div>
    </Box>
  );
}

function Results(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.platoons;
  const [width, setWidth] = React.useState<number>(window.innerWidth);
  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);
  if (!props.loading) {
    if (stats?.platoons == undefined || stats?.platoons?.length == 0) {
      return (
        <div className={styles.spacing}>
          <p className={styles.description}>
            {t("platoonSearch.resultNotFound")}
          </p>
        </div>
      );
    }
    return (
      <div className={styles.spacing}>
        {stats?.platoons?.map((key: PlatoonResult, index: number) => {
          return (
            <Box
              style={{ cursor: "pointer" }}
              className="box_hover box"
              link={`/platoons/${props.platform}/${key.id}`}
              condition={width <= 1800}
              onClick={() => props.setPlatoonId(key.id)}
              key={index}
            >
              <div className="alignW">
                <div>
                  <div
                    className={styles.platoonImage}
                    style={{ backgroundImage: `url("${key.emblem}")` }}
                  ></div>
                </div>
                <div className={styles.platoonInfo}>
                  <h3>{key.name}</h3>
                  <p>{key.currentSize} / 100</p>
                </div>
              </div>
            </Box>
          );
        })}
      </div>
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
  const [platoonId, setPlatoonId] = React.useState<string>("");
  const history = useNavigate();
  // get info from query ?search &game
  const query = new URLSearchParams(useLocation().search);
  const platformQuery = query.get("platform");
  const nameQuery = query.get("search");
  const platoonQuery = query.get("platoon");
  React.useState(() => {
    if (platformQuery !== null) {
      setPlatform(platformQuery);
    }
    if (nameQuery !== null) {
      setSearchTerm(nameQuery);
    }
    if (platoonQuery !== null) {
      setPlatoonId(platoonQuery);
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
    if (platoonId) {
      params.append("platoon", platoonId);
    } else {
      params.delete("platoon");
    }
    history({ search: params.toString() }, { replace: true });
  }, [searchTerm, platform, platoonId, history]);

  // sidebar redirect if platoonId is set but screen is to small to display it
  React.useEffect(() => {
    if (window.innerWidth <= 1800 && platoonId !== "") {
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
      history({ search: params.toString() }, { replace: true });
      history(`/platoons/${platform}/${platoonId}`);
    }
  }, []);

  const { t } = useTranslation();
  React.useEffect(() => {
    document.title = `${t("siteFullName")} | ${t("platoonSearch.serverInfo")}`;
  }, []);
  const {
    isLoading: loading,
    isError: error,
    data: platoons,
  } = useQuery({
    queryKey: ["platoons" + searchTerm + platform],
    queryFn: () =>
      GametoolsApi.platoonSearch({
        name: searchTerm,
        platform: platform,
        lang: getLanguage(),
      }),
  });
  return (
    <div className="container">
      <BackButton text={t("platoonSearch.back")} location="/" />
      <div className="pageColumn">
        <div className="pageRow">
          <div className="align">
            <h2>{t("platoonSearch.serverInfo")}</h2>
            <p className={styles.altDescription}>
              {t("platoonSearch.description")}
            </p>
          </div>
          <div className="align">
            <input
              className="searchBox"
              placeholder={t("platoonSearch.searchPlaceholder")}
              value={searchTerm}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setSearchTerm(ev.target.value)
              }
            />
            <select
              aria-label={t("ariaLabels.chartType")}
              className="bigSelectSecondary"
              value={platform}
              onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
                setPlatform(ev.target.value)
              }
            >
              <option value="pc">{t("platforms.pc")}</option>
              <option value="xboxone">{t("platforms.xboxone")}</option>
              <option value="ps4">{t("platforms.ps4")}</option>
            </select>
            {/* <button className="bigButtonSecondary" type="submit">{t("serverSearch.search")} <RightArrow/></button> */}
          </div>
          <div className="align">
            <h1
              style={{
                marginTop: "2rem",
              }}
            >
              {t("platoonSearch.results")}
            </h1>
            <p
              style={{
                marginTop: "2rem",
              }}
              className={styles.altDescription}
            >
              {t("platoonSearch.sidebarInfo")}
            </p>
          </div>
          <Results
            loading={loading}
            platoons={platoons}
            platform={platform}
            error={error}
            setPlatoonId={setPlatoonId}
          />
        </div>
        {platoonId !== "" && (
          <div className="pageRow hideOnSmallScreen">
            <PlatoonInfo
              platform={platform}
              platoonId={platoonId}
              sidebar={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
