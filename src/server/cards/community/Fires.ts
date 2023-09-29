import {IProjectCard} from '../IProjectCard';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {Card} from '../Card';
import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Fires extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.FIRES,
      tags: [Tag.POWER],
      cost: 10,
      requirements: {oxygen: 1},
      metadata: {
        cardNumber: 'J002',
        renderData: CardRenderer.builder((b) => {
          b.minus().oxygen(1).br;
          b.nbsp.temperature(1);
        }),
        description: 'Reduce oxygen 1 step. Increase temperature 1 step.',
      },
    });
  }

  public override play(player: IPlayer) {
    player.game.increaseOxygenLevel(player, -1);
    player.game.increaseTemperature(player, 1);
    return undefined;
  }
}
