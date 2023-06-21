const { getPasteUrl, PrivateBinClient } = require('@agc93/privatebin');
const db = require('quick.db');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {

    if (!interaction.isButton()) return;
    if (interaction.customId === 'get-role') {
      const member = interaction.member;
      const rolesAdded = [];
      const rolesRemoved = [];
    
      for (const role of interaction.values) {
        try {
          if (member.roles.cache.has(role)) {
            await member.roles.remove(role);
            rolesRemoved.push(`<@&${role}>`);
          } else {
            await member.roles.add(role);
            rolesAdded.push(`<@&${role}>`);
          }
        } catch (error) {
          console.error(error);
          const errorEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Roles Update Failed\`❌\`')
            .setDescription('An error occurred while updating your roles. Please try again later.')
            .setFooter(`Roles Update Failed`)
            .setTimestamp();
          await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
          return;
        }
      }
      let message = '\n';
    
      if (rolesAdded.length > 0) {
        message += `**Added: ${rolesAdded.join(', ')}**\n`;
      } else {
        message += '**Added: None**\n';
      }
    
      if (rolesRemoved.length > 0) {
        message += `**Removed: ${rolesRemoved.join(', ')}**\n`;
      } else {
        message += '**Removed: None**\n';
      }
    
      const embed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle(`Roles Updated!`)
        .setDescription(message)
        .setTimestamp();
      await interaction.reply({
        embeds: [embed],
        ephemeral: true
      });
    }
    



    if (interaction.customId == "verify") {
      const role = interaction.guild.roles.cache.get(client.config.verify.role); 
      const member = interaction.guild.members.cache.get(interaction.member.id);
    
      if (member.roles.cache.has(role.id)) {
        const embed = new client.discord.MessageEmbed()
          .setColor('RED')
          .setTitle('Already Verified\`❌\`')
          .setDescription('**You are already verified!**')
          .setFooter(`Already Verified`)
          .setTimestamp();
        interaction.reply({ embeds: [embed], ephemeral: true });
        return;
      }
    
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Successfully Verified\`✅\`')
        .setDescription('**You are now successfully verified!**')
        .setFooter(` Successfully Verified`)
        .setTimestamp();
    
      try {
        await member.roles.add(role);
        interaction.reply({ embeds: [embed], ephemeral: true });
      } catch (error) {
        console.error(error);
        const errorEmbed = new client.discord.MessageEmbed()
          .setColor('RED')
          .setTitle('Verification Failed\`❌\`')
          .setDescription(`**An error occurred while verifying your account. Please try again later.\nThe Error is: \`${error}\`**`)
          .setFooter(`Verification Failed`)
          .setTimestamp();
        interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      }
    }
    
    
  },
};