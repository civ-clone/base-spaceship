import Player from '@civ-clone/core-player/Player';
import { SpaceshipRegistry } from '@civ-clone/core-spaceship/SpaceshipRegistry';
/**
 * The player's spaceship goes back to Earth if it has launched, or its construction is cancelled if it hasn't. A ship
 * with no parts yet has nothing to lose. For a ruleset to call when a civilization loses its capital or is destroyed.
 */
export declare const cancelSpaceship: (
  player: Player,
  spaceshipRegistry: SpaceshipRegistry
) => void;
export default cancelSpaceship;
