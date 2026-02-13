/**
 * Get funny/friendly comments based on weather conditions
 * @param {string} weatherMain - Main weather condition (e.g., "Clear", "Rain", etc.)
 * @returns {string} Funny comment in Italian
 */
export const getWeatherComment = (weatherMain) => {
  const comments = {
    Clear: [
      "☀️ Che spettacolo! È il momento perfetto per un gelato!",
      "☀️ Il sole splende! Prepara gli occhiali da sole!",
      "☀️ Giornata fantastica! Il sole è protagonista oggi!",
    ],
    Rain: [
      "🌧️ Ops! Meglio prendere l'ombrello, oggi piove a dirotto!",
      "🌧️ Piove! Momento perfetto per una cioccolata calda!",
      "🌧️ Le gocce ballano! Non dimenticare l'impermeabile!",
    ],
    Drizzle: [
      "🌦️ Pioggerellina leggera! Un po' di freschezza non fa male!",
      "🌦️ Pioggia delicata! La natura si sta dissetando!",
    ],
    Clouds: [
      "⛅ Le nuvole stanno giocando a nascondino con il sole!",
      "⛅ Nuvoloso ma affascinante! Le nuvole dipingono il cielo!",
      "⛅ Un po' grigio ma sempre suggestivo!",
    ],
    Snow: [
      "❄️ Evviva! È tempo di pupazzi di neve!",
      "❄️ Nevica! Il mondo si veste di bianco!",
      "❄️ Che meraviglia! Fiocchi di neve dappertutto!",
    ],
    Thunderstorm: [
      "🌪️ Wow! La natura sta facendo uno spettacolo pirotecnico!",
      "⛈️ Temporale in arrivo! Zeus è arrabbiato oggi!",
      "⛈️ Che spettacolo! Tuoni e fulmini illuminano il cielo!",
    ],
    Mist: [
      "🌫️ Nebbia misteriosa! Sembra un film thriller!",
      "🌫️ Il mondo è avvolto nel mistero della nebbia!",
    ],
    Fog: [
      "🌫️ Attenzione alla nebbia! Guida con prudenza!",
      "🌫️ Nebbia fitta! Il mondo è un quadro impressionista!",
    ],
    Haze: [
      "🌁 Un velo di foschia rende tutto più poetico!",
      "🌁 L'atmosfera è un po' velata ma sempre affascinante!",
    ],
  };

  const weatherComments = comments[weatherMain] || [
    "🌤️ Che tempo interessante oggi!",
    "🌤️ Il meteo ha deciso di sorprenderci!",
  ];

  // Return a random comment from the array
  return weatherComments[Math.floor(Math.random() * weatherComments.length)];
};

/**
 * Format timestamp to local time string
 * @param {number} timestamp - Unix timestamp
 * @param {number} timezone - Timezone offset in seconds
 * @returns {string} Formatted time string
 */
export const formatLocalTime = (timestamp, timezone) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
};

/**
 * Format date for forecast
 * @param {string} dateString - Date string from API
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('it-IT', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
};

/**
 * Capitalize first letter of a string
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export const capitalizeDescription = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
