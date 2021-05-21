import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {OrOptions} from '../../inputs/OrOptions';
import {Resources} from '../../Resources';
import {Tags} from '../Tags';
import {CardName} from '../../CardName';
import {SelectOption} from '../../inputs/SelectOption';
import {CardRenderer} from '../render/CardRenderer';

export class Spies extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      tags: [Tags.PLANT],
      name: CardName.SPIES,
      cost: 9,

      metadata: {
        cardNumber: 'J005',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 1 MC to steal a standard resource', (eb) => {
            eb.megacredits(1).startAction.minus();
            eb.wild(1).any;
          }).br;
        }),
      },
    });
  }

  public play() {
    return undefined;
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    if (player.game.isSoloMode()) return undefined;

    const availablePlayerTargets = player.game.getPlayers().filter((p) => p.id !== player.id);
    const availableActions = new OrOptions();

    availablePlayerTargets.forEach((target) => {
      if (target.megaCredits > 0) {
        const amountStolen = Math.min(1, target.megaCredits);
        const optionTitle = 'Steal ' + amountStolen + ' MC from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.megaCredits--;
          player.megaCredits+=amountStolen;
          target.addResource(Resources.MEGACREDITS, -1, {log: true, from: player});
          return undefined;
        }));
      }

      if (target.steel > 0 && !target.alloysAreProtected()) {
        const amountStolen = Math.min(1, target.steel);
        const optionTitle = 'Steal ' + amountStolen + ' steel from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.megaCredits--;
          player.steel+=amountStolen;
          target.addResource(Resources.STEEL, -1, {log: true, from: player});
          return undefined;
        }));
      }

      if (target.titanium > 0 && !target.alloysAreProtected()) {
        const amountStolen = Math.min(1, target.titanium);
        const optionTitle = 'Steal ' + amountStolen + ' titanium from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.megaCredits--;
          player.titanium+=amountStolen;
          target.addResource(Resources.TITANIUM, -1, {log: true, from: player});
          return undefined;
        }));
      }

      if (target.plants > 0 && !target.plantsAreProtected()) {
        const amountStolen = Math.min(1, target.plants);
        const optionTitle = 'Steal ' + amountStolen + ' plants from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.megaCredits--;
          player.plants+=amountStolen;
          target.addResource(Resources.PLANTS, -1, {log: true, from: player});
          return undefined;
        }));
      }

      if (target.energy > 0) {
        const amountStolen = Math.min(1, target.energy);
        const optionTitle = 'Steal ' + amountStolen + ' energy from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.megaCredits--;
          player.energy+=amountStolen;
          target.addResource(Resources.ENERGY, -1, {log: true, from: player});
          return undefined;
        }));
      }

      if (target.heat > 0) {
        const amountStolen = Math.min(1, target.heat);
        const optionTitle = 'Steal ' + amountStolen + ' heat from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.megaCredits--;
          player.heat+=amountStolen;
          target.addResource(Resources.HEAT, -1, {log: true, from: player});
          return undefined;
        }));
      }
    });

    if (availableActions.options.length > 0) return availableActions;
    return undefined;
  }
}

