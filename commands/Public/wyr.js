const wyr = require("../../wyr.json");
const Discord = require("discord.js");
require('dotenv').config();
const { getRandomQuestion } = require('../../database.js');
const DB = require('../../database.js');
const JSON = require('../../questions.json');

module.exports.run = async (client, message) => {
    var max = Object.keys(JSON).length;
    var number = Math.floor(Math.random() * Math.floor(max)) + 1;
    console.log(number);
    console.log(JSON[number]);

    const embed = new Discord.MessageEmbed()
            .setColor("#1E90FF")
            .addField("Would you rather", `${JSON[number].question}`);


    message.channel.send(embed)
    .then(async (msg) => {
        for (emoji of ['✅', '❌']) await msg.react(emoji);
        msg.awaitReactions((reaction) => (reaction.emoji.name == "✅" || reaction.emoji.name == "❌"),
            { max: 1, time: 10000, errors: ['time'] })
        .then(collected => {
            if (collected.first().emoji.name == "✅") {
                message.reply(`You reacted with ${collected.first().emoji.name}`)
            } else {
                message.reply(`You reacted with ${collected.first().emoji.name}`)
            }
        })
        .catch(() => {
            return message.reply("Pas de réponse, Question annulé");
        })
    })
};

module.exports.help = {
    name: "wyr",  // nom du fichier
    aliases: ['wyr'], // alias ou nom du fichier si pas d'alias
    category: 'public', // nom du dossier 
    description: "Would you rather", // une description
    cooldown: 0, // un cd entre 2 fois la meme commande
    usage: '', // si y a des arguments obligatoire
    permissions: false, // permissions de la personne qui fait la commande
    isUserAdmin: false, // args doit etre une mention et la personne mentionné n'est pas administrator
    args: false // besoin d'args
};
