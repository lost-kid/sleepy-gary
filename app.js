const Discord = require('discord.js');
const { TOKEN, owner_id, dnsStr, prefix } = require('./assets/config.json');
const yt = require('ytdl-core');

const Sentry = require('@sentry/node');
Sentry.init({ dsn: dnsStr });

const client = new Discord.Client();
client.commands = new Discord.Collection();

const funUrls = [ "https://www.youtube.com/watch?v=BhmRvUjJFh4", "https://www.youtube.com/watch?v=HNOEt2eWYLI", "https://www.youtube.com/watch?v=qyScKkRLeNs&t=22s", "https://www.youtube.com/watch?v=SuDnjx6bPa8", "https://www.youtube.com/watch?v=-50NdPawLVY", "https://www.youtube.com/watch?v=QOvZQH5Vl7k" ];
//const funUrls = [ "https://www.youtube.com/watch?v=pfmaTeh-7pk", "https://www.youtube.com/watch?v=is38pqgbj6A", "https://www.youtube.com/watch?v=0Vf1TpucUss" ];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.member.id != owner_id) return;
  //PROD
  const channel = client.channels.get("660296444904865803");
  //DEV
  // const channel = client.channels.get("519651055185952775");
  const server = msg.guild.id;
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  if (msg.content === '-stop') {
    channel.leave();
  }
  if (msg.content === "-funtime") {
    if (!channel) return console.error("The channel does not exist!");
    channel.join().then(connection => {
      console.log("Successfully connected.");
      letsHaveFun(msg, connection)
    }).catch(e => {
      console.error(e);
    });
  }
});

function letsHaveFun(msg, connection) {
  const server = msg.guild.id;
  try {
    server.dispatcher = connection.playStream(
      yt(funUrls[Math.floor(Math.random() * funUrls.length)], { filter: 'audioonly' }).on('end', () => {
        if (funUrls[0]) {
          letsHaveFun(msg, connection);
        }
      }),
    );
  }
  catch(err) {
    Sentry.captureException(err);
  }

};

client.login(TOKEN);