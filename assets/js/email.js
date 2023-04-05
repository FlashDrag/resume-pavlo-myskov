$("#contactForm").submit(function (event) {
  event.preventDefault();

  let form = new FormData(event.target);
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
      displaySuccess();
      $("#contactForm").trigger("reset");
    } else {
      // Handle api errors
      displayError();
      console.error(`Status: ${response.status}, Error: ${data}`)
    }
  } catch (err) {
    // Handle network errors
    console.error(err);
    alert('Network error. Please try again later.');
  }
}

function displaySuccess() {
  let title = 'Thank you';
  let text = 'I am enthusiastic about the opportunity to work together and help bring your vision to life';

  $(".card-title p").text(title).css("color", "#1de2e2");
  $("#modal-img").attr("src", "/assets/images/smiling-with-sunglasses-emoji.png");
  $(".card-text p").text(text);
  $(".modal-btn").css("background-color", "#1de2e2");
  $('#resultModal .close').addClass("d-none");

  $('#resultModal').modal('show');
}

function displayError() {
  let title = 'Failed';
  let link = '<a href="https://t.me/flashdrag" target="_blank">Telegram</a>'
  let text = `Unfortunately email sending failed!<br>Try contacting the developer via ${link}`;

  $(".card-title p").text(title).css("color", "#e21d62");
  $("#modal-img").attr("src", "/assets/images/sad-emoji.png")
  $(".card-text p").html(text);
  $(".modal-btn").css("background-color", "#e21d62");
  $('#resultModal').attr("data-backdrop", "true"); // allow closing modal by clicking outside

  $('#resultModal').modal('show');
}