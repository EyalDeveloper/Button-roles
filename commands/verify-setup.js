const { SlashCommandBuilder } = require('@discordjs/builders');
const chalk = require('chalk');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify-setup')
    .setDescription('Choose a message to setup'),

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
            const oniChan = client.channels.cache.get(interaction.channel.id);

            const embed = new client.discord.MessageEmbed()
            .setAuthor(`${interaction.guild.name}`, interaction.guild.iconURL({ dynamic: true }))
            .setDescription("\`\`\`✅לחצו על הכפתור למטה על מנת לראות את כל חדרי השרת\`\`\`")
            .setColor('GREEN')
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || null)
            .setFooter(`${interaction.guild.name}`, interaction.guild.iconURL({ dynamic: true }))
            .setTimestamp();

        
              const row = new client.discord.MessageActionRow()
                .addComponents(
                  new client.discord.MessageButton()
                  .setCustomId('verify')
                  .setLabel('Verify Me.')
                  .setEmoji('')
                  .setStyle('SUCCESS'),
                );
            
                console.log(chalk.green('[Eyal]') + chalk.cyan(' Sent the verify creation widget..'))
                interaction.reply({ content: `the message has been sent in<#${interaction.channel.id}>`, ephemeral: true })
              oniChan.send({
                embeds: [embed],
                components: [row]
                })
              
        }
  }
