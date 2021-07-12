import * as React from "react";
import "../../locales/config";
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../assets/scss/App.scss";
import { GetStats, PlatoonStats } from "../../api/GetStats";
import { useQuery } from "react-query";
import {
  AltText,
  Back,
  ArrowLeft,
  Container,
  Align,
  AlignW,
  Box,
  Column,
  Row,
  SmallSearchBox,
  SelectPrimary,
  ButtonLink,
} from "../Materials";
import { getLanguage } from "../../locales/config";

const Spacing = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  ${AltText}
  line-height: 1;
  margin: 0.4rem 0;
`;

const DescriptionPart = styled.p`
  ${AltText}
  line-height: 1;
  margin: 0.4rem 0;
`;

const Title = styled.h2`
  margin: 0 33px;
  padding-bottom: 1rem;
`;

const PlatoonTitle = styled.h2`
  margin-top: 2.2rem;
  margin-bottom: 0.4rem;
`;

interface IPlatoonImage {
  background: string;
}

const PlatoonImage = styled.div<IPlatoonImage>`
  height: 11rem;
  min-width: 11rem;
  display: flex;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("${(props) => props.background}");
  margin-top: 6px;
  border-radius: 10px;
`;

const MemberImage = styled.img`
  max-width: 8rem;
  max-height: 3rem;
  margin-right: 1.5rem;
`;

interface Views {
  loading: boolean;
  error: boolean;
  platoon: PlatoonStats;
}

function dynamicSort(property: string) {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a: {}, b: {}) {
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

function Results(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const platoon = props.platoon;

  let members = [];
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortType, setSortType] = React.useState<string>("-kills");

  if (!props.loading && !props.error) {
    members = platoon.members.filter((item: { name: string; role: any }) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    members = members.sort(dynamicSort(sortType));
    return (
      <div>
        <AlignW>
          <PlatoonImage background={platoon.emblem} />
          <div style={{ marginLeft: "0.5rem" }}>
            <PlatoonTitle>
              [{platoon.tag}] {platoon.name}
            </PlatoonTitle>
            <Description>{platoon.currentSize} / 100</Description>
            {platoon.description !== null ? (
              <Description>
                {platoon.description
                  .split(". ")
                  .map(function (descPart: string, idx: number) {
                    return (
                      <DescriptionPart key={idx}>{descPart}. </DescriptionPart>
                    );
                  })}
              </Description>
            ) : (
              <></>
            )}
          </div>
        </AlignW>
        <Spacing>
          <Align>
            <Title>{t("platoon.members.main")}</Title>
            <AlignW>
              <SmallSearchBox
                placeholder={t("platoon.searchPlayer")}
                value={searchTerm}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setSearchTerm(ev.target.value)
                }
              />
              <SelectPrimary
                value={sortType}
                onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
                  setSortType(ev.target.value)
                }
              >
                <option value="default">{t("platoon.rows.role")}</option>
                <option value="name">{t("platoon.rows.name")}</option>
              </SelectPrimary>
            </AlignW>
          </Align>
          {platoon.members !== [] ? (
            <Box>
              <div>
                {members.map((key: any, index: number) => {
                  return (
                    <div key={index} style={{ margin: "0.8rem 0.2rem" }}>
                      <Column style={{ marginTop: 0 }}>
                        <Row>
                          <Align>
                            <MemberImage src={key.avatar} />
                            <h4 style={{ marginTop: "2px", marginBottom: 0 }}>
                              {key.name}
                            </h4>
                          </Align>
                        </Row>
                        <Row>
                          <h4>{key.role}</h4>
                        </Row>
                        <Row>
                          <ButtonLink
                            style={{ marginTop: ".3rem" }}
                            href={`https://gametools.network/stats/pc/playerid/${key.id}?game=bf1`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {t("stats.view")}
                          </ButtonLink>
                        </Row>
                      </Column>
                      <hr
                        style={{
                          marginTop: "0.6rem",
                          width: "98%",
                          border: "1px solid #282a3a",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </Box>
          ) : (
            <Box>
              <p>{t("loading")}</p>
            </Box>
          )}
        </Spacing>
      </div>
    );
  } else {
    return (
      <Box>
        <h3>{t("loading")}</h3>
      </Box>
    );
  }
}

type TParams = {
  gid: string;
};

function Platoon({ match }: RouteComponentProps<TParams>): React.ReactElement {
  const platoonId = match.params.gid;

  const { t } = useTranslation();
  const {
    isLoading: loading,
    isError: error,
    data: platoon,
  } = useQuery("detailed" + platoonId, () =>
    GetStats.platoon({
      id: platoonId,
      lang: getLanguage(),
    }),
  );
  return (
    <div>
      <Container>
        <Back to="/platoons">
          <ArrowLeft />
          {t("platoon.back")}
        </Back>
        <Results loading={loading} platoon={platoon} error={error} />
      </Container>
    </div>
  );
}

export default Platoon;
