import {IProjectCard} from '../IProjectCard';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {Card} from '../Card';
import {Tag} from '../../../common/cards/Tag';
import {Resources} from '../../../common/Resources';
import {CardName} from '../../../common/cards/CardName';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';

export class Windfall extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.WINDFALL,
      tags: [Tag.JOVIAN],
      cost: 0,
      requirements: CardRequirements.builder((b) => b.tr(30).tag(Tag.BUILDING).tag(Tag.SPACE).tag(Tag.SCIENCE).tag(Tag.ENERGY).tag(Tag.EARTH).tag(Tag.JOVIAN).tag(Tag.PLANT).tag(Tag.MICROBE).tag(Tag.ANIMAL).tag(Tag.CITY).production(Resources.MEGACREDITS).production(Resources.STEEL).production(Resources.TITANIUM).production(Resources.PLANTS).production(Resources.ENERGY).production(Resources.HEAT)),
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

  public play(player: Player) {
    player.drawCard(4);
    player.megaCredits += player.getProduction(Resources.MEGACREDITS);
    // player.megaCredits += player.getTerraformRating();
    player.heat += player.getProduction(Resources.HEAT);
    player.energy = player.getProduction(Resources.ENERGY);
    player.titanium += player.getProduction(Resources.TITANIUM);
    player.steel += player.getProduction(Resources.STEEL);
    player.plants += player.getProduction(Resources.PLANTS);
    return undefined;
  }
}
