import Player from '@civ-clone/core-player/Player';
import { PlayerRegistry } from '@civ-clone/core-player/PlayerRegistry';
import Spaceship from '@civ-clone/core-spaceship/Spaceship';
import { SpaceshipRegistry } from '@civ-clone/core-spaceship/SpaceshipRegistry';

/**
 * Gives a ship, made by `newSpaceship`, to every player who has none: one who came into the game after ships were
 * handed out (a destroyed civilization coming back, rebels from a civil war). Parts need a ship to go into. The ruleset
 * decides when ships are handed out at all (for instance, once a Wonder has been built) and calls this only then.
 */
export const shipsForNewcomers = (
  playerRegistry: PlayerRegistry,
  spaceshipRegistry: SpaceshipRegistry,
  newSpaceship: (player: Player) => Spaceship
): void =>
  playerRegistry
    .entries()
    .filter(
      (player: Player): boolean =>
        spaceshipRegistry.getBy('player', player).length === 0
    )
    .forEach((player: Player): void =>
      spaceshipRegistry.register(newSpaceship(player))
    );

export default shipsForNewcomers;
