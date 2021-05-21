import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {LogHelper} from '../../LogHelper';
import {Resources} from '../../Resources';
import {CardRenderer} from '../render/CardRenderer';

export class PatentPortfolio extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.PATENT_PORTFOLIO,
      tags: [Tags.SCIENCE],
      cost: 4,

      metadata: {
        cardNumber: 'J004',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(1).slash().cards(1);
        }),
        description: 'Gain 1 MC for each card in hand',
      },
    });
  }

  public play(player: Player) {
    player.megaCredits += player.cardsInHand.length;
    LogHelper.logGainStandardResource(player, Resources.MEGACREDITS, player.cardsInHand.length);
    return undefined;
  }
}
