const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const moment = require('moment');
require('moment-duration-format');
const spanık = client.veri
module.exports = {
    Isim: "yardım",
    Komut: ["help"],
    Kullanim: "!yardım",
    Aciklama: "ByMySpanık adlı kullanıcı yapılmıştır çevrilmiştir",
    Kategori: "-",
    TekSunucu: true,
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async (client, message, args) => {
    if(!message.member.roles.cache.has(spanık.vkRoller.yönetici) && !message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.has(spanık.vkRoller.doktor)) return message.channel.send(`Hata: \`Doktor veya Oyun yöneticisi değilsin o yüzden yardım menüsünü açamazsın.\``).then(sil => sil.delete({timeout: 5000}));
   
        const embed = new MessageEmbed()
        .setColor('0x2f3236')
        .setAuthor(`V/K Oyunu`,'https://bot.to/wp-content/uploads/2020/09/vampir-koylu_5f6fe8d900d6e.png')
        .addField(`Yönetici Komutları`, `${client.komutlar.filter(x => x.Kategori === "Yönetici").map(x => `\`${client.sistem.a_Prefix}` + x.Kullanim + `\``).join('\n ')}`)
        .addField(`Doktor Komutları;`, `${client.komutlar.filter(x => x.Kategori === "Doktor").map(x => `\`${client.sistem.a_Prefix}` + x.Kullanim + `\``).join('\n ')}`, true)
        .setFooter(`Developer By Spanık`)
      message.channel.send({embed: embed});
 }
};