const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const balls = `new`
module.exports = {
    data: new SlashCommandBuilder()
        .setName(`cs-stats`)
        .setDescription(`Retrieves CS:GO stats`)
        .addStringOption(option =>
            option.setName(`steam-id`)
                .setDescription('Enter Valid Steam ID')
                .setRequired(true)
        ),
    async execute(interaction) {
        const steamID = interaction.options.getString('steam-id');
        fetch(`https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${steamID}`,{
            method: "GET",
            headers: {
                "TRN-Api-Key": "5f235d64-ea21-4b61-8768-4cebde1f543e",
                "Accept": `application/json`,
                "Accept-Encoding": `gzip`
            }
        })
            .then(res => {
                if(!res.ok){
                    interaction.reply(`Invalid Steam ID`);
                }
                return res.json();
            })
            .then(data =>{
                const KD = data.data.segments[0].stats.kd.displayValue;
                const Name = data.data.platformInfo.platformUserHandle;
                interaction.reply(`${Name} has a CS:GO kd of ${KD}`);
            })
            .catch(error => {
                console.error('Error:', error);
              });       
    },
};