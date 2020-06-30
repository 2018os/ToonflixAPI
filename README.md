# ToonflixAPI
Toonflix API server

## Tech List
* Server - typescript + Apollo Server Express
* DataBase - MySQL
* ORM - Prisma

## Tips
If you modify the `.prisma` file, you can apply the database through step 3.
* npx prisma migrate save --name init --experimental
* npx prisma migrate up --experimental
* npx prisma generate
