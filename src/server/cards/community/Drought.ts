import {IProjectCard} from '../IProjectCard';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {Tag} from '../../../common/cards/Tag';
import {RemoveOceanTile} from '../../deferredActions/RemoveOceanTile';
import {CardRenderer} from '../render/CardRenderer';

export class Drought extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      tags: [Tag.CITY],
      name: CardName.DROUGHT,
      cost: 7,
      requirements: {oceans: 1},
      metadata: {
        cardNumber: 'J001',
        renderData: CardRenderer.builder((b) => b.minus().oceans(1)),
        description: 'Remove an ocean tile.',
      },
    });
  }

  public override play(player: IPlayer) {
    player.game.defer(new RemoveOceanTile(player, 'Remove an Ocean tile from the board'));
    return undefined;
  }
}
