const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS05WMXE3eU8yNTlETERQNy9nVUZoREpHMkIwOGphNjB6QlNFSHEwT3ZXST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlViaXp2ZGRQVjZrRWdBMmQvV1YwRENEK3JZQ2xXa1l2c0RmRVR6VnpYcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJT1JvZVhPdGtaUEEzVkMveXV1dHh3MU96SWdaYVNkUGtsTXRKRDhJSUhjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzaWRzZml0aCt3UkFOZDl2bW1DOWM0Szl2Sk8zUG9hdkhYc1hDOVF1TDJFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlCVmFjaFgzKy9FRGZQQTFZUlh2bHo2K3IwenlEUmZZUHowcjlXZlczMHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJpdDEvemRYb2VYQmlZVlQ5TXNyUEhMUndQRjNKVmwxNFBlcFRiWHFNMUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEtVaDVYYlhQU2hRRzdnc3dmQlloNWZPWndPRzAwQitxRCtCRjFUdjZHYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUzBuZ1Z5d25JOHU0Zkl5TFh1Z1daNEs4QkVDdXZLUWVvL1VObnZDV2UwMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZ1YkZnMDRsbmIvRXBTVEtTdStZVXFwYVE0RGZHK1BOblVQalRXZFk0dHM5cFIvcVc5aFk5b0Eya3lya2NQUVJYelBmUTU0Snh3Y1N0WDh6S3ZVM0NnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA1LCJhZHZTZWNyZXRLZXkiOiJtMlZiVmc3VWlHUnpad0QxREVybU1pU29scGVaL2xBemlhOFY1MGhoNzdVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiNllYUzFTNVMiLCJtZSI6eyJpZCI6IjIyMTc3MjkzMjgyMjo1NEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTUxsNmFBTkVJeWM4YjRHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoib2wvemEzT1NDRW54U2pXMmxmMUNWbzlkcFJDczV0MytjTnFLckhqa2szbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoibXIyNmRwMWJUMmpad05ndVphbXFoMXV5M3NPbXU4QWNsOVF5Q2x5aVk3TkhiWXFlUDV3ZjlyWlNUNFIzNXhXMFlET245WWNTbU94TnZpUkNlMC90Z3c9PSIsImRldmljZVNpZ25hdHVyZSI6ImFIWmZmUGFnYlpTdHdmM0gyOXFuMGpGM1I2K1BIc1pIRDJwTm1QdFZUNWk2V2pWcloyNXdnaERSMXI0YzZrcjB3TTkrcTVGUVNybXVtQmZMcE1rY0J3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjIxNzcyOTMyODIyOjU0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFKZjgydHprZ2hKOFVvMXRwWDlRbGFQWGFVUXJPYmQvbkRhaXF4NDVKTjYifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSJ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : 221772932822process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
