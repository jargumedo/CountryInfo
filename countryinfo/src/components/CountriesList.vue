<!--  eslint-disable  -->
<template>
  <div class="container">
    <input
      v-model="searchQuery"
      placeholder="Search countries..."
      class="search-input"
    />
    <div
      v-for="country in filteredCountries"
      :key="country.countryCode"
      class="countryCard"
      @click="selectCountry(country.countryCode)"
    >
      <h1>Name: {{ country.name.toUpperCase() }}</h1>
      <h3>Code : {{ country.countryCode }}</h3>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useCountriesStore } from "../store/countries"; // Asegúrate de que la ruta sea correcta
import { useRouter } from "vue-router";

const router = useRouter();

const selectCountry = (countryCode: string) => {
  router.push({ name: "countryID", params: { code: countryCode } });
};

// Definir el tipo de país
interface Country {
  code: string;
  name: string;
}

const countriesService = useCountriesStore();

onMounted(async () => {
  await countriesService.getAllCountries();
});

// Definir la variable para la búsqueda
const searchQuery = ref<string>("");

// Computed para filtrar los países según la búsqueda
const filteredCountries = computed(() => {
  if (!searchQuery.value) {
    return countriesService.Countries; // Usa el array del store
  }

  // Filtrar los países que coinciden con la consulta
  return countriesService.Countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>
<!-- eslint-disable prettier/prettier -->
<style scoped>
/* Estilos para el input de búsqueda */
.search-input {
  padding: 12px;
  width: 100%;
  max-width: 30rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border-radius: 12px;
  border: none;
  font-size: 1rem;
  transition: box-shadow 0.3s ease, border 0.3s ease;
}

.search-input:focus {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(33, 11, 224, 0.801);
  outline: none;
}

/* Estilo del contenedor general */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

/* Estilo de las tarjetas de país */
.countryCard {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 30rem;
  background-color: rgba(33, 11, 224, 0.801);
  color: white;
  margin-bottom: 1rem;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.countryCard:hover {
  background-color: rgba(13, 15, 136, 0.9);
  transform: translateY(-5px);
}

/* Estilo para el nombre del país */
.countryCard h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

/* Estilo para el código del país */
.countryCard h3 {
  font-size: 1.2rem;
  font-weight: 400;
  margin-left: 1rem;
  color: #f0f0f0;
}
</style>
