import {IProjectCard} from '../IProjectCard';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Card} from '../Card';
import {CardName} from '../../CardName';
import {Tags} from '../Tags';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';

export class DarkHorse extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.DARK_HORSE,
      tags: [Tags.SPACE],
      cost: 16,
      requirements: CardRequirements.builder((b) => b.temperature(-16).max()),
      metadata: {
        cardNumber: 'J008',
        renderData: CardRenderer.builder((b) => {
          b.plate('Claim Milestone');
        }),
        description: 'If all milestones have been claimed, gain 5 VP if you can claim a milestone not already claimed.',
        victoryPoints: 5,
      },
    });
  }

  public canPlay(player: Player): boolean {
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

  public play() {
    return undefined;
  }

  public getVictoryPoints() {
    return 5;
  }
}
