import {IProjectCard} from '../IProjectCard';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';

export class IceAge extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.ICE_AGE,
      cost: 10,
      requirements: CardRequirements.builder((b) => b.temperature(-26)),
      metadata: {
        cardNumber: 'J003',
        renderData: CardRenderer.builder((b) => b.minus().temperature(2)),
        description: 'Reduce temperature 2 steps.',
      },
    });
  }

  public play(player: Player) {
    player.game.increaseTemperature(player, -2);
    return undefined;
  }
}
