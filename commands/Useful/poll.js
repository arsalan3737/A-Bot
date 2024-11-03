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
    )
    .addStringOption((option) =>
      option
        .setName(`option3`)
        .setDescription(`Used to change the third option`)
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName(`option4`)
        .setDescription(`Used to change the fourth option`)
        .setRequired(false)
    ),
  async execute(interaction) {
    let option1 = interaction.options.getString("option1")
      ? interaction.options.getString("option1")
      : `Yes`;
    let option2 = interaction.options.getString("option2")
      ? interaction.options.getString("option2")
      : `No`;
    let option3 = interaction.options.getString("option3");
    let option4 = interaction.options.getString("option4");

    let yes = 0;
    let no = 0;
    let o3 = 0;
    let o4 = 0;
    const votedUser = new Set();
    const question = interaction.options.getString("question");
    const yButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Success)
      .setCustomId(`yes`)
      .setLabel(option1);
    const nButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Success)
      .setCustomId(`no`)
      .setLabel(option2);
    const but = new ActionRowBuilder().addComponents(yButton, nButton);
    const embed = new EmbedBuilder()
      .setTitle(question)
      .addFields(
        { name: option1, value: `${yes}`, inline: true },
        { name: option2, value: `${no}`, inline: true }
      );
    if (option3 != null) {
      const thirdButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setCustomId(`thirdOpt`)
        .setLabel(option3);
      but.addComponents(thirdButton);
      embed.addFields({ name: option3, value: `${o3}`, inline: true });
    }
    if (option4 != null) {
      const fourthButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setCustomId(`fourthOpt`)
        .setLabel(option4);
      but.addComponents(fourthButton);
      embed.addFields({ name: option4, value: `${o4}`, inline: true });
    }

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
      if (interaction.customId === `thirdOpt`) o3++;
      if (interaction.customId === `fourthOpt`) o4++;
      let embed2 = new EmbedBuilder()
        .setTitle(question)
        .addFields(
          { name: option1, value: `${yes}`, inline: true },
          { name: option2, value: `${no}`, inline: true }
        );
      if (option3 != null) {
        embed2.addFields({ name: option3, value: `${o3}`, inline: true });
      }
      if (option4 != null) {
        embed2.addFields({ name: option4, value: `${o4}`, inline: true });
      }
      const response = await interaction.update({
        embeds: [embed2],
        components: [but],
      });
    });
  },
};
