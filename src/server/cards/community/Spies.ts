import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {Player} from '../../Player';
import {OrOptions} from '../../inputs/OrOptions';
import {Resource} from '../../../common/Resource';
import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {SelectOption} from '../../inputs/SelectOption';
import {CardRenderer} from '../render/CardRenderer';
import {all} from '../Options';

export class Spies extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      tags: [Tag.PLANT],
      name: CardName.SPIES,
      cost: 9,

      metadata: {
        cardNumber: 'J005',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 1 MC to steal a standard resource', (eb) => {
            eb.megacredits(1).startAction.minus();
            eb.wild(1, {all});
          }).br;
        }),
      },
    });
  }

  public override play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    return player.megaCredits > 0;
  }

  public action(player: Player) {
    if (player.game.isSoloMode()) return undefined;
    const availablePlayerTargets = player.game.getPlayersInGenerationOrder().filter((p) => p.id !== player.id);
    const availableActions = new OrOptions();

    availablePlayerTargets.forEach((target) => {
      if (target.megaCredits > 0) {
        const amountStolen = Math.min(1, target.megaCredits);
        const optionTitle = 'Steal ' + amountStolen + ' MC from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.megaCredits--;
          player.megaCredits+=amountStolen;
          target.addResource(Resource.MEGACREDITS, -1, {log: true, from: player});
          return undefined;
        }));
      }

      if (target.steel > 0 && !target.alloysAreProtected()) {
        const amountStolen = Math.min(1, target.steel);
        const optionTitle = 'Steal ' + amountStolen + ' steel from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.megaCredits--;
          player.steel+=amountStolen;
          target.addResource(Resource.STEEL, -1, {log: true, from: player});
          return undefined;
        }));
      }

      if (target.titanium > 0 && !target.alloysAreProtected()) {
        const amountStolen = Math.min(1, target.titanium);
        const optionTitle = 'Steal ' + amountStolen + ' titanium from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.megaCredits--;
          player.titanium+=amountStolen;
          target.addResource(Resource.TITANIUM, -1, {log: true, from: player});
          return undefined;
        }));
      }

      if (target.plants > 0 && !target.plantsAreProtected()) {
        const amountStolen = Math.min(1, target.plants);
        const optionTitle = 'Steal ' + amountStolen + ' plants from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.megaCredits--;
          player.plants+=amountStolen;
          target.addResource(Resource.PLANTS, -1, {log: true, from: player});
          return undefined;
        }));
      }

      if (target.energy > 0) {
        const amountStolen = Math.min(1, target.energy);
        const optionTitle = 'Steal ' + amountStolen + ' energy from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.megaCredits--;
          player.energy+=amountStolen;
          target.addResource(Resource.ENERGY, -1, {log: true, from: player});
          return undefined;
        }));
      }

      if (target.heat > 0) {
        const amountStolen = Math.min(1, target.heat);
        const optionTitle = 'Steal ' + amountStolen + ' heat from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.megaCredits--;
          player.heat+=amountStolen;
          target.addResource(Resource.HEAT, -1, {log: true, from: player});
          return undefined;
        }));
      }
    });

    if (availableActions.options.length > 0) return availableActions;
    return undefined;
  }
}

