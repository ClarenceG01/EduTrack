import axios from "axios";
import React, { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const dara = [
  {
    subject: "Math",
    A: 100,
    fullMark: 100,
  },
  {
    subject: "Chinese",
    A: 98,
    fullMark: 100,
  },
  {
    subject: "English",
    A: 86,
    fullMark: 100,
  },
  {
    subject: "Geography",
    A: 99,
    fullMark: 100,
  },
  {
    subject: "Physics",
    A: 85,
    fullMark: 100,
  },
  {
    subject: "History",
    A: 65,
    fullMark: 100,
  },
];

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-radar-chart-rjoc6";

  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer width="60%" height="60%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="unit_code" />
          <PolarRadiusAxis />
          <Radar
            name="Stats"
            dataKey="average_score"
            stroke="#0773b9"
            fill="#0773b9"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}
