import * as React from "react";
import "../../../locales/config";
import { useTranslation } from "react-i18next";
import {
  Align,
  Box,
  SmallSearchBox,
  SelectPrimary,
  Column,
  Row,
  AlignW,
} from "../../Materials";
import { MainStatsVehicle } from "../../../api/ReturnTypes";
import {
  Title,
  ListImage,
  Description,
  Spacing,
  Views,
  DynamicSort,
} from "./Main";

export function ViewVehicles(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortType, setSortType] = React.useState<string>("-kills");
  let vehicles = [];
  if (!props.loading && !props.error) {
    vehicles = props.stats.vehicles.filter((item: { vehicleName: string }) => {
      return item.vehicleName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    vehicles = vehicles.sort(DynamicSort(sortType));
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
            <option value="-killsPerMinute">{t("stats.rows.kpm")}</option>
            <option value="-destroyed">{t("stats.rows.destroyed")}</option>
          </SelectPrimary>
        </AlignW>
      </Align>
      {vehicles !== [] ? (
        <Box>
          {vehicles.map((key: MainStatsVehicle, index: number) => {
            return (
              <Column key={index}>
                <Row>
                  <h4>{key.vehicleName}</h4>
                  <ListImage src={key.image} />
                </Row>
                <Row>
                  <h4>{key.type}</h4>
                  <Description>{t("stats.rows.type")}</Description>
                </Row>
                <Row>
                  <h4>{key.kills}</h4>
                  <Description>{t("stats.rows.kills")}</Description>
                </Row>
                <Row>
                  <h4>{key.killsPerMinute}</h4>
                  <Description>{t("stats.rows.kpm")}</Description>
                </Row>
                <Row>
                  <h4>{key.destroyed}</h4>
                  <Description>{t("stats.rows.destroyed")}</Description>
                </Row>
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
