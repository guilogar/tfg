const GENERAL_LANG = {
  SEARCH: 'Search',
  ACTIONS: 'Actions'
};

const LOGIN_LANG = {
  LOGIN_USERNAME: 'Username',
  LOGIN_PASSWORD: 'Password'
};

const HOME_LANG = {
  HOME_LIST: 'Home',
  HOME_FARMABLE_LAND: 'Land Management',
  HOME_CROP: 'Crop Management',
  HOME_PHYTOSANITARY: 'Phytosanitary Management',
  HOME_EVENTS: 'Events Management',
  HOME_IRRIGATE: 'Irrigates Management',
  HOME_NOTIFICATIONS: 'List Notifications',
  HOME_FARMABLE_LAND_DESCRIPTION: 'You can manage your land comfortably',
  HOME_CROP_DESCRIPTION: 'You can manage your crop comfortably',
  HOME_PHYTOSANITARY_DESCRIPTION: 'You can manage your phytosanitary comfortably',
  HOME_EVENTS_DESCRIPTION: 'You can manage your events comfortably',
  HOME_IRRIGATE_DESCRIPTION: 'You can manage your irrigates comfortably',
  HOME_NOTIFICATIONS_DESCRIPTION: 'You can list your notifications comfortably',
};

const MENU_LANG = {
  MENU: 'Menu',
  DASHBOARD: 'Dashboard of',
  HOME: 'Home',
  FARMABLE_LANDS: 'Farmable Lands',
  CROPS: 'Crops',
  PHYTOSANITARYS: 'Phytosanitarys',
  IRRIGATES: 'Irrigates',
  EVENTS: 'Events',
  NOTIFICATIONS: 'Notifications',
  SETTINGS: 'Settings',
  CLOSE_SESSION: 'Close session',
};

const FARMABLE_LAND_TYPES_LANG = {
  FARMABLE_LAND_TYPE_IRRIGATION: 'Irrigation',
  FARMABLE_LAND_TYPE_DRYLAND: 'Dry Land',
  FARMABLE_LAND_TYPE_GREENHOUSE: 'Greenhouse',
  FARMABLE_LAND_TYPE_OPENLAND: 'To the exterior',
};

const FARMABLE_LAND_LANG = {
  FARMABLE_LAND_LIST: 'Lands',
  FARMABLE_LAND_NAME: 'Name',
  FARMABLE_LAND_TYPE: 'Type',
  FARMABLE_LAND_AREA: 'Area',
  FARMABLE_LAND_IMAGE: 'Image',
  FARMABLE_LAND_LIST_HAVEIOT: 'An IOT system has been added',
  FARMABLE_LAND_HAVEIOT: 'Add IOT system',
  FARMABLE_LAND_HAVEPHOTO: 'I have an aerial photo or plan of the terrain',
  FARMABLE_LAND_IS_SQUARE: 'The terrain is shaped like a square or rectangle',
  FARMABLE_LAND_SQUARE_MESSAGE: 'As the terrain is not rectangular, please draw the shape it has (it is only to have an idea of ​​how the terrain is on the part of the administration)',
  FARMABLE_LAND_CREATE: 'Add land',
  FARMABLE_LAND_EDIT: 'Edit land',
  ...FARMABLE_LAND_TYPES_LANG
};

const CROP_LANG = {
  CROP_LIST: 'Crops',
  CROP_LENGTH: 'crop\'s',
  CROP_NAME_PLURAL: 'Crops',
  CROP_NAME_SINGULAR: 'Crop',
  CROP_FARMABLE_LAND: 'Land',
  CROP_WEEKS: 'week\s',
  CROP_CREATE: 'Add crop',
  CROP_EDIT: 'Edit crop'
};

const PHYTOSANITARY_LANG = {
  PHYTOSANITARY_LIST: 'Phytosanitarys',
  PHYTOSANITARY_LENGTH: 'Phytosanitary\'s',
  PHYTOSANITARY_NAME_PLURAL: 'Phytosanitarys',
  PHYTOSANITARY_NAME_SINGULAR: 'Phytosanitary',
  PHYTOSANITARY_CREATE: 'Add phytosanitary',
  PHYTOSANITARY_EDIT: 'Edit phytosanitary',
};

const IRRIGATE_LANG = {
  IRRIGATE_LIST: 'Irrigates',
  IRRIGATE_FARMABLE_LAND: 'Land',
  IRRIGATE_AQUA_QUANTITY: 'Water amount',
  IRRIGATE_AQUA_QUANTITY_TYPE: 'liters',
  IRRIGATE_DURABILITY: 'Length',
  IRRIGATE_DURABILITY_IN_MINUTES: 'Length in minutes',
  IRRIGATE_MINUTES: 'minutes',
  IRRIGATE_CREATE: 'Add irrigate',
  IRRIGATE_EDIT: 'Edit irrigate',
};

const EVENTS_ACTION_TYPES_LANG = {
  EVENTS_ACTION_TYPES_AUTOMATIC: 'AUTOMATIC',
  EVENTS_ACTION_TYPES_MANUAL: 'MANUAL',
  EVENTS_ACTION_TYPES_SETTINGS: 'SETTINGS',
};

const EVENTS_NAMES_LANG = {
  EVENTS_NAMES_OpenCeilingGreenHouse: 'Open greenhouse roof',
  EVENTS_NAMES_Irrigate: 'Irrigate',
  EVENTS_NAMES_Fertilizer: 'Insert fertilizer',
  EVENTS_NAMES_OpenWallGreenhouse: 'Open greenhouse wall',
};

const EVENTS_LANG = {
  EVENTS_LIST: 'Events',
  EVENTS_NAME: 'Name',
  EVENTS_RANGE: 'Rank',
  EVENTS_ACTION_TYPE: 'Action type',
  EVENTS_EXECUTIONS: 'Executions',
  EVENTS_CREATE_EVENT: 'Event',
  EVENTS_CREATE_ACTION: 'Action',
  EVENTS_CREATE_VALUE_MIN: 'Minimum value of the event\'s range of values',
  EVENTS_CREATE_VALUE_MAX: 'Maximum value of the event\'s range of values',
  EVENTS_CREATE: 'Add event',
  EVENTS_EDIT: 'Edit event',
  ...EVENTS_ACTION_TYPES_LANG,
  ...EVENTS_NAMES_LANG
};

const NOTIFICATION_LANG = {
  NOTIFICATION_LIST: 'Notifications',
  NOTIFICATION_EVENT: 'Event',
  NOTIFICATION_DESCRIPTION_1: 'The Event',
  NOTIFICATION_DESCRIPTION_2: 'has been triggered with the sensor',
  NOTIFICATION_DESCRIPTION_3: 'and the value',
  NOTIFICATION_DESCRIPTION_4: 'Click here to perform the action associated with the event',
  NOTIFICATION_DESCRIPTION_5: 'The automated action has been performed. Click here for more information',
};

const SETTING_LANGUAGE_TYPE_LANG = {
  SETTING_LANGUAGE_TYPE_ES: 'Spanish',
  SETTING_LANGUAGE_TYPE_EN: 'English'
};

const SETTING_LANG = {
  SETTING_LIST: 'Settings',
  SETTING_SAVE: 'Save',
  SETTING_DARK_MODE: 'Dark Mode',
  SETTING_LIGHT_MODE: 'Light Mode',
  SETTING_LANGUAGE: 'Language',
  SETTING_ACTION_BY_DEFAULT: 'Default action on events',
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
