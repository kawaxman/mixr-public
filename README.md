
Note: Mixr is a web app created in Spring 2021 as a final project for the Software Development and Tools class at CU Boulder. The development team was made up of the following (in alphabetical order): Ashley Weaver, Charlotte Donaldson, Jack Gentlemen, John Hau,  Junyu Ding, Kent Waxman. This is a clone of the original project repository, currently for display purposes. Connected databases are not currently functional.

Specific Contributions (this is not an exhaustive list):

Ashley Weaver:
    Admin page UI, search page UI, drink history UI, product testing (test cases and user stories), project milestone recording

Charlotte Donaldson:
    Front end design manager and overall styling planner, wireframe planning, login page UI, profile page UI, navigation bar UI and icon design

Jack Gentleman:
    Scrum master, created uploading drink recipe page, created database integration for storing, uploading and fetching drinks

John Hau:
    Set up MongoDB database, MongoDB and MongoDB Realm integration, middleware bridge setup, navigation bar routing, architecture diagrams

Junyu Ding:
    Designed drink search and ingredient selection pages, converted HTML pages to React Components, wireframe planning

Kent Waxman:
    Converted HTML files into React components, worked on drink recipe selection pages, assisted in setting up MongoDB database, project milestone recording, created architecture diagrams





For questions regarding this repository, contact: https://github.com/GlitchedChar






Application Description:
Mixr is an web app created to help users create classic and unique drinks purely based on the ingredients at the user’s disposal. Mixr also has the ability for users to upload their custom drinks for the community to see and try, or simply store the user’s custom recipes for easy access.

With Mixr’s abundant features, it is an application that stands out because it uses crowdsourcing to help expand the network and provide users with more fun drink options beyond the classic bartender drink options that are already available. Mixr offers the ability for users to upload their unique drink recipes, which can be searched for by other users.

With the ability to easily search for popular drink recipes, as well as the ability to upload and view custom drink recipes, Mixr serves as a platform for everyone to explore mixology.  


Architecture Design:
Mixr was designed with specific use-cases in mind. For instances, two main use-cases are users who want to discover new drink recipes based on the ingredients they have, and users who want to share recipes they have created. The front-end of the website was coded in HTML and CSS using the React Native Library to help with UI design. This is connected to React-Redux with javascript, which connects to the back-end (MongoDB). We used a MongoDB cluster for the database, which stores information that can be accessed with Redux, such as drink recipes and user information (email, name, username).


Deployment:
Mixr not currently hosted anywhere, so it has to be run locally. In order to run it, first navigate to the /mixr-public/projectMixrWeb/mixr folder in your command prompt (Note: for some reason it doesn’t work on windows powershell, so I’d recommend using GitBash or something similar). Then run the command “yarn install”,  and after it’s finished installing run the command “yarn start”. Then all you have to do is wait (it sometimes takes a while) and you will be routed to the login page.
