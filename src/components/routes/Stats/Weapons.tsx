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
import { MainStatsWeapon } from "../../../api/ReturnTypes";
import {
  Title,
  ListImage,
  Description,
  Spacing,
  Views,
  DynamicSort,
} from "./Main";

export function ViewWeapons(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortType, setSortType] = React.useState<string>("-kills");
  let weapons = [];
  if (!props.loading && !props.error) {
    weapons = props.stats.weapons.filter(
      (item: {
        weaponName: string;
        accuracy: string | number;
        headshots: string | number;
      }) => {
        if (
          typeof item.accuracy == "string" &&
          typeof item.headshots == "string"
        ) {
          item.accuracy = parseInt(item.accuracy.replace("%", ""));
          item.headshots = parseInt(item.headshots.replace("%", ""));
        }
        return item.weaponName.toLowerCase().includes(searchTerm.toLowerCase());
      },
    );
    weapons = weapons.sort(DynamicSort(sortType));
  }
  return (
    <Spacing>
      <Align>
        <Title>{t("stats.weapons")}</Title>
        <AlignW>
          <SmallSearchBox
            placeholder={t("stats.searchWeapon")}
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
            <option value="weaponName">{t("stats.rows.weaponName")}</option>
            <option value="type">{t("stats.rows.type")}</option>
            <option value="-kills">{t("stats.rows.kills")}</option>
            <option value="-killsPerMinute">{t("stats.rows.kpm")}</option>
            <option value="-accuracy">{t("stats.rows.accuracy")}</option>
            <option value="-headshots">{t("stats.rows.headshots")}</option>
          </SelectPrimary>
        </AlignW>
      </Align>
      {weapons !== [] ? (
        <Box>
          {weapons.map((key: MainStatsWeapon, index: number) => {
            return (
              <Column key={index}>
                <Row>
                  <h4>{key.weaponName}</h4>
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
                  <h4>{key.accuracy}%</h4>
                  <Description>{t("stats.rows.accuracy")}</Description>
                </Row>
                <Row>
                  <h4>{key.headshots}%</h4>
                  <Description>{t("stats.rows.headshots")}</Description>
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
