About `server`:
Authorization and Authentication ( JWT, OAuth2.0 client side, but still all data handled on the server side );
When a user is created,  the following is written to the database:
- the user's credentials are recorded in the database with a unique identifier.
- then a profile is created from the already created user.

CRUD operations with mongoDB.
GLobal error handling.
Middlewares.
Nodemailer for the implementation of reset-password by request from client.
Used software architectural pattern **MVC**. 


<p align='center'>
 <a href="https://github.com/sponsors/alexandresanlim">
    <img style="width:60px" alt="Js" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" />
  </a>&nbsp;&nbsp;
  <a href="#">
  <img style="width:60px" alt="Node js lang" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png">
</a>&nbsp;&nbsp;
  <a href="#">
  <img style="width:60px" alt="Express" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png">
</a>&nbsp;&nbsp;
  <a href="#">
  <img style="width:60px" alt="MongoDB" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png">
</a>&nbsp;&nbsp;
  <a href="#">
  <img style="width:60px" alt="JWT" src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white">
</a>&nbsp;&nbsp;

</p>



# Event Server for [client](https://github.com/brolo1313/mean-sandBox-BE)
Clone this repository by SSH: `git@github.com:brolo1313/mean-sandBox-BE.git`.
Then run `npm i`.

# Dev
If you want to test locally, you should have your own keys, at least :

`SECRET_KEY` and `MONGO_URL` and ` it will promise that you will work with sing up/in

All env variables

`SECRET_KEY`
`MONGO_URL`
`DEFAULT_PASSWORD`
`GOOGLE_CALLBACK_UR`
`EXPIRES_IN`
`GOOGLE_CLIENT_ID`
`GOOGLE_CLIENT_SECRET`
`PORT_EMAIL`
`SERVICE`
`HOST_EMAIL`
`USER_EMAIL`
`PASS_EMAIL`
`ENV`

For start server type  `npm run dev`




