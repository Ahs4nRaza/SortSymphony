export function visualizer(results) {
    const timeDelay = 1000;
    const timeLoader = document.getElementById("loadTime");


    timeLoader.innerHTML = '';

    const chart = makeChart(results[0]);
    let timeTaken = 0;
    let currentStep = 1;

    function animateNextStep() {
        if (currentStep < results.length) {
            const currentData = results[currentStep];
            const previousData = results[currentStep - 1] || [];

            updateChartDataAndColors(chart, currentData, previousData);

            currentStep++;
            timeTaken += timeDelay;
            setTimeout(animateNextStep, timeDelay);
        } else {
            timeLoader.textContent = `Execution Time: ${timeTaken} ms`;
            chart.data.datasets[0].backgroundColor = chart.data.datasets[0].backgroundColor.fill('#A91D3A');
            chart.update();
        }
    }

    animateNextStep();
}

function makeChart(initialData) {

    const canvasWrapper = document.getElementById("visualizationCanvas");

    const maxValue = Math.max(...initialData);

    const labels = initialData.map((value, index) => `${index}`);
    const initialColors = labels.fill('black');

    const chart = new Chart(canvasWrapper, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Value',
                backgroundColor: initialColors,
                data: initialData,
            }],
        },
        options: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Bar chart",

            },
            scales: {
                xAxes: [{
                    ticks: {
                        min: 0,
                        callback: (value, index, values) => {
                            try {
                                return `[${index}]`;
                            } catch (error) {
                                console.error("Error in x-axis label callback:", error);
                                return value;
                            }
                        },
                    },
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: maxValue,
                    },
                }],
            },
        },
    });

    return chart;
}

function updateChartDataAndColors(chart, currentData, previousData) {
    const chartData = chart.data.datasets[0].data;
    const chartColors = chart.data.datasets[0].backgroundColor;


    for (let i = 0; i < currentData.length; i++) {
        chartData[i] = currentData[i];


        if (currentData[i] !== previousData[i]) {
            chartColors[i] = 'green';
        } else {
            chartColors[i] = 'black';
        }
    }

    chart.update();
}
