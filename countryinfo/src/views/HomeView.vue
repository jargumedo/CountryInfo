<!-- eslint-disable prettier/prettier -->
<template>
  <div class="home-container">
    <h1>TestCountryInfo by Juliano Argumedo</h1>
    <div class="home-page">
      <CountriesList />
      <RandomCountries />
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script lang="ts" setup>
import CountriesList from "@/components/CountriesList.vue";
import RandomCountries from "@/components/RandomCountries.vue";
</script>
<!-- eslint-disable prettier/prettier -->
<style>
.home-container {
  display: flex;
  flex-direction: column;
}
.home-container h1 {
  text-align: center;
}
.home-page {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
