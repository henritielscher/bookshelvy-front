# BookShelfy - A React Booklist App :books:

## Description

BookShelfy is a simple React App which lets you store a list of books.

Obviously this alone is not meaningful at all, but in the progress it taught me a lot about user authentication with sessions and how to interact with an API to maintain an almost okayish User Experience :wink:.

While implementing TypeScript more and more into my workflow I also touched the concepts of Unit Testing with Jest and got to know React better with this one.

So plenty of stuff going on especially since I splitted the front- and backend to simulate a real life production environment.

**Check out the working project [here](https://booklist-frontend.vercel.app/)**

**Find the backend Repository [here](https://github.com/henritielscher/bookshelvy-back)**

## Features

### Frontend

-   Typescript | [Link](https://www.typescriptlang.org/)
-   React | [Link](https://reactjs.org/)
-   React Router Dom | [Link](https://react-hook-form.com/)
-   React Hook Form | [Link](https://reactrouter.com/)
-   React Toastify | [Link](https://fkhadra.github.io/react-toastify/introduction/)
-   Axios | [Link](https://axios-http.com/)

### Backend

-   User Authentication
-   NodeJS | [Link](https://nodejs.dev/)
-   Typescript | [Link](https://www.typescriptlang.org/)
-   Express | [Link](https://expressjs.com/)
-   Express-Session | [Link](https://www.npmjs.com/package/express-session)
-   MongoDB | [Link](https://www.mongodb.com/)
-   Mongoose | [Link](https://mongoosejs.com/)
-   Unit Testing with Jest | [Link](https://jestjs.io/)
-   Supertest for testing API-Calls | [Link](https://www.npmjs.com/package/supertest)
-   Cors | [Link](https://www.npmjs.com/package/cors)
-   Joi Validation | [Link](https://joi.dev/api/?v=17.6.0)

## Project Explanation

### Backend | Repo [HERE]()

The Backend works as an API to make requests to from the frontend. The files for each feature (books & users) are structured in a "folder by feature" way while all functionality is split up in five files for dependency injection (same with the app.ts and database.js) to mock the functions in testing and / or use a fake database:

1. Model
    - defines the Schema for the different collections of the database
2. Service
    - makes direct calls to the database like findUserByEmail()
3. Routes
    - defines the paths and REST actions and implements the necessary middleware
4. Controller
    - here is where everything comes together and the actual response of the server is built
5. Test
    - unit test environment for the specific collection

This is the groundwork and actually a great approach for code maintenance since it's very clean and readable. The middleware.js takes care of validating if a user is logged in or not and also verifies if the input for a new user or book coming from the fronted is actual valid for the database.

### Frontend

**[main.tsx](./src/main.tsx)**

This file brings context, router and app together.
Basically the different [contexts](./src/context/) provide the App component with ... well - context! Three of them are used here:

1. UIContext
    - handles the notification messages depending on whether or whether not the app is making any requests to the backend API
2. UsersContext
    - handles the login & logout of the user
3. BooksContext
    - handles all fetched books and updates of the UI to go along with the actual database state

I clearly would have gotten away with using only useState() for the context, but in order to learn something new I handled users and books with reducers.

**[components](./src/components/)**

React works with component-based rendering. Therefore the gist of the frontend happens in this folder. For validating the data of the various forms I used React Form Hook which happens to be a neat tool.

## Additional Infos / Thoughts

This project was a lot of fun, but came with a lot of uncovered grounds for me. Especially the setup of the session cookie was kind of hard to manage. Next time I will definitely make use of JWT for authentication. In a small app like this there is no need to store tons of data - so why not keep it simple?!

Also I ran into a lot of issues with testing the API calls and mocking dependencies while TypeScript was making it even harder. Next time I will try to write tests first and then the actual code. It leads to a more precise workflow, awareness and stability in the end.
