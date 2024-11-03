const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const profileModel = require("../../models/profileSchema.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`coinflip`)
    .setDescription(`Flip a Coin`)
    .addNumberOption((option) =>
      option
        .setName(`wager`)
        .setDescription(`Amount to wager`)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("coinflip")
        .setDescription("Choose heads or tails")
        .setRequired(true)
        .addChoices(
          { name: "Heads", value: "Heads" },
          { name: "Tails", value: "Tails" }
        )
    ),

  async execute(interaction) {
    // Get user db infomationa and pass to command
    let profileData;
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

    const { balance } = profileData;
    const wager = interaction.options.getNumber("wager");
    const choice = interaction.options.getString("coinflip");
    let won = true;
    if (wager > balance) {
      await interaction.reply("Broke boy");
    } else {
      const result = Math.random();
      const coinFlip = result < 0.5 ? "Heads" : `Tails`;
      if (coinFlip == choice) {
        profileData.balance = balance + wager;
      } else {
        profileData.balance = balance - wager;
        won = false;
      }
      profileData.save();
      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Coin Flip")
        .addFields(
          { name: "Landed ON", value: coinFlip, inline: true },
          { name: "Balance", value: `${balance}`, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    }
  },
};
