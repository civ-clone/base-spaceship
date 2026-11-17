"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.landFirstArrival = void 0;
/**
 * Checks each player's ship in player order (`Spaceship#check`), and stops at the first that lands: the first player's
 * ship wins a tie, and one landing is the turn's arrival, so any other ship due lands on a later turn. For a ruleset to
 * call once every player has moved. Returns the ship that landed, or `null`.
 */
const landFirstArrival = (playerRegistry, spaceshipRegistry) => {
    let landed = null;
    playerRegistry.entries().some((player) => {
        const spaceship = spaceshipRegistry.getActiveByPlayer(player);
        if (spaceship === null) {
            return false;
        }
        spaceship.check();
        if (spaceship.successful() !== true) {
            return false;
        }
        landed = spaceship;
        return true;
    });
    return landed;
};
exports.landFirstArrival = landFirstArrival;
exports.default = exports.landFirstArrival;
//# sourceMappingURL=landFirstArrival.js.map