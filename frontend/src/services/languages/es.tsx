const GENERAL_LANG = {
  SEARCH: 'Buscar',
  ACTIONS: 'Acciones'
};

const LOGIN_LANG = {
  LOGIN_USERNAME: 'Nombre de usuario',
  LOGIN_PASSWORD: 'Contraseña'
};

const HOME_LANG = {
  HOME_LIST: 'Inicio',
  HOME_FARMABLE_LAND: 'Gestión de Terrenos',
  HOME_CROP: 'Gestión de Cultivos',
  HOME_PHYTOSANITARY: 'Gestión de Fitosanitarios',
  HOME_EVENTS: 'Gestión de Eventos',
  HOME_IRRIGATE: 'Gestión de Riegos',
  HOME_NOTIFICATIONS: 'Ver Notificaciones',
  HOME_FARMABLE_LAND_DESCRIPTION: 'Podrás gestionar tus terrenos con comodidad',
  HOME_CROP_DESCRIPTION: 'Podrás gestionar tus cultivos con comodidad',
  HOME_PHYTOSANITARY_DESCRIPTION: 'Podrás gestionar tus fitosanitarios con comodidad',
  HOME_EVENTS_DESCRIPTION: 'Podrás gestionar tus eventos con comodidad',
  HOME_IRRIGATE_DESCRIPTION: 'Podrás gestionar tus riegos con comodidad',
  HOME_NOTIFICATIONS_DESCRIPTION: 'Podrás ver tus notificaciones con comodidad',
};

const MENU_LANG = {
  MENU: 'Menú',
  DASHBOARD: 'Panel de Control de',
  HOME: 'Inicio',
  FARMABLE_LANDS: 'Terrenos',
  CROPS: 'Cultivos',
  PHYTOSANITARYS: 'Fitosanitarios',
  IRRIGATES: 'Riegos',
  EVENTS: 'Eventos',
  NOTIFICATIONS: 'Notificaciones',
  SETTINGS: 'Ajustes',
  CLOSE_SESSION: 'Cerrar sesión',
};

const FARMABLE_LAND_TYPES_LANG = {
  FARMABLE_LAND_TYPE_IRRIGATION: 'Regadío',
  FARMABLE_LAND_TYPE_DRYLAND: 'Secano',
  FARMABLE_LAND_TYPE_GREENHOUSE: 'Invernadero',
  FARMABLE_LAND_TYPE_OPENLAND: 'Al exterior',
};

const FARMABLE_LAND_LANG = {
  FARMABLE_LAND_LIST: 'Terrenos',
  FARMABLE_LAND_NAME: 'Nombre',
  FARMABLE_LAND_TYPE: 'Tipo',
  FARMABLE_LAND_AREA: 'Área',
  FARMABLE_LAND_IMAGE: 'Imagen',
  FARMABLE_LAND_LIST_HAVEIOT: 'Se ha agregado un sistema de IOT',
  FARMABLE_LAND_HAVEIOT: 'Agregar sistema de IOT',
  FARMABLE_LAND_HAVEPHOTO: 'Tengo foto aerea o plano del terreno',
  FARMABLE_LAND_IS_SQUARE: 'El terreno tiene forma de cuadrado o rectángulo',
  FARMABLE_LAND_SQUARE_MESSAGE: 'Al no ser el terreno rectangular, por favor, dibuje la forma que tiene el mismo (es solo para tener por parte de la administracion una idea de como es el terreno)',
  FARMABLE_LAND_CREATE: 'Añadir terreno',
  FARMABLE_LAND_EDIT: 'Editar terreno',
  ...FARMABLE_LAND_TYPES_LANG
};

const CROP_LANG = {
  CROP_LIST: 'Cultivos',
  CROP_LENGTH: 'cultivos(s)',
  CROP_NAME_PLURAL: 'Cultivos',
  CROP_NAME_SINGULAR: 'Cultivo',
  CROP_FARMABLE_LAND: 'Terreno',
  CROP_WEEKS: 'semana(s)',
  CROP_CREATE: 'Crear cultivo',
  CROP_EDIT: 'Editar cultivo'
};

const PHYTOSANITARY_LANG = {
  PHYTOSANITARY_LIST: 'Fitosanitarios',
  PHYTOSANITARY_LENGTH: 'Fitosanitario(s)',
  PHYTOSANITARY_NAME_PLURAL: 'Fitosanitarios',
  PHYTOSANITARY_NAME_SINGULAR: 'Fitosanitario',
  PHYTOSANITARY_CREATE: 'Añadir fitosanitario',
  PHYTOSANITARY_EDIT: 'Editar fitosanitario',
};

const IRRIGATE_LANG = {
  IRRIGATE_LIST: 'Riegos',
  IRRIGATE_FARMABLE_LAND: 'Terreno',
  IRRIGATE_AQUA_QUANTITY: 'Cantidad de agua',
  IRRIGATE_AQUA_QUANTITY_TYPE: 'litros',
  IRRIGATE_DURABILITY: 'Duración',
  IRRIGATE_DURABILITY_IN_MINUTES: 'Duración en minutos',
  IRRIGATE_MINUTES: 'minutos',
  IRRIGATE_CREATE: 'Añadir riego',
  IRRIGATE_EDIT: 'Editar riego',
};

const EVENTS_ACTION_TYPES_LANG = {
  EVENTS_ACTION_TYPES_AUTOMATIC: 'AUTOMÁTICO',
  EVENTS_ACTION_TYPES_MANUAL: 'MANUAL',
  EVENTS_ACTION_TYPES_SETTINGS: 'AJUSTES',
};

const EVENTS_NAMES_LANG = {
  EVENTS_NAMES_OpenCeilingGreenHouse: 'Abrir techo de invernadero',
  EVENTS_NAMES_Irrigate: 'Regar',
  EVENTS_NAMES_Fertilizer: 'Insertar fertilizante',
  EVENTS_NAMES_OpenWallGreenhouse: 'Abrir pared de invernadero',
};

const EVENTS_LANG = {
  EVENTS_LIST: 'Eventos',
  EVENTS_NAME: 'Nombre',
  EVENTS_RANGE: 'Rango',
  EVENTS_ACTION_TYPE: 'Tipo de acción',
  EVENTS_EXECUTIONS: 'Ejecuciones',
  EVENTS_CREATE_EVENT: 'Evento',
  EVENTS_CREATE_ACTION: 'Acción',
  EVENTS_CREATE_VALUE_MIN: 'Valor mínimo del rango de valores del evento',
  EVENTS_CREATE_VALUE_MAX: 'Valor máximo del rango de valores del evento',
  EVENTS_CREATE: 'Añadir evento',
  EVENTS_EDIT: 'Editar evento',
  ...EVENTS_ACTION_TYPES_LANG,
  ...EVENTS_NAMES_LANG
};

const NOTIFICATION_LANG = {
  NOTIFICATION_LIST: 'Notificaciones',
  NOTIFICATION_EVENT: 'Evento',
  NOTIFICATION_DESCRIPTION_1: 'El Evento',
  NOTIFICATION_DESCRIPTION_2: 'ha sido disparado con el sensor',
  NOTIFICATION_DESCRIPTION_3: 'y el valor',
  NOTIFICATION_DESCRIPTION_4: 'Clicke aquí para realizar la acción asociada al evento',
  NOTIFICATION_DESCRIPTION_5: 'Se ha realizado la accion automatizada. Clicke aquí para mas información',
};

const SETTING_LANGUAGE_TYPE_LANG = {
  SETTING_LANGUAGE_TYPE_ES: 'Español',
  SETTING_LANGUAGE_TYPE_EN: 'Inglés'
};

const SETTING_LANG = {
  SETTING_LIST: 'Ajustes',
  SETTING_SAVE: 'Guardar',
  SETTING_DARK_MODE: 'Modo Oscuro',
  SETTING_LIGHT_MODE: 'Modo Claro',
  SETTING_LANGUAGE: 'Idioma',
  SETTING_ACTION_BY_DEFAULT: 'Acción por defecto en eventos',
  ...SETTING_LANGUAGE_TYPE_LANG
};

export default {
  ...GENERAL_LANG,
  ...LOGIN_LANG,
  ...HOME_LANG,
  ...MENU_LANG,
  ...FARMABLE_LAND_LANG,
  ...CROP_LANG,
  ...PHYTOSANITARY_LANG,
  ...IRRIGATE_LANG,
  ...EVENTS_LANG,
  ...NOTIFICATION_LANG,
  ...SETTING_LANG,
};
