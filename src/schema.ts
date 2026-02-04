export type TreeFieldGroup =
  | 'identity'
  | 'taxonomy'
  | 'distribution'
  | 'morphology'
  | 'ecology'
  | 'reproduction'
  | 'physiology'
  | 'chemistry'
  | 'genetics'
  | 'uses'
  | 'culture'
  | 'conservation'
  | 'notes';

export interface TreeField {
  /** Machine‑readable id (используется в коде и в БД) */
  id: string;
  /** Человекочитаемый заголовок поля (на русском) */
  label: string;
  /** Краткое пояснение, что именно сюда записывать */
  description: string;
  /** Логическая группа, чтобы собирать поля по блокам на экране */
  group: TreeFieldGroup;
}

export const TREE_FIELDS: TreeField[] = [
  // IDENTITY
  {
    id: 'russianName',
    label: 'Русское название',
    description: 'Общепринятое русское название вида.',
    group: 'identity'
  },
  {
    id: 'latinName',
    label: 'Латинское название',
    description: 'Полное биноминальное название вида (род + вид).',
    group: 'identity'
  },
  {
    id: 'authorCitation',
    label: 'Автор таксона',
    description: 'Ботанический автор вида (например, L., Ledeb.).',
    group: 'identity'
  },
  {
    id: 'synonyms',
    label: 'Синонимы',
    description: 'Основные номенклатурные и устоявшиеся синонимы.',
    group: 'identity'
  },
  {
    id: 'commonNames',
    label: 'Народные названия',
    description: 'Народные и региональные названия на разных языках.',
    group: 'identity'
  },

  // ETYMOLOGY & HISTORY
  {
    id: 'etymology',
    label: 'Этимология',
    description: 'Происхождение латинского и/или русского названия.',
    group: 'culture'
  },
  {
    id: 'discoveryHistory',
    label: 'История описания',
    description: 'Краткая история открытия и научного описания вида.',
    group: 'culture'
  },
  {
    id: 'culturalSignificance',
    label: 'Культурное значение',
    description: 'Роль вида в культуре, мифологии, искусстве.',
    group: 'culture'
  },
  {
    id: 'symbolism',
    label: 'Символика',
    description: 'Символические значения, использование в гербах, флагах и т.п.',
    group: 'culture'
  },

  // TAXONOMY
  {
    id: 'family',
    label: 'Семейство',
    description: 'Ботаническое семейство (Pinaceae, Cupressaceae и др.).',
    group: 'taxonomy'
  },
  {
    id: 'genus',
    label: 'Род',
    description: 'Ботанический род, к которому относится вид.',
    group: 'taxonomy'
  },
  {
    id: 'section',
    label: 'Секция / подрод',
    description: 'Секция, подрод или другая внутривидовая таксономия.',
    group: 'taxonomy'
  },
  {
    id: 'relatedSpecies',
    label: 'Близкие виды',
    description: 'Таксоны, с которыми вид часто путают или сравнивают.',
    group: 'taxonomy'
  },
  {
    id: 'infraspecificTaxa',
    label: 'Подвиды и формы',
    description: 'Подвиды, разновидности, культивары, формы.',
    group: 'taxonomy'
  },

  // DISTRIBUTION & HABITAT
  {
    id: 'nativeRange',
    label: 'Естественный ареал',
    description: 'Регионы и страны естественного распространения.',
    group: 'distribution'
  },
  {
    id: 'introducedRange',
    label: 'Интродукция',
    description: 'Регионы, куда вид был интродуцирован человеком.',
    group: 'distribution'
  },
  {
    id: 'altitudinalRange',
    label: 'Высотный диапазон',
    description: 'Типичные высоты над уровнем моря, где встречается вид.',
    group: 'distribution'
  },
  {
    id: 'habitat',
    label: 'Местообитание',
    description: 'Типичные биотопы: леса, склоны, болота, побережья и т.д.',
    group: 'distribution'
  },
  {
    id: 'climate',
    label: 'Климат',
    description: 'Климатические предпочтения: температура, осадки, зоны USDA.',
    group: 'ecology'
  },

  // MORPHOLOGY — TREE
  {
    id: 'habit',
    label: 'Жизненная форма',
    description: 'Дерево, кустарник, форма кроны, максимальная высота.',
    group: 'morphology'
  },
  {
    id: 'bark',
    label: 'Кора',
    description: 'Цвет, структура, особенности коры в разном возрасте.',
    group: 'morphology'
  },
  {
    id: 'crown',
    label: 'Крона',
    description: 'Форма, густота и общий силуэт кроны.',
    group: 'morphology'
  },
  {
    id: 'branching',
    label: 'Ветвление',
    description: 'Тип ветвления, угол отхождения ветвей, характер побегов.',
    group: 'morphology'
  },
  {
    id: 'rootSystem',
    label: 'Корневая система',
    description: 'Главный корень, глубина, устойчивость к ветровалу.',
    group: 'morphology'
  },

  // MORPHOLOGY — NEEDLES & CONES
  {
    id: 'needles',
    label: 'Хвоя',
    description: 'Форма, длина, сечение хвои, расположение на побегах.',
    group: 'morphology'
  },
  {
    id: 'needleColor',
    label: 'Цвет хвои',
    description: 'Окраска и её сезонные изменения, наличие сизого налёта.',
    group: 'morphology'
  },
  {
    id: 'buds',
    label: 'Почки',
    description: 'Размер, форма и окраска вегетативных и генеративных почек.',
    group: 'morphology'
  },
  {
    id: 'maleCones',
    label: 'Мужские шишки',
    description: 'Строение и расположение микростробилов.',
    group: 'reproduction'
  },
  {
    id: 'femaleCones',
    label: 'Женские шишки',
    description: 'Размер, форма и характеристики зрелых шишек.',
    group: 'reproduction'
  },

  // REPRODUCTION & PHENOLOGY
  {
    id: 'floweringTime',
    label: 'Период пыления',
    description: 'Время образования и пыления шишек.',
    group: 'reproduction'
  },
  {
    id: 'seedMaturation',
    label: 'Созревание семян',
    description: 'Сроки созревания и раскрытия шишек.',
    group: 'reproduction'
  },
  {
    id: 'seedDispersal',
    label: 'Распространение семян',
    description: 'Основные агенты распространения семян (ветер, животные).',
    group: 'reproduction'
  },
  {
    id: 'growthRate',
    label: 'Скорость роста',
    description: 'Характерный темп роста в молодом и зрелом возрасте.',
    group: 'physiology'
  },
  {
    id: 'longevity',
    label: 'Долговечность',
    description: 'Ожидаемая максимальная продолжительность жизни.',
    group: 'physiology'
  },

  // ECOLOGY & INTERACTIONS
  {
    id: 'soilRequirements',
    label: 'Почвенные требования',
    description: 'Кислотность, влажность, богатство почвы, засоление.',
    group: 'ecology'
  },
  {
    id: 'lightRequirements',
    label: 'Отношение к свету',
    description: 'Светолюбивость или теневыносливость.',
    group: 'ecology'
  },
  {
    id: 'droughtTolerance',
    label: 'Засухоустойчивость',
    description: 'Степень устойчивости к недостатку влаги.',
    group: 'ecology'
  },
  {
    id: 'frostTolerance',
    label: 'Морозостойкость',
    description: 'Минимальные температуры, которые переносит вид.',
    group: 'ecology'
  },
  {
    id: 'pestsAndDiseases',
    label: 'Вредители и болезни',
    description: 'Ключевые патогены и насекомые-вредители, типичные повреждения.',
    group: 'ecology'
  },

  // CHEMISTRY & GENETICS
  {
    id: 'woodProperties',
    label: 'Свойства древесины',
    description: 'Плотность, стойкость, особенности текстуры и запаха.',
    group: 'chemistry'
  },
  {
    id: 'secondaryMetabolites',
    label: 'Вторичные метаболиты',
    description: 'Смолы, эфирные масла, алкалоиды и др. соединения.',
    group: 'chemistry'
  },
  {
    id: 'allergens',
    label: 'Аллергенность',
    description: 'Известные аллергические реакции на пыльцу или смолу.',
    group: 'chemistry'
  },
  {
    id: 'chromosomeNumber',
    label: 'Хромосомное число',
    description: 'Диплоидное число хромосом (2n).',
    group: 'genetics'
  },
  {
    id: 'dna',
    label: 'ДНК и генетика',
    description: 'Молекулярные маркеры, генетические исследования и клады.',
    group: 'genetics'
  },

  // USES & CONSERVATION
  {
    id: 'ornamentalUse',
    label: 'Декоративное использование',
    description: 'Применение в озеленении, ландшафтном дизайне, бонсай.',
    group: 'uses'
  },
  {
    id: 'economicUse',
    label: 'Хозяйственное значение',
    description: 'Лесозаготовка, смола, масла, иные продукты.',
    group: 'uses'
  },
  {
    id: 'medicinalUse',
    label: 'Лекарственное использование',
    description: 'Фитотерапия, традиционная медицина, современные препараты.',
    group: 'uses'
  },
  {
    id: 'conservationStatus',
    label: 'Природоохранный статус',
    description: 'Категории охраны (IUCN, национальные красные книги).',
    group: 'conservation'
  },
  {
    id: 'threats',
    label: 'Угрозы',
    description: 'Основные угрозы: вырубка, болезни, изменение климата и др.',
    group: 'conservation'
  },
  {
    id: 'conservationActions',
    label: 'Меры охраны',
    description: 'Существующие и рекомендуемые мероприятия по защите вида.',
    group: 'conservation'
  },

  // META / NOTES
  {
    id: 'fieldNotes',
    label: 'Полевые заметки',
    description: 'Наблюдения в природе: фенология, ассоциации, особенности.',
    group: 'notes'
  },
  {
    id: 'cultivationNotes',
    label: 'Заметки по культивированию',
    description: 'Особенности выращивания в коллекциях и ботанических садах.',
    group: 'notes'
  },
  {
    id: 'references',
    label: 'Литература и источники',
    description: 'Ключевые книги, статьи, онлайн-ресурсы по виду.',
    group: 'notes'
  },
  {
    id: 'photos',
    label: 'Фотоматериалы',
    description: 'Список или ссылки на ключевые фотографии для атласа.',
    group: 'notes'
  }
];

