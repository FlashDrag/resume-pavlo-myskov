(function () {
  emailjs.init("");
})();

function sendMail(contactForm) {
  let templateParams = {
    from_name: contactForm.name.value,
    from_email: contactForm.email.value,
    message: contactForm.projectsummary.value,
  }

  emailjs.send("gmail_service", "template_project_request", templateParams)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function (error) {
      console.log('FAILED...', error);
    });

  return false;
}

