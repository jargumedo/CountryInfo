<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <h2>Some countries with their next holiday</h2>
    <div
      v-for="country in randomCountries"
      :key="country.countryCode"
      class="countryCard"
      @click="selectCountry(country.countryCode)"
    >
      <h1>Name: {{ country.name.toUpperCase() }}</h1>
      <h3>Next Holiday : {{ country.nextHoliday }}</h3>
      <h3>Date : {{ country.date }}</h3>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useCountriesStore } from "../store/countries"; // Asegúrate de que la ruta sea correcta
import { useRouter } from "vue-router";

const router = useRouter();

const selectCountry = (countryCode) => {
  router.push({ name: "countryID", params: { code: countryCode } });
};

interface Country {
  code: string;
  name: string;
}
// Referencia para los países aleatorios
const randomCountries = ref<Country[]>([]); // Puedes usar el tipo correcto en lugar de `any`

const countriesStore = useCountriesStore();

onMounted(async () => {
  await countriesStore.getAllCountries(); // Obtener todos los países

  // Obtener 3 países aleatorios
  selectRandomCountries();
});

async function selectRandomCountries() {
  const allCountries = countriesStore.Countries; // Obtén todos los países del store
  const shuffledCountries = allCountries.sort(() => 0.5 - Math.random()); // Mezclar el array
  randomCountries.value = shuffledCountries.slice(0, 3); // Tomar los primeros 3 países

  randomCountries.value.forEach(async (country) => {
    const nextHoliday = await countriesStore.getHolidays(country.countryCode);
    country.nextHoliday = nextHoliday[0].localName;
    country.date = nextHoliday[0].date;
  });
}
</script>
<!-- eslint-disable prettier/prettier -->
<style scoped>
/* Estilos para las tarjetas */
.countryCard {
  display: flex;
  flex-direction: column;
  width: 30rem;
  color: white;
  height: 8rem;
  background-color: rgba(33, 11, 224, 0.801); /* Fondo azul oscuro */
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
}

/* Efecto hover para tarjetas */
.countryCard:hover {
  background-color: rgba(
    13,
    15,
    136,
    0.9
  ); /* Color más oscuro al hacer hover */
  transform: translateY(-5px);
}

/* Estilos para el título del país */
.countryCard h1 {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

/* Estilos para los detalles del próximo feriado */
.countryCard h3 {
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0.2rem 0;
  color: #f0f0f0;
}

/* Estilo del título de la sección */
h2 {
  font-size: 1.8rem;
  color: white;
  text-align: center;
  margin-bottom: 1.5rem;
}
</style>
