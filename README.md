# base-spaceship

Spaceship mechanics for a rule set to use: losing a ship with its capital or its civilization, a ship for a
civilization that joins late, stopping parts for a ship in flight, and the first ship to arrive landing.

Each is a plain function over `core-spaceship`, so the rule set keeps its own rule ids, priorities, numbers and
registration, and decides when each applies:

- `lib/cancelSpaceship`: `cancelSpaceship(player, spaceshipRegistry)` loses the player's ship (`Spaceship#lose`), one
  in flight or one with parts. An empty ship is left alone. Call it from a `Captured` rule for the capital and a
  `Defeated` rule.
- `lib/shipsForNewcomers`: `shipsForNewcomers(playerRegistry, spaceshipRegistry, newSpaceship)` gives each player
  without a ship one made by `newSpaceship(player)`. Call it at the start of a turn once ships are handed out (say,
  once the Apollo Program has been built), so a civilization that joins later can build parts too.
- `lib/stopPartsInFlight`: `stopPartsInFlight(spaceshipRegistry, cityRegistry, cityBuildRegistry)` checks again
  (`CityBuild#revalidate`) every build of a part in the cities of a player whose ship is in flight. The rule set's
  build rules then refuse the part. Call it at the start of a turn.
- `lib/landFirstArrival`: `landFirstArrival(playerRegistry, spaceshipRegistry)` checks each player's ship in player
  order (`Spaceship#check`) and stops at the first that lands, which it returns. Call it at the end of a turn.

A library: it registers no rules. See `civ1-spaceship` for Civilization's.
