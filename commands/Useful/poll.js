const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  GuildMember,
  InteractionCollector,
  ComponentType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`poll`)
    .setDescription(`Create a Poll`)
    .addStringOption((option) =>
      option
        .setName(`question`)
        .setDescription(`Question For the Poll`)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName(`option1`)
        .setDescription(`Used to change the first option`)
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName(`option2`)
        .setDescription(`Used to change the second option`)
        .setRequired(false)
    ),
  async execute(interaction) {
    let option1 = interaction.options.getString("option1")
      ? interaction.options.getString("option1")
      : `yes`;
    let option2 = interaction.options.getString("option2")
      ? interaction.options.getString("option2")
      : `No`;
    let yes = 0;
    let no = 0;
    const votedUser = new Set();
    const question = interaction.options.getString("question");
    const yButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Success)
      .setCustomId(`yes`)
      .setLabel(option1);
    const nButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Danger)
      .setCustomId(`no`)
      .setLabel(option2);
    const but = new ActionRowBuilder().addComponents(yButton, nButton);
    const embed = new EmbedBuilder()
      .setTitle(question)
      .addFields(
        { name: option1, value: `${yes}`, inline: true },
        { name: option2, value: `${no}`, inline: true }
      );
    const response = await interaction.reply({
      embeds: [embed],
      components: [but],
    });
    const collector = response.createMessageComponentCollector({
      componentType: ComponentType.Button,
    });

    collector.on(`collect`, async (interaction) => {
      if (votedUser.has(interaction.user.id)) {
        interaction.reply({
          content: `You have already voted`,
          ephemeral: true,
        });
        return;
      }
      votedUser.add(interaction.user.id);
      if (interaction.customId === `yes`) yes++;
      if (interaction.customId === `no`) no++;
      let embed2 = new EmbedBuilder()
        .setTitle(question)
        .addFields(
          { name: option1, value: `${yes}`, inline: true },
          { name: option2, value: `${no}`, inline: true }
        );
      const response = await interaction.update({
        embeds: [embed2],
        components: [but],
      });
    });
  },
};
