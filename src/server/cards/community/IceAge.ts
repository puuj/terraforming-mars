import {IProjectCard} from '../IProjectCard';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardRequirements} from '../requirements/CardRequirements';
import {CardRenderer} from '../render/CardRenderer';

export class IceAge extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
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

  public override play(player: Player) {
    player.game.increaseTemperature(player, -2);
    return undefined;
  }
}
