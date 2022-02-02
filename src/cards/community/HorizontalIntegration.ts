import {IProjectCard} from '../IProjectCard';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Card} from '../Card';
import {Tags} from '../../common/cards/Tags';
import {Resources} from '../../common/Resources';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';

export class HorizontalIntegration extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.HORIZONTAL_INTEGRATION,
      tags: [Tags.EARTH],
      cost: 7,

      metadata: {
        cardNumber: 'J009',
        victoryPoints: 1,
        renderData: CardRenderer.builder((b) => {
          b.minus().megacredits(1).nbsp.minus().steel(1).nbsp.minus().titanium(1).br;
          b.minus().plants(1).nbsp.minus().energy(1).nbsp.minus().heat(1).br;
          b.production((pb) => pb.megacredits(4));
        }),
        description: 'Spend 1 MC, steel, titanium, plant, energy, and heat. Increase MC production 4.',
      },
    });
  }

  public override canPlay(player: Player): boolean {
    if (player.megaCredits > 0 && player.steel > 0 && player.titanium > 0 &&
      player.plants > 0 && player.energy > 0 && player.heat > 0) {
      return true;
    }
    return false;
  }

  public play(player: Player) {
    player.megaCredits--;
    player.steel--;
    player.titanium--;
    player.plants--;
    player.energy--;
    player.heat--;
    player.addProduction(Resources.MEGACREDITS, 4);

    return undefined;
  }
}
