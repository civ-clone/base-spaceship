"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputerSpaceshipPart = void 0;
const Rule_1 = require("@civ-clone/core-rule/Rule");
/**
 * The part a computer player adds to `spaceship` next, as the rule set's own computer players choose, for an AI client
 *  to read: one of `available` (the kinds a city of the player can build now), given the kinds its other cities are
 *  `building` already, or `null` for none of them. Read the first answer. With no rule, or no answer, the client
 *  chooses for itself.
 */
class ComputerSpaceshipPart extends Rule_1.default {
}
exports.ComputerSpaceshipPart = ComputerSpaceshipPart;
exports.default = ComputerSpaceshipPart;
//# sourceMappingURL=ComputerSpaceshipPart.js.map