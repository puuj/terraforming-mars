import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {CardName} from '../../CardName';
import {MAX_TEMPERATURE, REDS_RULING_POLICY_COST} from '../../constants';
import {PartyHooks} from '../../turmoil/parties/PartyHooks';
import {PartyName} from '../../turmoil/parties/PartyName';
import {RemoveAnyPlants} from '../../deferredActions/RemoveAnyPlants';
import {CardRenderer} from '../../cards/render/CardRenderer';
import {all} from '../Options';

export class BigAsteroid extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.BIG_ASTEROID,
      tags: [Tags.SPACE],
      cost: 27,

      metadata: {
        description: 'Raise temperature 2 steps and gain 4 titanium. Remove up to 4 Plants from any player.',
        cardNumber: '011',
        renderData: CardRenderer.builder((b) => {
          b.temperature(2).br;
          b.titanium(4).br;
          b.minus().plants(-4, {all});
        }),
      },
    });
  }

  public canPlay(player: Player): boolean {
    const remainingTemperatureSteps = (MAX_TEMPERATURE - player.game.getTemperature()) / 2;
    const stepsRaised = Math.min(remainingTemperatureSteps, 2);

    if (PartyHooks.shouldApplyPolicy(player, PartyName.REDS)) {
      return player.canAfford(player.getCardCost(this) + REDS_RULING_POLICY_COST * stepsRaised, {titanium: true});
    }

    return true;
  }

  public play(player: Player) {
    player.game.increaseTemperature(player, 2);
    player.game.defer(new RemoveAnyPlants(player, 4));
    player.titanium += 4;
    return undefined;
  }
}
