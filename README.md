# Mpox Detector Website

Welcome to the **Mpox Detector Website**. This project aims to provide a research-based tool for diagnosing Mpox and related diseases using image analysis and survey data. The platform allows users to anonymously upload images of suspected lesions and answer a brief survey regarding symptoms and exposure to Mpox. The collected data helps enhance the model's accuracy and contributes to ongoing research.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Model Information](#model-information)
- [Author](#author)
- [Usage](#usage)
- [Installation](#installation)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

This project provides a machine learning-based solution for diagnosing Mpox using images and survey responses. The main goal is to develop a tool that aids in the early detection of Mpox while contributing to research efforts.

The website is hosted using TBD and features a user-friendly interface built with **Bootstrap**.

## Features

- **Mpox Diagnosis**: Users can upload images of suspected lesions and receive a diagnosis prediction using a machine learning model.
- **Symptom Survey**: The platform includes a brief survey to gather user-reported symptoms and potential exposure data.
- **Disclaimer**: A mandatory disclaimer is shown to users before they upload data, outlining the purpose and limitations of the tool.
- **Mobile-Responsive Design**: The site is optimized for both desktop and mobile users.
- **Secure & Anonymous**: Data is collected anonymously and securely.

## Model Information

- **Type of Model**: The underlying model is a CNN image classifier trained to detect Mpox.
- **Input Data**: The model accepts PNG images of skin lesions along with symptom survey data.
- **Purpose**: The purpose of the model is to aid in the early detection of Mpox for research purposes. It is not intended to replace professional medical advice or diagnosis.

## Author

- **Name**: Jonathan Gong
- **Role**: Developer, Researcher
- **Email**: jonathangong2005@gmail.com

## Usage

### Accessing the Website

You can visit the live site at:

<!-- [Mpox Detector Website](http://yourwebsite.com) -->
TBD

### Running the Model

1. Agree to the disclaimer to proceed.
2. Fill out the symptom survey.
3. Upload a PNG image of the suspected lesion.
4. Submit the survey and wait for the model to analyze the image.
5. View the prediction results on the same page.
## Installation

To run the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/jogong2718/MpoxWeb.git
    ```

2. Create an uploads directory and a `config.php` file:

    - Navigate to the **survey** folder and create a new directory called `uploads` (this directory will store the uploaded image data).
    - Create a file named `config.php` in the **survey** folder to store your database connection details with the following format:
    
    ```php
    <?php
    // Database connection details
    $servername = "####"; // Your database server/host (e.g., localhost)
    $username = "####";   // Your database username
    $password = "####";   // Your database password
    $dbname = "####";     // Your database name
    ?>
    ```

3. Run the project locally:

    - Set up a local server using **XAMPP**, **MAMP**, or similar tools. Ensure **PHP** and **MySQL** are properly installed and running.
    - Place the project files in the `htdocs` (XAMPP) or equivalent directory for your server setup.
    - Alternatively, since this is a lightweight project, you can use PHP's built-in web server by running:
   ```bash
    php -S localhost:8000
   ```
    - Import your database tables via **phpMyAdmin** or any MySQL management tool.
    - Make sure your database and `config.php` are correctly set up to allow image uploads and survey data storage.

4. Open `index.html` in your browser and test the project locally.

5. Ensure the PHP scripts are able to communicate with your MySQL database and that the image upload process functions properly.


## Technologies

This project uses the following technologies:

- **HTML5 & CSS3**
- **Bootstrap 5** for UI/UX design
- **JavaScript** for frontend logic
- **TensorFlow.js** for client-side model inference
- **PHP & MySQL** for backend storage
- **Chart.js** for displaying prediction results
- TBD for web hosting

## Contributing

Contributions are welcome! If you would like to contribute to the project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For further questions or support:

- **Email**: jonathangong2005@gmail.com
- **GitHub**: [jogong2718](https://github.com/jogong2718)
