export interface GameRule {
    ruleName: string; // game rule name
    ruleVersion?: string; // version of this rule ("X.X.X")
    ruleAuthor?: string; // author of this rule
    ruleDescripttion?: string; // simple description of this rule
    requisite: {
        minimumPlayers: number; // minimum number of players needs for apply this rule
        // maximumPlayers?: number; // maximum number of players limits for apply this rule // deprecated
        eachTeamLimit: number; // how many players can be in each team?
        timeLimit: number; // limit time for end the game
        scoreLimit: number; // limit score for end the game
        teamLock: boolean; // limit moving teams by self
    }
    defaultMap: string; // default stadium data for the game.
    readyMap: string; // for ready stadium data for the game.
}