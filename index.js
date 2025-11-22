const {Client , GatewayIntentBits,Collection, Partials } = require("discord.js");
console.clear();
const express = require("express");
const app = express();
const { config } = require("./src/DataBaseJson/index")


const client = new Client({
  intents: Object.keys(GatewayIntentBits),
  partials: Object.keys(Partials)
});

module.exports = client;
client.slashCommands = new Collection();
const { token } = require("./token.json")
client.login(token);


const evento = require("./src/handler/Events");
evento.run(client);
require("./src/handler/index")(client);





const login = require("./src/system/Register");
app.use("/", login);

const callback = require("./src/system/Oauth2");
app.use("/", callback);

try {
  app.listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 8080
  });
} finally {
  console.log("Https Rodando com sucesso");
}

process.on('unhandRejection', (reason, promise) => {

  console.log(`🚫 Erro Detectado:\n\n` + reason, promise)

});

process.on('uncaughtException', (error, origin) => {

  console.log(`🚫 Erro Detectado:\n\n` + error, origin)

});