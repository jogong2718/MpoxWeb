document.getElementById('openDisclaimerBtn').addEventListener('click', function() {
    document.getElementById('disclaimerModal').style.display = 'block';
});

document.querySelector('.modal .close').addEventListener('click', function() {
    document.getElementById('disclaimerModal').style.display = 'none';
});

document.getElementById('agreeBtn').addEventListener('click', function() {
    document.getElementById('disclaimerSection').style.display = 'none';
    document.getElementById('surveySection').style.display = 'block';
    document.getElementById('homepage').style.display = 'none';
});

document.getElementById('tomodelbtn').addEventListener('click', function() {
    document.getElementById('tomodelbtn').style.display = 'none';
    document.getElementById('disclaimerSection').style.display = 'none';
    document.getElementById('surveySection').style.display = 'none';
    document.getElementById('surveyresult').style.display = 'none';
    document.getElementById('modelSection').style.display = 'block';
    
});

document.getElementById('surveyForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this);

    // Submit the form data via AJAX
    let response = await fetch('/survey/survey.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text()) // Parse the response as text
    .then(data => {
        // Display the server response (optional)
        // alert("Survey submitted successfully: " + data);
        // You can also display the response in a div or other element on the page
        document.getElementById('surveyresult').innerHTML = data;
        document.getElementById('tomodelbtn').style.display = 'block';
    })
    .catch(error => {
        console.error('Error submitting survey:', error);
        alert("An error occurred while submitting the survey.");
    });
    

});