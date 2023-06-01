This is my blog. Technologies Used:

1. MERN Stack (MongoDB, Express, React, Node)
2. Context API for state management
3. TailwindCSS for the UI
4. Bcrypt (no JWT on this one) for auth
5. Multer (for adding pictures to your profile or post), I have this commented out for now while I decide if I want to even have pictures.

Functionally, it's 95% operational. I plan to start writing content for it sometime soon, but it needs some tweaking. I'm  thinking about adding post tags on top of categories, cleaning up some of the code, maybe eventually adding comments, etc. 

If anyone wants to copy this, it makes for a pretty good template, simply clone or download the zip. Once opened hit 'npm install' and add a .env file to your root folder with your MongoDB connection string, and it should be good to go. Also might want to add NODE_ENV = 'development' (production when deployed) because of some if statements that depend on its status (mainly index.js)
