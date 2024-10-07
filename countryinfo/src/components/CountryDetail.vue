<!-- eslint-disable prettier/prettier -->
<template>
  <div class="container">
    <button @click="goHome()">GO HOME</button>
    <div>
      <h1>Country Name: {{ country.commonName }}</h1>
    </div>
    <label for="years">Select year:</label>

    <select id="years" v-model="selectedYear" class="styled-select">
      <option v-for="year in years" :key="year" :value="year">
        {{ year }}
      </option>
    </select>
    <h3>Selected Year: {{ selectedYear }}</h3>

    <!-- Mejora visual para cada holiday -->
    <div v-for="holiday in holidays" :key="holiday.name" class="holiday-card">
      <div class="holiday-header">
        <h2 class="holiday-title">{{ holiday.localName }}</h2>
        <span class="holiday-date">{{ holiday.date }}</span>
      </div>
      <p class="holiday-type-title">Types:</p>
      <ul class="holiday-types">
        <li v-for="type in holiday.types" :key="type" class="holiday-type">
          {{ type }}
        </li>
      </ul>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useCountriesStore } from "../store/countries";

const countriesService = useCountriesStore();

const router = useRouter();
const route = useRoute();
const years = ref([]);
for (let i = 2020; i <= 2030; i++) {
  years.value.push(i);
}
const selectedYear = ref(2024);

const goHome = () => {
  router.push("/");
};
const country = ref([]);
const holidays = ref([]);
onMounted(async () => {
  country.value = await countriesService.getCountryByCode(route.params.code);
  await fetchHolidays(); // Llama a la función para obtener los días festivos
});

// Función para obtener los días festivos según el país y el año seleccionado
const fetchHolidays = async () => {
  holidays.value = await countriesService.getHolidaysByYear(
    route.params.code,
    selectedYear.value
  );
};

// `watch` para actualizar los días festivos cuando el año seleccionado cambie
watch(selectedYear, async (newYear) => {
  await fetchHolidays(); // Vuelve a llamar la función cuando `selectedYear` cambie
});
</script>
<!-- eslint-disable prettier/prettier -->
<style scoped>
/* Contenedor general */
.container {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Arial", sans-serif;
}

/* Botón */
.container button {
  padding: 0.5rem 1.5rem;
  background-color: rgba(33, 11, 224, 0.801);
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.container button:hover {
  background-color: #1769aa;
}

/* Estilo para el select */
.styled-select {
  padding: 0.5rem;
  border-radius: 10px;
  background-color: #f0f0f0;
  border: 2px solid #cccccc;
  appearance: none;
  font-size: 1rem;
  color: #333;
  width: 100%;
  max-width: 200px;
  margin: 1rem 0;
}

/* Contenedor de las tarjetas con flexbox */
.holiday-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  max-width: 800px;
}

/* Cartas de días festivos */
.holiday-card {
  background-color: rgba(33, 11, 224, 0.801);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
  padding: 1.5rem;
  width: calc(50% - 1rem); /* Dos tarjetas por fila */
  transition: transform 0.3s ease;
}

.holiday-card:hover {
  transform: translateY(-5px);
}

/* Título del día festivo */
.holiday-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.holiday-title {
  font-size: 1.5rem;
  color: white;
  margin: 0;
}

.holiday-date {
  font-size: 1rem;
  color: white;
}

/* Título de tipo */
.holiday-type-title {
  font-size: 1.1rem;
  color: white;
  margin-bottom: 0.5rem;
}

/* Lista de tipos */
.holiday-types {
  list-style-type: none;
  padding-left: 0;
}

.holiday-type {
  background-color: #e0e0e0;
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
  margin-right: 0.5rem;
  display: inline-block;
  color: #555;
  font-size: 0.9rem;
}

/* Ajustes para dispositivos móviles */
@media (max-width: 600px) {
  .holiday-card {
    width: 100%;
  }
}
</style>
