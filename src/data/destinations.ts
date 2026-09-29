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

const commons = (file: string) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=1400`;

export type DestinationPlace = {
  name: string; nameRu: string; category: string; categoryRu: string; image: string;
  description: string; descriptionRu: string; source: string;
};

export type DestinationHotel = {
  name: string; image: string; price: number; rating: number; type: string; typeRu: string;
  description: string; descriptionRu: string; source: string;
};

export const destinationPlaces: Record<string, DestinationPlace[]> = {
  berlin: [
    { name: "Museum Island", nameRu: "Музейный остров", category: "UNESCO ENSEMBLE", categoryRu: "АНСАМБЛЬ ЮНЕСКО", image: commons("Berlin Museumsinsel Fernsehturm.jpg"), description: "Five major museums form a remarkable island of art and archaeology in the heart of Berlin.", descriptionRu: "Пять крупных музеев образуют уникальный остров искусства и археологии в самом центре Берлина.", source: "https://commons.wikimedia.org/wiki/File:Berlin_Museumsinsel_Fernsehturm.jpg" },
    { name: "Brandenburg Gate", nameRu: "Бранденбургские ворота", category: "CITY LANDMARK", categoryRu: "СИМВОЛ ГОРОДА", image: commons("Brandenburg Gate Quadriga at Night.jpg"), description: "Berlin’s neoclassical landmark has witnessed the city’s division, reunification and public celebrations.", descriptionRu: "Главный неоклассический символ Берлина, переживший разделение города, воссоединение и исторические торжества.", source: "https://commons.wikimedia.org/wiki/File:Brandenburg_Gate_Quadriga_at_Night.jpg" },
    { name: "Hackesche Höfe", nameRu: "Хакские дворы", category: "HISTORIC QUARTER", categoryRu: "ИСТОРИЧЕСКИЙ КВАРТАЛ", image: commons("Berlin, Hackesche Höfe -- 2011 -- 2446.jpg"), description: "A restored Art Nouveau courtyard complex filled with workshops, cafés and independent culture.", descriptionRu: "Отреставрированный комплекс дворов в стиле модерн с мастерскими, кафе и независимой культурой.", source: "https://commons.wikimedia.org/wiki/File:Berlin,_Hackesche_H%C3%B6fe_--_2011_--_2446.jpg" },
  ],
  london: [
    { name: "British Museum", nameRu: "Британский музей", category: "MUSEUM", categoryRu: "МУЗЕЙ", image: commons("British Museum Great Court, London, UK - Diliff.jpg"), description: "A world collection spanning two million years, gathered around the spectacular Great Court.", descriptionRu: "Мировая коллекция, охватывающая два миллиона лет истории, вокруг впечатляющего Большого двора.", source: "https://commons.wikimedia.org/wiki/File:British_Museum_Great_Court,_London,_UK_-_Diliff.jpg" },
    { name: "Tower Bridge", nameRu: "Тауэрский мост", category: "ENGINEERING ICON", categoryRu: "ИНЖЕНЕРНЫЙ СИМВОЛ", image: commons("Tower Bridge London Dusk Feb 2006.jpg"), description: "The Victorian bascule bridge remains one of London’s most recognisable pieces of engineering.", descriptionRu: "Викторианский разводной мост остаётся одним из самых узнаваемых инженерных сооружений Лондона.", source: "https://commons.wikimedia.org/wiki/File:Tower_Bridge_London_Dusk_Feb_2006.jpg" },
    { name: "Notting Hill", nameRu: "Ноттинг-Хилл", category: "NEIGHBOURHOOD", categoryRu: "РАЙОН", image: commons("London - Notting Hill Gate - Entrance Gate to Kensington Palace Gardens I.jpg"), description: "Pastel terraces, antique stalls and local cinemas give this west London district its unmistakable character.", descriptionRu: "Пастельные фасады, антикварные лавки и локальные кинотеатры создают узнаваемый характер западного Лондона.", source: "https://commons.wikimedia.org/wiki/File:London_-_Notting_Hill_Gate_-_Entrance_Gate_to_Kensington_Palace_Gardens_I.jpg" },
  ],
  venice: [
    { name: "Doge’s Palace", nameRu: "Дворец дожей", category: "PALACE MUSEUM", categoryRu: "ДВОРЕЦ-МУЗЕЙ", image: commons("(Venice) Doge's Palace and campanile of St. Mark's Basilica facing the sea.jpg"), description: "The Gothic seat of Venetian power connects grand council halls with the Bridge of Sighs.", descriptionRu: "Готический центр власти Венецианской республики соединяет парадные залы с Мостом Вздохов.", source: "https://commons.wikimedia.org/wiki/Category:Doge%27s_Palace" },
    { name: "Rialto Bridge", nameRu: "Мост Риальто", category: "CITY LANDMARK", categoryRu: "СИМВОЛ ГОРОДА", image: commons("Rialto-Bridge-Venice-20050525-023.jpg"), description: "The stone arch over the Grand Canal has carried merchants and travellers since the sixteenth century.", descriptionRu: "Каменная арка над Гранд-каналом с XVI века соединяет торговые кварталы и маршруты путешественников.", source: "https://commons.wikimedia.org/wiki/File:Rialto-Bridge-Venice-20050525-023.jpg" },
    { name: "Murano", nameRu: "Остров Мурано", category: "CRAFT ISLAND", categoryRu: "ОСТРОВ МАСТЕРОВ", image: commons("Canale San Giovanni (Murano).jpg"), description: "Canals, furnaces and family workshops preserve Venice’s centuries-old glassmaking tradition.", descriptionRu: "Каналы, печи и семейные мастерские хранят многовековую традицию венецианского стекла.", source: "https://commons.wikimedia.org/wiki/File:Canale_San_Giovanni_(Murano).jpg" },
  ],
  lisbon: [
    { name: "Belém Tower", nameRu: "Башня Белен", category: "UNESCO MONUMENT", categoryRu: "ПАМЯТНИК ЮНЕСКО", image: commons("Belem's Tower (3132267544).jpg"), description: "A Manueline fortress at the Tagus recalls the voyages that connected Lisbon with the world.", descriptionRu: "Крепость в стиле мануэлино у Тежу напоминает о путешествиях, связавших Лиссабон с миром.", source: "https://commons.wikimedia.org/wiki/Category:Bel%C3%A9m_Tower" },
    { name: "National Tile Museum", nameRu: "Национальный музей азулежу", category: "MUSEUM", categoryRu: "МУЗЕЙ", image: commons("Tiles Tower (Madre de Deus) (3153825988).jpg"), description: "Portugal’s painted-tile history unfolds inside the former Madre de Deus convent.", descriptionRu: "История португальских расписных плиток раскрывается в стенах бывшего монастыря Мадре-де-Деуш.", source: "https://commons.wikimedia.org/wiki/Category:National_Tile_Museum" },
    { name: "Alfama", nameRu: "Алфама", category: "HISTORIC QUARTER", categoryRu: "ИСТОРИЧЕСКИЙ КВАРТАЛ", image: commons("Alfama, Lisbon (DSC03367).jpg"), description: "Lisbon’s oldest lanes climb between tiled houses, viewpoints and small fado rooms.", descriptionRu: "Старейшие улицы Лиссабона поднимаются между домами с азулежу, смотровыми площадками и залами фаду.", source: "https://commons.wikimedia.org/wiki/Category:Alfama" },
  ],
  paris: [
    { name: "The Louvre", nameRu: "Лувр", category: "MUSEUM", categoryRu: "МУЗЕЙ", image: commons("Arc de triomphe du carrousel and louvre.jpg"), description: "A former royal palace now houses one of the world’s most extensive art collections.", descriptionRu: "Бывший королевский дворец хранит одну из крупнейших художественных коллекций мира.", source: "https://commons.wikimedia.org/wiki/Category:Louvre_Palace" },
    { name: "Arc de Triomphe", nameRu: "Триумфальная арка", category: "CITY LANDMARK", categoryRu: "СИМВОЛ ГОРОДА", image: commons("Arc de Triomphe (22471527055).jpg"), description: "The monumental arch crowns the historic axis and offers a panoramic view over twelve avenues.", descriptionRu: "Монументальная арка завершает историческую ось и открывает панораму двенадцати проспектов.", source: "https://commons.wikimedia.org/wiki/Category:Arc_de_Triomphe_de_l%27%C3%89toile" },
    { name: "Montmartre", nameRu: "Монмартр", category: "ARTISTS’ QUARTER", categoryRu: "КВАРТАЛ ХУДОЖНИКОВ", image: commons("Paris View from Arc de Triomphe Sacré Coeur Montmartre 20100505.jpg"), description: "Hilltop streets, studios and Sacré-Cœur preserve the memory of Paris’s bohemian era.", descriptionRu: "Улицы на холме, мастерские и Сакре-Кёр сохраняют память о богемной эпохе Парижа.", source: "https://commons.wikimedia.org/wiki/Category:Montmartre" },
  ],
  santorini: [
    { name: "Ancient Akrotiri", nameRu: "Древний Акротири", category: "ARCHAEOLOGY", categoryRu: "АРХЕОЛОГИЯ", image: commons("Santorin (GR), Akrotiri -- 2017 -- 2975.jpg"), description: "A Bronze Age settlement preserved beneath volcanic ash reveals sophisticated island life.", descriptionRu: "Поселение бронзового века, сохранённое под вулканическим пеплом, рассказывает о развитой жизни острова.", source: "https://commons.wikimedia.org/wiki/Category:Akrotiri_(prehistoric_city)" },
    { name: "Oia Castle", nameRu: "Замок Ойя", category: "SUNSET VIEWPOINT", categoryRu: "СМОТРОВАЯ ПЛОЩАДКА", image: commons("Oia Castle.jpg"), description: "The ruins of Agios Nikolaos castle frame the caldera and Santorini’s celebrated sunset.", descriptionRu: "Руины замка Святого Николая обрамляют кальдеру и знаменитый закат Санторини.", source: "https://commons.wikimedia.org/wiki/Category:Oia,_Greece" },
    { name: "Pyrgos", nameRu: "Пиргос", category: "HILLTOP VILLAGE", categoryRu: "ДЕРЕВНЯ НА ХОЛМЕ", image: commons("Santorin (GR), Pirgos Kallistis -- 2017 -- 2909.jpg"), description: "A labyrinth of white lanes climbs to a Venetian castle above vineyards and blue domes.", descriptionRu: "Лабиринт белых улиц ведёт к венецианскому замку над виноградниками и синими куполами.", source: "https://commons.wikimedia.org/wiki/File:Santorin_(GR),_Pirgos_Kallistis_--_2017_--_2909.jpg" },
  ],
};

export const destinationHotels: Record<string, DestinationHotel[]> = {
  berlin: [
    { name: "Hotel Adlon Kempinski", image: commons("Adlon Hotel Berlin Germany - 01.jpg"), price: 390, rating: 4.9, type: "Historic grand hotel", typeRu: "Исторический гранд-отель", description: "A landmark hotel beside the Brandenburg Gate with classic rooms and renowned service.", descriptionRu: "Знаковый отель рядом с Бранденбургскими воротами, с классическими номерами и знаменитым сервисом.", source: "https://commons.wikimedia.org/wiki/File:Adlon_Hotel_Berlin_Germany_-_01.jpg" },
    { name: "25hours Hotel Bikini Berlin", image: commons("Bikini Berlin Rückseite 2014.jpg"), price: 175, rating: 4.7, type: "Design hotel", typeRu: "Дизайн-отель", description: "A playful design stay overlooking Berlin Zoo and the greenery of Tiergarten.", descriptionRu: "Яркий дизайн-отель с видом на Берлинский зоопарк и зелень Тиргартена.", source: "https://commons.wikimedia.org/wiki/Category:Bikini-Haus" },
    { name: "Hotel de Rome", image: commons("Hotel de Rome, Berlin (P1080140).jpg"), price: 320, rating: 4.8, type: "Luxury city hotel", typeRu: "Городской люкс-отель", description: "A former bank on Bebelplatz transformed into a refined hotel with a rooftop terrace.", descriptionRu: "Бывшее банковское здание на Бебельплац, превращённое в изысканный отель с террасой на крыше.", source: "https://commons.wikimedia.org/wiki/File:Hotel_de_Rome,_Berlin_(P1080140).jpg" },
  ],
  london: [
    { name: "The Savoy", image: commons("Hôtel Savoy The Strand Londres - edited.jpg"), price: 690, rating: 4.9, type: "Historic luxury hotel", typeRu: "Исторический люкс-отель", description: "The celebrated Strand hotel combines Edwardian and Art Deco interiors beside the Thames.", descriptionRu: "Знаменитый отель на Стрэнде сочетает эдвардианские и ар-деко интерьеры рядом с Темзой.", source: "https://commons.wikimedia.org/wiki/Category:Savoy_Hotel" },
    { name: "The Ned London", image: "https://media.fastly.sohohousedigital.com/w_2306,h_1730/t_dc_base/sitecore-prod/images/dotcom-sites/location-pages/london/01k-london-location-the-ned.jpg", price: 410, rating: 4.8, type: "Members’ club hotel", typeRu: "Отель-клуб", description: "A monumental former bank in the City, known for its vast banking hall and rooftop pool.", descriptionRu: "Монументальное здание бывшего банка в Сити с огромным главным залом и бассейном на крыше.", source: "https://www.thened.com/london" },
    { name: "The Hoxton Shoreditch", image: "https://thehoxton.com/wp-content/uploads/sites/5/2020/05/Shoreditch_Hero.jpg", price: 235, rating: 4.7, type: "Neighbourhood hotel", typeRu: "Районный бутик-отель", description: "An energetic Shoreditch base with a lively lobby and the East End on its doorstep.", descriptionRu: "Живой отель в Шордиче с атмосферным лобби и Ист-Эндом прямо за дверью.", source: "https://thehoxton.com/london/shoreditch/" },
  ],
  venice: [
    { name: "Hotel Danieli", image: commons("(Venice) Palazzo Dandolo (Daniel Hotel) - Main entrance.jpg"), price: 620, rating: 4.9, type: "Historic palace hotel", typeRu: "Отель в историческом дворце", description: "A legendary Gothic palazzo steps from St Mark’s Square with lagoon-facing terraces.", descriptionRu: "Легендарный готический палаццо у площади Сан-Марко с террасами над лагуной.", source: "https://commons.wikimedia.org/wiki/Category:Hotel_Danieli" },
    { name: "Ca’ Sagredo Hotel", image: commons("Hotel Ca Sagredo - Grand Canal - Rialto - Venice Italy Venezia - Creative Commons by gnuckx (4965635155).jpg"), price: 380, rating: 4.8, type: "Grand Canal palace", typeRu: "Дворец на Гранд-канале", description: "A fifteenth-century palazzo and national monument filled with frescoes and grand staircases.", descriptionRu: "Палаццо XV века и национальный памятник с фресками и парадными лестницами.", source: "https://commons.wikimedia.org/wiki/Category:Ca%27_Sagredo" },
    { name: "The Gritti Palace", image: commons("Venezia - Gritti Palace Hotel.JPG"), price: 790, rating: 4.9, type: "Luxury Collection hotel", typeRu: "Исторический люкс-отель", description: "A noble Grand Canal residence facing Santa Maria della Salute, restored with Venetian craft.", descriptionRu: "Аристократическая резиденция на Гранд-канале напротив Санта-Мария-делла-Салюте.", source: "https://commons.wikimedia.org/wiki/File:Venezia_-_Gritti_Palace_Hotel.JPG" },
  ],
  lisbon: [
    { name: "Memmo Alfama", image: "https://www.memmohotels.com/alfama/media/memmo-alfama-bannermemmo-alfama_banner-inicial_new2.webp", price: 245, rating: 4.8, type: "Design hotel", typeRu: "Дизайн-отель", description: "A discreet adults-focused hotel woven into Alfama’s lanes, with a red-tiled river terrace.", descriptionRu: "Камерный отель среди улиц Алфамы с террасой, красной черепицей и видом на реку.", source: "https://www.memmohotels.com/alfama/" },
    { name: "Bairro Alto Hotel", image: "https://www.bairroaltohotel.com/fotos/destaques/histoyria_bairro_alto_8146688235cebeabb07bf3_1.jpg", price: 390, rating: 4.9, type: "Landmark boutique hotel", typeRu: "Знаковый бутик-отель", description: "A restored eighteenth-century building between Chiado and Bairro Alto with a rooftop view.", descriptionRu: "Отреставрированное здание XVIII века между Шиаду и Байрру-Алту с панорамной крышей.", source: "https://www.bairroaltohotel.com/" },
    { name: "Palácio Ludovice", image: commons("Illuminated Facade of Palácio Ludovice Wine Experience Hotel, Lisbon (54749425248).jpg"), price: 330, rating: 4.8, type: "Wine experience hotel", typeRu: "Винный бутик-отель", description: "An eighteenth-century palace transformed into a refined wine-focused hotel near São Pedro de Alcântara.", descriptionRu: "Дворец XVIII века, превращённый в изысканный винный отель у Сан-Педру-де-Алкантара.", source: "https://commons.wikimedia.org/wiki/File:Illuminated_Facade_of_Pal%C3%A1cio_Ludovice_Wine_Experience_Hotel,_Lisbon_(54749425248).jpg" },
  ],
  paris: [
    { name: "Hotel Lutetia", image: "https://media.ffycdn.net/eu/mandarin-oriental-hotel-group/gF7g2HoJ2et8F6ZvSGPS.jpg", price: 710, rating: 4.9, type: "Left Bank palace", typeRu: "Дворец на левом берегу", description: "An Art Nouveau and Art Deco landmark in Saint-Germain-des-Prés, restored with contemporary detail.", descriptionRu: "Знаковый отель ар-нуво и ар-деко в Сен-Жермен-де-Пре, бережно обновлённый современными деталями.", source: "https://www.hotellutetia.com/" },
    { name: "Le Meurice", image: commons("Hotel Meurice Paris.jpg"), price: 980, rating: 4.9, type: "Parisian palace", typeRu: "Парижский дворец", description: "The historic palace hotel overlooks the Tuileries and blends classical grandeur with artistic wit.", descriptionRu: "Исторический дворцовый отель напротив Тюильри сочетает классическую роскошь и художественный характер.", source: "https://commons.wikimedia.org/wiki/File:Hotel_Meurice_Paris.jpg" },
    { name: "Maison Souquet", image: "https://www.maisonsouquet.com/wp-content/uploads/2024/02/MS-Salon-1001-nuits_2.jpg", price: 420, rating: 4.8, type: "Belle Époque hideaway", typeRu: "Бутик-отель Belle Époque", description: "An intimate theatrical hotel near Montmartre inspired by the opulence of the Belle Époque.", descriptionRu: "Камерный театральный отель у Монмартра, вдохновлённый роскошью эпохи Belle Époque.", source: "https://www.maisonsouquet.com/" },
  ],
  santorini: [
    { name: "Katikies Santorini", image: "https://www.katikies.com/media/jivfxyjl/katikies-hotel-santorini_q1a3352.jpg?center=0.67264386640707907,0.487468671679198&mode=crop&width=1400&height=900", price: 760, rating: 4.9, type: "Caldera hotel", typeRu: "Отель над кальдерой", description: "White cave suites and infinity pools cascade down the cliffs of Oia above the caldera.", descriptionRu: "Белые пещерные номера и панорамные бассейны спускаются по скалам Ойи над кальдерой.", source: "https://www.katikies.com/katikieshotelsantorini/" },
    { name: "Canaves Oia Suites", image: "https://canaves.com/wp-content/uploads/2016/10/Canaves_SUITES_Oia_Santorini_Junior_Suite-1.jpg", price: 690, rating: 4.9, type: "Cliffside suites", typeRu: "Сьюты на скале", description: "Minimal white suites, private plunge pools and uninterrupted Aegean views in Oia.", descriptionRu: "Минималистичные белые сьюты, приватные бассейны и открытые виды на Эгейское море в Ойе.", source: "https://canaves.com/canaves-oia-suites/" },
    { name: "Grace Hotel Santorini", image: "https://dreffui1gbt6t.cloudfront.net/images/gra/TRG_1937-copy-1-1024x576.jpg", price: 820, rating: 4.9, type: "Boutique retreat", typeRu: "Бутик-ретрит", description: "A serene Imerovigli retreat known for its long infinity pool and Skaros Rock sunsets.", descriptionRu: "Спокойный ретрит в Имеровигли с длинным панорамным бассейном и закатами над Скаросом.", source: "https://auberge.com/grace-hotel" },
  ],
};

export const featuredHotels = [
  { id: 1, slug: "lisbon", city: "Lisbon", country: "Portugal", ...destinationHotels.lisbon[0] },
  { id: 2, slug: "paris", city: "Paris", country: "France", ...destinationHotels.paris[0] },
  { id: 3, slug: "santorini", city: "Santorini", country: "Greece", ...destinationHotels.santorini[0] },
  { id: 4, slug: "venice", city: "Venice", country: "Italy", ...destinationHotels.venice[0] },
];
