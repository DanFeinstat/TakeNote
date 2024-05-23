# Quick Notes Web App

The Quick Notes Web App is a straightforward web application designed for creating, reading, updating, and deleting notes. It provides a seamless user experience for managing notes efficiently.  Or it would if I had a little more time to work on styling and features.

## DemoLink: 

PLEASE KEEP IN MIND THAT HEROKU TAKES A MINUTE TO WARM UP IF THE APP HAS BEEN INACTIVE.  AS SUCH IT MIGHT INITIALLY DISPLAY AS AN ERROR OR EMPTY BUT WILL WORK AFTER A SHORT TIME.

https://solace-chat-challenge-df-055aa7cf2ceb.herokuapp.com/

## Technologies

- **Frontend**: Developed using Create React App with TypeScript, ensuring robust and type-safe code for enhanced maintainability.
- **Backend**: Built with Node.js and Express, utilizing TypeScript to ensure a scalable and maintainable backend architecture.
- **Database**: Relies on MySQL for data storage, ensuring data integrity and reliability.

## Requirements

To run the Notes Web App locally, ensure you have the following prerequisites installed:

- **Node.js**: Required for running both the frontend and backend servers.
- **MySQL**: Needed for storing and managing note data.

## Running MySQL Locally

To set up a local MySQL environment for the Notes Web App, follow these steps:

1. **Download MySQL**: Visit the [MySQL Community Downloads](https://dev.mysql.com/downloads/mysql/) page and download the appropriate MySQL Community Server version for your operating system.

2. **Install MySQL**: Follow the installation instructions provided for your operating system to install MySQL.

3. **Start MySQL Server**: Once installed, start the MySQL server using the appropriate command for your system. Typically, this involves running a command such as `mysql.server start` or `sudo service mysql start`.

4. **Access MySQL**: Access MySQL using the MySQL command-line client. Open a terminal window and enter the command `mysql -u root -p` to log in with the root user. Provide the root password you specified during installation when prompted.

## Running The Application Locally

To run the Notes Web App locally, follow these steps:

1. **Update Environment Variables**: In the client-side `.env` file, set the value for `REACT_APP_API_URL` to the localhost URL where your backend server is running (e.g., `http://localhost:3001`). In the backend `.env` file, fill in the necessary details from your MySQL configuration. Refer to the `.env.example` file for the required keys.

2. **Install Dependencies**: Navigate to both the backend and client folders in your terminal and run `npm install` to install the project dependencies.

3. **Start the Application**: Run `npm start` in separate terminal windows for both the backend and client folders. This command will start the backend and frontend servers. You can then access the application by navigating to `http://localhost:3000` in your web browser (assuming that's the port you're configured for).

## Design Considerations

This was more of an MVP project than production level code, and I think the design and architecture choices reflect to a degree but not completely.  For example I used create-react-app with typescript because it's fast and simple boilerplate that I'm more familiar with than next.js.

  On the other hand, considering the size, simplicity and lack of a need to scale I could have comfortably used a very lightweight database solution such as SQLite.  MySQL adds a little more required setup but it also offers more robust features, so if we did decide to scale the project it would be a better option.  For example if we wanted to make the notes app multiplayer, allowing realtime editing buy multiple individuals and account sharing, SQLite would potentially start to struggle to fulfill our needs.

  There were a couple of ways to go with the note filtering.  It could have been done purely on the front end, just filtering the display while holding data for all the notes. I generally prefer to not keep extra data on the client side of an application though.  If we needed to filter quickly and constantly, such as if we'd decided to filter on input change, then I would have considered using the front end to filter, especially if we had a more complex query or were struggling with the amount of traffic we had.

  I also initially was building this out as a multi-view SPA, but after building it with a 'ListView' for filtering and selection and a 'SingleNote' view for reading the full note and editing it, I decided that keeping it one one page and allowing edits in place was a smoother and more intuitive UX.

  ## Hypothetical Roadmap

  1. **Add Support For Multiple Users and Authentication**: Don't really need to elaborate much on this, just didn't feel comfortable adding it in the given timeframe.

  2. **Accessibility**:  The components on the front-end have some baseline accessiblity but should really be built on top of a library like Radix or Shadcn.

  3. **StateManagement**:  We didn't scale to a point of needing state management beyond some pieces of top level state being passed via context.  Had we scaled beyond we could introduce redux but I think I'd probably go with zustand for this project as I find it to be simple yet flexible with less boilerplate and build with hooks in mind.

  4. **Hooks and Utils**:  I have a couple, but they're not comprehensive. For example I didn't include caching in my implementation use useFetch and when I was playing with querying filtered data on input change, the debounce function I wrote for it as a util was very simple.  I think it would be valuable for a larger project to bring in some of the well build hook and utility libraries instead of reinventing the wheel.

  3. **Testing**: There is none.  Unit tests with something like React Testing Library, Jest, etc.  Integration and End to End testing, ideally tied into the CI with github actions.

  4. **Styling**:  It looks bad.  It could look worse, but it doesn't look good.  Please send designers with figma mocks.  I didn't add any media queries or breakpoints for transitioning to/from a mobile layout, which I would do given more time.  

  5. **Better CSS Solution and Practices**: I'm a fan of vanilla CSS but I think pulling in some combination of sass modules, maybe atomic css like Tailwind, and a custom design system token solution would be idea.  I'm less keen on CSS-in-JS solutions these days but they do work and they are great for building out tokenized themes. 
  
   As far as CSS practices go, mine were lax. I could have made much better use of css variables and modern conventions like display: grid.  I did use CSS logical properties so that if we do decide to support translations into RTL languages, it would be an easier transition.

    6. **Performance**: Were this application to scale I'd definitely want to look into where I could lazy load (below the fold, maybe implement an infinte scroll setup), bundle split, etc. 

    7. **Error Handling**: needs it.  I do very little with graceful error handling and instead leaned on displaying warnings with my front end validation.  Need to add fallbacks, refetching and user flows for exceptions and errors. 

    8. **Security**:  I did very little to actively address potential security vulnerabilities.  That should be audited, both manually and then as part of the CI.

    9. **Backend Architecture**: I went very simple on it.  I've mostly been working in front end and I know there's a lot more I could have been doing if we were planning to scale.  Given that there will likely be a grand total of under 1000 queries made on this app a very simple backend will hopefully do the trick.

    10. **Environment**: this isn't a laptop I usually write code on so I'd really like to pump up my environment a bit. Or at least add some linting, prettier, a code commenting helper, etc.

    11. **Index Files**: none of the folders were really big enough to merit it for this project, but if they were to become crowded I'd want to add index files to the for managing 'public' vs 'private' exports and enabling easier use of static analysis and scripts for things like automating export lists.

    12. **Types**: I kept my types pretty as needed and linear, I definitely could have made them more robust and leveraged extending and omiting base types.  With more time and as the app grows in complexity I think this would become worth focusing on.

## Struggles

It's been a while since I deployed a project from scratch and getting the configuration right for deployment took more time than I'd like to admit.  

I also think I should have taken more time initially to plan out my UX, because building a multi-view app first and then deleting around half the code and rewriting a cleaner, drier, leaner app probably doubled my work time.

Getting to build something like this was a lot of fun and kind of nostalgic so however it goes I appreciated the experience!