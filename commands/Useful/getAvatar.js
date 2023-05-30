const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`user-avatar`)
        .setDescription(`Get avatar of user`)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Enter User')
                .setRequired(true)

            ),
    async execute(interaction) {
        const user = interaction.options.getUser(`user`);
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(user.username+ `'s avatar`)
            .setImage(user.displayAvatarURL({size: 2048}))
            .setTimestamp()
        await interaction.reply({ embeds: [embed] });
    },
};