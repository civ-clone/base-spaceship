import Part from '@civ-clone/core-spaceship/Part';
import Rule from '@civ-clone/core-rule/Rule';
import Spaceship from '@civ-clone/core-spaceship/Spaceship';
/**
 * The part a computer player adds to `spaceship` next, as the rule set's own computer players choose, for an AI client
 *  to read: one of `available` (the kinds a city of the player can build now), given the kinds its other cities are
 *  `building` already, or `null` for none of them. Read the first answer. With no rule, or no answer, the client
 *  chooses for itself.
 */
export declare class ComputerSpaceshipPart extends Rule<
  [Spaceship, (typeof Part)[], (typeof Part)[]],
  typeof Part | null
> {}
export default ComputerSpaceshipPart;
