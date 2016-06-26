import React, { Component } from 'react'
require("chart.js")

export default class LineChart extends Component {
  constructor() {
    super()
    this.chartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: 'React Portal',
          fillColor: "#25BDFF",
          strokeColor: "#25BDFF",
          pointColor: "#25BDFF",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#25BDFF",
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }

    this.chartOptions = {
      bezierCurve : false,
      datasetFill : false,
      pointDotStrokeWidth: 4,
      scaleShowVerticalLines: false,
      responsive: false
    }
  }

  componentDidMount () {
    let chartCanvas = this.refs.chart;

    let myChart = new Chart(chartCanvas, {
      type: 'line',
      data: this.chartData,
      options: this.chartOptions,
    });

    this.setState({chart: myChart});
  }

  render () {
    return (
      <canvas ref={'chart'} height={'300'} width={'400'}></canvas>
    );
  }
}