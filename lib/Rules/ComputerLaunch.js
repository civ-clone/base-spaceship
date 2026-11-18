"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputerLaunch = void 0;
const Rule_1 = require("@civ-clone/core-rule/Rule");
/**
 * Whether a computer player launches `spaceship` now, as the rule set's own computer players decide, for an AI client
 *  to read. Read the first answer. With no rule, or no answer, the client decides for itself. The ship still launches
 *  only if it can (`Spaceship#launch`, the rule set's `Launchable` rules).
 */
class ComputerLaunch extends Rule_1.default {
}
exports.ComputerLaunch = ComputerLaunch;
exports.default = ComputerLaunch;
//# sourceMappingURL=ComputerLaunch.js.map