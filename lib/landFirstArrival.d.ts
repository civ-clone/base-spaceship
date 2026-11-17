import { PlayerRegistry } from '@civ-clone/core-player/PlayerRegistry';
import Spaceship from '@civ-clone/core-spaceship/Spaceship';
import { SpaceshipRegistry } from '@civ-clone/core-spaceship/SpaceshipRegistry';
/**
 * Checks each player's ship in player order (`Spaceship#check`), and stops at the first that lands: the first player's
 * ship wins a tie, and one landing is the turn's arrival, so any other ship due lands on a later turn. For a ruleset to
 * call once every player has moved. Returns the ship that landed, or `null`.
 */
export declare const landFirstArrival: (
  playerRegistry: PlayerRegistry,
  spaceshipRegistry: SpaceshipRegistry
) => Spaceship | null;
export default landFirstArrival;
