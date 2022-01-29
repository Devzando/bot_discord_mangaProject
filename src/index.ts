require('dotenv').config()
import { Client, Intents, Interaction, Message } from 'discord.js'
import { newCommandcreate } from './controllescommands/MangasCommands'

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async (interaction: Interaction) => {
	if (!interaction.isCommand()) return;

	const command = interaction.commandName

	if (!command) return;

	try {
		await newCommandcreate.executeCommand(interaction)
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);