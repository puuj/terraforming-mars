import {IPlayer} from './IPlayer';
const nodemailer = require('nodemailer');

export class NotifierInstance {
  protected url: string;
  protected sender: string;

  constructor(url: string, sender: string) {
    this.url = url;
    this.sender = sender;
  }

  sendEndMessage(player: IPlayer, scores: string) : void {
    if (player.email === undefined) {
      return;
    }
    const transporter = nodemailer.createTransport({
      sendmail: true,
    });
    const link = this.url+'/player?id='+player.id;
    // console.log(`Would notify ${player.name} for ${delay}`);
    transporter.sendMail({
      from: this.sender,
      to: player.email,
      subject: `Terraforming Mars game results for ${player.id}`,
      text: `Your Terraforming Mars game has ended. Final scores:
${scores}
See the full results at: ${link}`,
    });
  }

  sendTurnMessage(player: IPlayer, transporter: any, url: string, sender: string) : void {
    const delay=Math.floor(player.timer.getActingTime()/60);
    const link = url+'/player?id='+player.id;
    // console.log(`Would notify ${player.name} for ${delay}`);
    transporter.sendMail({
      from: sender,
      to: player.email,
      subject: `Terraforming Mars turn notification for ${player.id}`,
      text: `It's been your turn for ${delay} minutes. Take your turn at: ${link}`,
    });
  }

  makeTurnNotification(player: IPlayer, interval: number) : NodeJS.Timeout {
    const transporter = nodemailer.createTransport({
      sendmail: true,
    });

    return setTimeout(function(ni, player, transporter, url, sender) {
      if (player.email !== undefined) {
        ni.sendTurnMessage(player, transporter, url, sender);
        if (interval < 2*60*1000) {
          interval = 15*60*1000;
        } else {
          interval = interval*3;
        }
        player.notification = ni.makeTurnNotification(player, interval);
      }
    },
    interval, this, player, transporter, this.url, this.sender);
  }
}
