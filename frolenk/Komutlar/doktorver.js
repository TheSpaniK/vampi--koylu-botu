const { GuildMember, MessageEmbed,Client} = require("discord.js");
const spanık = client.veri;
module.exports = {
    Isim: "doktor",
    Komut: ["doktor"],
    Kullanim: "doktor <@acar/ID> Komutu ile Doktor rolü verirsiniz.",
    Aciklama: "",
    Kategori: "Yönetici",
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

  onRequest: async function (client, message, args, guild) {
    message.delete()
    let vkchat = message.guild.channels.cache.get(spanık.vkKanallar.vkYöneticiChat);
    if(!message.member.voice || message.member.voice.channelID != spanık.vkKanallar.vkOyunOdası) return message.channel.send(`Hata: Vampir/Köylü komutlarını kullanbilmek için \`${message.guild.channels.cache.get(spanık.vkKanallar.vkOyunOdası).name}\` adlı ses kanalında bulunman gerek!`).then(x => x.delete({timeout: 7500}));
    if(!message.member.roles.cache.has(spanık.vkRoller.yönetici)) return message.channel.send(`Hata: \`Doktor verebilmek için yönetici olmalısın.\``).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen vampirin öldürmek istediği kişiyi etiketle!  __Örn:__  \`${client.sistem.a_Prefix}doktor @ByMySpanık/ID\``).then(sil => sil.delete({timeout: 5000}));
    if(!uye.roles.cache.has(spanık.vkRoller.katıldı)) return message.channel.send(`Hata: \`Bu üye oyuna katılmadığından dolayı öldüremezsin.\``);
    if(uye.roles.cache.has(spanık.vkRoller.ölü)) return message.channel.send(`Hata: \`Bu üye öldü doktor veremezsin!\``);
    uye.roles.cache.has(spanık.vkRoller.doktor) ? uye.roles.remove(spanık.vkRoller.doktor) : uye.roles.add(spanık.vkRoller.doktor);
    if(!uye.roles.cache.has(spanık.vkRoller.doktor)) {
        vkchat.send(`${uye} isimli kişi **Yönetici** tarafından \`Doktor\` verildi!`).catch().then(vkchat => vkchat.react('✅'))
    } else {
        vkchat.send(`${uye} isimli kişi **Yönetici** tarafından \`Doktor\` alındı!`).catch().then(vkchat => vkchat.react('✅'))
    };
     }
};

