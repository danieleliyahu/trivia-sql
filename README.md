# Trivia-Project


1. Import this repository into your account. 

2. Clone your new repository to your computer

3. running `npm install` from the `TRIVIA-SQL` folder,and the `client` folder.

4. Create `.env` files in the `root` folder and the `DB` folder with the following variables:

   - `DB_PASSWORD=""` , write your mysql connection password
   - `REFRESH_TOKEN_SECRET=""` , write your mysql connection host
   - `ACCESS_TOKEN_SECRET=""` , write your mysql connection host

5. In the terminal go to "TRIVIA-SQL" folder and do the following commends:

   - `npx sequelize db:migrate` // this will create the tables in your mysql workbench
   - `npx sequelize db:seed:all` // this will populate the tables with data

7. In the terminal go to the `TRIVIA-SQL` folder and run `npm run dev`.

8. Open another terminal, go to the `client` folder , run `npm start` and this will open the trivia in the browser.

9.start playing

## have fun 😀
