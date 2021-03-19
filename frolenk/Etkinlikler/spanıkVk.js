const { GuildMember, MessageEmbed,Client} = require("discord.js");
const moment = require('moment');
const fs = require('fs');
const qdb = require(`quick.db`)
const spanık = client.veri;
module.exports = {
    Etkinlik: "voiceStateUpdate",
    /**
     * @param {Client} client
     */
    onLoad: function (client) {
    
    },
    /**
     * @param {client} ready
     */
    onRequest: async function (oldState, newState, newMember, oldMember) {
        if((!oldState.channel && newState.channel) || (oldState.channel && newState.channel)){    // Bug önleme 
        const oldUserChannel = oldState.channelID;
        const newUserChannel = newState.channelID;
        const uye = newState.guild.members.cache.get(newState.id)
        let oyunbilgi = qdb.fetch(`vkoyunu`);
        if(oyunbilgi === "aktif") {
            if (newUserChannel === spanık.vkKanallar.vkOyunOdası) {
                if(uye.hasPermission('ADMINISTRATOR')) return;
                if(uye.roles.cache.has(spanık.vkRoller.yönetici)) return;
                if(uye.roles.cache.has(spanık.vkRoller.katıldı)) return;
             // uye.voice.setChannel(spanık.vkKanallar.vkBekleme);
            };
        if (newUserChannel === spanık.vkKanallar.vkOyunOdası) {
           return;
          } else {
            if(oldUserChannel === spanık.vkKanallar.vkOyunOdası) {
                if(uye.voice.channel) uye.voice.setMute(false);
                if(uye.roles.cache.has(spanık.vkRoller.katıldı)) uye.roles.remove(spanık.vkRoller.katıldı);
                if(uye.roles.cache.has(spanık.vkRoller.doktor)) uye.roles.remove(spanık.vkRoller.doktor);
                if(uye.roles.cache.has(spanık.vkRoller.ölü)) uye.roles.remove(spanık.vkRoller.ölü);
            } else {
                return;
            }
          }
        }  else if(oyunbilgi === "deaktif") {
            return;
        } else {
            return;
        }
    }
    }
  };