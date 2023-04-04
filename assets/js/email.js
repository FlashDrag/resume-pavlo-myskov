contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let form = new FormData(event.target)
  postForm(form);
})

async function postForm(form) {
  try {
    const response = await fetch('/.netlify/functions/sendEmail', {
      method: "POST",
      // convert FormData object to a JSON object
      body: JSON.stringify(Object.fromEntries(form)),
    });

    const data = await response.json();

    if (response.ok) {
      // Handle the server response if successful (status code 200)
      alert('Email sent successfully');
      // TODO: SHOW CLEAR MODAL WITH THANK YOU AND SMILE
      // $('#result-modal').modal('show')
      console.dir(`Status: ${data.status}, Text: ${data.text}`);
      window.location.replace("index.html");
    } else {
      // Handle api errors
      alert('Email sending failed');
      // TODO: SHOW CLEAR MODAL WITH FAILED AND BAD SMILE
      // $('#result-modal').modal('show')
      console.error(`Status: ${response.status}, Error: ${data}`)
      window.location.replace("index.html");
    }
  } catch (err) {
    // Handle network errors
    console.error(err);
    alert('Network error. Please try again later.');
  }
}
