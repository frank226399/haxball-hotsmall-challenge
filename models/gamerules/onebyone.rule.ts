import { GameRule } from "../GameRule";
import * as gbhotsmall from "../../resources/stadiums/gbhotsmall.hbs";

export var gameRule: GameRule = {
    ruleName: "onebyone",
    ruleVersion: "0.0.1",
    ruleAuthor: "dapucita",
    ruleDescripttion: "haxball-hotsmall-challange default game rule",
    requisite: {
        minimumPlayers: 2,
        eachTeamLimit: 1,
        timeLimit: 3,
        scoreLimit: 3,
        teamLock: true
    },
    defaultMap: gbhotsmall.stadiumText
}