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
  TabletRow,
} from "../../../Materials";
import { MainStatsWeapon } from "../../../../api/ReturnTypes";
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

export function ViewWeapons(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortType, setSortType] = React.useState<string>("-kills");
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  let weapons = [];
  if (!props.loading && !props.error) {
    weapons = props?.stats?.weapons?.filter(
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
        return item?.weaponName?.toLowerCase().includes(searchTerm?.toLowerCase());
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
            <option value="-killsPerMinute">
              {t("stats.rows.killsPerMinute")}
            </option>
            <option value="-accuracy">{t("stats.rows.accuracy")}</option>
            <option value="-headshots">{t("stats.rows.headshots")}</option>
          </SelectPrimary>
        </AlignW>
      </Align>
      {weapons.length > 0 ? (
        <Box>
          {weapons.map((key: MainStatsWeapon, index: number) => {
            return (
              <Column key={index}>
                <Row>
                  <h4>{key?.weaponName}</h4>
                  <ListImage src={key?.image} />
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
                {key?.accuracy !== undefined && (
                  <TabletRow>
                    <h4>{numberFormat.format(key?.accuracy)}%</h4>
                    <Description>{t("stats.rows.accuracy")}</Description>
                  </TabletRow>
                )}
                {key?.damagePerMinute !== undefined && (
                  <TabletRow>
                    <h4>{numberFormat.format(key?.damagePerMinute)}</h4>
                    <Description>{t("stats.rows.damagePerMinute")}</Description>
                  </TabletRow>
                )}
                <PhoneRow>
                  <h4>{numberFormat.format(key?.headshots)}%</h4>
                  <Description>{t("stats.rows.headshots")}</Description>
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

export function WeaponGraph(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const [graphType, setGraphType] = React.useState<string>("kills");
  const [begin, setBegin] = React.useState<number>(0);
  let i = 0;
  let length = 0;
  const names = [];
  const values = [];
  if (!props.loading && !props.error) {
    length = props.stats.weapons.length;
    props.stats.weapons
      .sort(DynamicSort(`-${graphType}`))
      .map((item: MainStatsWeapon) => {
        if (i >= begin && i < begin + 25) {
          names.push(item?.weaponName);
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
        <Title>{t("stats.weaponGraph")}</Title>
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
            <option value="accuracy">{t("stats.rows.accuracy")}</option>
            <option value="headshots">{t("stats.rows.headshots")}</option>
          </SelectPrimary>
        </AlignW>
        <p />
        <SmallButtonSecondary style={{ marginRight: ".5rem" }} onClick={less}>
          &#60;
        </SmallButtonSecondary>
        <SmallButtonSecondary onClick={more}>&#62;</SmallButtonSecondary>
        <Description>
          {begin + 1}/{Math.min(length, begin + 25)} {t("stats.weapons")}
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
