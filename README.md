# Software developer resume website
This is a HTML/CSS static website based on the Bootstrap CSS framework to style and layout the content.
The website provides a resume of a developer proffesional experience and skills. The resume website is developed based on the Mobile First approach and it is fully responsive, so it can be viewed on any device.

[View the live project here](https://resume-pavlo-myskov.netlify.app)

## Structure

The website is composed of 4 pages:
- `index.html` - the main page
- `resume.html` - the resume page
- `github.html` - the github page
- `contact.html` - the contact page

The header and footer are similar on all pages.

**The header** contains profile picture, name and job title. It also contains a navigation bar with links to the _main page_, the _resume page_, the _github page_ and the _contact page_.

**The footer** includes three sections:
- _About_: a short description of developer skills
- _Download_: a button to download the resume in PDF format
- _Social_: links to social networks


## Features

- ### Main page
The main section of the index page contains the developer personal information and a short answers for questions such as  "_What I do?_", "_How do I do it?_" and "_Why hire me?_".

- ### Resume page
The resume page is divided into two columns. The left column contains the developer professional experience and the right column contains the developer skills.
Skills column contains two lists of skills: _Front End_ and _Back End_. Under the lists there is Botstrap progress bars for some tools and technologies with the percentage of knowledge.

- ### Github page
The GitHub page contains a list of the developer repositories with the links. Also the user can search for other user profiles and see their repositories.

- ### Contact page
The contact page designed to allow users to easily get in touch with the site owners or developers. It includes a form where users can input their name, email, and a brief description of their project. It uses EmailJS to send the message to the developer email address.

## Technologies Used
The project is built using the following technologies:

- HTML5
- CSS3
- JavaScript
- jQuery
- Bootstrap 4.6.2
- hover.css
- Font Awesome
- Google Fonts
- GitHub API
- [EmailJS](https://www.emailjs.com/)
- [Netlify serverless function](https://www.netlify.com/blog/intro-to-serverless-functions/)

## Deployment
The RESUME is a static web service that deployed on Netlify from GitHub repository.

It is available at the following link:

https://resume-pavlo-myskov.netlify.app

## EmailJS and Netlify Serverless Function
The EMAILJS service is used to send the message from the contact form to the developer email address.
### With Netlify serverless function
[Official EmailJS SDK for Node.js](https://www.npmjs.com/package/@emailjs/nodejs)

The Netlify serverless function is used to hide the API keys from the public repository.
To use the EmailJS SDK with the Netlify serverless function you need to install the EmailJS SDK using:
```npm install @emailjs/nodejs```

### EmailJS SDK for Browsers
[Official EmailJS SDK for Browsers](https://www.npmjs.com/package/@emailjs/browser)
To use EmailJS SDK without the Netlify serverless function you need to add the following code to the body of the contact.html file:

```
<script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js">
</script>
<script type="text/javascript">
   (function(){
      emailjs.init("YOUR_PUBLIC_KEY");
   })();
</script>
```
[See the simple implementation of the email sender](https://github.com/FlashDrag/resume-pavlo-myskov/tree/8d7926d7773d069e74706caa6963e0686bee8152)

## Credits
Website created using the [Code institute](https://codeinstitute.net/) walkthrough from the [Diploma in Full Stack
Software Development](https://codeinstitute.net/full-stack-software-development-diploma/) course.

