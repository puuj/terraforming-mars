import {IProjectCard} from '../IProjectCard';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Card} from '../Card';
import {Tags} from '../Tags';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Fires extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.FIRES,
      tags: [Tags.ENERGY],
      cost: 10,

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

  public canPlay(player: Player): boolean {
    return super.canPlay(player) && player.game.getOxygenLevel() > 1;
  }

  public play(player: Player) {
    player.game.increaseOxygenLevel(player, -1);
    player.game.increaseTemperature(player, 1);
    return undefined;
  }
}
