// import { Container } from "react-bootstrap";
// import { Row, Col } from "react-bootstrap";
// import { useState } from "react";

// const CitySearch = function () {

//     const [city, setCity] = useState("");

//     return (
//         <Container className="mb-5 main text-center mt-5">
//             <Row>
//                 <Col md={6} className="mx-auto border border-1 shadowed p-4 rounded">
//                     <form action=""
//                         onSubmit={(e) => {
//                             e.preventDefault();
//                             if (city.trim() !== "") {
//                                 // se la città non è vuota, reindirizzo alla pagina dei dettagli
//                                 window.location.href = `/city/${city.trim()}`;
//                             }
//                         }}>
//                         <input type="text"
//                             placeholder="Cerca la tua città..."
//                             className="form-control"
//                             value={city}
//                             onChange={(e) => setCity(e.target.value)}
//                         />
//                         <button type="submit" className="btn btn-primary mt-3">Cerca</button>
//                     </form>
//                 </Col>
//             </Row>


//         </Container>
//     )
// }

// export default CitySearch;

import { useState } from "react";
import { Container, Form, Button, Alert, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CitySearch = function () {
    const apiKey = "5ed65535c7dde3c9591abce0c90ec36d";
    const navigate = useNavigate();

    const [cityInput, setCityInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    const handleSearch = async function (e) {
        e.preventDefault();

        if (!cityInput.trim()) {
            return;
        }

        setLoading(true);
        setError(false);

        try {
            const currentRes = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.trim()}&appid=${apiKey}&lang=it&units=metric`
            );

            const forecastRes = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.trim()}&appid=${apiKey}&lang=it&units=metric`
            );

            if (currentRes.ok && forecastRes.ok) {
                const currentData = await currentRes.json();
                const forecastData = await forecastRes.json();

                setCurrentWeather(currentData);
                setForecast(forecastData);
                setLoading(false);
            } else {
                throw new Error("Città non trovata");
            }
        } catch (err) {
            setError(true);
            setLoading(false);
            setCurrentWeather(null);
            setForecast(null);
            console.error(err);
        }
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

    return (
        <Container className="mb-5 main">
            <Alert variant="info" className="text-center mt-5">
                <h2 className="p-3">🔍 Cerca il meteo della tua città!</h2>
                <hr />
                <p className="mb-0">Scrivi il nome della città (es: "Milano" o "Milano,IT" per essere più specifico)</p>
            </Alert>


            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Form onSubmit={handleSearch} className=" border border-1 rounded-3 shadowed my-5 width-content mx-auto p-2 p-md-3 p-lg-5">
                            <Row className="justify-content-center" style={{ width: 'content' }}>
                                <Col>
                                    <Form.Group className="d-flex gap-2">
                                        <Form.Control
                                            type="text"
                                            placeholder="Es: Roma, Milano, Napoli,IT..."
                                            value={cityInput}
                                            onChange={(e) => setCityInput(e.target.value)}
                                            size="lg"
                                        />
                                        <Button variant="primary" type="submit" size="lg" disabled={loading}>
                                            {loading ? "Cercando..." : "Cerca"}
                                        </Button>
                                    </Form.Group>

                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container >

            {/* se errore */}
            {error && (
                <Alert variant="danger" className="text-center mt-4">
                    <h5>😕 Ops! Città non trovata</h5>
                    <p className="mb-0">Controlla di aver scritto bene il nome o prova ad aggiungere il codice paese (es: "Roma,IT")</p>
                </Alert>
            )}

            {currentWeather && forecast && (
                <Row className="mt-5">
                    {/* colonna sinistra - meteo corrente */}
                    <Col md={6} className="mb-4">
                        <h3 className="text-center mb-3">📍 Meteo Attuale</h3>
                        <Card className="shadow"
                            style={{
                                cursor: "pointer",
                                transition: "all 0.2s"
                            }}
                            onClick={() => navigate(`/hourly/${currentWeather.name}`)}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                            <Card.Body>
                                <h4 className="text-center mb-3">
                                    {currentWeather.name}, {currentWeather.sys.country}
                                </h4>
                                <Alert variant="light" className="text-center">
                                    {getWeatherComment(currentWeather.weather[0].description)}
                                </Alert>
                                <hr />
                                <div className="d-flex flex-column gap-2">
                                    <p className="mb-1">
                                        <strong>🌡️ Temperatura:</strong> {Math.round(currentWeather.main.temp)}°C
                                    </p>
                                    <p className="mb-1">
                                        <strong>🤔 Percepita:</strong> {Math.round(currentWeather.main.feels_like)}°C
                                    </p>
                                    <p className="mb-1">
                                        <strong>🌤️ Condizioni:</strong> {currentWeather.weather[0].description}
                                    </p>
                                    <p className="mb-1">
                                        <strong>💧 Umidità:</strong> {currentWeather.main.humidity}%
                                    </p>
                                    <p className="mb-1">
                                        <strong>💨 Vento:</strong> {currentWeather.wind.speed} m/s
                                    </p>
                                    <p className="mb-0">
                                        <strong>🔽 Pressione:</strong> {currentWeather.main.pressure} hPa
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* colonna destra - previsioni 5 giorni */}
                    <Col md={6}>
                        <h3 className="text-center mb-3">📅 Prossimi 5 Giorni</h3>
                        <div className="d-flex flex-column gap-3">
                            {forecast.list
                                .filter((item, index) => index % 8 === 0) // una previsione al giorno
                                .slice(0, 5)
                                .map((item, index) => {
                                    const date = new Date(item.dt * 1000);
                                    return (
                                        <Card key={index} className="shadow-sm">
                                            <Card.Body>
                                                <Row className="align-items-center">
                                                    <Col xs={4}>
                                                        <strong>
                                                            {date.toLocaleDateString("it-IT", {
                                                                weekday: "short",
                                                                day: "numeric",
                                                                month: "short"
                                                            })}
                                                        </strong>
                                                    </Col>
                                                    <Col xs={4} className="text-center">
                                                        <h5 className="mb-0">{Math.round(item.main.temp)}°C</h5>
                                                    </Col>
                                                    <Col xs={4} className="text-end">
                                                        <small>{item.weather[0].description}</small>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    );
                                })}
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default CitySearch;