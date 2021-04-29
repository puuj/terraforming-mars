import {Player} from './Player';

export class Notifier {
  private notification = undefined;
  public url: string = '';
  public sender: string = '';

  private constructor(sender: string | undefined, url: string | undefined) {
    this.url = url ? url : '';
    this.sender = sender ? sender : '';
  }

  public static newInstance(sender: string | undefined, url: string | undefined ): Notifier {
    return new Notifier(sender, url);
  }

  public registerNotification(timeout: any) : void {
    this.notification = timeout;
  }

  public clearNotification() : void {
    if (this.notification !== undefined) {
      clearTimeout(this.notification);
    }
  }

  public static notify(player: Player) : void {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      sendmail: true,
    });

    if (player.email !== undefined) {
      const delay=Math.floor(player.timer.getActingTime()/60);
      const url = player.notifier.url+'/player?id='+player.id;
      // console.log(`Would notify ${player.name} for ${delay}`);
      transporter.sendMail({
        from: player.notifier.sender,
        to: player.email,
        subject: 'Terraforming Mars turn notification',
        text: `It's been your turn for ${delay} minutes. Take your turn at: ${url}`,
      });
      player.notifier.clearNotification();
      const interval = 120*60*1000;
      player.notifier.registerNotification(setTimeout(Notifier.notify, interval, player));
    }
  }
}


