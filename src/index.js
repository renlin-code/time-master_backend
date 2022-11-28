const app = require("./app");
const sequelize = require("./database/database");

async function main() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully!");
        app.listen(3000);
        console.log('Listening on port 3000')
    } catch(error) {
        console.error(`Unable to connect to the database: ${error}`)
    }
}
main();
