import {IProjectCard} from '../IProjectCard';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {Card} from '../Card';
import {Resources} from '../../../common/Resources';
import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {all} from '../Options';

export class ForcedPartnership extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.FORCED_PARTNERSHIP,
      tags: [Tag.BUILDING],
      cost: 10,
      tr: {tr: 2},

      metadata: {
        cardNumber: 'J007',
        renderData: CardRenderer.builder((b) => {
          b.tr(2).br;
          b.minus().megacredits(10, {all}).nbsp.tr(1, {all});
        }),
        description: 'Raise your TR 2 steps. All other players with at least 10 MC spend 10 MC to raise their TR 1 step.',
      },
    });
  }

  public play(player: Player) {
    player.increaseTerraformRatingSteps(2);

    const availablePlayerTargets = player.game.getPlayersInGenerationOrder().filter((p) => p.id !== player.id);
    availablePlayerTargets.forEach((target) => {
      if (target.megaCredits >= 10) {
        target.addResource(Resources.MEGACREDITS, -10, {log: true, from: player});
        target.increaseTerraformRatingSteps(1);
      }
    });
    return undefined;
  }
}
