import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types'

const command = new SlashCommandBuilder()

interface IcommandsScope {
    infoCommand: {
        name: SlashCommandBuilder,
        description: SlashCommandBuilder,
        permission: SlashCommandBuilder,
        exportData: RESTPostAPIApplicationCommandsJSONBody
    },
    executeCommand: Function
}

const newCommandcreate: IcommandsScope = {
    infoCommand: {
        name: command.setName('createmanga'),
        description: command.setDescription('Criando um mangá'),
        permission: command.setDefaultPermission(true),
        exportData: command.toJSON()
    },
    executeCommand: async (message: CommandInteraction) => {
        await message.reply('sucesso')
    }
}

export { newCommandcreate }