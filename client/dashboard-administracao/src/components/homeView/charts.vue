<script lang="ts">
import { ref, onMounted, computed, watch, reactive } from "vue";
import { useRegisterStore } from "@/stores/registeredBooks";

export default {
  name: "chart",
  setup() {
    const primeChart = ref()
    // const chartData = reactive({});
    // const chartOptions = ref();
    const dates = ref();
    const selectedCity = ref();
    const year = ref();
    const reactiveData: Array<number> = reactive([])

    const registerStore = useRegisterStore();

    const register = computed<Object>(() => registerStore.listOfBooks || {});
    const arrayMonth = computed<Array<number>>(()=> registerStore.months || []);
    const arrayYear = computed<Object>(() => registerStore.listOfYears || {})
    const loading = computed(() => registerStore.loading);
    const error = computed(() => registerStore.error);


    onMounted(async () => {
      await registerStore.fetchRegisBooks();
      // chartData.value = setChartData();
      // chartOptions.value = setChartOptions();
    });

    watch(register, (newValue) => {
  console.log('Novo valor de listOfBooks:', newValue);
});

  
    console.log("Register book s : " , register);
    console.debug(arrayMonth);
    
    console.log(selectedCity);
    watch(selectedCity,(newVar)=>{
      console.log(newVar);
      
    })

    watch([arrayYear, selectedCity], ([newValueYear, newValueCity]) => {
      console.log("test - 1",newValueYear);
      console.log("test - 2",newValueCity);

      const yearObject: Record<string,any> = newValueYear
      const selectedYear: Object = newValueCity
      const keys = Object.keys(yearObject)
      const yearVal = Object.values( selectedYear ?? {})
      console.log('V', yearObject[yearVal[0]]);
      const yearArray= yearObject[yearVal[0]]
      console.log('selkl', yearVal);

      const selectOption = keys.map(key => {
        return {name: key}
      })

      year.value = selectOption 
      // reactiveData.push(yearArray)
      reactiveData.splice(0, reactiveData.length, ...yearArray ?? []);
    });
    
    console.log('reactive', reactiveData);

    const chartKeys = ref(0);

    const forceRender = () => {
      chartKeys.value += 1;
    };


    watch(reactiveData, (data)=>{
      console.log('reatuve', data);  
      const chart = primeChart.value.chart
      // chart.data.labels.push(/* NEW DATA LABEL */)
      const a = chart.data.datasets[0].data
      a.splice(0, a.length, ...data ?? []);
      chart.update()
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
            label: "First Dataset",
            data: [0],
            fill: false,
            borderColor: documentStyle.getPropertyValue("--p-cyan-500"),
            tension: 0.4,
          },
          {
            label: "Second Dataset",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: true,
            borderColor: documentStyle.getPropertyValue("--p-gray-500"),
            tension: 0.4,
          },
        ],
      
      },
      chartOptions:{
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
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
      selectedCity,chartKeys ,
      year,
      dates
    };
  },
};
</script>

<template>
    <div style="border: 1px solid var(--p-content-border-color)" class="p-4 rounded-xl">
      <div class="flex gap-3">
        <Button label="Monthly" text raised size="small" class="w-20"/>
        <Button label="Yearly" text raised size="small" class="w-20"/>
        <DatePicker v-model="dates" showIcon selectionMode="range" :manualInput="false" />
        <Select v-model="selectedCity" :options="year" optionLabel="name" placeholder="Select a City" checkmark :highlightOnSelect="false" class="w-full md:w-56" />
      </div>
  
      <Chart :key="chartKeys"  ref="primeChart" type="line" :data="chartData" :options="chartOptions" class="h-[29rem]" />
    </div>
</template>


  

 