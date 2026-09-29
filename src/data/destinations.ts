export const destinations = [
  {
    id: 1,
    slug: "berlin",
    title: "Monument of Berlin",
    location: "Berlin, Germany",
    city: "Berlin", country: "Germany", rating: 4.8, price: 640, days: 5,
    description: "A bold capital where modern art, layered history and late-night creativity share the same streets.",
    descriptionRu: "Смелая столица, где современное искусство, многослойная история и ночная творческая жизнь встречаются на одних улицах.",
    image:
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=85",
    accent: "#8bb7c7",
  },
  {
    id: 2,
    slug: "london",
    title: "Millennium Bridge",
    location: "London, United Kingdom",
    city: "London", country: "United Kingdom", rating: 4.9, price: 790, days: 5,
    description: "Classic landmarks, new kitchens and neighborhood discoveries connected by the Thames.",
    descriptionRu: "Классические достопримечательности, новые рестораны и атмосферные районы, соединённые Темзой.",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85",
    accent: "#bf8f7d",
  },
  {
    id: 3,
    slug: "venice",
    title: "Rialto Bridge",
    location: "Venice, Italy",
    city: "Venice", country: "Italy", rating: 4.9, price: 720, days: 4,
    description: "Quiet canals at dawn, hidden workshops and palazzos that turn every walk into a scene.",
    descriptionRu: "Тихие каналы на рассвете, скрытые мастерские и дворцы, превращающие каждую прогулку в сцену из фильма.",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=85",
    accent: "#87aaa4",
  },
  {
    id: 4,
    slug: "lisbon",
    title: "Sea of Orange Tiles",
    location: "Lisbon, Portugal",
    city: "Lisbon", country: "Portugal", rating: 4.9, price: 500, days: 6,
    description: "Sunlit hills, tiled facades and Atlantic flavors with an easy, unhurried rhythm.",
    descriptionRu: "Солнечные холмы, фасады с азулежу и атлантическая кухня в спокойном, неторопливом ритме.",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=85",
    accent: "#df8a5f",
  },
  {
    id: 5,
    slug: "paris",
    title: "Eiffel Tower",
    location: "Paris, France",
    city: "Paris", country: "France", rating: 4.8, price: 810, days: 5,
    description: "Museum mornings, intimate bistros and long walks through the city’s most cinematic quarters.",
    descriptionRu: "Утро в музеях, камерные бистро и долгие прогулки по самым кинематографичным кварталам города.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
    accent: "#a58b91",
  },
  {
    id: 6,
    slug: "santorini",
    title: "Santorini Coast",
    location: "Santorini, Greece",
    city: "Santorini", country: "Greece", rating: 5.0, price: 940, days: 7,
    description: "Volcanic cliffs, whitewashed villages and slow evenings above the Aegean Sea.",
    descriptionRu: "Вулканические скалы, белоснежные деревни и неспешные вечера над Эгейским морем.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85",
    accent: "#6ba8c9",
  },
];

export const attractionImages = [
  "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1200&q=86",
  "https://images.unsplash.com/photo-1549492423-400259a2e574?auto=format&fit=crop&w=1200&q=86",
  "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=86",
];

export const featuredHotels = [
  { id: 1, slug: "lisbon", name: "Palácio Ludovice", city: "Lisbon", country: "Portugal", price: 189, rating: 4.9, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=86" },
  { id: 2, slug: "paris", name: "Maison Rive Gauche", city: "Paris", country: "France", price: 245, rating: 4.8, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1100&q=86" },
  { id: 3, slug: "santorini", name: "Aegean House", city: "Santorini", country: "Greece", price: 310, rating: 5.0, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1100&q=86" },
  { id: 4, slug: "venice", name: "Casa Laguna", city: "Venice", country: "Italy", price: 205, rating: 4.9, image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1100&q=86" },
];

export const destinationHotelImages: Record<string, [string, string, string]> = {
  berlin: [
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=86",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=86",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=86",
  ],
  london: [
    "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1200&q=86",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=86",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=86",
  ],
  venice: [
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=86",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=86",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=86",
  ],
  lisbon: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=86",
    "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=1200&q=86",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=86",
  ],
  paris: [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=86",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=86",
    "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=86",
  ],
  santorini: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=86",
    "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?auto=format&fit=crop&w=1200&q=86",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=86",
  ],
};
