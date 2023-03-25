import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {CardResource} from '../../../common/CardResource';
import {VictoryPoints} from '../ICard';

export class HappyBirthday extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.HAPPY_BIRTHDAY,
      tags: [Tag.WILD],
      cost: 0,

      resourceType: CardResource.CANDLE,
      victoryPoints: VictoryPoints.resource(1, 1),
      
      behavior: {
        addResources: 37,
      },

      metadata: {
        cardNumber: 'J33',
        description: 'Add 1 candle resource to this card per year of your life.',
        renderData: CardRenderer.builder((b) => {
          b.candle().slash().text("year");
          b.br;
          b.vpText('1 VP per candle resource on this card.');
        }),
      },
    });
  }
}
