import {Player} from '../../Player';
import {InequalityRequirement} from './InequalityRequirement';
import {RequirementType} from '../../../common/cards/RequirementType';

export class CardsPlayedRequirement extends InequalityRequirement {
  public readonly type = RequirementType.CARDS_PLAYED;
  public override getScore(player: Player): number {
    return player.playedCards.length;
  }
}
