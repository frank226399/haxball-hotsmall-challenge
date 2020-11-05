# Placeholders for interpolation
You can use placeholders for express dynamic values on the text resources.
Usage sample : `'Welcome, {playerName}!'`

## in the game events
### onPlayerJoin, onPlayerLeave
`targetID` : numeric ID of this player.

`targetName` : name of this player.

`targetNameOld` : previous name of this player. It can be same as current name. Just loaded from localStorage. **Only available on onPlayerJoin event.**

`targetStatsTotal` : count of the player played.

`targetStatsWins` : count of the player won.

`targetStatsStreaks` : count of the player won straight

`targetStatsGoals` : count of goals the player made.

`targetStatsOgs` : count of OGs the player made.

`targetStatsLosepoints` : count of points the player lose.