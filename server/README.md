# Installation & Setup

## Setting up the Backend

1. Clone the repository.
2. Create a `.env.development` file in the root directory and paste the following:

   ```
   PORT=

   MYSQL_DB_HOST=
   MYSQL_DB_USERNAME=
   MYSQL_DB_PASSWORD=
   MYSQL_DB_PORT=
   MYSQL_DB_NAME=

   COOKIE_SECRET=
   ```

   - **`PORT`** The port your server will run on
   - **`MYSQL_DB_HOST`** The hostname for your MySQL database server
   - **`MYSQL_DB_USERNAME`** The username for your MySQL database
   - **`MYSQL_DB_PASSWORD`** The password for your MySQL user account
   - **`MYSQL_DB_PORT`** The port your MySQL server is running on (default 3306)
   - **`MYSQL_DB_NAME`** The name of your database (be sure to create it first otherwise an error will be thrown).
   - **`COOKIE_SECRET`** Can be any string that can be used to encrypt & decrypt your cookie.
3. Run `npm install` or `npm i --legacy-peer-deps`.
4. Run `npm run seed` and `npm run roleBusiness` create `role`, `user "admin"` and `role Oganize`
   - role {
      name: 'admin',
      name: 'staff',
      name: 'admin'
   }

   - user: `admin` {
      username: 'admin',
      password: 'admin',
      role: 'admin'
   }

   - role Business{
      name: 'Hội viên'
   }
5. Run `npm run start:dev`

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.
