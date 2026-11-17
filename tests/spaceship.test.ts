import { CityBuildRegistry } from '@civ-clone/core-city-build/CityBuildRegistry';
import City from '@civ-clone/core-city/City';
import { CityRegistry } from '@civ-clone/core-city/CityRegistry';
import Effect from '@civ-clone/core-rule/Effect';
import FlightTime from '@civ-clone/core-spaceship/Rules/FlightTime';
import Layout from '@civ-clone/core-spaceship/Layout';
import Lost from '@civ-clone/core-spaceship/Rules/Lost';
import Part from '@civ-clone/core-spaceship/Part';
import Player from '@civ-clone/core-player/Player';
import PlayerRegistry from '@civ-clone/core-player/PlayerRegistry';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Slot from '@civ-clone/core-spaceship/Slot';
import Spaceship from '@civ-clone/core-spaceship/Spaceship';
import SpaceshipRegistry from '@civ-clone/core-spaceship/SpaceshipRegistry';
import Turn from '@civ-clone/core-turn-based-game/Turn';
import Year from '@civ-clone/core-game-year/Year';
import YearRule from '@civ-clone/core-game-year/Rules/Year';
import cancelSpaceship from '../lib/cancelSpaceship';
import { expect } from 'chai';
import landFirstArrival from '../lib/landFirstArrival';
import shipsForNewcomers from '../lib/shipsForNewcomers';
import stopPartsInFlight from '../lib/stopPartsInFlight';

class Structural extends Part {}
class Barracks {}

const setUp = () => {
  const rules = new RuleRegistry(),
    turn = new Turn(),
    year = new Year(turn, rules),
    players = new PlayerRegistry(),
    spaceships = new SpaceshipRegistry(),
    lost: Spaceship[] = [],
    newSpaceship = (player: Player): Spaceship =>
      new Spaceship(
        player,
        new Layout(
          1,
          2,
          [0, 1].map((x) => new Slot(x, 0, 1, 1, [Structural])),
          rules
        ),
        rules,
        turn,
        year
      ),
    addPlayer = (): Player => {
      const player = new Player(rules);

      players.register(player);

      return player;
    };

  rules.register(
    new YearRule(new Effect((turn: number): number => turn)),
    new FlightTime(new Effect((): number => 2)),
    new Lost(new Effect((spaceship: Spaceship) => lost.push(spaceship)))
  );

  return { addPlayer, lost, newSpaceship, players, rules, spaceships, turn };
};

const addPart = (spaceship: Spaceship, rules: RuleRegistry): void => {
  const slot = spaceship
    .layout()
    .slots()
    .find((slot: Slot) => slot.empty())!;

  slot.fill(new Structural({} as City, rules));
};

describe('cancelSpaceship', (): void => {
  it('loses a ship with parts or in flight, and leaves an empty one alone', (): void => {
    const { addPlayer, lost, newSpaceship, rules, spaceships } = setUp(),
      empty = newSpaceship(addPlayer()),
      building = newSpaceship(addPlayer()),
      flying = newSpaceship(addPlayer());

    spaceships.register(empty, building, flying);
    addPart(building, rules);
    flying.launch();

    [empty, building, flying].forEach((spaceship: Spaceship): void =>
      cancelSpaceship(spaceship.player(), spaceships)
    );

    expect(lost).to.deep.equal([building, flying]);
    expect(empty.successful()).to.equal(null);
  });
});

describe('shipsForNewcomers', (): void => {
  it('gives a ship only to a player who has none', (): void => {
    const { addPlayer, newSpaceship, spaceships, players } = setUp(),
      first = addPlayer(),
      ship = newSpaceship(first);

    spaceships.register(ship);
    ship.lose();

    const newcomer = addPlayer();

    shipsForNewcomers(players, spaceships, newSpaceship);

    // Even a lost ship is one: a ruleset replaces it from its `Lost` rules.
    expect(spaceships.getBy('player', first)).to.deep.equal([ship]);
    expect(spaceships.getBy('player', newcomer).length).to.equal(1);

    shipsForNewcomers(players, spaceships, newSpaceship);

    expect(spaceships.entries().length).to.equal(2);
  });
});

describe('landFirstArrival', (): void => {
  it('lands the first ship due in player order, one a turn', (): void => {
    const { addPlayer, newSpaceship, players, spaceships, turn } = setUp(),
      ships = [addPlayer(), addPlayer(), addPlayer()].map(newSpaceship);

    spaceships.register(...ships);

    turn.set(1);
    ships[1].launch();
    ships[2].launch();

    turn.set(2);

    expect(landFirstArrival(players, spaceships)).to.equal(null);

    turn.set(3);

    expect(landFirstArrival(players, spaceships)).to.equal(ships[1]);
    expect(ships[2].successful()).to.equal(null);

    expect(landFirstArrival(players, spaceships)).to.equal(ships[2]);
    expect(ships[0].successful()).to.equal(null);
  });
});

describe('stopPartsInFlight', (): void => {
  it("checks again the builds of parts in a launched ship's cities only", (): void => {
    const { addPlayer, newSpaceship, spaceships } = setUp(),
      flying = newSpaceship(addPlayer()),
      building = newSpaceship(addPlayer()),
      checked: string[] = [],
      cityOf = (name: string, player: Player) => ({ name, player }),
      cities = [
        cityOf('part in flight', flying.player()),
        cityOf('barracks in flight', flying.player()),
        cityOf('nothing in flight', flying.player()),
        cityOf('part building', building.player()),
      ],
      builds = new Map(
        cities.map(({ name }) => [
          name,
          {
            building: () =>
              name.startsWith('nothing')
                ? null
                : {
                    item: () =>
                      name.startsWith('part') ? Structural : Barracks,
                  },
            revalidate: () => checked.push(name),
          },
        ])
      );

    spaceships.register(flying, building);
    flying.launch();

    stopPartsInFlight(
      spaceships,
      {
        getByPlayer: (player: Player) =>
          cities.filter((city) => city.player === player),
      } as unknown as CityRegistry,
      {
        getByCity: (city: { name: string }) => builds.get(city.name),
      } as unknown as CityBuildRegistry
    );

    expect(checked).to.deep.equal(['part in flight']);
  });
});
