import dotenv from 'dotenv';
import { init, send, EmailJSResponseStatus } from '@emailjs/nodejs';
dotenv.config();

const emailjsKey = process.env.EMAILJS_API_KEY;
init({ publicKey: emailjsKey });

export const handler = async (event, context) => {
  const data = JSON.parse(event.body);
  let templateParams = {
    from_name: data.name,
    from_email: data.email,
    message: data.projectsummary,
  };

  try {
    const response = await send("gmail_service", "template_project_request", templateParams);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    if (error instanceof EmailJSResponseStatus) {
      return {
        statusCode: error.status,
        body: JSON.stringify(error.text),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    }
  }
}
