import {IProjectCard} from '../IProjectCard';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class IceAge extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.ICE_AGE,
      cost: 10,
      requirements: {temperature: -26},
      metadata: {
        cardNumber: 'J003',
        renderData: CardRenderer.builder((b) => b.minus().temperature(2)),
        description: 'Reduce temperature 2 steps.',
      },
    });
  }

  public override play(player: IPlayer) {
    player.game.increaseTemperature(player, -2);
    return undefined;
  }
}
