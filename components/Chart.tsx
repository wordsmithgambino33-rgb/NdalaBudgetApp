
import * as React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg from "react-native-svg";

// Treat victory-native imports as any (ambient decl added); keep local cn helper but typed permissively
import type { VictoryPie as _VP, VictoryChart as _VC, VictoryTooltip as _VT, VictoryLegend as _VL } from 'victory-native';

// Utility cn (typed permissively)
const cn = (...styles: any[]) => Object.assign({}, ...styles.map((s: any) => (typeof s === 'number' ? {} : s || {})));

const THEMES = { light: "#fff", dark: "#000" };

export type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
    theme?: Record<keyof typeof THEMES, string>;
  };
};

type ChartContextProps = { config: ChartConfig };

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within <ChartContainer />");
  return context;
}

const styles = StyleSheet.create({
  chart: { flex: 1, aspectRatio: 1.777, justifyContent: "center" },
});

function ChartContainer({ config, children, style, ...props }) {
  return (
    <ChartContext.Provider value={{ config }}>
      <View style={cn(styles.chart, style)} {...props}>
        <Svg width={Dimensions.get("window").width} height={300}>
          {children}
        </Svg>
      </View>
    </ChartContext.Provider>
  );
}

function ChartTooltipContent({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  // Simple text-based tooltip for native (can be enhanced with Modal)
  return <Text>{formatter ? formatter(payload[0].value) : payload[0].value}</Text>;
}

function ChartLegendContent({ payload }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      {payload.map((item, i) => <Text key={i} style={{ color: item.color }}>{item.name}</Text>)}
    </View>
  );
}

// Example usage logic (added):
// <ChartContainer config={{ desktop: { label: "Desktop", color: "#2e72d2" } }}>
//   <VictoryPie data={[{ x: "Desktop", y: 35 }]} colorScale={["#2e72d2"]} />
// </ChartContainer>

export { ChartContainer, ChartTooltipContent, ChartLegendContent, useChart };