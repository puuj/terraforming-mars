import {IProjectCard} from '../IProjectCard';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {Card} from '../Card';
import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRequirements} from '../CardRequirements';
import {max} from '../Options';

export class Uno extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.UNO,
      tags: [Tag.MICROBE],
      cost: 8,
      victoryPoints: 4,

      requirements: CardRequirements.builder((b) => b.cardsInHand(1, {max}).temperature(2, {max}).oxygen(12, {max}).oceans(7, {max})),
      metadata: {
        cardNumber: 'J006',
        description: 'Must be colder than 2 C, under 12% oxygen, and fewer than 8 oceans. Must be the only card in your hand. Worth 4 VP.',
      },
    });
  }

  public override canPlay(player: Player): boolean {
    if (player.cardsInHand.length <= 1) {
      return super.canPlay(player);
    }
    return false;
  }

  public override play() {
    return undefined;
  }
}
