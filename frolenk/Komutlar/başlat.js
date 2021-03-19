const { GuildMember, MessageEmbed,Client} = require("discord.js");
const spanık = client.veri;
const qdb = require('quick.db')
module.exports = {
    Isim: "başlat",
    Komut: ["vkbaşlat"],
    Kullanim: "başlat Komutunu kullanarak V/K oyununu başlatırsınız.",
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
   if(!message.member.roles.cache.has(spanık.vkRoller.yönetici)) return message.channel.send(`Hata: \`Vampir/Köylü oyununu başlatmak için VK Yöneticisi olmalısın.\``).then(sil => sil.delete({timeout: 5000}));
   if(vkaktifmi === "aktif") return message.channel.send(`Hata: \`Oyun aktifken neden hala oyunu aktif etmeye çalışıyosun çözmüş değilim!\``);
   if(!message.member.voice || message.member.voice.channelID != spanık.vkKanallar.vkOyunOdası) return message.channel.send(`Hata: Vampir/Köylü oyununu başlatabilmek için \`${message.guild.channels.cache.get(spanık.vkKanallar.vkOyunOdası).name}\` kanalında bulunmalısın!`).then(x => x.delete({timeout: 7500}));
   let verildi = message.member.voice.channel.members.filter(member => !member.roles.cache.has(spanık.vkRoller.katıldı) && !member.roles.cache.has(spanık.vkRoller.yönetici) && !member.voice.channelID != spanık.vkKanallar.vkOyunOdası && !member.user.bot)
   verildi.array().forEach((member, index) => {
   setTimeout(() => {
        member.roles.add(spanık.vkRoller.katıldı).catch();
    }, index * 1000)
   });

   let toplumute = message.member.voice.channel.members.filter(member => !member.roles.cache.has(spanık.vkRoller.yönetici));
   toplumute.array().forEach((x, index) => setTimeout(() => { x.voice.setMute(true) }, 2000));
   let oyunkanali = message.guild.channels.cache.get(spanık.vkKanallar.vkOyunOdası);
    oyunkanali.edit({userLimit: 1}).catch()
   qdb.set(`vkoyunu`, 'aktif');
   qdb.set(`canlandirma`, 'aktif');
   vkchat.send(new MessageEmbed().setDescription(`Heyy Yönetici! **${verildi.size}** kişi V/K odasında bulunduğu için \`@${message.guild.roles.cache.get(spanık.vkRoller.katıldı).name}\` rolünü verdim.
   ✅ \`#${message.guild.channels.cache.get(spanık.vkKanallar.vkOyunOdası).name}\` kanalında bulunan herkesi susturdum ve oyunu başlattım senin konuşmanı bekliyorlar!
   \`\`\`Yönetici oyun rollerinizi size özelden veya grup halinde ulaştıracaktır şuan da roller tamamlanınca susturulmanız açılacaktır!\`\`\``).setColor('RED').setAuthor(`V/K Oyunu`,'https://bot.to/wp-content/uploads/2020/09/vampir-koylu_5f6fe8d900d6e.png'));
     }
};

