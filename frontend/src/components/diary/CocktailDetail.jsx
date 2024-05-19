import styles from "./CocktailDetail.module.css";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import card from "../../assets/common/card.png";

export default function CocktailDetail({ cocktail, btn = true }) {
  const chartOptions = {
    options: {
      tooltip: {
        enabled: false,
      },
      chart: {
        id: "radar-chart",
        toolbar: { show: false },
        width: "120%",
      },
      xaxis: {
        categories: ["단맛", "쓴맛", "신맛", "도수", "탄산"],
        labels: {
          style: {
            colors: ["#b287f7", "#e59cff", "#fbdfff", "#ffd4ca", "#ffb0b0"],
            fontSize: "0.8rem",
            fontFamily: "GongGothicMedium",
          },
        },
      },
      yaxis: {
        max: 120,
        min: -20,
        stepSize: 20,
        labels: {
          style: {
            colors: [
              "#00000000",
              "#00000000",
              "#00000000",
              "#00000000",
              "#00000000",
              "#00000000",
              "#00000000",
              "#00000000",
            ],
            fontSize: "0.8rem",
            fontFamily: "GongGothicMedium",
          },
        },
      },
      // dataLabels: {
      //   enabled: true,
      //   background: {
      //     enabled: true,
      //     borderRadius: 2,
      //   },
      // },
      markers: {
        size: 4,
        hover: {
          size: 10,
        },
        colors: cocktail.color2,
        strokeColors: "#888",
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["#888"],
        dashArray: 0,
      },
      fill: {
        opacity: 0.8,
        colors: [cocktail.color1],
      },
      plotOptions: {
        radar: {
          polygons: {
            fill: {
              opacity: 0.7,
              colors: [
                `${cocktail.color1}77`,
                "#fafaff77",
                `${cocktail.color1}77`,
                "#fafaff77",
                `${cocktail.color1}77`,
                "#fafaff77",
                `${cocktail.color1}77`,
              ],
              fontFamily: "GongGothicMedium",
            },
          },
        },
      },
    },
    series: [
      {
        name: "",
        data: [
          cocktail.sweet * 20,
          cocktail.bitter * 20,
          cocktail.sour * 20,
          cocktail.alc,
          cocktail.sparking * 20,
        ],
      },
    ],
  };

  return (
    <div className={styles.recommend}>
      <div className={styles.chart}>
        <Chart
          className={styles.chartC}
          options={chartOptions.options}
          series={chartOptions.series}
          type="radar"
          width={"150%"}
        />
      </div>
      <div className={styles.data}>
        <div>
          단맛<p>{cocktail.sweet * 20}%</p>
        </div>
        <div>
          쓴맛<p>{cocktail.bitter * 20}%</p>
        </div>
        <div>
          신맛<p>{cocktail.sour * 20}%</p>
        </div>
        <div>
          도수<p>{cocktail.alc}%</p>
        </div>
        <div>
          탄산<p>{cocktail.sparking * 20}%</p>
        </div>
      </div>
      {btn && (
        <div className={styles.bottom}>
          <div>칵테일</div>
          <img src={card} alt="card" className={styles.icon} />
        </div>
      )}
    </div>
  );
}
