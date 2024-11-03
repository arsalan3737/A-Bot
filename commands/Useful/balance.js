const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const profileModel = require("../../models/profileSchema.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`balance`)
    .setDescription(`Check your balance`),
  async execute(interaction) {
    try {
      profileData = await profileModel.findOne({ userId: interaction.userId });
      if (!profileData) {
        profileData = await profileModel.create({
          userId: interaction.userId,
        });
      }
    } catch (error) {
      console.log(err);
    }

    await interaction.reply(`$${profileData.balance}`);
  },
};
