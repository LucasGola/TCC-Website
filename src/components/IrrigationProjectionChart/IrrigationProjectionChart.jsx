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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
                const response = await axios.get(`${baseURL}/projections/irrigation`);
                const data = response.data.projection;

                const formattedData = {
                    labels: data.map(entry => moment(entry).format('DD/MM/YYYY')),
                    datasets: [
                        {
                            label: 'Horas de Irrigação',
                            data: data.map(entry => moment(entry).hours() + moment(entry).minutes() / 60),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                };

                setChartData(formattedData);
            } catch (error) {
                console.error('Erro ao buscar dados de projeção de irrigação:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <h2>Projeção de Irrigação</h2>
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
                                        text: 'Horas (HH:mm)'
                                    },
                                    ticks: {
                                        callback: function (value) {
                                            const hours = Math.floor(value);
                                            const minutes = Math.round((value - hours) * 60);
                                            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                                        }
                                    }
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Data'
                                    }
                                }
                            },
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            const value = tooltipItem.raw;
                                            const hours = Math.floor(value);
                                            const minutes = Math.round((value - hours) * 60);
                                            return `Horas de Irrigação: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
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
