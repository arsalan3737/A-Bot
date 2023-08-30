const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  GuildMember,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName(`user-avatar`)
    .setDescription(`Get avatar of user`)
    .addUserOption((option) =>
      option.setName("user").setDescription("Enter User").setRequired(false)
    ),
  async execute(interaction) {
    const guildAvatar = 0; 
    const user = interaction.options.getUser("user") ?? interaction.user;
    const member = interaction.options.getMember("user") ?? interaction.member;
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(user.username + `'s avatar`)
      .setImage(user.displayAvatarURL({ size: 2048 }))
      .setTimestamp();
    const button = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setCustomId(`switch-avatar`)
      .setLabel(`Server avatar`);
    const but = new ActionRowBuilder().addComponents(button);
    await interaction.reply({
      embeds: [embed],
      components: [but],
    });
    console.log(user.displayAvatarURL({ size: 2048 }));
  },
};
