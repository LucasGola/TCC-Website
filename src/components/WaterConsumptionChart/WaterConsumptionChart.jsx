// src/components/WaterConsumptionChart/WaterConsumptionChart.jsx
import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './WaterConsumptionChart.css';  // Importar o CSS

// Registrar os componentes necessários do Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const WaterConsumptionChart = () => {
    const [chartData, setChartData] = useState(null);
    const [timeInterval, setTimeInterval] = useState('daily'); // Intervalo de tempo padrão

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
                const response = await axios.get(`${baseURL}/sensors/residential-water-consumption`);
                const data = response.data.data;

                setChartData(formatData(data, timeInterval));
            } catch (error) {
                console.error('Erro ao buscar dados de consumo de água:', error);
            }
        };

        fetchData();
    }, [timeInterval]); // Reexecutar a busca de dados quando o intervalo de tempo mudar

    const formatData = (data, interval) => {
        let formattedData;
        switch (interval) {
            case 'weekly':
                formattedData = aggregateData(data, 'week');
                break;
            case 'monthly':
                formattedData = aggregateData(data, 'month');
                break;
            case 'annually':
                formattedData = aggregateData(data, 'year');
                break;
            default:
                formattedData = data;
        }

        return {
            labels: formattedData.map(entry => new Date(entry.createdAt).toLocaleDateString()),
            datasets: [
                {
                    label: 'Consumo de Água (L)',
                    data: formattedData.map(entry => entry.measurement),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    const aggregateData = (data, interval) => {
        const aggregatedData = [];
        const aggregation = {};

        data.forEach((entry) => {
            const entryDate = new Date(entry.createdAt);
            let key;

            switch (interval) {
                case 'week':
                    const startOfWeek = new Date(entryDate.setDate(entryDate.getDate() - entryDate.getDay()));
                    key = `${startOfWeek.getFullYear()}-${startOfWeek.getMonth() + 1}-${startOfWeek.getDate()}`;
                    break;
                case 'month':
                    key = `${entryDate.getFullYear()}-${entryDate.getMonth() + 1}`;
                    break;
                case 'year':
                    key = `${entryDate.getFullYear()}`;
                    break;
                default:
                    key = `${entryDate.getFullYear()}-${entryDate.getMonth() + 1}-${entryDate.getDate()}`;
            }

            if (!aggregation[key]) {
                aggregation[key] = 0;
            }

            aggregation[key] += parseInt(entry.measurement, 10);
        });

        for (const key in aggregation) {
            aggregatedData.push({
                measurement: aggregation[key],
                createdAt: new Date(key),
            });
        }

        return aggregatedData;
    };

    const handleChangeInterval = (e) => {
        setTimeInterval(e.target.value);
    };

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <h2>Consumo de Água</h2>
            <div className="selector-container">
                <label htmlFor="timeInterval">Intervalo de Tempo:</label>
                <select id="timeInterval" value={timeInterval} onChange={handleChangeInterval}>
                    <option value="daily">Diário</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensal</option>
                    <option value="annually">Anual</option>
                </select>
            </div>
            {chartData ? (
                <div style={{ height: '500px', width: '100%' }}>
                    <Line data={chartData} options={{ maintainAspectRatio: false }} />
                </div>
            ) : (
                <p>Carregando dados...</p>
            )}
        </div>
    );
};

export default WaterConsumptionChart;
