"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shipsForNewcomers = void 0;
/**
 * Gives a ship, made by `newSpaceship`, to every player who has none: one who came into the game after ships were
 * handed out (a destroyed civilization coming back, rebels from a civil war). Parts need a ship to go into. The ruleset
 * decides when ships are handed out at all (for instance, once a Wonder has been built) and calls this only then.
 */
const shipsForNewcomers = (playerRegistry, spaceshipRegistry, newSpaceship) => playerRegistry
    .entries()
    .filter((player) => spaceshipRegistry.getBy('player', player).length === 0)
    .forEach((player) => spaceshipRegistry.register(newSpaceship(player)));
exports.shipsForNewcomers = shipsForNewcomers;
exports.default = exports.shipsForNewcomers;
//# sourceMappingURL=shipsForNewcomers.js.map