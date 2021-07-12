import * as React from "react";
import "../../locales/config";
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../assets/scss/App.scss";
import { GetStats, PlatoonStats, PlatoonPlayer } from "../../api/GetStats";
import { useQuery } from "react-query";
import {
  AltText,
  Back,
  ArrowLeft,
  Container,
  Align,
  AlignW,
  Box,
} from "../Materials";
import { getLanguage } from "../../locales/config";

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
  margin-top: 2rem;
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

const MapImage = styled.img`
  margin-top: 12px;
  max-height: 4rem;
  margin-right: 0.7rem;
  border-radius: 2px;
`;

const PlatoonInfo = styled.div`
  margin-top: 6px;
`;

interface Views {
  loading: boolean;
  error: boolean;
  platoon: PlatoonStats;
}

function Results(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const platoon = props.platoon;
  if (!props.loading && !props.error) {
    const platoonMembers = {
      General: [],
      Colonel: [],
      Lieutenant: [],
      Private: [],
    };
    platoon.members.map((key: PlatoonPlayer) => {
      platoonMembers[key.role].push(key);
    });
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
        {Object.entries(platoonMembers).map((rank: unknown, index: number) => {
          return (
            <div key={index}>
              <Title>{t(`platoon.members.${rank[0]}`)}</Title>
              <Align>
                {platoonMembers[rank[0]].length !== 0 ? (
                  platoonMembers[rank[0]].map(
                    (member: PlatoonPlayer, index: number) => {
                      return (
                        <Box key={index}>
                          <AlignW>
                            <div>
                              <MapImage src={member.avatar} />
                            </div>
                            <PlatoonInfo>
                              <h3>{member.name}</h3>
                              <a
                                href={`https://gametools.network/stats/pc/playerid/${member.id}?game=bf1`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {t("stats.view")}
                              </a>
                            </PlatoonInfo>
                          </AlignW>
                        </Box>
                      );
                    },
                  )
                ) : (
                  <Box>
                    <p>{t("platoon.members.empty")}</p>
                  </Box>
                )}
              </Align>
            </div>
          );
        })}
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
