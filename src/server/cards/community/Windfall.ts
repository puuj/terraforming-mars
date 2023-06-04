import {IProjectCard} from '../IProjectCard';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {Card} from '../Card';
import {Tag} from '../../../common/cards/Tag';
import {Resource} from '../../../common/Resource';
import {CardName} from '../../../common/cards/CardName';
import {CardRequirements} from '../requirements/CardRequirements';
import {CardRenderer} from '../render/CardRenderer';

export class Windfall extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.WINDFALL,
      tags: [Tag.JOVIAN],
      cost: 0,
      requirements: CardRequirements.builder((b) => b.tr(30).tag(Tag.BUILDING).tag(Tag.SPACE).tag(Tag.SCIENCE).tag(Tag.POWER).tag(Tag.EARTH).tag(Tag.JOVIAN).tag(Tag.PLANT).tag(Tag.MICROBE).tag(Tag.ANIMAL).tag(Tag.CITY).production(Resource.MEGACREDITS).production(Resource.STEEL).production(Resource.TITANIUM).production(Resource.PLANTS).production(Resource.ENERGY).production(Resource.HEAT)),
      metadata: {
        cardNumber: 'J010',
        renderData: CardRenderer.builder((b) => {
          b.cards(4).br.megacredits(1).asterix().steel(1).asterix().titanium(1).asterix().br;
          b.plants(1).asterix().energy(1).asterix().heat(1).asterix();
        }),
        description: 'Must have TR over 30, at least 1 tag of Building, Space, Science, Power, Earth, Jovian, Plant, Microbe, Animal, and City, and at least 1 production of MC, steel, titanium, plants, energy, and heat. Draw 4 cards and gain all production, excluding TR.',
      },
    });
  }

  public override play(player: Player) {
    player.drawCard(4);
    player.megaCredits += player.production.megacredits;
    // player.megaCredits += player.getTerraformRating();
    player.heat += player.production.heat;
    player.energy = player.production.energy;
    player.titanium += player.production.titanium;
    player.steel += player.production.steel;
    player.plants += player.production.plants;
    return undefined;
  }
}
