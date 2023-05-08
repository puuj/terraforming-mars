import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {Resource} from '../../../common/Resource';
import {CardRenderer} from '../render/CardRenderer';

export class PatentPortfolio extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.PATENT_PORTFOLIO,
      tags: [Tag.SCIENCE],
      cost: 4,

      metadata: {
        cardNumber: 'J004',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(1).slash().cards(1);
        }),
        description: 'Gain 1 M€ for each card in hand',
      },
    });
  }

  public override play(player: Player) {
    player.addResource(Resource.MEGACREDITS, player.cardsInHand.length, {log: true});
    return undefined;
  }
}
