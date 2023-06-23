import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
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

  public canAct(player: IPlayer): boolean {
    return player.stock.megacredits > 0;
  }

  public action(player: IPlayer) {
    if (player.game.isSoloMode()) return undefined;
    const availablePlayerTargets = player.game.getPlayersInGenerationOrder().filter((p) => p.id !== player.id);
    const availableActions = new OrOptions();

    availablePlayerTargets.forEach((target) => {
      if (target.stock.megacredits > 0) {
        const amountStolen = Math.min(1, target.stock.megacredits);
        const optionTitle = 'Steal ' + amountStolen + ' MC from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.stock.deduct(Resource.MEGACREDITS, 1);
          player.stock.add(Resource.MEGACREDITS, amountStolen);
          target.stock.deduct(Resource.MEGACREDITS, amountStolen, {log: true, from: player, stealing: true});
          return undefined;
        }));
      }

      if (target.steel > 0 && !target.alloysAreProtected()) {
        const amountStolen = Math.min(1, target.stock.steel);
        const optionTitle = 'Steal ' + amountStolen + ' steel from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.stock.deduct(Resource.MEGACREDITS, 1);
          player.stock.add(Resource.STEEL, amountStolen);
          target.stock.deduct(Resource.STEEL, amountStolen, {log: true, from: player, stealing: true});
          return undefined;
        }));
      }

      if (target.titanium > 0 && !target.alloysAreProtected()) {
        const amountStolen = Math.min(1, target.stock.titanium);
        const optionTitle = 'Steal ' + amountStolen + ' titanium from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.stock.deduct(Resource.MEGACREDITS,1);
          player.stock.add(Resource.TITANIUM, amountStolen);
          target.stock.deduct(Resource.TITANIUM, amountStolen, {log: true, from: player, stealing: true});
          return undefined;
        }));
      }

      if (target.plants > 0 && !target.plantsAreProtected()) {
        const amountStolen = Math.min(1, target.stock.plants);
        const optionTitle = 'Steal ' + amountStolen + ' plants from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.stock.deduct(Resource.MEGACREDITS, 1);
          player.stock.add(Resource.PLANTS, amountStolen);
          target.stock.deduct(Resource.PLANTS, amountStolen, {log: true, from: player, stealing: true});
          return undefined;
        }));
      }

      if (target.energy > 0) {
        const amountStolen = Math.min(1, target.stock.energy);
        const optionTitle = 'Steal ' + amountStolen + ' energy from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.stock.deduct(Resource.MEGACREDITS, 1);
          player.stock.add(Resource.ENERGY, amountStolen);
          target.stock.deduct(Resource.ENERGY, amountStolen, {log: true, from: player, stealing: true});
          return undefined;
        }));
      }

      if (target.heat > 0) {
        const amountStolen = Math.min(1, target.stock.heat);
        const optionTitle = 'Steal ' + amountStolen + ' heat from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle, 'Confirm', () => {
          player.stock.deduct(Resource.MEGACREDITS, 1);
          player.stock.add(Resource.HEAT, amountStolen);
          target.stock.deduct(Resource.HEAT, amountStolen, {log: true, from: player, stealing: true});
          return undefined;
        }));
      }
    });

    if (availableActions.options.length > 0) return availableActions;
    return undefined;
  }
}

