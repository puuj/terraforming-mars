import {Player} from '../../Player';
import {InequalityRequirement} from './InequalityRequirement';
import {RequirementType} from '../../../common/cards/RequirementType';

export class CardsInHandRequirement extends InequalityRequirement {
  public readonly type = RequirementType.CARDS_IN_HAND;
  public override getScore(player: Player): number {
    return player.cardsInHand.length;
  }
}
