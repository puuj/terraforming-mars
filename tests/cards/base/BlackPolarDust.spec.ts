import {expect} from 'chai';
import {BlackPolarDust} from '../../../src/cards/base/BlackPolarDust';
import {Game} from '../../../src/Game';
import {maxOutOceans} from '../../TestingUtils';
import {TestPlayer} from '../../TestPlayer';
import {Resources} from '../../../src/common/Resources';
import {SelectSpace} from '../../../src/inputs/SelectSpace';

describe('BlackPolarDust', function() {
  let card: BlackPolarDust;
  let player: TestPlayer;
  let game: Game;

  beforeEach(function() {
    card = new BlackPolarDust();
    player = TestPlayer.BLUE.newPlayer();
    const redPlayer = TestPlayer.RED.newPlayer();
    game = Game.newInstance('gameid', [player, redPlayer], player);
  });

  it('Can not play', function() {
    player.addProduction(Resources.MEGACREDITS, -4);
    expect(card.canPlay(player)).is.not.true;
  });

  it('Should play', function() {
    card.play(player);
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(-2);
    expect(player.getProduction(Resources.HEAT)).to.eq(3);

    expect(game.deferredActions).has.lengthOf(1);
    const selectSpace = game.deferredActions.peek()!.execute() as SelectSpace;
    selectSpace.cb(selectSpace.availableSpaces[0]);
    expect(player.getTerraformRating()).to.eq(21);
  });

  it('Cannot place ocean if no oceans left', function() {
    maxOutOceans(player);
    card.play(player);
  });
});
