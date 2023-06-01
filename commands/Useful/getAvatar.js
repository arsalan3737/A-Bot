const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName(`user-avatar`)
    .setDescription(`Get avatar of user`)
    .addUserOption((option) =>
      option.setName("user").setDescription("Enter User").setRequired(false)
    ),
  async execute(interaction) {
    const user =
      interaction.options.getUser(`user`) == undefined
        ? interaction.user
        : interaction.options.getUser(`user`);
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(user.username + `'s avatar`)
      .setImage(user.displayAvatarURL({ size: 2048 }))
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
