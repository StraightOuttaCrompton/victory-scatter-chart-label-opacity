import React from "react";
import {
    VictoryScatter,
    VictoryScatterProps,
    StringOrNumberOrCallback,
    EventCallbackInterface,
    VictoryChart
} from "victory";

interface IScatterDataPoint {
    x: number;
    y: number;
    label?: string;
    fill?: string;
}

interface IProps extends VictoryScatterProps {
    data: IScatterDataPoint[];
}

type VictoryScatterEventTarget = "data" | "labels" | "parent";
type EventFunctionReturyType<T> = EventCallbackInterface<
    T,
    StringOrNumberOrCallback
>;

export default function ScatterChart(props: IProps) {
    const { data, size = 7, ...rest } = props;

    const highlightLabel = (): EventFunctionReturyType<"labels"> => {
        return {
            target: "labels",
            mutation: (props: any) => {
                return {
                    style: Object.assign({}, props.style, {
                        opacity: 1
                    })
                };
            }
        };
    };

    const highlightDataPoint = (): EventFunctionReturyType<"data"> => {
        return {
            target: "data",
            mutation: (props: any) => {
                return {
                    style: Object.assign({}, props.style, {
                        opacity: 1
                    })
                };
            }
        };
    };

    const resetTargets = (...targets: VictoryScatterEventTarget[]) => {
        return targets.map(target => {
            return {
                target: target,
                mutation: () => {
                    return null;
                }
            };
        });
    };

    return (
        <VictoryChart>
            <VictoryScatter
                data={data}
                style={{
                    data: {
                        opacity: 0.5,
                        fill: ({ datum }) =>
                            typeof datum.fill === "undefined"
                                ? "red"
                                : datum.fill
                    },
                    labels: {
                        opacity: 0.5
                    }
                }}
                size={size}
                events={[
                    {
                        target: "data",
                        eventHandlers: {
                            onMouseOver: () => {
                                return [highlightLabel(), highlightDataPoint()];
                            },
                            onMouseLeave: () => {
                                return [...resetTargets("labels", "data")];
                            }
                        }
                    }
                ]}
                {...rest}
            />
        </VictoryChart>
    );
}
