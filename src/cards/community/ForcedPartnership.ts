import {IProjectCard} from '../IProjectCard';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Card} from '../Card';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';
import {REDS_RULING_POLICY_COST} from '../../constants';
import {Resources} from '../../Resources';
import {Tags} from '../Tags';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';

export class ForcedPartnership extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.FORCED_PARTNERSHIP,
      tags: [Tags.BUILDING],
      cost: 10,

      metadata: {
        cardNumber: 'J007',
        renderData: CardRenderer.builder((b) => {
          b.tr(2).br;
          b.minus().megacredits(10).any.nbsp.tr(1).any;
        }),
        description: 'Raise your TR 2 steps. All other players with at least 10 MC spend 10 MC to raise their TR 1 step.',
      },
    });
  }

  public canPlay(player: Player): boolean {
    if (PartyHooks.shouldApplyPolicy(player, PartyName.REDS)) {
      return player.canAfford(player.getCardCost(this) + REDS_RULING_POLICY_COST * 2, {steel: true});
    }
    return true;
  }

  public play(player: Player) {
    player.increaseTerraformRatingSteps(2);

    const redsCost = ( PartyHooks.shouldApplyPolicy(player, PartyName.REDS) ? REDS_RULING_POLICY_COST : 0 );
    const availablePlayerTargets = player.game.getPlayers().filter((p) => p.id !== player.id);

    availablePlayerTargets.forEach((target) => {
      if (target.megaCredits >= 10+redsCost) {
        target.addResource(Resources.MEGACREDITS, -10, {log: true, from: player});
        target.increaseTerraformRatingSteps(1);
      }
    });
    return undefined;
  }
}
