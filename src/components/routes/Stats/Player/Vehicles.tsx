import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import {
  Align,
  Box,
  SmallSearchBox,
  SelectPrimary,
  Column,
  Row,
  AlignW,
  SmallButtonSecondary,
  PhoneRow,
} from "../../../Materials";
import { MainStatsVehicle } from "../../../../api/ReturnTypes";
import {
  Title,
  ListImage,
  Description,
  Spacing,
  Views,
  DynamicSort,
} from "./Main";
import { BarGraph } from "../../../graphing/bar";
import ErrorBoundary from "../../../functions/ErrorBoundary";
import sslFix from "../../../functions/fixEaAssets";

export function ViewVehicles(props: Readonly<Views>): React.ReactElement {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortType, setSortType] = React.useState<string>("-kills");
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  let vehicles = [];
  if (!props.loading && !props.error) {
    if (props?.stats?.vehicles) {
      vehicles = props.stats.vehicles.filter(
        (item: { vehicleName: string }) => {
          return item?.vehicleName
            ?.toLowerCase()
            .includes(searchTerm?.toLowerCase());
        },
      );
      vehicles = vehicles.sort(DynamicSort(sortType));
    }
  }
  return (
    <Spacing>
      <Align>
        <Title>{t("stats.vehicles")}</Title>
        <AlignW>
          <SmallSearchBox
            placeholder={t("stats.searchVehicle")}
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
            <option value="vehicleName">{t("stats.rows.vehicleName")}</option>
            <option value="type">{t("stats.rows.type")}</option>
            <option value="-kills">{t("stats.rows.kills")}</option>
            <option value="-killsPerMinute">
              {t("stats.rows.killsPerMinute")}
            </option>
            <option value="-destroyed">{t("stats.rows.destroyed")}</option>
          </SelectPrimary>
        </AlignW>
      </Align>
      {vehicles.length > 0 ? (
        <Box>
          {vehicles.map((key: MainStatsVehicle, index: number) => {
            return (
              <Column key={index}>
                <Row>
                  <h4>{key?.vehicleName}</h4>
                  <ListImage src={sslFix(key?.image)} loading="lazy" />
                </Row>
                <Row>
                  <h4>{key?.type}</h4>
                  <Description>{t("stats.rows.type")}</Description>
                </Row>
                <Row>
                  <h4>{numberFormat.format(key?.kills)}</h4>
                  <Description>{t("stats.rows.kills")}</Description>
                </Row>
                <Row>
                  <h4>{numberFormat.format(key?.killsPerMinute)}</h4>
                  <Description>{t("stats.rows.killsPerMinute")}</Description>
                </Row>
                <PhoneRow>
                  <h4>{numberFormat.format(key?.destroyed)}</h4>
                  <Description>{t("stats.rows.destroyed")}</Description>
                </PhoneRow>
              </Column>
            );
          })}
        </Box>
      ) : (
        <Box>
          <p>{t("loading")}</p>
        </Box>
      )}
    </Spacing>
  );
}

export function VehicleGraph(props: Readonly<Views>): React.ReactElement {
  const { t } = useTranslation();
  const [graphType, setGraphType] = React.useState<string>("kills");
  const [begin, setBegin] = React.useState<number>(0);
  let i = 0;
  let length = 0;
  const names = [];
  const values = [];
  if (!props.loading && !props.error) {
    length = props.stats.vehicles?.length;
    props.stats.vehicles
      ?.sort(DynamicSort(`-${graphType}`))
      .map((item: MainStatsVehicle) => {
        if (i >= begin && i < begin + 25) {
          names.push(item.vehicleName);
          values.push(item[graphType]);
        }
        i += 1;
      });
  }
  const less = () => setBegin(Math.max(0, begin - 25));
  const more = () => setBegin(Math.min(length - 1, begin + 25));
  return (
    <Spacing>
      <Align>
        <Title>{t("stats.vehicleGraph")}</Title>
        <AlignW style={{ marginRight: "1rem" }}>
          <SelectPrimary
            value={graphType}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setGraphType(ev.target.value)
            }
          >
            <option value="kills">{t("stats.rows.kills")}</option>
            <option value="killsPerMinute">
              {t("stats.rows.killsPerMinute")}
            </option>
            <option value="destroyed">{t("stats.rows.destroyed")}</option>
          </SelectPrimary>
        </AlignW>
        <p />
        <SmallButtonSecondary style={{ marginRight: ".5rem" }} onClick={less}>
          &#60;
        </SmallButtonSecondary>
        <SmallButtonSecondary onClick={more}>&#62;</SmallButtonSecondary>
        <Description>
          {begin + 1}/{Math.min(length, begin + 25)} {t("stats.vehicles")}
        </Description>
      </Align>
      {names.length > 0 ? (
        <Box>
          <ErrorBoundary>
            <BarGraph
              names={names}
              values={values}
              valueName={graphType}
              loading={props.loading}
              error={props.error}
            />
          </ErrorBoundary>
        </Box>
      ) : (
        <Box>
          <p>{t("loading")}</p>
        </Box>
      )}
    </Spacing>
  );
}
