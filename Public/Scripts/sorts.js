import { visualizer } from "./visualizer.js"

export function bubbleSort(data) {
    var swaps = 0;
    var results = [];
    console.log("Input: ", data)

    results.push(data.slice());

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data.length - i; j++) {
            if (data[j] > data[j + 1]) {
                var temp = data[j];
                data[j] = data[j + 1];
                data[j + 1] = temp;
                swaps++;
            }
            results.push(data.slice());
        }
    }
    sortingResultsUpdate(swaps, "bubble");
    console.log("Output: ", data);
    visualizer(results);
    document.getElementById("sortedArrayElements").value = data;
}



export function insertionSort(data) {
    var swaps = 0;
    var results = [];
    console.log("Input: ", data)

    results.push(data.slice());

    for (var i = 1; i < data.length; i++) {
        var key = data[i];
        var j = i - 1;
        results.push(data.slice());

        while (j >= 0 && data[j] > key) {
            data[j + 1] = data[j];
            j--;
            swaps++;
            results.push(data.slice());
        }
        data[j + 1] = key;
    }
    sortingResultsUpdate(swaps, "insertion");
    console.log("Output: ", data);
    visualizer(results);
    document.getElementById("sortedArrayElements").value = data;
}

export function selectionSort(data) {
    var swaps = 0;
    var results = [];
    console.log("Input: ", data);

    results.push(data.slice());

    for (var i = 0; i < data.length - 1; i++) {
        var minIndex = i;
        for (var j = i + 1; j < data.length; j++) {
            if (data[j] < data[minIndex]) {
                minIndex = j;
            }
        }
        var temp = data[minIndex];
        data[minIndex] = data[i];
        data[i] = temp;
        swaps++;
        results.push(data.slice());
    }
    sortingResultsUpdate(swaps, "selection");
    console.log("Output: ", data);
    visualizer(results);
    document.getElementById("sortedArrayElements").value = data;
}

function sortingResultsUpdate(swaps, sortAlgo) {
    document.getElementById("swapCount").textContent = swaps;

    switch (sortAlgo) {
        case "bubble":
            document.getElementById("spaceComplexity").textContent = "O(1)";
            document.getElementById("timeComplexity").textContent = "\u0398(n\u00B2)";
            break;

        case "insertion":
            document.getElementById("spaceComplexity").textContent = "O(1)";
            document.getElementById("timeComplexity").textContent = "\u0398(n\u00B2)";
            break;

        case "selection":
            document.getElementById("spaceComplexity").textContent = "O(1)";
            document.getElementById("timeComplexity").textContent = "\u0398(n\u00B2)";
            break;
    }
}