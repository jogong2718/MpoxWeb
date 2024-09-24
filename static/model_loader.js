let model;
// Show the loading bar
function showLoadingBar() {
    const loadingBar = document.getElementById('loadingBar');
    const loadingText = document.getElementById('loadingText');
    const loadingContainer = document.getElementById('loadingContainer');
    
    loadingContainer.style.display = 'block';  // Show the loading container

    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += 10;
        loadingBar.style.width = progress + '%';
        loadingText.innerText = `Loading model: ${progress}%`;

        // Stop when it reaches 90% (because we want to wait until the model finishes loading)
        if (progress >= 90) {
            clearInterval(loadingInterval);
        }
    }, 200); // Adjust the speed of the progress bar (milliseconds)
}

function updateInferenceBar(progress) {
    const loadingBar = document.getElementById('loadingBar');
    const loadingText = document.getElementById('loadingText');
    loadingBar.style.width = progress + '%';
    loadingText.innerText = `Running inference: ${progress}%`;
}

// Load the model and update the progress bar
async function loadModel() {
    showLoadingBar();

    try {
        model = await tf.loadLayersModel('model/model.json' 
            // {
            //     customObjects: { Patches: Patches,
            //                     PatchEncoder: PatchEncoder,
            //                     MultiHeadAttention: MultiHeadAttention }
            // }
        );
        console.log('Input shape:', model.input.shape);
        console.log('Output shape:', model.output.shape);
        model.summary()
        console.log("Model loaded successfully!");

        // Once the model is fully loaded, complete the progress bar
        const loadingBar = document.getElementById('loadingBar');
        const loadingText = document.getElementById('loadingText');
        const loadingContainer = document.getElementById('loadingContainer');

        loadingBar.style.width = '100%';  // Finish loading bar
        loadingText.innerText = `Model loaded: 100%`;

        // Hide the loading container after a short delay to simulate completion
        setTimeout(() => {
            loadingContainer.style.display = 'none';
        }, 10);
    } catch (error) {
        console.error("Error loading the model:", error);
        alert("Error loading the model. Please try again.");
        const errorDetails = document.getElementById('errorDetails');
        if (errorDetails) {
            errorDetails.innerText = `Error details: ${error.message}`;
        }
    }
}

// Run inference on the image
async function runInference(imageElement) {
    if (!model) {
        alert("Model not loaded!");
        return;
    }
    const loadingContainer = document.getElementById('loadingContainer');
    const loadingBar = document.getElementById('loadingBar');
    const loadingText = document.getElementById('loadingText');
    loadingContainer.style.display = 'block';
    loadingBar.style.width = '0%';
    loadingText.innerText = 'Running inference: 0%';


    const inputTensor = processImage(imageElement);
    console.log("Input tensor:", inputTensor);

    let progress = 0;
    const inferenceInterval = setInterval(() => {
        progress += 10;
        updateInferenceBar(progress);

        // Stop updating progress bar when it reaches 100%
        if (progress >= 90) {
            clearInterval(inferenceInterval);
        }
    }, 100);

    const prediction = await model.predict(inputTensor).data();

    loadingBar.style.width = '100%';  // Finish loading bar
    loadingText.innerText = `Finished Inference: 100%`;
    document.getElementById('modelSection').style.display = 'none';
    loadingContainer.style.display = 'none'
    classes = ['MonkeyPox', 'Cowpox', 'Healthy', 'HFMD', 'Measles', 'Chickenpox']


    // Display the result to the user

    const predictions = [prediction[0]*100, prediction[1]*100, prediction[2]*100, prediction[3]*100, prediction[4]*100, prediction[5]*100];
    const labels = ['MonkeyPox', 'Cowpox', 'Healthy', 'HFMD', 'Measles', 'Chickenpox'];

    function renderBarChart() {
        const ctx = document.getElementById('predictionChart').getContext('2d');
        const predictionChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,  // Labels for each bar
                datasets: [{
                    label: 'Prediction Confidence',
                    data: predictions,  // Prediction values
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 1)'  // Set X-axis grid lines to white
                        },
                        ticks: {
                            color: 'white'  // Set X-axis tick labels to white
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 1)'  // Set X-axis grid lines to white
                        },
                        ticks: {
                            color: 'white'  // Set X-axis tick labels to white
                        },
                        type: 'logarithmic',  // Set Y-axis to logarithmic
                        min: 0.1,           // Set minimum to a small positive number
                        max: 100,               // Maximum value is 1
                        ticks: {
                            color: 'white',
                            callback: function(value) {
                                return value.toFixed(0) + '%';  // Format the ticks as numbers
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white'  // Set legend text to white
                        }
                    },
                    title: {
                        display: true,
                        text: 'Model Predictions',
                        color: 'white'  // Set chart title to white
                    }
                }
            }
        });
    }

    // Call this function when you want to display the chart
    renderBarChart();
    document.getElementById('result').style.display = 'block';
}

// Convert image to tensor and resize it to match the model's input shape
function processImage(image) {
    const img = tf.browser.fromPixels(image);  // Convert the image to a tensor
    const resizedTensor = tf.image.resizeBilinear(img, [224, 224]);  // Resize the image to 224x224
    const normalizedTensor = resizedTensor.toFloat().div(tf.scalar(255.0));  // Normalize the image
    const tensor = normalizedTensor.expandDims(0);  // Add a batch dimension (for model input)
    return tensor;
}


// Handle the "Run Model" button click
document.getElementById('modelrunbtn').addEventListener('click', async function() {
    if (!model) {
        await loadModel();  // Load the model if it hasn't been loaded yet
    }

    const imageInput = document.getElementById('medical_image');
    const imageFile = imageInput.files[0];

    if (imageFile) {
        const imageElement = document.createElement('img');
        const reader = new FileReader();

        reader.onload = function(e) {
            imageElement.src = e.target.result;
            imageElement.onload = function() {
                runInference(imageElement);  // Run inference after the model is loaded
            };
        };

        reader.readAsDataURL(imageFile);
    }
});
