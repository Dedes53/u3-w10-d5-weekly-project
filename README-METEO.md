# 🌤️ MeteoApp - Applicazione Meteo React

Un'applicazione meteo React con un'impronta simpatica che fornisce commenti divertenti sul meteo recuperato tramite API OpenWeatherMap.

## 📋 Caratteristiche

- **Navbar fissa**: Navigazione semplice tra Home e Ricerca città
- **Pagina Home**: Mostra il meteo per 5 grandi città (Roma, Londra, Parigi, Tokio, New York)
- **Pagina Cerca**: Ricerca personalizzata con:
  - Meteo del giorno corrente (sezione sinistra)
  - Previsioni a 5 giorni (sezione destra)
- **Commenti simpatici**: Messaggi divertenti basati sulle condizioni meteo
- **Design allegro**: Gradazioni colorate e animazioni
- **Responsive**: Funziona su mobile, tablet e desktop
- **Gestione errori**: Stati di caricamento e messaggi di errore chiari

## 🎨 Commenti Simpatici

L'applicazione genera commenti divertenti in base alle condizioni meteo:

- ☀️ **Sole**: "Che spettacolo! È il momento perfetto per un gelato!"
- 🌧️ **Pioggia**: "Ops! Meglio prendere l'ombrello, oggi piove a dirotto!"
- ⛅ **Nuvoloso**: "Le nuvole stanno giocando a nascondino con il sole!"
- ❄️ **Neve**: "Evviva! È tempo di pupazzi di neve!"
- 🌪️ **Temporale**: "Wow! La natura sta facendo uno spettacolo pirotecnico!"

## 🚀 Installazione e Avvio

### Prerequisiti

- Node.js (versione 14 o superiore)
- npm o yarn
- Una chiave API gratuita di [OpenWeatherMap](https://openweathermap.org/api)

### Passi per l'installazione

1. **Clona il repository**
   ```bash
   git clone https://github.com/Dedes53/u3-w10-d5-weekly-project.git
   cd u3-w10-d5-weekly-project
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Configura la chiave API**
   ```bash
   cp .env.example .env
   ```
   
   Apri il file `.env` e inserisci la tua chiave API:
   ```
   VITE_WEATHER_API_KEY=la_tua_chiave_api_qui
   ```

4. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   ```
   
   L'applicazione sarà disponibile su `http://localhost:5173`

5. **Build per produzione**
   ```bash
   npm run build
   ```

## 🏗️ Struttura del Progetto

```
src/
├── components/          # Componenti riutilizzabili
│   ├── MyNavbar.jsx    # Barra di navigazione
│   ├── MyNavbar.css
│   ├── WeatherCard.jsx # Card meteo riutilizzabile
│   └── WeatherCard.css
├── pages/              # Pagine dell'applicazione
│   ├── Home.jsx        # Pagina principale con 5 città
│   ├── Home.css
│   ├── SearchCity.jsx  # Pagina di ricerca città
│   └── SearchCity.css
├── utils/              # Funzioni di utilità
│   ├── weatherApi.js   # Chiamate API OpenWeatherMap
│   └── weatherHelpers.js # Helper per commenti e formattazione
├── App.jsx             # Componente principale con routing
├── App.css
├── main.jsx            # Punto di ingresso
└── index.css           # Stili globali
```

## 🛠️ Tecnologie Utilizzate

- **React 19** - Libreria UI
- **React Router DOM 7** - Routing client-side
- **React Bootstrap 2** - Componenti UI
- **Vite 7** - Build tool e dev server
- **OpenWeatherMap API** - Dati meteo
- **ESLint** - Linting del codice

## 📱 Screenshots

### Home Page
Mostra il meteo per 5 grandi città del mondo con card colorate e animate.

### Pagina Ricerca
- **Desktop**: Layout a due colonne con meteo attuale e previsioni
- **Mobile**: Layout responsive che si adatta allo schermo

## 🧪 Script Disponibili

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Crea build di produzione
- `npm run preview` - Anteprima build di produzione
- `npm run lint` - Controlla il codice con ESLint

## 🌍 API e Localizzazione

L'applicazione utilizza:
- API OpenWeatherMap per i dati meteo
- Localizzazione italiana (`lang=it`) per descrizioni meteo
- Unità metriche (`units=metric`) per temperature in Celsius

## 🔒 Sicurezza

- Chiave API memorizzata in variabili d'ambiente (`.env`)
- File `.env` escluso dal controllo versione
- Template `.env.example` fornito per configurazione facile

## 📝 Licenza

Questo progetto è stato creato come progetto settimanale per scopi educativi.

## 👥 Autore

Progetto sviluppato per il corso di sviluppo web.

## 🙏 Ringraziamenti

- OpenWeatherMap per l'API meteo gratuita
- React Bootstrap per i componenti UI
- Vite per l'ottimo ambiente di sviluppo
