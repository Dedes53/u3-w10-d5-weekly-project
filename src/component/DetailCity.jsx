import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Alert, Button } from "react-bootstrap";

const DetailCity = function () {
    const { cityName } = useParams(); // nome città da Url 
    const navigate = useNavigate();
    const apiKey = "5ed65535c7dde3c9591abce0c90ec36d";

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [cityData, setCityData] = useState(null);
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        getCityDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cityName]);

    const getCityDetail = async function () {
        setLoading(true);
        setError(false);

        try {
            // meteo corrente
            const currentWeather = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=it&units=metric`
            );

            // previsioni 5 giorni
            const forecastWeather = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&lang=it&units=metric`
            );

            if (currentWeather.ok && forecastWeather.ok) {
                const currentData = await currentWeather.json();
                const forecastData = await forecastWeather.json();

                setCityData(currentData);
                setForecast(forecastData);
                setLoading(false);
            } else {
                throw new Error("Errore nel recupero dei dati");
            }
        } catch (err) {
            setError(true);
            setLoading(false);
            console.error(err);
        }
    };

    // funzione per commenti basati sul meteo
    const getWeatherComment = (weather) => {
        const condition = weather.toLowerCase();
        if (condition.includes("clear") || condition.includes("sereno")) {
            return "☀️ Che spettacolo! È il momento perfetto per un gelato!";
        } else if (condition.includes("rain") || condition.includes("pioggia")) {
            return "🌧️ Ops! Meglio prendere l'ombrello, oggi piove a dirotto!";
        } else if (condition.includes("cloud") || condition.includes("nuvoloso")) {
            return "⛅ Le nuvole stanno giocando a nascondino con il sole!";
        } else if (condition.includes("snow") || condition.includes("neve")) {
            return "❄️ Evviva! È tempo di pupazzi di neve!";
        } else if (condition.includes("thunder") || condition.includes("temporale")) {
            return "🌪️ Wow! La natura sta facendo uno spettacolo pirotecnico!";
        } else {
            return "🌍 Che giornata interessante!";
        }
    };

    if (loading) {
        return (
            <Container className="mb-5 main text-center mt-5">
                <h3>Caricamento...</h3>
                <h6>Aspetta un attimo... sto controllando il meteo! 🔍</h6>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mb-5 main text-center mt-5">
                <Alert variant="danger">
                    <h3>Ops... qualcosa è andato storto!</h3>
                    <p>Non riesco a trovare i dati per questa città 😢</p>
                </Alert>
                <Button variant="primary" onClick={() => navigate("/")}>
                    Torna alla Home
                </Button>
            </Container>
        );
    }

    return (
        <Container className="mb-5 main">

            <Alert variant="info" className="text-center mt-4">
                <h2>🌤️ Meteo dettagliato per {cityData.name}</h2>
                <p className="mb-0">{getWeatherComment(cityData.weather[0].description)}</p>
            </Alert>

            {/* Meteo corrente */}
            <div className="card mb-4">
                <div className="card-body">
                    <h3 className="card-title">🌤️ Meteo Attuale</h3>
                    <hr />
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>🌡️ Temperatura:</strong> {Math.round(cityData.main.temp)}°C</p>
                            <p><strong>🤔 Percepita:</strong> {Math.round(cityData.main.feels_like)}°C</p>
                            <p><strong>🌤️ Condizioni:</strong> {cityData.weather[0].description}</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>💧 Umidità:</strong> {cityData.main.humidity}%</p>
                            <p><strong>💨 Vento:</strong> {cityData.wind.speed} m/s</p>
                            <p><strong>🔽 Pressione:</strong> {cityData.main.pressure} hPa</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Previsioni prossimi giorni */}
            <h3 className="text-center mb-4">📅 Previsioni prossimi giorni</h3>
            <div className="row g-3 mb-5">
                {forecast.list
                    .filter((item, index) => index % 8 === 0) //prendo solo una previsione al giorno
                    .slice(0, 5) // prendo i 5 giorni
                    .map((item, index) => {
                        const date = new Date(item.dt * 1000);
                        return (
                            <div key={index} className="col-md-4 col-lg-2 mx-auto">
                                <div className="card text-center h-100">
                                    <div className="card-body">
                                        <h6 className="card-title">
                                            {date.toLocaleDateString("it-IT", {
                                                weekday: "short",
                                                day: "numeric",
                                                month: "short"
                                            })}
                                        </h6>
                                        <p className="mb-1"><strong>{Math.round(item.main.temp)}°C</strong></p>
                                        <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                                            {item.weather[0].description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <Button variant="secondary" className="mt-5" onClick={() => navigate("/")}>
                ← Torna alla Home
            </Button>

        </Container>
    );
};

export default DetailCity;