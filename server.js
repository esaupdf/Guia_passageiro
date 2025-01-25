const express = require('express');
const app = express();
const port = 3000;

// Lista dos 20 carros mais populares no Brasil
const carrosPopulares = [
    "Fiat Uno", "Volkswagen Gol", "Chevrolet Onix", "Hyundai HB20", "Ford Ka", 
    "Fiat Argo", "Renault Kwid", "Chevrolet Tracker", "Honda Civic", "Toyota Corolla",
    "Volkswagen Polo", "Jeep Compass", "Hyundai Creta", "Chevrolet Spin", "Nissan Kicks",
    "Ford EcoSport", "Fiat Mobi", "Honda HR-V", "Renault Duster", "Volkswagen T-Cross"
];

// Rota para retornar os carros populares
app.get('/api/carro-popular', (req, res) => {
    res.json(carrosPopulares);
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
