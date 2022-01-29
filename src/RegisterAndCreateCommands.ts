require('dotenv').config()

import fs from 'fs'
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { SlashCommandBuilder } from '@discordjs/builders'

interface keysAccess {
	token: string,
	guildId: string,
	clientId: string
}

interface filesArrays {
	commands: string[],
	commandFiles: string[]
}

const keys: keysAccess = {
	token: process.env.DISCORD_TOKEN || '',
	guildId: process.env.GUILD_ID || '',
	clientId: process.env.CLIENT_ID || ''
}

const commandsArrays: filesArrays = {
	commands: [],
	commandFiles: fs.readdirSync('src/controllescommands').filter(file => file.endsWith('.ts'))
}


let file: string = ''
for (file of commandsArrays.commandFiles) {
	console.log(file)
	const { newCommandcreate } = require(`./controllescommands/${file}`);
	
	commandsArrays.commands.push(newCommandcreate.infoCommand.exportData)
}

const rest = new REST({ version: '9' }).setToken(keys.token);

rest.put(Routes.applicationGuildCommands(keys.clientId, keys.guildId), { body: commandsArrays.commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);