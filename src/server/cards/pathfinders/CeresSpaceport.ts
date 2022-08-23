import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {SpaceName} from '../../SpaceName';
import {SpaceType} from '../../../common/boards/SpaceType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Resources} from '../../../common/Resources';
import {PlaceOceanTile} from '../../deferredActions/PlaceOceanTile';
import {played} from '../Options';

export class CeresSpaceport extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.CERES_SPACEPORT,
      tags: [Tag.JOVIAN, Tag.JOVIAN, Tag.CITY, Tag.SPACE],
      cost: 36,
      victoryPoints: 1,
      tr: {oceans: 1},

      metadata: {
        cardNumber: 'Pf14',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(2))
            .production((pb) => pb.titanium(1).slash().jovian({amount: 2, played}))
            .br
            .cards(1).oceans(1).city().asterix().br;
        }),
        description: 'Increase your M€ production 2 steps, and titanium production 1 step for every 2 Jovian tags (including these.) ' +
          'Draw a card. Place an ocean tile. Place a city tile ON THE RESERVED AREA.',
      },
    });
  }

  public play(player: Player) {
    const game = player.game;
    player.addProduction(Resources.MEGACREDITS, 2);
    // The +1 below is for the two Jovian tags on this card.
    player.addProduction(Resources.TITANIUM, (1 + Math.floor(player.tags.count(Tag.JOVIAN) / 2)), {log: true});
    player.drawCard();
    player.game.addCityTile(player, SpaceName.CERES_SPACEPORT, SpaceType.COLONY);
    game.defer(new PlaceOceanTile(player));
    return undefined;
  }
}
