import {IProjectCard} from '../IProjectCard';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {Tag} from '../../../common/cards/Tag';
import {CardRenderer} from '../render/CardRenderer';
import {max} from '../Options';

export class DarkHorse extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.DARK_HORSE,
      tags: [Tag.SPACE],
      cost: 16,
      victoryPoints: 5,

      requirements: {temperature: -16, max},
      metadata: {
        cardNumber: 'J008',
        renderData: CardRenderer.builder((b) => {
          b.plate('Claim Milestone');
        }),
        description: 'If all milestones have been claimed, gain 5 VP if you can claim a milestone not already claimed.',
      },
    });
  }

  public override canPlay(player: Player): boolean {
    if (!super.canPlay(player)) {
      return false;
    }

    if (!player.game.allMilestonesClaimed()) {
      return false;
    }

    let canClaim = false;
    player.game.milestones.forEach((milestone) => {
      if (milestone.canClaim(player) && !player.game.milestoneClaimed(milestone)) {
        canClaim = true;
        /* } else {
        //import {ClaimedMilestone} from '../../milestones/ClaimedMilestone';
        const milestoneName = milestone.name;
        const cmilestone: ClaimedMilestone | undefined = player.game.claimedMilestones.find((cmilestone) => cmilestone.milestone.name === milestoneName);
        if (cmilestone !== undefined && cmilestone.player.id !== player.id) {
          canClaim = true;
        } */
      }
    });
    return canClaim;
  }

  public override play() {
    return undefined;
  }
}
