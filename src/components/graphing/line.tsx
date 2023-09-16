import * as React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { GametoolsApi } from "../../api/GametoolsApi";
import { graphGames, gameGraphConvert, graphColors } from "../../api/static";
import {
  Align,
  Box,
  BoxSpacing,
  BoxWrap,
  Column,
  Row,
  SelectPrimary,
} from "../Materials";
import { GlobalGraphReturn } from "../../api/GametoolsApi";
import { useMeasure } from "react-use";
import styled from "styled-components";
import ErrorBoundary from "../functions/ErrorBoundary";
import { ServerPieChart } from "./pie";
import { DetailedServerInfo } from "../../api/ReturnTypes";

ChartJS.register(
  zoomPlugin,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Filler,
);

interface GraphData {
  loading: boolean;
  error: boolean;
  stats: { [name: string]: any };
  gameName: string;
  platform: string;
  timeStamps: [string];
}

interface GlobalInfo {
  platform: string;
}

const borderPlugin = {
  id: "chartAreaBorder",
  beforeDraw(chart) {
    const {
      ctx,
      chartArea: { left, top, width, height },
    } = chart;
    if (chart.options.plugins.zoom.zoom.wheel.enabled) {
      ctx.save();
      ctx.strokeStyle = "red";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    }
  },
};

function LineGraph(props: GraphData): React.ReactElement {
  if (!props.loading && !props.error) {
    const { t, i18n } = useTranslation();
    const chartRef = React.useRef(null);
    const time = props.timeStamps.map((e: string) => {
      const time = new Date(e);
      return time;
    });

    const data = [];

    let color = 0;
    for (const [key, value] of Object.entries(props.stats)) {
      data.push({
        label: i18n.exists(`stats.graph.${key}`)
          ? t(`stats.graph.${key}`)
          : key,
        data: value,
        fill: false,
        borderColor: graphColors[color],
        pointRadius: 0,
      });
      color += 1;
    }

    return (
      <div>
        <Line
          ref={chartRef}
          options={{
            hover: {
              intersect: false,
              mode: "nearest",
            },
            scales: {
              x: {
                type: "time",
                ticks: {
                  autoSkip: true,
                  autoSkipPadding: 50,
                  maxRotation: 0,
                },
                time: {
                  displayFormats: {
                    hour: "HH:mm, eee d LLL",
                  },
                },
              },
            },
            onClick() {
              const chart = chartRef.current;
              chart.options.plugins.zoom.zoom.wheel.enabled =
                !chart.options.plugins.zoom.zoom.wheel.enabled;
              chart.options.plugins.zoom.zoom.pinch.enabled =
                !chart.options.plugins.zoom.zoom.pinch.enabled;
              chart.update();
            },
            plugins: {
              tooltip: {
                mode: "nearest",
                intersect: false,
              },
              zoom: {
                limits: {
                  x: {
                    min: +new Date() - 604800000,
                    max: +new Date(),
                    minRange: 50000000,
                  },
                },
                pan: {
                  enabled: true,
                  mode: "x",
                },
                zoom: {
                  wheel: {
                    enabled: false,
                  },
                  pinch: {
                    enabled: false,
                  },
                  mode: "x",
                },
              },
            },
          }}
          style={{ height: "15rem" }}
          data={{
            labels: time,
            datasets: data,
          }}
          plugins={[borderPlugin]}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function AllPlatformGraph(props: GraphData): React.ReactElement {
  if (!props.loading && !props.error) {
    const { t } = useTranslation();
    const chartRef = React.useRef(null);
    const time = props.timeStamps.map((e: string) => {
      const time = new Date(e);
      return time;
    });

    const data = [];

    let color = 0;
    if (props.gameName !== "bf2042portal") {
      for (const [key, value] of Object.entries(props.stats)) {
        data.push({
          label: t(`platforms.${key}`),
          data: value.soldierAmount,
          fill: false,
          borderColor: graphColors[color],
          pointRadius: 0,
        });
        color += 1;
      }
    } else {
      data.push({
        label: t("platforms.global"),
        data: props.stats.soldierAmount,
        fill: false,
        borderColor: graphColors[0],
        pointRadius: 0,
      });
    }

    return (
      <div>
        <Line
          ref={chartRef}
          options={{
            hover: {
              intersect: false,
              mode: "nearest",
            },
            scales: {
              x: {
                type: "time",
                ticks: {
                  autoSkip: true,
                  autoSkipPadding: 50,
                  maxRotation: 0,
                },
                time: {
                  displayFormats: {
                    hour: "HH:mm, eee d LLL",
                  },
                },
              },
            },
            onClick() {
              const chart = chartRef.current;
              chart.options.plugins.zoom.zoom.wheel.enabled =
                !chart.options.plugins.zoom.zoom.wheel.enabled;
              chart.options.plugins.zoom.zoom.pinch.enabled =
                !chart.options.plugins.zoom.zoom.pinch.enabled;
              chart.update();
            },
            plugins: {
              tooltip: {
                mode: "nearest",
                intersect: false,
              },
              zoom: {
                limits: {
                  x: {
                    min: +new Date() - 604800000,
                    max: +new Date(),
                    minRange: 50000000,
                  },
                },
                pan: {
                  enabled: true,
                  mode: "x",
                },
                zoom: {
                  wheel: {
                    enabled: false,
                  },
                  pinch: {
                    enabled: false,
                  },
                  mode: "x",
                },
              },
            },
          }}
          plugins={[borderPlugin]}
          style={{ height: "15rem" }}
          data={{
            labels: time,
            datasets: data,
          }}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
}

interface GameInfo {
  gameName: string;
  platform: string;
}

interface NewGameInfo {
  gameName: string;
  platform: string;
  graphOptions: string;
}

export function OldGameGraph(props: GameInfo): React.ReactElement {
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery(
    ["regions", "7", "all", props.gameName, props.platform],
    () =>
      GametoolsApi.graphs({
        game: props.gameName,
        days: "7",
        region: "all",
        platform: props.platform,
      }),
    { staleTime: Infinity, refetchOnWindowFocus: false },
  );
  const { t } = useTranslation();
  if (!loading && !error) {
    return (
      <Box>
        <h3>{t(`regions.all`)}</h3>
        {props.platform !== "all" ? (
          <LineGraph
            timeStamps={stats.timeStamps}
            loading={loading}
            error={error}
            platform={props.platform}
            stats={stats}
            gameName={props.gameName}
          />
        ) : (
          <AllPlatformGraph
            timeStamps={stats.timeStamps}
            loading={loading}
            error={error}
            platform={props.platform}
            stats={stats}
            gameName={props.gameName}
          />
        )}
      </Box>
    );
  } else {
    return <h3>{t("loading")}</h3>;
  }
}

export function Graph(props: NewGameInfo): React.ReactElement {
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery(
    [
      "regions",
      "7",
      "multiple",
      props.gameName,
      props.platform,
      props.graphOptions,
    ],
    () =>
      GametoolsApi.graphs({
        game:
          props.gameName in gameGraphConvert
            ? gameGraphConvert[props.gameName]
            : props.gameName,
        days: "7",
        region: "multiple",
        platform: props.platform,
        type: props.graphOptions,
      }),
    { staleTime: Infinity, refetchOnWindowFocus: false },
  );
  const { t } = useTranslation();
  if (!loading && !error) {
    return (
      <>
        {Object.keys(stats).map((key: string, index: number) => {
          {
            if (["timeStamps", "startTime", "endTime"].includes(key)) {
              return <></>;
            } else {
              return (
                <Box key={index}>
                  <h3>{t(`regions.${key.toLowerCase()}`)}</h3>
                  {props.platform !== "all" ? (
                    <LineGraph
                      timeStamps={stats.timeStamps}
                      loading={loading}
                      error={error}
                      platform={props.platform}
                      stats={stats[key]}
                      gameName={props.gameName}
                    />
                  ) : (
                    <AllPlatformGraph
                      timeStamps={stats.timeStamps}
                      loading={loading}
                      error={error}
                      platform={props.platform}
                      stats={stats[key]}
                      gameName={props.gameName}
                    />
                  )}
                </Box>
              );
            }
          }
        })}
      </>
    );
  } else {
    return (
      <Box>
        <h3>{t("loading")}</h3>
      </Box>
    );
  }
}

function GlobalLineGraph(props: GraphData): React.ReactElement {
  const [graphRef, { width }] = useMeasure();
  const chartRef = React.useRef(null);
  const { t } = useTranslation();
  if (!props.loading && !props.error) {
    const time = props.stats.timeStamps.map((e: string) => {
      const time = new Date(e);
      return time;
    });
    const games = graphGames[props.platform].filter((e: string) => {
      if (e !== "bfglobal") {
        return e;
      }
    });
    const data = {
      labels: time,
      datasets: games.map((e: string, index: number) => {
        let gameName = e;
        const gameStuff = e.split(".");
        if (gameStuff[0] == "bf2") {
          gameName = gameStuff[1];
        }
        if (width > 500) {
          return {
            label: t(`games.${e}`),
            data: props.stats[gameName],
            fill: false,
            borderColor: graphColors[index],
            pointRadius: 0,
          };
        }
        return {
          label: e,
          data: props.stats[gameName],
          fill: false,
          borderColor: graphColors[index],
          pointRadius: 0,
        };
      }),
    };

    return (
      <div ref={graphRef}>
        {width > 380 ? (
          <Line
            ref={chartRef}
            options={{
              hover: {
                intersect: false,
                mode: "nearest",
              },
              scales: {
                x: {
                  type: "time",
                  ticks: {
                    autoSkip: true,
                    autoSkipPadding: 50,
                    maxRotation: 0,
                  },
                  time: {
                    displayFormats: {
                      hour: "HH:mm, eee d LLL",
                    },
                  },
                },
              },
              onClick() {
                const chart = chartRef.current;
                chart.options.plugins.zoom.zoom.wheel.enabled =
                  !chart.options.plugins.zoom.zoom.wheel.enabled;
                chart.options.plugins.zoom.zoom.pinch.enabled =
                  !chart.options.plugins.zoom.zoom.pinch.enabled;
                chart.update();
              },
              plugins: {
                tooltip: {
                  mode: "nearest",
                  intersect: false,
                },
                zoom: {
                  limits: {
                    x: {
                      min: +new Date() - 604800000,
                      max: +new Date(),
                      minRange: 50000000,
                    },
                  },
                  pan: {
                    enabled: true,
                    mode: "x",
                  },
                  zoom: {
                    wheel: {
                      enabled: false,
                    },
                    pinch: {
                      enabled: false,
                    },
                    mode: "x",
                  },
                },
              },
            }}
            plugins={[borderPlugin]}
            style={{ minHeight: "20rem" }}
            data={data}
          />
        ) : (
          <Line
            ref={chartRef}
            options={{
              hover: {
                intersect: false,
                mode: "nearest",
              },
              onClick() {
                const chart = chartRef.current;
                chart.options.plugins.zoom.zoom.wheel.enabled =
                  !chart.options.plugins.zoom.zoom.wheel.enabled;
                chart.options.plugins.zoom.zoom.pinch.enabled =
                  !chart.options.plugins.zoom.zoom.pinch.enabled;
                chart.update();
              },
              plugins: {
                legend: { display: false },
                tooltip: {
                  mode: "nearest",
                  intersect: false,
                },
                zoom: {
                  limits: {
                    x: {
                      min: +new Date() - 604800000,
                      max: +new Date(),
                      minRange: 50000000,
                    },
                  },
                  pan: {
                    enabled: true,
                    mode: "x",
                  },
                  zoom: {
                    wheel: {
                      enabled: false,
                    },
                    pinch: {
                      enabled: false,
                    },
                    mode: "x",
                  },
                },
              },
            }}
            plugins={[borderPlugin]}
            style={{ height: "0rem" }}
            data={data}
          />
        )}
      </div>
    );
  } else {
    return (
      <Box innerStyle={{ minHeight: width > 380 ? "20rem" : "8rem" }}>
        <h3>{t("loading")}</h3>
      </Box>
    );
  }
}

export function GlobalGraph(props: GlobalInfo): React.ReactElement {
  const platform = props.platform == "all" ? "global" : props.platform;
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery(
    ["globalRegions", "7", props.platform],
    () =>
      GametoolsApi.graphs({
        game: "bfglobal",
        days: "7",
        region: "all",
        platform: platform,
      }),
    { staleTime: Infinity, refetchOnWindowFocus: false },
  );

  return (
    <Box>
      <GlobalLineGraph
        timeStamps={["none"]}
        loading={loading}
        error={error}
        stats={stats}
        gameName="bfglobal"
        platform={props.platform}
      />
    </Box>
  );
}

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 5px;
`;

const AmountBox = styled.div`
  padding-left: 24px;
  margin-right: 60px;
  margin-bottom: 15px;
`;

function TotalStatistic(props: {
  amounts: number[];
  text: string;
  loading: boolean;
}): React.ReactElement {
  const { amounts, loading } = props;
  const { t } = useTranslation();

  const secondToLastAmount = amounts ? amounts[amounts.length - 2] : 0;
  const lastAmount = amounts ? amounts[amounts.length - 1] : 0;
  const difference =
    ((lastAmount - secondToLastAmount) * 100) / secondToLastAmount;
  return (
    <AmountBox>
      <Align>
        {loading ? (
          <Title style={{ color: "gray" }}>{t("loading")}</Title>
        ) : (
          <>
            <Title>
              {lastAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            </Title>
            <div
              style={{
                color: difference < 0 ? "#FE143E" : "#14FE72",
                marginLeft: "10px",
              }}
            >
              {difference < 0 ? "▼" : "▲"} {Math.abs(difference).toFixed(2)}%
            </div>
          </>
        )}
      </Align>
      <div>{props.text}</div>
    </AmountBox>
  );
}

export function TotalGraphQuery(): React.ReactElement {
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery(["globalStats"], () => GametoolsApi.globalGraph(), {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <ErrorBoundary>
      <TotalGraph loading={loading} error={error} stats={stats} />
    </ErrorBoundary>
  );
}

interface ServerGraphData {
  stats: DetailedServerInfo;
  game: string;
  getter: string;
  name: string;
}

export function ServerGraphQuery(props: ServerGraphData): React.ReactElement {
  const { t } = useTranslation();
  const [pieGraphType, setPieGraphType] = React.useState<string>("map");

  let getter = props.getter;
  if (["bf3", "bfh", "bf2042"].includes(props.game)) {
    getter = "serverid";
  }

  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery(
    ["serverGraph", props.game, getter, props.name],
    () =>
      GametoolsApi.serverGraphs({
        game: props.game,
        days: "7",
        getter: getter,
        name: props.name,
      }),
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  );

  if (error) {
    return (
      <>
        <h2>{t("servers.graph.main")}</h2>
        <Box>
          <p>{t("servers.graph.error")}</p>
        </Box>
      </>
    );
  }

  return (
    <ErrorBoundary>
      <div style={{ maxWidth: "45rem" }}>
        <Column>
          <Row>
            <h2>{t("servers.graph.main")}</h2>
            <ServerGraph stats={stats} loading={loading} />
          </Row>
          <Row
            style={{
              maxWidth: "200px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SelectPrimary
              style={{
                margin: 0,
                marginLeft: "14px",
                marginTop: "18px",
                marginBottom: "10px",
              }}
              value={pieGraphType}
              onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
                setPieGraphType(ev.target.value)
              }
            >
              <option value="map">{t("servers.graph.map")}</option>
              {stats?.mode != undefined &&
              Object.keys(stats?.mode).length > 0 ? (
                <option value="mode">{t("servers.graph.mode")}</option>
              ) : (
                <></>
              )}
            </SelectPrimary>
            <ServerPieChart stats={stats} chartValues={pieGraphType} />
          </Row>
        </Column>
      </div>
    </ErrorBoundary>
  );
}

interface NewGraphData {
  loading: boolean;
  error: boolean;
  stats: GlobalGraphReturn;
}

function ServerGraph(props: {
  stats: GlobalGraphReturn;
  loading: boolean;
}): React.ReactElement {
  const { t } = useTranslation();
  const chartRef = React.useRef(null);
  const time =
    props.stats?.timeStamps.map((e: string) => {
      const time = new Date(e);
      return time;
    }) || [];

  return (
    <BoxSpacing style={{ maxWidth: "600px" }}>
      <BoxWrap>
        {props.loading ? (
          <div style={{ height: "200px" }}>
            <p style={{ marginLeft: "1rem" }}>{t("loading")}</p>
          </div>
        ) : (
          <Line
            ref={chartRef}
            options={{
              maintainAspectRatio: false,
              hover: {
                intersect: false,
                mode: "nearest",
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  display: false,
                  type: "time",
                },
                y: {
                  display: false,
                  max:
                    Math.max(...(props.stats?.soldierAmount || [])) > 128
                      ? 256
                      : Math.max(...(props.stats?.soldierAmount || [])) > 64
                      ? 128
                      : 64,
                  grid: {
                    display: false,
                  },
                },
              },
              plugins: {
                tooltip: {
                  mode: "nearest",
                  intersect: false,
                },
                zoom: {
                  limits: {
                    x: {
                      min: +new Date() - 604800000,
                      max: +new Date(),
                      minRange: 50000000,
                    },
                  },
                },
              },
            }}
            style={{ height: "200px" }}
            data={{
              labels: time,
              datasets: [
                {
                  label: t("stats.graph.soldierAmount"),
                  data: props.stats?.soldierAmount || [],
                  fill: "origin",
                  borderColor: "#ffffff81",
                  pointRadius: 0,
                  borderWidth: 1.5,
                  backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 220);
                    gradient.addColorStop(0, "rgba(255, 255, 255, 0.1)");
                    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                    return gradient;
                  },
                },
              ],
            }}
          />
        )}
      </BoxWrap>
    </BoxSpacing>
  );
}

function TotalGraph(props: NewGraphData): React.ReactElement {
  const { t } = useTranslation();
  const chartRef = React.useRef(null);
  const time = props.stats?.timeStamps?.map((e: string) => {
    const time = new Date(e);
    return time;
  });

  return (
    <BoxSpacing style={{ maxWidth: "922px" }}>
      <BoxWrap>
        <p style={{ position: "absolute", marginTop: "25px" }}>
          <Align>
            <TotalStatistic
              amounts={props.stats?.soldierAmount}
              text={t("home.graphs.totalPlaying")}
              loading={props.loading}
            />
            <TotalStatistic
              amounts={props.stats?.serverAmount}
              text={t("home.graphs.activeServers")}
              loading={props.loading}
            />
          </Align>
        </p>
        <Line
          ref={chartRef}
          options={{
            maintainAspectRatio: false,
            hover: {
              intersect: false,
              mode: "nearest",
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                display: false,
                type: "time",
              },
              y: {
                display: false,
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              tooltip: {
                mode: "nearest",
                intersect: false,
              },
              zoom: {
                limits: {
                  x: {
                    min: +new Date() - 604800000,
                    max: +new Date(),
                    minRange: 50000000,
                  },
                },
              },
            },
          }}
          style={{ marginTop: "100px", height: "227px" }}
          data={{
            labels: time,
            datasets: [
              {
                label: t("stats.graph.soldierAmount"),
                data: props.stats?.soldierAmount,
                fill: "origin",
                borderColor: "#ffffff81",
                pointRadius: 0,
                borderWidth: 1.5,
                backgroundColor: (context: ScriptableContext<"line">) => {
                  const ctx = context.chart.ctx;
                  const gradient = ctx.createLinearGradient(0, 0, 0, 220);
                  gradient.addColorStop(0, "rgba(255, 255, 255, 0.1)");
                  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                  return gradient;
                },
              },
            ],
          }}
        />
      </BoxWrap>
    </BoxSpacing>
  );
}
