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
    const availableActions = new OrOptions();

    player.opponents.forEach((target) => {
      if (target.stock.megacredits > 0) {
        const amountStolen = Math.min(1, target.stock.megacredits);
        const optionTitle = 'Steal ' + amountStolen + ' MC from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle).andThen(() => {
          player.stock.deduct(Resource.MEGACREDITS, 1);
          target.attack(player, Resource.MEGACREDITS, amountStolen, {log: true, stealing: true});
          return undefined;
        }));
      }

      if (target.steel > 0 && !target.alloysAreProtected()) {
        const amountStolen = Math.min(1, target.stock.steel);
        const optionTitle = 'Steal ' + amountStolen + ' steel from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle).andThen(() => {	
          player.stock.deduct(Resource.MEGACREDITS, 1);
          target.attack(player, Resource.STEEL, amountStolen, {log: true, stealing: true});
          return undefined;
        }));
      }

      if (target.titanium > 0 && !target.alloysAreProtected()) {
        const amountStolen = Math.min(1, target.stock.titanium);
        const optionTitle = 'Steal ' + amountStolen + ' titanium from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle).andThen( () => {
          player.stock.deduct(Resource.MEGACREDITS, 1);
          target.attack(player, Resource.TITANIUM, amountStolen, {log: true, stealing: true});	  
          return undefined;
        }));
      }

      if (target.plants > 0 && !target.plantsAreProtected()) {
        const amountStolen = Math.min(1, target.stock.plants);
        const optionTitle = 'Steal ' + amountStolen + ' plants from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle).andThen(() => {
          player.stock.deduct(Resource.MEGACREDITS, 1);
          target.attack(player, Resource.PLANTS, amountStolen, {log: true, stealing: true});	  
          return undefined;
        }));
      }

      if (target.energy > 0) {
        const amountStolen = Math.min(1, target.stock.energy);
        const optionTitle = 'Steal ' + amountStolen + ' energy from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle).andThen(() => {
          player.stock.deduct(Resource.MEGACREDITS, 1);
          target.attack(player, Resource.ENERGY, amountStolen, {log: true, stealing: true});
          return undefined;
        }));
      }

      if (target.heat > 0) {
        const amountStolen = Math.min(1, target.stock.heat);
        const optionTitle = 'Steal ' + amountStolen + ' heat from ' + target.name;

        availableActions.options.push(new SelectOption(optionTitle).andThen(() => {
          player.stock.deduct(Resource.MEGACREDITS, 1);
          target.attack(player, Resource.HEAT, amountStolen, {log: true, stealing: true});
          return undefined;
        }));
      }
    });

    if (availableActions.options.length > 0) return availableActions;
    return undefined;
  }
}

