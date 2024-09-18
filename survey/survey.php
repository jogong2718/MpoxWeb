<?php
// Database connection details
include 'config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Collect form data
$symptom_onset = $_POST['symptom_onset'];
$symptoms = $_POST['symptoms'];
$travel_history = $_POST['travel_history'];
$contact_history = $_POST['contact_history'];

// Handle file upload
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["medical_image"]["name"]);
echo $target_file;

if (move_uploaded_file($_FILES["medical_image"]["tmp_name"], $target_file)) {
    // File uploaded successfully
    $medical_image = $target_file;

    // Prepare the SQL query
    $sql = "INSERT INTO survey_responses_table (symtoms_date, symptoms_list, travel, contact, image_path)
            VALUES ('$symptom_onset', '$symptoms', '$travel_history', '$contact_history', '$medical_image')";

    // Execute the query
    if ($conn->query($sql) === TRUE) {
        echo "Survey submitted successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Sorry, there was an error uploading your file.";
}

// Close the connection
$conn->close();

