import {IProjectCard} from '../IProjectCard';
import {CardType} from '../../../common/cards/CardType';
import {Card} from '../Card';
import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {max} from '../Options';

export class Uno extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.UNO,
      tags: [Tag.MICROBE],
      cost: 8,
      victoryPoints: 4,

      requirements: [ {cardsInHand: 1, max}, {temperature: 2, max}, {oxygen: 12, max}, {oceans: 7, max} ],
      metadata: {
        cardNumber: 'J006',
        description: 'Must be colder than 2 C, under 12% oxygen, and fewer than 8 oceans. Must be the only card in your hand. Worth 4 VP.',
      },
    });
  }

  public override play() {
    return undefined;
  }
}
