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
    .setName(`poll`)
    .setDescription(`Create a Poll`)
    .addStringOption((option) =>
      option
        .setName(`question`)
        .setDescription(`Question For the Poll`)
        .setRequired(true)
    ),
  async execute(interaction, yes, no) {
    yes = 0;
    no = 0;
    const question = interaction.options.getString("question");
    const yButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setCustomId(`yes`)
      .setLabel(`Yes`);
    const nButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setCustomId(`no`)
      .setLabel(`No`);
    const but = new ActionRowBuilder().addComponents(yButton, nButton);
    const embed = new EmbedBuilder()
      .setTitle(question)
      .addFields(
        { name: `Yes`, value: `${yes}`, inline: true },
        { name: `No`, value: `${no}`, inline: true }
      );
    const response = await interaction.reply({
      embeds: [embed],
      components: [but],
    });
    this.run(interaction, yes, no, question, response);
  },
  async run(interaction, yes, no, question, response) {
    const yButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setCustomId(`yes`)
      .setLabel(`Yes`);
    const nButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setCustomId(`no`)
      .setLabel(`No`);
    const but = new ActionRowBuilder().addComponents(yButton, nButton);
    const yesNo = await response
      .awaitMessageComponent({ time: 60000 })
      .catch(() => null);
    if (yesNo == null) {
      const newEmbed = new EmbedBuilder()
        .setTitle(`The result of "${question}"`)
        .addFields(
          { name: `Yes`, value: `${yes}`, inline: true },
          { name: `No`, value: `${no}`, inline: true }
        );
      interaction.editReply({
        embeds: [newEmbed],
        components: [],
      });
      return;
    }
    if (yesNo.customId == "yes") {
      yes++;
      const newEmbed = new EmbedBuilder()
        .setTitle(question)
        .addFields(
          { name: `Yes`, value: `${yes}`, inline: true },
          { name: `No`, value: `${no}`, inline: true }
        );
      await yesNo.update({
        embeds: [newEmbed],
        components: [but],
      });
      this.run(interaction, yes, no, question, response);
    } else {
      no++;
      const newEmbed = new EmbedBuilder()
        .setTitle(question)
        .addFields(
          { name: `Yes`, value: `${yes}`, inline: true },
          { name: `No`, value: `${no}`, inline: true }
        );
      await yesNo.update({
        embeds: [newEmbed],
        components: [but],
      });
      this.run(interaction, yes, no, question, response);
    }
  },
};
