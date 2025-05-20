import { create } from "zustand";

const italianVoyageData = {
  id: "italy-trip-01",
  name: "Voyage en Italie",
  destination: "Rome,",
  dates: "10/08/2024 - 20/08/2024",
  description:
    "Un voyage culturel à travers Rome en Italie. Explorez des ruines antiques, admirez des chefs-d'œuvre de la Renaissance et profitez de la cuisine italienne.",
  lieux: "Rome",
  date_debut: "2025-08-10",
  date_fin: "2025-08-20",
  budget: {
    total: 4500,
    spent: 1210,
    currency: "EUR",
  },
  participants: [
    { id: "user1", name: "Lilian", owes: {} },
    { id: "user2", name: "Valentin", owes: { Rudy: 5 } },
    { id: "user3", name: "Damien", owes: {} },
    { id: "user4", name: "Rudy", owes: {} },
    { id: "user5", name: "Randy", owes: { Lilian: 15, Damien: 10 } },
  ],
  activities: [
    {
      id: "act1",
      name: "Quad",
      lieu: "Rome",
      dateDebut: "2024-08-11",
      dateFin: "2024-08-11",
      prix: 75,
      description: "1h de Quad à côté de Rome",
      image: "/assets/img/quad.jpg",
    },
  ],
  hebergements: [
    {
      id: "heb1",
      name: "Hôtel Bella Roma",
      lieu: "Rome",
      date_debut: "2024-08-10",
      date_fin: "2024-08-14",
      prix: 600,
      description: "Hôtel confortable près du centre.",
      image: "/assets/img/hotel-rome.jpg",
    },
  ],
  images: ["/assets/img/rome.jpg"],
  mapImage: "/assets/img/maps-rome.png",
};

const useVoyageStore = create((set) => ({
  currentVoyage: null,
  isLoading: false,
  error: null,

  setCurrentVoyage: (voyage) =>
    set({ currentVoyage: voyage, error: null, isLoading: false }),
  loadItalianVoyage: () => {
    set({ isLoading: true, error: null });
    // Simule un petit délai de chargement
    setTimeout(() => {
      set({ currentVoyage: italianVoyageData, isLoading: false });
    }, 500);
  },
  clearVoyage: () => set({ currentVoyage: null }),
}));

export default useVoyageStore;
