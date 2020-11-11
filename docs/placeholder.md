# Placeholders for interpolation
You can use placeholders for express dynamic values on the text resources.
Usage sample : `'Welcome, {playerName}!'`

## in the Command chat
### !about
`_LaunchTime` : the time the bot launched.

### !stats
`targetID` : numeric ID of the player.

`targetName` : name of the player.

`targetStatsTotal` : count of the player played.

`targetStatsWins` : count of the player won.

`targetStatsStreaks` : count of the player won straight

`targetStatsGoals` : count of goals the player made.

`targetStatsOgs` : count of OGs the player made.

`targetStatsLosepoints` : count of points the player lose.

`targetStatsBestrecord` : count of best winning record the player made

`targetStatsWinRate` : winning games rate of the player

`targetStatsGoalsPerGame` : goals per game of the player

`targetStatsOgsPerGame` : OGs per game of the player

`targetStatsLostGoalsPerGame` : lost goals per game of the player

### !streek

`streakCount` : how many Red team player wins straight now

### !rank


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

`targetStatsBestrecord` : count of best winning record the player made

### onGameStart
`redTargetID` : numberic ID of red team player

`redTargetName` : name of red team player

`blueTargetID` : numberic ID of blue team player

`blueTargetName` : name of blue team player

### onTeamGoal
`targetID` : numeric ID of player who scroed

`targetName` : name of player who scored

`targetTeamName` : team name who got a score (Red / Blue)


### onTeamVictory

`targetID` : numeric ID of winner.

`targetName` : name of winner.

`targetTeamName` : name of winner's team. (Red / Blue)

`redScore` : score of Red team

`blueScore` : score of Blue team

`streakWinCount`: how many this winner wins streak 