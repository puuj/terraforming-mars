import {IProjectCard} from '../IProjectCard';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardRequirements} from '../CardRequirements';
import {Tags} from '../../../common/cards/Tags';
import {RemoveOceanTile} from '../../deferredActions/RemoveOceanTile';
import {CardRenderer} from '../render/CardRenderer';

export class Drought extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      tags: [Tags.CITY],
      name: CardName.DROUGHT,
      cost: 7,
      requirements: CardRequirements.builder((b) => b.oceans(1)),
      metadata: {
        cardNumber: 'J001',
        renderData: CardRenderer.builder((b) => b.minus().oceans(1)),
        description: 'Remove an ocean tile.',
      },
    });
  }

  public play(player: Player) {
    player.game.defer(new RemoveOceanTile(player, 'Remove an Ocean tile from the board'));
    return undefined;
  }
}
