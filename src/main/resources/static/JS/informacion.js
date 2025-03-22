const ctx = document.getElementById('solarBubbleChart').getContext('2d');

const data = {
    datasets: [
        {
            label: 'China',
            data: [{ x: 15, y: 400, r: 50 }], // Crecimiento 15%, 400GW capacidad, burbuja grande
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)'
        },
        {
            label: 'Estados Unidos',
            data: [{ x: 10, y: 250, r: 40 }],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)'
        },
        {
            label: 'India',
            data: [{ x: 12, y: 150, r: 35 }],
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)'
        },
        {
            label: 'Alemania',
            data: [{ x: 5, y: 100, r: 30 }],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)'
        },
        {
            label: 'Brasil',
            data: [{ x: 8, y: 80, r: 25 }],
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgba(153, 102, 255, 1)'
        }
    ]
};

const config = {
    type: 'bubble',
    data: data,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Capacidad Solar vs Crecimiento (%)'
            },
            legend: {
                position: 'top'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Crecimiento Anual de Capacidad Solar (%)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Capacidad Solar Instalada (GW)'
                }
            }
        }
    }
};

// Inicializar el gráfico
new Chart(ctx, config);
