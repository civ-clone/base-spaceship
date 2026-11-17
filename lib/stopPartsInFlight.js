"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopPartsInFlight = void 0;
const Part_1 = require("@civ-clone/core-spaceship/Part");
/**
 * A ship can't change in flight, so its player's cities stop building parts for it: each city building a part has its
 * build checked again (`CityBuild#revalidate`), which cancels it once the ruleset's build rules no longer offer parts.
 * For a ruleset to call at the start of a turn, before the turn's shields go into them.
 */
const stopPartsInFlight = (spaceshipRegistry, cityRegistry, cityBuildRegistry) => spaceshipRegistry
    .entries()
    .filter((spaceship) => spaceship.successful() === null && spaceship.launched() !== false)
    .forEach((spaceship) => cityRegistry
    .getByPlayer(spaceship.player())
    .map((city) => cityBuildRegistry.getByCity(city))
    .filter((cityBuild) => { var _a; return ((_a = cityBuild.building()) === null || _a === void 0 ? void 0 : _a.item().prototype) instanceof Part_1.default; })
    .forEach((cityBuild) => cityBuild.revalidate()));
exports.stopPartsInFlight = stopPartsInFlight;
exports.default = exports.stopPartsInFlight;
//# sourceMappingURL=stopPartsInFlight.js.map