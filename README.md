# 3308SP21_015_1

Application Description:
Mixr is an web app created to help users create classic and unique drinks purely based on the ingredients at the user’s disposal. Mixr also has the ability for users to upload their custom drinks for the community to see and try, or simply store the user’s custom recipes for easy access.

With Mixr’s abundant features, it is an application that stands out because it uses crowdsourcing to help expand the network and provide users with more fun drink options beyond the classic bartender drink options that are already available. Mixr offers the ability for users to upload their unique drink recipes, which can be searched for by other users.

With the ability to easily search for popular drink recipes, as well as the ability to upload and view custom drink recipes, Mixr serves as a platform for everyone to explore mixology.  


Architecture Design:
Mixr was designed with specific use-cases in mind. For instances, two main use-cases are users who want to discover new drink recipes based on the ingredients they have, and users who want to share recipes they have created. The front-end of the website was coded in HTML and CSS using the React Native Library to help with UI design. This is connected to React-Redux with javascript, which connects to the back-end (MongoDB). We used a MongoDB cluster for the database, which stores information that can be accessed with Redux, such as drink recipes and user information (email, name, username).


Deployment:
Mixr not currently hosted anywhere, so it has to be run locally. In order to run it, first navigate to the /3308SP21_015_1/projectMixrWeb/mixr folder in your command prompt (Note: for some reason it doesn’t work on windows powershell, so I’d recommend using GitBash or something similar). Then run the command “yarn install”,  and after it’s finished installing run the command “yarn start”. Then all you have to do is wait (it sometimes takes a while) and you will be routed to the login page.
