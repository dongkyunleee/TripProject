import { defineStore } from "pinia";

export const useDestinationStore = defineStore("destination", {
    state: () => ({
        destinations: [
            { id: 1, title: "Paris", image: "paris.jpg", description: "The city of lights." },
            { id: 2, title: "Maldives", image: "maldives.jpg", description: "A tropical paradise." },
        ],
    }),
});
