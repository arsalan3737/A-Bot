const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName(`user-banner`)
    .setDescription(`Get banner of user`)
    .addUserOption((option) =>
      option.setName("user").setDescription("Enter User").setRequired(false)
    ),
  async execute(interaction) {
    const user =
      interaction.options.getUser("user") == undefined
        ? await interaction.user.fetch(true)
        : await interaction.options.getUser("user").fetch(true);
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(user.username + `'s banner`)
      .setImage(user.bannerURL({ size: 2048 }))
      .setTimestamp();
    user.bannerURL() == null
      ? await interaction.reply({
          content: `User does not have a banner`,
          ephemeral: true,
        })
      : await interaction.reply({ embeds: [embed] });

    console.log(user.bannerURL());
  },
};
