// This episode will go over Invite Leaderboards, sorted.
const Discord = require('discord.js'), // This will be used for creating embed
  arraySort = require('array-sort'), // This will be used for sorting arrays
  table = require('table'); // This will be used for preparing the output to a table

// We can call our command handler here
exports.run = async (client, message, args) => {
// Be sure to call this in async, as we will be fetching the invites of the guild

// First, we need to fetch the invites
let invites = await message.guild.fetchInvites().catch(error => { // This will store all of the invites into the variable
    // If an error is catched, it will run this...
    return message.channel.send('Sorry, I don\'t have the proper permissions to view invites!');
}) // This will store all of the invites into the variable

// Next, we can turn invites into an array
invites = invites.array();

// Now, using arraySort, we can sort the array by 'uses'
arraySort(invites, 'uses', { reverse: true }); // Be sure to enable 'reverse'

// Next, we need to go through each invite on the server, to format it for a table
let possibleInvites = [['User', 'Uses']]; // Each array object is a rown in the array, we can start up by setting the header as 'User' & 'Uses'
invites.forEach(function(invite) {
    possibleInvites.push([invite.inviter.username, invite.uses]); // This will then push 2 items into another row
})

// Create the output embed
const embed = new Discord.MessageEmbed()
    .setColor(0xCB5A5E)
    .addField('Leaderboard', `\`\`\`${table.table(possibleInvites)}\`\`\``); // This will be the field holding the leaderboard
    // Be sure to put the table in a codeblock for proper formatting

// Now, we can send the embed to chat - Instead of a regular message, we can use quick.hook
message.channel.send(embed);

}

module.exports.help = {
    name: "leaderboard",
    category: "MODERATION"
}
