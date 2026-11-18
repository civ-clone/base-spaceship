import Rule from '@civ-clone/core-rule/Rule';
import Spaceship from '@civ-clone/core-spaceship/Spaceship';
/**
 * Whether a computer player launches `spaceship` now, as the rule set's own computer players decide, for an AI client
 *  to read. Read the first answer. With no rule, or no answer, the client decides for itself. The ship still launches
 *  only if it can (`Spaceship#launch`, the rule set's `Launchable` rules).
 */
export declare class ComputerLaunch extends Rule<[Spaceship], boolean> {}
export default ComputerLaunch;
