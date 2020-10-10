import React, { useState, useEffect } from 'react';
import './App.css';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

class Generator {
  sampleRate = 5;
  sineFrequency = 0.1;
  callback = null;
  time = null;
  interval = null;

  constructor(options) {
    this.time = Date.now();

    Object.assign(this, options);
  }

  tick(callback) {
    const phase = this.time / (1 / this.sineFrequency);

    this.callback({
      x: this.time,
      y: Math.cos(phase),
    });
  }

  start(callback) {
    this.callback = callback;
    this.stop();

    this.interval = setInterval(this.tick, 1000 / this.sampleRate);
  }

  stop() {
    clearInterval(this.interval);
  }
}

class Buffer {
  callback = null;
  samples = null;

  constructor(options) {
    Object.assign(this, options);
  }

}

class Transform {}
const buffer = new Buffer();
const samples = new Generator();

function App() {
  const series = [];

  return (
    <div className="App">
      <LineChart
        width={800}
        height={800}
        data={series}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="y"
          stroke="#82ca9d"
          isAnimationActive={false}
        />
      </LineChart>
    </div>
  );
}

export default App;
