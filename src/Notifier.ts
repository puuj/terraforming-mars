import {NotifierInstance} from './NotifierInstance'

export class Notifier {
  private static instance: NotifierInstance;
  
  private constructor() {}

  public static getInstance() {
    const url = process.env.URL ? process.env.URL : '';
    const sender = process.env.NOTIFICATION_SENDER ? process.env.NOTIFICATION_SENDER : '';
    if(!Notifier.instance) Notifier.instance = new NotifierInstance(url, sender);
    return Notifier.instance;
  }

}


