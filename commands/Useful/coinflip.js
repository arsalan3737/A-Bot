const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require(`fs`);
module.exports = {
  data: new SlashCommandBuilder()
    .setName(`coinflip`)
    .setDescription(`Flip a Coin`),
  async execute(interaction) {
    // fs.writeFile(`MONEY.txt`, interaction.user.id, `utf8`, (err) => {
    //   if (err) {
    //     console.log(err);
    //   }
    // });
    data = fs.readFile(`MONEY.txt`, `utf8`, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      return data;
    });
    console.log(data);
    const embed = new EmbedBuilder();
    const result = Math.random();
    const coinFlip = result < 0.5 ? "Heads" : `Tails`;
    await interaction.reply(`${coinFlip}`);
  },
};
