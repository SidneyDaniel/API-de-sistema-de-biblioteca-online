<script lang="ts">
import { ref, onMounted, computed, watch, reactive, defineComponent } from "vue";
import { useRegisterStore } from "@/stores/registeredBooks";
import processYearSelection from "@/utils/selectYearUtil";
import { onBeforeRouteUpdate } from "vue-router";

export default defineComponent({
  name: "homeChart",
  setup() {
    const primeChart = ref()
    const dates = ref();
    const selectedCity = ref();
    const year = ref();
    const currentYear = ref()

    const reactiveData: Array<number> = reactive([])

    const registerStore = useRegisterStore();

    const register = computed<Object>(() => registerStore.listOfBooks || {});
    const arrayMonth = computed<Array<number>>(()=> registerStore.months || []);
    const arrayYear = computed<Object>(() => registerStore.listOfYears || {})
    const loading = computed(() => registerStore.loading);
    const error = computed(() => registerStore.error);


    onMounted(async () => {
      await registerStore.fetchRegisBooks();

      const yearSelection = processYearSelection(arrayYear.value)
      selectedCity.value = [yearSelection.latestYear[yearSelection.latestYear.length - 1]]
      currentYear.value = await selectedCity.value[0]
      // console.log(selectedCity.value);
      
    });


    watch([arrayYear, selectedCity], ([newValueYear, newValueCity]) => {
      const yearSelection = processYearSelection(newValueYear, newValueCity)
      
      if (selectedCity.value && selectedCity.value.name) { currentYear.value = selectedCity.value.name }

      year.value = yearSelection.selectOption            
      reactiveData.splice(0, reactiveData.length, ...yearSelection.yearArray ?? []);
    });
    

    const chartKeys = ref(0);

    watch(reactiveData, (data)=>{
      const chart = primeChart.value?.chart
      if (chart) {
        const a = chart.data.datasets[0].data
        a.splice(0, a.length, ...data ?? []);
        chart.update()
      }
    })

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--p-text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--p-text-muted-color"
    );
    const surfaceBorder = documentStyle.getPropertyValue(
      "--p-content-border-color"
    );
  
    return {
      primeChart,
      chartData:{
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            label: "Books Added",
            data: [0],
            fill: false,
            borderColor: documentStyle.getPropertyValue("--p-primary-color"),
            tension: 0.4,
          },
        ],
      
      },
      chartOptions:{
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      },
      selectedCity,
      chartKeys,
      year,
      dates,
      currentYear
    };
  },
});
</script>

<template>
    <div style="border: 1px solid var(--p-content-border-color)" class="p-4 rounded-xl">
      <div class="flex justify-between px-7 gap-3">
        <!-- <DatePicker v-model="dates" showIcon selectionMode="range" :manualInput="false" /> -->
        <span class="text-primary font-semibold">Yearly Book Additions</span>
        <Badge :value="currentYear" severity="primary" size="large"></Badge>
        <Select v-model="selectedCity" :options="year" optionLabel="name" placeholder="Select a Year" checkmark :highlightOnSelect="false" size="small" class="w-full md:w-56" />
      </div>
  
      <Chart :key="chartKeys"  ref="primeChart" type="line" :data="chartData" :options="chartOptions" class="h-[29rem]" />
    </div>
</template>


  

 