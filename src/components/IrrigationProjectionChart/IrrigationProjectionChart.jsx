// src/components/IrrigationProjectionChart/IrrigationProjectionChart.jsx
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
import './IrrigationProjectionChart.css';  // Importar o CSS

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

const IrrigationProjectionChart = () => {
    const [chartData, setChartData] = useState(null);
    const [timeInterval, setTimeInterval] = useState('weekly'); // Intervalo de tempo padrão definido como semanal

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
                const response = await axios.get(`${baseURL}/projections/irrigation`);
                const data = response.data.projection;

                setChartData(formatData(data, timeInterval));
            } catch (error) {
                console.error('Erro ao buscar dados de projeção de irrigação:', error);
            }
        };

        fetchData();
    }, [timeInterval]); // Reexecutar a busca de dados quando o intervalo de tempo mudar

    const formatData = (data, interval) => {
        let formattedData;
        switch (interval) {
            case 'weekly':
            case 'monthly':
                formattedData = aggregateData(data, interval);
                break;
            default:
                formattedData = data.map(entry => ({
                    createdAt: moment(entry).format('DD/MM/YYYY HH:mm'),
                    count: 1
                }));
        }

        return {
            labels: formattedData.map(entry => entry.createdAt),
            datasets: [
                {
                    label: 'Projeção de Irrigações',
                    data: formattedData.map(entry => entry.count),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    pointRadius: 5, // Tamanho dos pontos no gráfico
                    pointHoverRadius: 7, // Tamanho dos pontos ao passar o mouse
                },
            ],
        };
    };

    const aggregateData = (data, interval) => {
        const aggregation = {};

        data.forEach((entry) => {
            const entryDate = moment(entry);
            let key;

            switch (interval) {
                case 'weekly':
                    key = entryDate.startOf('isoWeek').format('DD/MM/YYYY');
                    break;
                case 'monthly':
                    key = entryDate.startOf('month').format('MM/YYYY');
                    break;
                default:
                    key = entryDate.format('DD/MM/YYYY');
            }

            if (!aggregation[key]) {
                aggregation[key] = 0;
            }

            aggregation[key] += 1;
        });

        const aggregatedData = Object.keys(aggregation).map(key => {
            let formattedDate;
            switch (interval) {
                case 'monthly':
                    formattedDate = moment(key, 'MM/YYYY').format('MM/YYYY');
                    break;
                default:
                    formattedDate = key;
            }

            return {
                count: aggregation[key],
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
            <h2>Projeção de Irrigações</h2>
            <div className="selector-container">
                <label htmlFor="timeInterval">Intervalo de Tempo:</label>
                <select id="timeInterval" value={timeInterval} onChange={handleChangeInterval}>
                    <option value="daily">Diário</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensal</option>
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
                                        text: 'Número de Irrigações'
                                    },
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Data e Hora'
                                    }
                                }
                            },
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            return `Número de Irrigações: ${tooltipItem.raw}`;
                                        }
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

export default IrrigationProjectionChart;
