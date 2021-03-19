const { Client, Discord, MessageEmbed, Collection, WebhookClient } = require('discord.js');
const client = global.client = new Client({fetchAllMembers: true});
const moment = require('moment')
global.client = client;
require("moment-duration-format")
moment.locale('tr')
const fs = require("fs");
client.komutlar = new Collection();
client.komut = new Collection();
client.veri = require("./frolenk/spanık-ayar.json");
client.sistem = require("./frolenk/spanık-ayar.json");
client.modüller = {}; 
client.altbaslik = client.veri.Tag + "ꄶ" + client.veri.sunucuUfakIsim + "Developer By Spanık"
fs.readdir("./frolenk/Komutlar", (err, files) => {
    if(err) return console.error(err);
    files = files.filter(file => file.endsWith(".js"));
    console.log(`[ ${files.length} ] Adet Komut Yüklenecek...`);
    files.forEach(file => {
        let referans = require(`./frolenk/Komutlar/${file}`);
  if(typeof referans.onLoad === "function") referans.onLoad(client);
            client.komutlar.set(referans.Isim, referans);
            if (referans.Komut) {
              referans.Komut.forEach(alias => client.komut.set(alias, referans));
            }
          });
});

  fs.readdir("./frolenk/Etkinlikler/", (err, files) => {
    if (err) return console.myTime(err);
    files.forEach(fileName => {
      let referans = require("./frolenk/Etkinlikler/" + fileName);
        referans.onLoad(client);
        client.on(referans.Etkinlik, referans.onRequest);
      console.log(
        `[ByMySpanık] (${fileName}) isimli etkinlik yüklendi.`
      );
    });
  });


 client.on("message", (message) => {
      if (message.author.bot ||!message.content.startsWith(client.sistem.a_Prefix) || !message.channel || message.channel.type == "dm") return;
      let args = message.content
        .substring(client.sistem.a_Prefix.length)
        .split(" ");
      let komutcuklar = args[0];
      let bot = message.client;
      args = args.splice(1);
      let calistirici;
      if (bot.komut.has(komutcuklar)) {
        calistirici = bot.komut.get(komutcuklar);
      
        calistirici.onRequest(bot, message, args);
      } else if (bot.komutlar.has(komutcuklar)) {
        calistirici = bot.komutlar.get(komutcuklar);
        calistirici.onRequest(bot, message, args);
      }
});


client.login(client.sistem.a_Token).catch(err => console.error("[-ByMySpanık-] Komutlar Yüklenmedi!"));
