import React, { useEffect, useState } from "react";
import "./year.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const Year = () => {
  const [yearlyProgress, setYearlyProgress] = useState();

  const fetchYearlyProgress = async () => {
    await axios
      .get("http://localhost:2000/year/results", { withCredentials: true })
      .then((response) => {
        setYearlyProgress(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(yearlyProgress);
  useEffect(() => {
    fetchYearlyProgress();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    const getGrade = (score) => {
      if (score >= 70) {
        return "Grade A";
      } else if (score >= 60 && score < 70) {
        return "Grade B";
      } else if (score >= 50 && score < 60) {
        return "Grade C";
      } else if (score >= 40 && score < 50) {
        return "Grade D";
      } else {
        return "Grade E";
      }
    };

    if (active && payload && payload.length) {
      const score = payload[0].value;
      const grade = getGrade(score);

      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${score}`}</p>
          <p className="grade">{`Grade: ${grade}`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <div>
      <LineChart
        width={500}
        height={500}
        data={yearlyProgress}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year_group" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="avg_score"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default Year;
