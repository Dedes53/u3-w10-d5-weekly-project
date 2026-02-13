import { useEffect, useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

const Home = function () {
    const apiKey = "5ed65535c7dde3c9591abce0c90ec36d";

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [cities, setCities] = useState([]);

    // oggetto er le immagini di sfondo delle card
    // nomi in inglese, ma London non bastava..... maledetti 
    const cityImages = {
        "Rome": "https://assets.voxcity.com/uploads/blog_images/5-Things-You-Should-Know-About-Rome-Before-you-visit-image-main_original.jpg",
        "City of London": "https://londra.io/wp-content/uploads/2021/10/Londra.jpg",
        "Paris": "https://assets.voxcity.com/uploads/blog_images/paris-blog-updated_original.jpg",
        "Tokyo": "https://reisetopia.de/wp-content/uploads/2023/01/Tokio-Japan-Bei-Nacht.jpeg",
        "New York": "https://i.natgeofe.com/k/5b396b5e-59e7-43a6-9448-708125549aa1/new-york-statue-of-liberty.jpg"
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        getMeteo();
    }, []);

    const getCityCard = function (city) {

        const backgroundImage = cityImages[city.name] || "";

        return (
            <div
                className="card"
                style={{
                    width: "18rem",
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white",
                    minHeight: "250px"
                }}
                key={city.name}
            >
                <div className="card-body">
                    <h5 className="card-title fw-bold">{city.name}</h5>
                    <p className="card-text">Temperatura: {Math.round(city.main.temp - 273.15)}°C</p>
                    <p className="card-text">Condizioni: {city.weather[0].description}</p>
                </div>
            </div>
        );
    };

    const getMeteo = async function () {
        const cityNames = ["Roma", "Londra", "Parigi", "Tokio", "New York"];

        try {
            // DEVO ASPETTARE TUTTE LE FEEETCH
            const promises = cityNames.map(city =>
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
                    .then(res => {
                        if (res.ok) {
                            return res.json();
                        }
                        throw new Error(`Errore nel recupero dei dati per ${city}`);
                    })
            );

            const results = await Promise.all(promises);
            console.log(results);
            setCities(results); //tocca che le salvo tutte e poi ci faccio le card tutte in una volta
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
            console.error(err);
        }
    };

    return (

        <Container className="mb-5 main">
            <Alert variant="warning" className="text-center mt-5">
                <h2 className="p-3">Benvenuto nella Meteo App!!</h2>
                <hr />
                <h4 className="p-2">L'app per meteo più pazzerella che ci sia!</h4>
            </Alert>

            <div className="text-center mt-5">
                <h2>Eccoti intanto il meteo di 5 principali città:</h2>
                <h6>Che se non ci abiti probabilmente non te ne fregherà manco nulla...</h6>
            </div>

            {/* contenuto dinamico in base a risultato fetch */}
            {loading ? (
                <>
                    <div className="text-center mt-5">
                        <h3 className="text-center mt-5">Caricamento...</h3>
                        <h6>fischietta...</h6>
                    </div>
                </>
            ) : error ? (
                <div className="text-center mt-5">
                    <h3 className="text-center mt-5">Ops... qualcosa è andato storto!</h3>
                    <h6>A meno che la tua città non abbia un meteo... o che esista... o che gliene freghi abbastanza a qualcuno da farci il meteo....<br /> Perché non cambi città?</h6>
                </div>
            ) : (
                <div className="d-flex flex-wrap justify-content-center gap-5 mt-5">
                    {cities.map(city => getCityCard(city))}
                </div>
            )}

        </Container>
    );
};

export default Home;