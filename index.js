import { bubbleSort, insertionSort, selectionSort } from "./Public/Scripts/sorts.js"
import { visualizer } from "./Public/Scripts/visualizer.js";

const fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", loadValues);
const randVal = document.getElementById("randomArrayBtn");
randVal.addEventListener("click", randomValueGenerator);

function loadValues() {
    var inputFile = document.getElementById("fileInput").files[0]; // Get the first file submitted as input 
    var fileReader = new FileReader();  // Create an instance of FileReader object

    fileReader.onload = function () {  // Event handler that is executed when the file reading operation is completed successfully.
        if (fileReader.error) {
            console.log("An error occurred during reading file: ", fileReader.error);
        }
        else {   // Split values when any one of these ', or ,\n or \n' is encountered
            var lines = fileReader.result.split(/,\n | \n | ,/);

            if (lines.length === 0) // Check for empty file
            {
                document.getElementById("arrayElements").value = "Empty File Selected!!!";
                return;
            }
            // Remove empty lines
            lines = lines.filter(function (line) { return line.trim() !== ""; });
            // extract comma separated numbers from a single line
            var numbers = [];
            for (var i = 0; i < lines.length; i++) {
                var matches = lines[i].match(/\d+/g);
                if (matches)
                    numbers.push(...matches);
            }
            // Display in Array Elements Box
            document.getElementById("arrayElements").value = numbers.join(",");
            document.getElementById("sortedArrayElements").value = "";
        }
    };
    fileReader.readAsText(inputFile);
}


function randomValueGenerator() {
    // Make an array of 10 elements with value in between 0 to 100
    var randomArr = [];
    for (var i = 0; i < 10; i++)
        randomArr.push(Math.floor(Math.random() * 100));

    // Display in Array Elements Box
    document.getElementById("sortedArrayElements").value = "";
    document.getElementById("arrayElements").value = randomArr.join(",");


}


const sortBtns = document.querySelectorAll("#sortAlgos");

sortBtns.forEach(button => {
    button.addEventListener("click", function () {
        const sortType = this.dataset.sortType;
        sortAlgos(sortType);
    })
})


function sortAlgos(sortType) {
    const dataStr = document.getElementById("arrayElements").value;
    var data = dataStr.split(",").map(Number);
    console.log("DATA :", data);

    switch (sortType) {
        case "bubble":
            bubbleSort(data);
            break;

        case "insertion":
            insertionSort(data);
            break;
        case "selection":
            selectionSort(data);
            break;
    }
}