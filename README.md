# Welcome to /user-management/ \<an open source project \/\>

At the current state this program provides a user interface with the ability to register and login as a user to a database. The user can then create notes in a database. A note can be created with a type of  'note' or 'to do'. A 'note' can be turned into a 'to do' with a button and a 'to do' can be changed to 'done' with another button. Once a note is flagged as 'done' it can then be 'archived'. Any note that is not archived can be edited. An archived note can be restored with a button.

## Where to open issues

The project is currently just a single repository. You can open issues and pull requests directly on this repository. I do ask that you create a branch with your GitHub username as the title before doing this.

#### How do I contribute?

If you want to contribute please reach out to me on Discord at mNix#5589 
I will provide further instructions from there.

## How do I run the application?

Ensure that you have a Node.js environment installed and configured with a local mongo db.
Navigate to the local repository and use the command `npm install` to install the package dependencies.
Currently only one script exists. Using `npm run dev` will fire the application up locally at `localhost:4000`
You will need to register an account to begin using the app.