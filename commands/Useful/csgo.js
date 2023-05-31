const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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
                    interaction.reply({content: `Invalid Steam ID`, ephemeral: true });
                }
                return res.json();
            })
            .then(data =>{
                const KD = data.data.segments[0].stats.kd.displayValue;
                const Name = data.data.platformInfo.platformUserHandle;
                const image = data.data.platformInfo.avatarUrl;
                const steamURL = data.data.platformInfo.platformUserId;
                const hsPct = data.data.segments[0].stats.headshotPct.displayValue;
                const mPlayed = data.data.segments[0].stats.matchesPlayed.displayValue;
                const mWon = data.data.segments[0].stats.wins.displayValue;
                const wPct = data.data.segments[0].stats.wlPercentage.displayValue;
                const embed = new EmbedBuilder()
                    .setColor(0xff0000)
                    .setTitle(`${Name}'s Stats`)
                    .setURL(`https://steamcommunity.com/id/${steamID}`)
                    .setThumbnail(image)
                    .addFields(
                        { name: `K/D`, value: `${KD}`, inline: true },
                        { name: `Headshot %`, value: `${hsPct}`, inline: true },
                        { name: '', value: '', inline: false },
                        { name: `Games Played`, value: `${mPlayed}`, inline: true },
                        { name: `Games Won`, value: `${mWon}`, inline: true },
                        { name: `Win %`, value:`${wPct}`, inline: true },
                    )
                    .setTimestamp()
                    
                interaction.reply({ embeds: [embed] });
            })
            .catch(error => {
                console.error('Error:', error);
              });       
    },
};