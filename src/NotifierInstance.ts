import {Player} from './Player';
const nodemailer = require('nodemailer');

export class NotifierInstance {
  protected url: string;
  protected sender: string;

  constructor(url: string, sender: string) {
    this.url = url;
    this.sender = sender;
  }

  sendMessage(player: Player, transporter: any, url: string, sender: string) : void {
    const delay=Math.floor(player.timer.getActingTime()/60);
    const link = url+'/player?id='+player.id;
    // console.log(`Would notify ${player.name} for ${delay}`);
    transporter.sendMail({
      from: sender,
      to: player.email,
      subject: 'Terraforming Mars turn notification',
      text: `It's been your turn for ${delay} minutes. Take your turn at: ${link}`,
    });
  }

  makeNotification(player: Player, interval: number) : NodeJS.Timeout {
    const transporter = nodemailer.createTransport({
      sendmail: true,
    });

    return setTimeout(function(ni, player, transporter, url, sender) {
      if (player.email !== undefined) {
        ni.sendMessage(player, transporter, url, sender);
        if (interval < 2*60*1000) {
          interval = 15*60*1000;
        } else {
          interval = interval*3;
        }
        player.notification = ni.makeNotification(player, interval);
      }
    },
    interval, this, player, transporter, this.url, this.sender);
  }
}
