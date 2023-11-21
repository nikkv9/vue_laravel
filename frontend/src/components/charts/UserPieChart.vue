<template>
  <Pie :data="chartData" :options="chartOpts" />
</template>

<script>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
export default {
  components: {
    Pie,
  },
  props: {
    chartData: {
      type: Object,
    },
    chartOpts: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped></style>
