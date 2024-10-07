/* eslint-disable prettier/prettier */
import axios from "axios";
import { defineStore } from "pinia";

// Definir el tipo para el país
interface Country {
  countryCode: string; // Define las propiedades según lo que devuelva la API
  name: string;
}

// Definir el estado del store
interface CountriesState {
  Countries: Country[];
}

// Definir el store
export const useCountriesStore = defineStore("countries", {
  state: (): CountriesState => {
    return {
      Countries: [], // Inicializa como un array vacío
    };
  },
  actions: {
    async getAllCountries() {
      try {
        const response = await axios.get<Country[]>(
          "https://date.nager.at/api/v3/AvailableCountries/"
        );

        this.Countries = response.data; // Usa `response.data` para obtener los datos de la respuesta
      } catch (error) {
        console.error("Error fetching countries:", error);
        // Manejo del error según sea necesario
      }
    },
    async getHolidays(code: string) {
      try {
        const response = await axios.get<Country[]>(
          "https://date.nager.at/api/v3/NextPublicHolidays/" + code
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching next holiday:", error);
      }
    },
    async getCountryByCode(code: string) {
      try {
        const response = await axios.get<Country[]>(
          "https://date.nager.at/api/v3/CountryInfo/" + code
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getHolidaysByYear(code: string, year: number) {
      try {
        const response = await axios.get<Country[]>(
          "https://date.nager.at/api/v3/PublicHolidays/" + year + "/" + code
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
