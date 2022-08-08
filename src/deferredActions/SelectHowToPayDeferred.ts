import {Player} from '../Player';
import {SelectHowToPay} from '../inputs/SelectHowToPay';
import {HowToPay} from '../common/inputs/HowToPay';
import {DeferredAction, Priority} from './DeferredAction';
import {Resources} from '../common/Resources';
import {CardName} from '../common/cards/CardName';

export class SelectHowToPayDeferred extends DeferredAction {
  constructor(
    player: Player,
    public amount: number,
    public options: SelectHowToPayDeferred.Options = {},
  ) {
    super(player, Priority.DEFAULT);
  }

  private mustPayWithMegacredits() {
    if (this.player.canUseHeatAsMegaCredits && this.player.heat > 0) {
      return false;
    }
    if (this.options.canUseSteel && this.player.steel > 0) {
      return false;
    }
    if (this.options.canUseTitanium && this.player.titanium > 0) {
      return false;
    }
    if (this.options.canUseSeeds && (this.player.getCorporation(CardName.SOYLENT_SEEDLING_SYSTEMS)?.resourceCount ?? 0) > 0) {
      return false;
    }
    if (this.options.canUseSeeds && (this.player.getCorporation(CardName.ADHAI_HIGH_ORBIT_CONSTRUCTIONS)?.resourceCount ?? 0) > 0) {
      return false;
    }
    return true;
  }

  public execute() {
    if (this.mustPayWithMegacredits()) {
      this.player.deductResource(Resources.MEGACREDITS, this.amount);
      this.options.afterPay?.();
      return undefined;
    }

    return new SelectHowToPay(
      this.options.title || 'Select how to pay for ' + this.amount + ' MCs',
      this.options.canUseSteel || false,
      this.options.canUseTitanium || false,
      this.player.canUseHeatAsMegaCredits,
      this.options.canUseSeeds || false,
      this.options.canUseData || false,
      this.amount,
      (howToPay: HowToPay) => {
        if (!this.player.canSpend(howToPay)) {
          throw new Error('You do not have that many resources to spend');
        }
        this.player.pay(howToPay);
        this.options.afterPay?.();
        return undefined;
      },
    );
  }
}

export namespace SelectHowToPayDeferred {
  export interface Options {
    canUseSteel?: boolean;
    canUseTitanium?: boolean;
    canUseSeeds?: boolean,
    canUseData?: boolean,
    title?: string;
    afterPay?: () => void;
  }
}
