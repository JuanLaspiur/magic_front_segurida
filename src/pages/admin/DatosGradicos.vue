<template>
  <div id="chart">
    <apexchart
      type="area"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
// No es necesario importar vue3-apexcharts ya que se cargará desde el CDN
export default {
  data () {
    return {
      series: [
        {
          name: 'STOCK ABC',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        }
      ],
      chartOptions: {
        chart: {
          type: 'area',
          height: 350,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Fundamental Analysis of Stocks',
          align: 'left'
        },
        subtitle: {
          text: 'Price Movements',
          align: 'left'
        },
        labels: [
          '2022-01-01',
          '2022-01-02',
          '2022-01-03',
          '2022-01-04',
          '2022-01-05',
          '2022-01-06',
          '2022-01-07',
          '2022-01-08',
          '2022-01-09'
        ],
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          opposite: true
        },
        legend: {
          horizontalAlign: 'left'
        }
      }
    }
  }
}
</script>
