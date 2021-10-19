import {IProjectCard} from '../IProjectCard';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Card} from '../Card';
import {Tags} from '../Tags';
import {CardName} from '../../CardName';
import {CardRequirements} from '../CardRequirements';
import {max} from '../Options';

export class Uno extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.UNO,
      tags: [Tags.MICROBE],
      cost: 8,

      requirements: CardRequirements.builder((b) => b.cardsInHand(1, {max}).temperature(2, {max}).oxygen(12, {max}).oceans(7, {max})),
      metadata: {
        cardNumber: 'J006',
        description: 'Must be colder than 2 C, under 12% oxygen, and fewer than 8 oceans. Must be the only card in your hand. Worth 4 VP.',
        victoryPoints: 4,
      },
    });
  }

  public canPlay(player: Player): boolean {
    if (player.cardsInHand.length <= 1) {
      return super.canPlay(player);
    }
    return false;
  }

  public getVictoryPoints(): number {
    return 4;
  }

  public play() {
    return undefined;
  }
}
