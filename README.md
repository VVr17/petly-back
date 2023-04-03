# Pet Support API

This is the backend REST API for the Pet Support web application, which allows users to browse and create notices related to pets. 
The API is built with Node.js and Express, and uses MongoDB as its database.

You can find front-end on "Petly": https://petly-alpha.vercel.app/ 

# Getting Started
  * To run the API locally, you'll need to have Node.js and MongoDB installed on your machine. You can then clone this repository and install its dependencies by running:

        git clone https://github.com/VVr17/pet-support-back.git
        cd pet-support-back
        npm install

  * You'll also need to create a .env file in the root of the project, with the following environment variables:
        
        PORT=3000
        DATABASE_URL=<your MongoDB connection string>
        JWT_SECRET=<a secret string for JSON Web Tokens>
        
        SENDGRID_API_KEY=<your SendGrid API key>
        
        CLOUDINARY_URL=<your_cloudinary_URL>
        CLOUD_NAME=<your Cloudinary cloud name>
        API_KEY=<your Cloudinary API key>
        API_SECRET=<your Cloudinary API secret>

        EMAIL_VERIFICATION_SECRET=<email token secret word>
        PASSWORD_RESET_SECRET=<reset password token secret word>

        BASE_BACK_URL=<base back URL>
        BASE_FRONT_URL=<base front URL>
        
  * You can then start the server with:
  
        npm start

 This will run the server in production mode, which serves the API at http://localhost:3000. 
 * If you want to run the server in development mode, with automatic reloading on file changes, you can use:
  
        npm run start:dev


# API Documentation

  The API is documented using Swagger UI, which can be accessed at https://pet-support.up.railway.app/api-docs/. This documentation lists all the available endpoints, their parameters and responses, and allows you to try them out directly from the browser.
  
# Endpoints
The API has the following main endpoints:

  * POST /auth/signup: Creates a new user account.
  * POST /auth/login: Logs in a user and returns a JSON Web Token.
  * GET /auth/verify/:token: Verifies a user's email address using a token sent by email.
  * POST /auth/google/login: Initiates a Google OAuth 2.0 authentication flow.
  * GET /auth/current: get full current user information.
  * PUT /auth/current: Updates a user's account information.
  * POST /auth/forgot-password: Sends a password reset email to a user.
  * POST /auth/reset-password: Resets a user's password using a token sent by email.
  
  * GET /notices/category/:categoryName: Retrieves notices by categories.
  * POST /notices/category/:categoryName: Creates a new notice by categories.
  * GET /notices/id/:noticeId: Get a notice by ID.
  * DELETE /notices/id/:noticeId: Deletes a notice.
  * POST /notices/favorites/:noticeId: Adds a notice to the user's favorites.
  * GET /notices/favorites: Get  user's favorite notices.
  * DELETE /notices/favorites/:noticeId: Removes a notice from the user's favorites.
  
  * POST /pets: Creates a new pet.
  * DELETE /pets/:petId: Deletes a pet.
  
  * GET /news: Get pets news.
  * GET /services: Get partners information.
