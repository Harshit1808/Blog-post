# Blog Post
_A functional blog post backend

***

__To re-create the Backend__
1. run `npm install`
2. create a `.env` file
3. add following fields:

     PORT = `/// YOUR PORT NUMBER////`
     
     DATABASE = `/// YOUR DB URI////`
    

4. run `npm start` or `node server.js`


__Following APIs are created in this project
1. http://localhost:3000/api/register POST API - first user will do the registration 
![RegisterAPI](https://github.com/Harshit1808/Blog-post/assets/84890342/24fbe0c2-a425-471a-9846-312e2a6e294e)

2. http://localhost:3000/api/login POST API- Then user will login and token will be generated using jsonwebtokens
![LoginAPI](https://github.com/Harshit1808/Blog-post/assets/84890342/f894f1c1-2793-47fd-bc3c-715e37575455)

3. http://localhost:3000/api/posts POST API- User can post by providing title, body and, tags in body and token
![BlogPostAPI](https://github.com/Harshit1808/Blog-post/assets/84890342/00a2d758-f5fc-4f16-993b-88c47092a956)

4. http://localhost:3000/api/posts GET API- User can retrive all posts
![GetAllPostsAPI](https://github.com/Harshit1808/Blog-post/assets/84890342/9d9816f7-f6fe-4906-b9ee-0986fe6bee18)

5. http://localhost:3000/api/posts/{id} GET API- User can obtain specific post by using Id
![SpecificPostAPI](https://github.com/Harshit1808/Blog-post/assets/84890342/d541bd73-e12d-4686-b38f-a9705666aa8e)

6. http://localhost:3000/api/posts/{id} PUT API- User can update post details
![UpdateAPI](https://github.com/Harshit1808/Blog-post/assets/84890342/184989ba-c0af-4602-ab49-a27a70059f29)

7. http://localhost:3000/api/posts/{id} DELETE API- User can delete post
![DeleteAPI](https://github.com/Harshit1808/Blog-post/assets/84890342/739d2be3-c384-4fb4-a985-188a49765875)

8. http://localhost:3000/api/logout POST API- User can logout
![LogoutAPI](https://github.com/Harshit1808/Blog-post/assets/84890342/3009d23a-9a12-4ad7-b1f1-68050c34af01)

Tech used- NodeJs, ExpressJs, MongoDB, JavaScript, Jsonwebtokens for authentication

     
     
