import * as React from "react";
import "../../locales/config";
import { Link, useHistory, withRouter, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../assets/scss/App.scss";
import { GetStats } from "../../api/GetStats";
import { useQuery } from "react-query";
import {
  AltText,
  SearchBox,
  Back,
  ArrowLeft,
  Container,
  BigSelectSecondary,
  Align,
  AlignW,
  Box,
} from "../Materials";
import { getLanguage } from "../../locales/config";
import { frostbite3 } from "../../api/static";

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
  platoons: { [name: string]: any };
}

function Results(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.platoons;
  if (!props.loading && !props.error) {
    if (stats.platoons.length == 0) {
      return (
        <Spacing>
          <Description>{t("resultNotFound")}</Description>
        </Spacing>
      );
    }
    return (
      <Spacing>
        {stats.platoons.map((key: any, index: number) => {
          return (
            <Link key={index} to={`/platoons/${key.id}`}>
              <Box>
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
            </Link>
          );
        })}
      </Spacing>
    );
  } else {
    return (
      <Box>
        <h3>{t("loading")}</h3>
      </Box>
    );
  }
}

function Search(): React.ReactElement {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const history = useHistory();
  // get info from query ?search &game
  const query = new URLSearchParams(useLocation().search);
  const nameQuery = query.get("search");
  React.useState(() => {
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
    history.push({ search: params.toString() });
  }, [searchTerm, history]);

  const { t } = useTranslation();
  const {
    isLoading: loading,
    isError: error,
    data: platoons,
  } = useQuery("platoons" + searchTerm, () =>
    GetStats.platoonSearch({
      name: searchTerm,
      lang: getLanguage(),
    }),
  );
  return (
    <Container>
      <Back to="/">
        <ArrowLeft />
        {t("platoonSearch.back")}
      </Back>
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
        {/* <BigButtonSecondary type="submit">{t("serverSearch.search")} <RightArrow/></BigButtonSecondary> */}
      </Align>
      <Title>{t("platoonSearch.results")}</Title>
      <Results loading={loading} platoons={platoons} error={error} />
    </Container>
  );
}

export default withRouter(Search);
