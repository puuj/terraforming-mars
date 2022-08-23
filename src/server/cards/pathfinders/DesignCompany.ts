import {Player} from '../../Player';
import {PreludeCard} from '../prelude/PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {Units} from '../../../common/Units';

export class DesignCompany extends PreludeCard {
  constructor() {
    super({
      name: CardName.DESIGN_COMPANY,
      tags: [Tag.MARS],
      productionBox: Units.of({steel: 1}),

      metadata: {
        cardNumber: 'P08',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.steel(1)).br;
          b.cards(3, {secondaryTag: Tag.BUILDING});
        }),
        description: 'Increase your steel production 1 step. Draw 3 cards with a building tag.',
      },
    });
  }
  public play(player: Player) {
    player.adjustProduction(this.productionBox, {log: true});
    player.drawCard(3, {tag: Tag.BUILDING});
    return undefined;
  }
}

