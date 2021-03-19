const { GuildMember, MessageEmbed,Client} = require("discord.js");
const spanık = client.veri;
const qdb = require('quick.db')
module.exports = {
    Isim: "bitir",
    Komut: ["vkbitir"],
    Kullanim: "bitir Komutu ile V/K oyununu bitirirsiniz.",
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
    let vkaktifmi = qdb.fetch(`vkoyunu`)
    let vkchat = message.guild.channels.cache.get(spanık.vkKanallar.vkChat);
   if(!message.member.roles.cache.has(spanık.vkRoller.yönetici)) return message.channel.send(`Hata: \`Vampir/Köylü oyununu bitirmek için VK Yöneticisi olmalısın.\``).then(sil => sil.delete({timeout: 5000}));
   if(vkaktifmi === "deaktif") return message.channel.send(`Hata: \`Şuanda aktif oyun yok ve olmayan oyunu bitiremem!\``);
   if(!message.member.voice || message.member.voice.channelID != spanık.vkKanallar.vkOyunOdası) return message.channel.send(`Hata: Vampir/Köylü oyununu bitirebilmek için \`${message.guild.channels.cache.get(spanık.vkKanallar.vkOyunOdası).name}\` kanalında bulunmalısın!`).then(x => x.delete({timeout: 7500}));
   let verildi = message.member.voice.channel.members.filter(member => !member.roles.cache.has(spanık.vkRoller.yönetici) && !member.voice.channelID != spanık.vkKanallar.vkOyunOdası && !member.user.bot)
   verildi.array().forEach((member, index) => {
   setTimeout(() => {
        member.roles.remove(spanık.vkRoller.katıldı).catch();
        if(member.roles.cache.has(spanık.vkRoller.doktor)) member.roles.remove(spanık.vkRoller.doktor);
        if(member.roles.cache.has(spanık.vkRoller.ölü)) member.roles.remove(spanık.vkRoller.ölü);
    }, index * 2000)
   });
   let toplumute = message.member.voice.channel.members.filter(member => !member.roles.cache.has(spanık.vkRoller.yönetici));
   toplumute.array().forEach((x, index) => setTimeout(() => { x.voice.setMute(false) }, 4000));
   qdb.set(`vkoyunu`, 'deaktif');
   qdb.set(`canlandirma`, `aktif`);
   let oyunkanali = message.guild.channels.cache.get(spanık.vkKanallar.vkOyunOdası);
   oyunkanali.edit({userLimit: 12}).catch()
   vkchat.send('V/K Oyunu Yönetici Tarafından Bitirilmiştir susturulanlar **4 Saniye** sonra açılacaktır. İyi Günler!').then(x => x.react('✅'));
     }
};

