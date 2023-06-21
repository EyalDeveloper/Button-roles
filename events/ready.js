const chalk = require('chalk');
const request = require('request');
const mongoose = require('mongoose');

module.exports = {
  name: 'ready',
  execute(client) {

    if(!client.config.database) return;
    mongoose.connect(client.config.database, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log(chalk.cyan('[LOG]') + chalk.white(' The client is connected to the database!'))
      console.log(chalk.cyan('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))

    }).catch((err) => {
      console.log(chalk.cyan('[LOG]') + chalk.white(` ${err}`))
      console.log(chalk.cyan('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))

    })
    console.log(chalk.cyan('Name: ') + chalk.white(`${client.user.username}`))
    console.log(chalk.cyan('Bot Status: ') + chalk.white('Initialized'))
  },
};