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
import moment from 'moment';
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
                formattedData = aggregateData(data, 'isoWeek');
                break;
            case 'monthly':
                formattedData = aggregateData(data, 'month');
                break;
            case 'annually':
                formattedData = aggregateData(data, 'year');
                break;
            default:
                formattedData = data.map(entry => ({
                    ...entry,
                    createdAt: moment(entry.createdAt).format('DD/MM/YYYY')
                }));
        }

        return {
            labels: formattedData.map(entry => entry.createdAt),
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
        const aggregation = {};

        data.forEach((entry) => {
            const entryDate = moment(entry.createdAt);
            let key;

            switch (interval) {
                case 'isoWeek':
                    key = entryDate.startOf('isoWeek').format('DD/MM/YYYY');
                    break;
                case 'month':
                    key = entryDate.startOf('month').format('MM/YYYY');
                    break;
                case 'year':
                    key = entryDate.startOf('year').format('YYYY');
                    break;
                default:
                    key = entryDate.format('DD/MM/YYYY');
            }

            if (!aggregation[key]) {
                aggregation[key] = 0;
            }

            aggregation[key] += parseFloat(entry.measurement);
        });

        const aggregatedData = Object.keys(aggregation).map(key => {
            let formattedDate;
            switch (interval) {
                case 'month':
                    formattedDate = moment(key, 'MM/YYYY').format('MM/YYYY');
                    break;
                case 'year':
                    formattedDate = key;
                    break;
                default:
                    formattedDate = key;
            }

            return {
                measurement: aggregation[key],
                createdAt: formattedDate,
            };
        });

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
                    <Line
                        data={chartData}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Litros'
                                    }
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Data'
                                    }
                                }
                            }
                        }}
                    />
                </div>
            ) : (
                <p>Carregando dados...</p>
            )}
        </div>
    );
};

export default WaterConsumptionChart;
