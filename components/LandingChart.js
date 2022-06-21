import axios from "axios";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const Main = styled.div`
    .my-chart-2 {
        position: absolute;
        top: -28px;
        right: -40px;
        transform: scale(.6);
    }
`;

const MyChart = (props) => {
    const [moedas, setMoedas] = useState([]);

    useEffect(() => {
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=7`
            )
            .then((res) => {
                setMoedas(res.data.prices);
            })
            .catch((error) => console.log(error));
    }, []);
    const series = [
        {
            data: moedas,
        },
    ];
    const options = {
        chart: {
            id: "area-datetime",
            type: "area",
            height: 350,
            zoom: {
                autoScaleYaxis: true,
            },
        },
        annotations: {
            yaxis: [
                {
                    y: 30,
                    borderColor: "#999",
                    label: {
                        show: true,
                        text: "Support",
                        style: {
                            color: "#fff",
                            background: "#00E396",
                        },
                    },
                },
            ],
            xaxis: [
                {
                    x: new Date("14 Nov 2012").getTime(),
                    borderColor: "#999",
                    yAxisIndex: 0,
                    label: {
                        show: true,
                        text: "Rally",
                        style: {
                            color: "#fff",
                            background: "#775DD0",
                        },
                    },
                },
            ],
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            curve: "smooth",
            lineCap: "butt",
            colors: props.strokee,
            width: 1,
            dashArray: 0,
        },
        markers: {
            size: 0,
            style: "hollow",
        },
        xaxis: {
            type: "datetime",
            tickAmount: 6,
        },
        tooltip: {
            x: {
                format: "dd MMM yyyy",
            },
        },
        colors: props.strokee,
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0,
                stops: [0, 100],
            },
        },
    };
    return (
        <Main>
            <div className="my-chart-2">
                <Chart
                    options={options}
                    series={series}
                    type="area"
                    height={120}
                    width={250}
                />
            </div>
        </Main>
    );
};

export default MyChart;
