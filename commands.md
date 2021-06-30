docker exec -it nome-do-container mysql -uroot -psua-senha

npm install -g sequelize-cli
npx sequelize init
npx sequelize db:create

### Migrate

npx sequelize db:migrate
npx sequelize migration:create --name=create_associate

npx sequelize db:migrate:undo
npx sequelize db:migrate:undo:all
npx sequelize db:migrate:undo:all --to MIGRATION_NAME

### Seed

npx sequelize seed:create --name sellers

npx sequelize db:seed --seed SEEDER_NAME
npx sequelize db:seed:all
