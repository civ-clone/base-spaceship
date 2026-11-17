import City from '@civ-clone/core-city/City';
import { CityBuildRegistry } from '@civ-clone/core-city-build/CityBuildRegistry';
import { CityRegistry } from '@civ-clone/core-city/CityRegistry';
import Part from '@civ-clone/core-spaceship/Part';
import Spaceship from '@civ-clone/core-spaceship/Spaceship';
import { SpaceshipRegistry } from '@civ-clone/core-spaceship/SpaceshipRegistry';

/**
 * A ship can't change in flight, so its player's cities stop building parts for it: each city building a part has its
 * build checked again (`CityBuild#revalidate`), which cancels it once the ruleset's build rules no longer offer parts.
 * For a ruleset to call at the start of a turn, before the turn's shields go into them.
 */
export const stopPartsInFlight = (
  spaceshipRegistry: SpaceshipRegistry,
  cityRegistry: CityRegistry,
  cityBuildRegistry: CityBuildRegistry
): void =>
  spaceshipRegistry
    .entries()
    .filter(
      (spaceship: Spaceship): boolean =>
        spaceship.successful() === null && spaceship.launched() !== false
    )
    .forEach((spaceship: Spaceship): void =>
      cityRegistry
        .getByPlayer(spaceship.player())
        .map((city: City) => cityBuildRegistry.getByCity(city))
        .filter(
          (cityBuild) => cityBuild.building()?.item().prototype instanceof Part
        )
        .forEach((cityBuild) => cityBuild.revalidate())
    );

export default stopPartsInFlight;
