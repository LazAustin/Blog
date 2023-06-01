This is my blog. Technologies Used:

1. MERN Stack (MongoDB, Express, React, Node)
2. Context API for state management
3. TailwindCSS for the UI
4. Bcrypt (no JWT on this one) for auth
5. Multer (for adding pictures to your profile or post), I have this commented out for now while I decide if I want to even have pictures.

Functionally, it's 95% operation. Seriously plan to start writing on it soon, but it needs some tweaking. Categories have been set up in the back end, but I need to make them available when creating a post. I'm also thinking about adding post tags on top of categories. Also, I did a lot of experimenting and learning with this, so the code is a little messy, but I'll gradually clean it up.  

If anyone wants to copy this, it makes for a pretty good template, simply clone or download the zip. Once opened hit 'npm install' and add a .env file to your root folder with your MongoDB connection string, and it should be good to go. Also might want to add NODE_ENV = 'development' (production when deployed) because of some if statements that depend on its status (mainly index.js)