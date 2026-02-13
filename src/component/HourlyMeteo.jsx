import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Card, Row, Col, Alert } from "react-bootstrap";

const HourlyMeteo = function () {
    const { cityName } = useParams();
    const navigate = useNavigate();
    const apiKey = "5ed65535c7dde3c9591abce0c90ec36d";

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [forecast, setForecast] = useState(null);
    const [selectedDay, setSelectedDay] = useState(0); // Indice giorno (0 = oggi)

    useEffect(() => {
        getForecast();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cityName]);

    const getForecast = async function () {
        setLoading(true);
        setError(false);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&lang=it&units=metric`
            );

            if (response.ok) {
                const data = await response.json();
                setForecast(data);
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


    const groupByDay = () => {
        if (!forecast) return [];

        const days = {};

        forecast.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayKey = date.toLocaleDateString("it-IT", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            });

            if (!days[dayKey]) {
                days[dayKey] = [];
            }
            days[dayKey].push(item);
        });

        return Object.entries(days).map(([date, items]) => ({
            date,
            items
        }));
    };


    const getWeatherComment = (description) => {
        const desc = description.toLowerCase();
        if (desc.includes("sereno") || desc.includes("clear")) {
            return "☀️ Che spettacolo! È il momento perfetto per un gelato!";
        } else if (desc.includes("pioggia") || desc.includes("rain")) {
            return "🌧️ Ops! Meglio prendere l'ombrello, oggi piove a dirotto!";
        } else if (desc.includes("nuvol") || desc.includes("cloud")) {
            return "⛅ Le nuvole stanno giocando a nascondino con il sole!";
        } else if (desc.includes("neve") || desc.includes("snow")) {
            return "❄️ Evviva! È tempo di pupazzi di neve!";
        } else if (desc.includes("temporal") || desc.includes("thunder")) {
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

    if (error || !forecast) {
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

    const groupedDays = groupByDay();
    const currentDayData = groupedDays[selectedDay];

    return (
        <Container fluid className="mb-5 px-0">
            <div className="bg-light py-3 px-4 shadow-sm">
                <Container>
                    <div className="d-flex justify-content-between align-items-center">

                        <h4 className="mb-0">
                            🌤️ Previsioni per {forecast.city.name}, {forecast.city.country}
                        </h4>
                        <div style={{ width: "150px" }}></div>
                    </div>
                </Container>
            </div>
            <Container className="mt-md-4">
                <Button variant="secondary" className="mt-5" onClick={() => navigate("/")}>
                    ← Torna alla Home
                </Button>
            </Container>
            {/* barra dei 5 giorni  */}
            <div className="bg-white py-3 shadow-sm sticky-md-top" style={{ top: 0, zIndex: 100 }}>
                <Container>
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                        {groupedDays.slice(0, 5).map((day, index) => {
                            const date = new Date(day.items[0].dt * 1000);
                            const isSelected = index === selectedDay;

                            //temp media del giorno
                            const avgTemp = Math.round(
                                day.items.reduce((sum, item) => sum + item.main.temp, 0) / day.items.length
                            );

                            return (
                                <Card
                                    key={index}
                                    className={`text-center shadow-sm ${isSelected ? 'border-primary' : ''}`}
                                    style={{
                                        cursor: "pointer",
                                        minWidth: "120px",
                                        backgroundColor: isSelected ? "#e7f3ff" : "white",
                                        transition: "all 0.2s"
                                    }}
                                    onClick={() => setSelectedDay(index)}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                >
                                    <Card.Body className="py-2 px-3">
                                        <div className="fw-bold">
                                            {date.toLocaleDateString("it-IT", {
                                                weekday: "short"
                                            })}
                                        </div>
                                        <div className="text-muted small">
                                            {date.toLocaleDateString("it-IT", {
                                                day: "numeric",
                                                month: "short"
                                            })}
                                        </div>
                                        <div className="h5 mb-0 mt-1">{avgTemp}°C</div>
                                        <div className="small">{day.items[0].weather[0].description}</div>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </div>
                </Container>
            </div>

            {/*previsioni orarie */}
            <Container className="mt-4">
                {currentDayData && (
                    <>
                        <Alert variant="info" className="text-center mb-4">
                            <h4 className="mb-2">
                                📅 {new Date(currentDayData.items[0].dt * 1000).toLocaleDateString("it-IT", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })}
                            </h4>
                            <p className="mb-0">
                                {getWeatherComment(currentDayData.items[0].weather[0].description)}
                            </p>
                        </Alert>

                        <h4 className="mb-3">⏰ Previsioni ogni 3 ore</h4>
                        <Row className="g-3">
                            {currentDayData.items.map((item, index) => {
                                const time = new Date(item.dt * 1000);

                                return (
                                    <Col key={index} xs={12} sm={6} md={4} lg={3}>
                                        <Card className="h-100 shadow-sm">
                                            <Card.Body>
                                                <div className="text-center mb-3">
                                                    <h5 className="mb-0">
                                                        🕐 {time.toLocaleTimeString("it-IT", {
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        })}
                                                    </h5>
                                                </div>
                                                <hr />
                                                <div className="d-flex flex-column gap-2">
                                                    <div className="text-center">
                                                        <h3 className="mb-0">{Math.round(item.main.temp)}°C</h3>
                                                        <small className="text-muted">
                                                            Percepita: {Math.round(item.main.feels_like)}°C
                                                        </small>
                                                    </div>
                                                    <hr className="my-2" />
                                                    <p className="mb-1 text-center">
                                                        <strong>🌤️</strong> {item.weather[0].description}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>💧 Umidità:</strong> {item.main.humidity}%
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>💨 Vento:</strong> {item.wind.speed} m/s
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>🔽 Pressione:</strong> {item.main.pressure} hPa
                                                    </p>
                                                    {item.pop > 0 && (
                                                        <p className="mb-0 text-primary">
                                                            <strong>☔ Prob. pioggia:</strong> {Math.round(item.pop * 100)}%
                                                        </p>
                                                    )}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </>
                )}
            </Container>
        </Container>
    );
};

export default HourlyMeteo;