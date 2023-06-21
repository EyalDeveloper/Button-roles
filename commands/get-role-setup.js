const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed,MessageActionRow,MessageSelectMenu} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('get-role-setup')
    .setDescription('sets up the get-role system'),
  async execute(interaction, client) {
    const errorEmbed = new client.discord.MessageEmbed()
    .setColor('RED')

    const { Permissions } = require('discord.js');

    if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
        errorEmbed.setDescription(`** \`❌\` | אתה צריך גישות של: \`ADMINISTRATOR\` על מנת להשתמש בפקודה זו**`)
                return interaction.reply({
                    embeds: [errorEmbed],
                    ephemeral: true
                });
    }
    const role1 = client.config.getroles.role1;
    const role1name = client.config.getroles.role1name;
    const role2 = client.config.getroles.role2;
    const role2name = client.config.getroles.role2name;
    const role3 = client.config.getroles.role3;
    const role3name = client.config.getroles.role3name;

    const selectMenu = new MessageSelectMenu()
      .setCustomId('get-role')
      .setPlaceholder('Select a role')
      .setMaxValues(2)
      .addOptions([
        {
          label: role1name,
          description: `Get ${role1name} role`,
          value: role1
        },
        {
          label: role2name,
          description: `Get ${role2name} role`,
          value: role2
        },
        {
          label: role3name,
          description: `Get ${role3name} role`,
          value: role3
        }
      ]);

    const row = new MessageActionRow().addComponents(selectMenu);

    const embed = new MessageEmbed()
      .setColor('BLUE')
      .setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
      .setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
      .setDescription(`**שלום לכל חברי השרת: \`${interaction.guild.name}\`\nברוכים הבאים למערכת קבלת הרולים שלנו\nלחצו על הכפתורים למטה ובחרו את הרולים שתרצו לקבל\nהמשך יום נפלא לכולם♥**`)
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))

    await interaction.reply({
      content: `Successfully sets up the get-role system in ${interaction.channel}`,
      ephemeral: true
    });

    await interaction.channel.send({
      embeds: [embed],
      components: [row]
    });

  },
};
