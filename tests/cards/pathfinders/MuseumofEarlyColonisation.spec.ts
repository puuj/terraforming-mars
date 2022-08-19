import {expect} from 'chai';
import {MuseumofEarlyColonisation} from '../../../src/server/cards/pathfinders/MuseumofEarlyColonisation';
import {Game} from '../../../src/server/Game';
import {TestPlayer} from '../../TestPlayer';
import {addCity, addGreenery, addOcean} from '../../TestingUtils';
import {TileType} from '../../../src/common/TileType';
import {Units} from '../../../src/common/Units';

describe('MuseumofEarlyColonisation', function() {
  let card: MuseumofEarlyColonisation;
  let player: TestPlayer;
  let player2: TestPlayer;

  beforeEach(function() {
    card = new MuseumofEarlyColonisation();
    player = TestPlayer.BLUE.newPlayer();
    player2 = TestPlayer.RED.newPlayer();
    Game.newInstance('gameid', [player, player2], player);
  });

  it('canPlay', function() {
    const ocean = addOcean(player2);
    const greenery = addGreenery(player2);
    const city = addCity(player2);
    player.setProductionForTest({energy: 1});
    expect(player.canPlayIgnoringCost(card)).is.true;

    player.setProductionForTest({energy: 0});
    expect(player.canPlayIgnoringCost(card)).is.false;

    player.setProductionForTest({energy: 1});
    expect(player.canPlayIgnoringCost(card)).is.true;
    ocean.tile!.tileType = TileType.BIOFERTILIZER_FACILITY;
    expect(player.canPlayIgnoringCost(card)).is.false;

    ocean.tile!.tileType = TileType.OCEAN;
    expect(player.canPlayIgnoringCost(card)).is.true;
    greenery.tile!.tileType = TileType.BIOFERTILIZER_FACILITY;
    expect(player.canPlayIgnoringCost(card)).is.false;

    greenery.tile!.tileType = TileType.GREENERY;
    expect(player.canPlayIgnoringCost(card)).is.true;
    city.tile!.tileType = TileType.BIOFERTILIZER_FACILITY;
    expect(player.canPlayIgnoringCost(card)).is.false;
  });

  it('play', function() {
    player.setProductionForTest({energy: 1});
    expect(player.getTerraformRating()).eq(20);

    card.play(player);

    expect(player.getProductionForTest()).deep.eq(Units.of({steel: 1, titanium: 1, plants: 1}));
    expect(player.getTerraformRating()).eq(21);
  });
});
