import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {CardResource} from '../../../common/CardResource';
import {CardRenderer} from '../render/CardRenderer';
import {ActionCard} from '../ActionCard';
import {VictoryPoints} from '../ICard';

export class RustEatingBacteria extends ActionCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.RUST_EATING_BACTERIA,
      type: CardType.ACTIVE,
      tags: [Tag.MICROBE],
      cost: 7,

      resourceType: CardResource.MICROBE,
      victoryPoints: VictoryPoints.resource(1, 3),

      action: {
        spend: {steel: 1},
        addResources: 2,
      },

      metadata: {
        cardNumber: 'M88',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 1 steel to add 2 microbes here.', (eb) => {
            eb.startAction.steel(1).arrow().microbes(2);
          }).br;
          b.vpText('1 VP per 3 microbes here.');
        }),
      },
    });
  }
}
