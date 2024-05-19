import styles from "./MyFeel.module.css";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { mooddata } from "../../api/Member";
import Popup from "../../components/common/Popup";
import card from "../../assets/common/card.png";

export default function MyFeel() {
  const [add, setAdd] = useState(0);
  const [chartOptions, setChartOptions] = useState({
    options: {
      tooltip: {
        enabled: false,
      },
      chart: {
        id: "radar-chart",
        toolbar: { show: false },
      },
      stroke: {
        show: true,
        width: 0,
        dashArray: 0,
      },
      fill: {
        opacity: 1,
        colors: ["#b287f7", "#e59cff", "#fbdfff", "#ffd4ca", "#ffb0b0"],
      },
      colors: ["#b287f7", "#e59cff", "#fbdfff", "#ffd4ca", "#ffb0b0"],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "0.5rem",
          fontFamily: "GongGothicMedium",
        },
      },
      labels: ["", "", "", "", ""],
      legend: {
        formatter: function (val, opts) {
          return val + " : " + opts.w.globals.series[opts.seriesIndex] + "일";
        },
        fontSize: "15px",
        fontFamily: "GongGothicMedium",
        labels: {
          colors: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff"],
        },
        position: "bottom",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "60%",
          },
        },
      },
    },
    series: [1, 1, 1, 1, 1],
  });

  useEffect(() => {
    const fetchdiary = async () => {
      const currentDate = new Date();
      const today = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      };

      try {
        const feel = await mooddata(today);
        const { veryBad, bad, soso, good, veryGood } = feel.data;
        setAdd(veryBad + bad + soso + good + veryGood);
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          series: [veryBad, bad, soso, good, veryGood],
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchdiary();
  }, []);

  // if (chartOptions.series.every((value) => value === 0)) {
  //   return null;
  // }

  return (
    <>
      {add !== 0 ? (
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="donut"
        />
      ) : (
        <div className={styles.popup}>
          <Popup
            img={card}
            subText={`아직 이번달에 기록이 없어요!`}
            text={"기록하러 가기"}
            src={"/bar"}
          />
        </div>
      )}
    </>
  );
}
