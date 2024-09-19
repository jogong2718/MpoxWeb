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
    let resultText = '';  // Initialize an empty string for the result

    for (let i = 0; i < prediction.length; i++) {
        resultText += `Class ${classes[i]}: ${prediction[i]}\n`;  // Append each prediction with a newline
    }

    // Display the result
    document.getElementById('result').innerText = "Prediction:\n" + resultText;
        // Display the result to the user
    
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
