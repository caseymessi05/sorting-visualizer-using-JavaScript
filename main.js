// Get the canvas element and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the canvas dimensions
canvas.width = window.innerWidth - 40;
canvas.height = 400;

// Generate random data
function generateData(numElements) {
  const data = [];
  for (let i = 0; i < numElements; i++) {
    data.push(Math.floor(Math.random() * (canvas.height - 10)) + 10);
  }
  return data;
}

// Draw the data on the canvas
function drawData(data) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const barWidth = canvas.width / data.length;
  for (let i = 0; i < data.length; i++) {
    ctx.fillStyle = "#0074D9";
    ctx.fillRect(i * barWidth, canvas.height - data[i], barWidth, data[i]);
  }
}

// Implement a sorting algorithm
async function bubbleSort(data) {
  const numElements = data.length;
  for (let i = 0; i < numElements; i++) {
    for (let j = 0; j < numElements - i - 1; j++) {
      if (data[j] > data[j + 1]) {
        // Swap the elements
        const temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;

        // Draw the data after each swap
        drawData(data);
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
  }
}

// Implement a insertion algorithm
async function insertionSort(data) {
    const numElements = data.length;
    for (let i = 1; i < numElements; i++) {
      const key = data[i];
      let j = i - 1;
      while (j >= 0 && data[j] > key) {
        data[j + 1] = data[j];
        j--;
        // Draw the data after each swap
        drawData(data);
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      data[j + 1] = key;
    }
  }

// Implement Selection Sort Algorithm

async function selectionSort(data) {
    const numElements = data.length;
    for (let i = 0; i < numElements - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < numElements; j++) {
        if (data[j] < data[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        const temp = data[i];
        data[i] = data[minIndex];
        data[minIndex] = temp;
        drawData(data);
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
  }

// Implement Merge Sort Algorithm

async function mergeSort(data) {
    const numElements = data.length;
    if (numElements <= 1) {
      return data;
    }
  
    const midIndex = Math.floor(numElements / 2);
    const leftData = data.slice(0, midIndex);
    const rightData = data.slice(midIndex);
  
    const sortedLeftData = await mergeSort(leftData);
    const sortedRightData = await mergeSort(rightData);
  
    return await merge(sortedLeftData, sortedRightData);
  }
  
  async function merge(leftData, rightData) {
    const mergedData = [];
  
    let leftIndex = 0;
    let rightIndex = 0;
  
    while (leftIndex < leftData.length && rightIndex < rightData.length) {
      if (leftData[leftIndex] < rightData[rightIndex]) {
        mergedData.push(leftData[leftIndex]);
        leftIndex++;
      } else {
        mergedData.push(rightData[rightIndex]);
        rightIndex++;
      }
    }
  
    while (leftIndex < leftData.length) {
      mergedData.push(leftData[leftIndex]);
      leftIndex++;
    }
  
    while (rightIndex < rightData.length) {
      mergedData.push(rightData[rightIndex]);
      rightIndex++;
    }
  
    drawData(mergedData);
    await new Promise(resolve => setTimeout(resolve, 50));
  
    return mergedData;
  }

// Implements Quick Sort Algorithm

async function quickSort(data, leftIndex, rightIndex) {
    if (leftIndex >= rightIndex) {
      return;
    }
  
    const pivotIndex = await partition(data, leftIndex, rightIndex);
    await Promise.all([
      quickSort(data, leftIndex, pivotIndex - 1),
      quickSort(data, pivotIndex + 1, rightIndex)
    ]);
  }
  
  async function partition(data, leftIndex, rightIndex) {
    const pivotValue = data[rightIndex];
    let i = leftIndex - 1;
  
    for (let j = leftIndex; j < rightIndex; j++) {
      if (data[j] < pivotValue) {
        i++;
        await swap(data, i, j);
      }
    }
  
    await swap(data, i + 1, rightIndex);
    return i + 1;
  }
  
  async function swap(data, i, j) {
    const temp = data[i];
    data[i] = data[j];
    data[j] = temp;
    drawData(data);
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  function drawData(data) {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
  
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    const barWidth = canvas.width / data.length;
    const scaleFactor = canvas.height / Math.max(...data);
  
    for (let i = 0; i < data.length; i++) {
      const barHeight = data[i] * scaleFactor;
      const x = i * barWidth;
      const y = canvas.height - barHeight;
      context.fillRect(x, y, barWidth, barHeight);
    }
  }

// Implemting the Heap Sort algorithm

async function heapSort(data) {
    // Build max heap
    for (let i = Math.floor(data.length / 2) - 1; i >= 0; i--) {
      await heapify(data, data.length, i);
    }
  
    // Extract elements from heap one by one
    for (let i = data.length - 1; i >= 0; i--) {
      // Move current root to end
      const temp = data[0];
      data[0] = data[i];
      data[i] = temp;
  
      // Draw the data after each swap
      drawData(data);
      await new Promise(resolve => setTimeout(resolve, 50));
  
      // Call heapify on the reduced heap
      await heapify(data, i, 0);
    }
  }
  
  async function heapify(data, n, i) {
    let largest = i; // Initialize largest as root
    let left = 2 * i + 1; // Left child
    let right = 2 * i + 2; // Right child
  
    // If left child is larger than root
    if (left < n && data[left] > data[largest]) {
      largest = left;
    }
  
    // If right child is larger than largest so far
    if (right < n && data[right] > data[largest]) {
      largest = right;
    }
  
    // If largest is not root
    if (largest !== i) {
      // Swap the elements
      const temp = data[i];
      data[i] = data[largest];
      data[largest] = temp;
  
      // Draw the data after each swap
      drawData(data);
      await new Promise(resolve => setTimeout(resolve, 50));
  
      // Recursively heapify the affected sub-tree
      await heapify(data, n, largest);
    }
  }
  
  

// Handle the start button click
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", async () => {
  const algorithm = document.getElementById("algorithm-select").value;
  const numElements = 50;
  const data = generateData(numElements);
  drawData(data);

  switch (algorithm) {
    case "bubble-sort":
      await bubbleSort(data);
      break;
    case "insertion-sort":
      await insertionSort(data);
      break;
    case "selection-sort":
        await selectionSort(data);
        break;
    case "merge-sort":
        await mergeSort(data, 0, data.length - 1);
        break;
    case "quick-sort":
        await quickSort(data, 0, data.length - 1);
        break;
    case "heap-sort":
        await heapSort(data);
        break;
    // Add cases for other sorting algorithms
    default:
      break;
  }
});



// Handle the reset button click
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  const numElements = 50;
  const data = generateData(numElements);
  drawData(data);
});
