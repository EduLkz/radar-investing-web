import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function StockChart({ data }) {
    if(data === undefined) return;
    // console.log(data)
    const chartData = Object.entries(data).map(([date, values]) => ({
            date,
            close: parseFloat(values["4. close"])
        }))
        .reverse();

    const lineColor = "#2284c5"
    // console.log(chartData)
    return (
        <div style={{ width: '80%', height: 400 }}>
            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid stroke="#2a2a2a" />

                    <XAxis
                        dataKey="date"
                        stroke="#999"
                    />

                    <YAxis
                        stroke="#999"
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#111",
                            border: "1px solid #333",
                            borderRadius: "8px",
                            color: "#fff"
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="close"
                        stroke={lineColor}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}