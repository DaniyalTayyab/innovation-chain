import React, { useEffect, useState } from "react";

// lib
import Chart from "react-apexcharts";

function ChartComponnet({ data }: any) {
	const [chartData, setChart]: any = useState([]);
	const [total, setTotal] = useState("0");

	useEffect(() => {
		setChart([
			data != undefined ? data?.firstPacakge : 0,
			data != undefined ? data?.secondPacakge : 0,
			data != undefined ? data?.thirdPacakge : 0,
		]);

		if (
			data != undefined &&
			data.firstPacakge &&
			data.secondPacakge &&
			data.thirdPacakge
		) {
			//console.log("testsetset", data.firstPacakge);
			const result = data.firstPacakge + data.secondPacakge + data.thirdPacakge;
			setTotal(result + "");
		}
	}, [data]);
	//console.log("chart", chartData, data);

	const options: any = {
		chart: {
			type: "bar",
			height: 350,
			width: "100%",
		},
		plotOptions: {
			bar: {
				borderRadius: 4,
				horizontal: true,
				distributed: true,
				barHeight: "50%",
			},
		},
		colors: ["#D6D727", "#01F299", "#E9724D"],
		dataLabels: {
			position: "top",
			enabled: true,
			style: {
				fontSize: "12px",
				fontWeight: 700,
				colors: ["#05191A"],
			},
		},
		responsive: [
			{
				breakpoint: 1000,
				options: {
					plotOptions: {
						bar: {
							horizontal: true,
						},
					},
				},
			},
		],
		xaxis: {
			categories: ["6 Month", "12 Month", "24 Month"],
			labels: {
				show: true,
				style: {
					colors: ["#04684B"],
					fontSize: "13px",
					fontFamily: "Helvetica, Arial, sans-serif",
					fontWeight: 600,
					cssClass: "apexcharts-xaxis-label",
				},
			},
		},
		yaxis: {
			labels: {
				show: true,
				style: {
					colors: ["#04684B"],
					fontSize: "13px",
					fontFamily: "Helvetica, Arial, sans-serif",
					fontWeight: 600,
					cssClass: "apexcharts-xaxis-label",
				},
			},
		},
		legend: {
			labels: {
				colors: ["#fff"],
				useSeriesColors: false,
			},
		},
		tooltip: {
			fillSeriesColor: false,
			style: {
				fontSize: "12px",
				fontFamily: undefined,
				colors: ["#000"],
			},
		},
		// title: {
		// 	text: { total },
		// 	align: "left",
		// 	floating: true,
		// 	color: "#01F299",
		// },
		subtitle: {
			text: "Total subscribe Users",
			align: "center",
			margin: 10,
			style: {
				fontSize: "15px",
				fontWeight: "bold",
				fontFamily: undefined,
				color: "#01F299",
			},
		},
	};

	const series = [
		{
			// name: 'series-1',
			// data: [30, 40, 45, 50],
			data: chartData,
		},
	];

	return (
		<div className="S-1370:mx-0 mx-auto">
			<Chart
				options={options}
				series={series}
				type="bar"
				className={"S-950:w-[650px] md:w-[550px] w-[450px]"}
			/>
		</div>
	);
}

export default ChartComponnet;
