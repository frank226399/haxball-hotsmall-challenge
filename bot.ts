// haxball-hotsmall-chllenge by dapucita
// This is the main part of the bot

// import modules
import { Logger } from "./controllers/Logger";
import { RoomConfig } from "./models/RoomConfig";
import { gameRule } from "./models/gamerules/onebyone.rule";
import * as eventListener from "./controllers/events/eventListeners";
import { PlayerObject } from "./models/PlayerObject";
import { ScoresObject } from "./models/ScoreObject";
import { KickStack } from "./models/BallKickTrace";

window.logQueue = []; // init for log queue

const logger: Logger = Logger.getInstance();
const ballKickStack: KickStack = KickStack.getInstance();
window.isStatRecord = false; // TRUE means that recording stats now.
window.isGameNow = false; // TRUE means that player are playing the game
window.winStreakCount = 0; // default value is 0

const botRoomConfig: RoomConfig = JSON.parse(getCookieFromHeadless('botConfig'));

/* logger.c("====");
logger.c("haxball-hotsmall-challange");
logger.c(`The authentication token is conveyed via cookie(${botRoomConfig.token})`);
logger.c("===="); */

window.playerList = new Map(); // playerList:Player[] is an Map object. // playerList.get(player.id).name; : usage for playerList

window.room = window.HBInit(botRoomConfig);
initialiseRoom();

function initialiseRoom(): void {
    // Write initialising processes here.
    const nowDate: Date = new Date();
    localStorage.setItem('_LaunchTime', nowDate.toString()); // save time the bot launched in localStorage
    logger.i(`This game room is opened at ${nowDate.toString()}.`);

    window.room.setCustomStadium(gameRule.readyMap);
    window.room.setScoreLimit(gameRule.requisite.scoreLimit);
    window.room.setTimeLimit(gameRule.requisite.timeLimit);
    window.room.setTeamsLock(gameRule.requisite.teamLock);

    window.room.onPlayerJoin = (player: PlayerObject): void => eventListener.onPlayerJoinListener(player);
    window.room.onPlayerLeave = (player: PlayerObject): void => eventListener.onPlayerLeaveListener(player);
    window.room.onTeamVictory = (scores: ScoresObject): void => eventListener.onTeamVictoryListener(scores);
    window.room.onPlayerChat = (player: PlayerObject, message: String): boolean => eventListener.onPlayerChatListener(player, message);
    window.room.onPlayerBallKick = (player: PlayerObject): void => eventListener.onPlayerBallKickListener(player, ballKickStack);
    window.room.onTeamGoal = (team: number): void => eventListener.onTeamGoalListener(team, ballKickStack);
    window.room.onGameStart = (byPlayer: PlayerObject): void => eventListener.onGameStartListener(byPlayer);
    window.room.onGameStop = (byPlayer: PlayerObject): void => eventListener.onGameStopListener(byPlayer, ballKickStack);
    window.room.onPlayerAdminChange = (changedPlayer: PlayerObject, byPlayer: PlayerObject): void => {}
    window.room.onPlayerTeamChange = (changedPlayer: PlayerObject, byPlayer: PlayerObject): void => eventListener.onPlayerTeamChangeListener(changedPlayer, byPlayer);
    window.room.onPlayerKicked = (kickedPlayer: PlayerObject, reason: string, ban: boolean, byPlayer: PlayerObject): void => {}
    window.room.onGameTick = (): void => {}
    window.room.onGamePause = (byPlayer: PlayerObject): void => {}
    window.room.onGameUnpause = (byPlayer: PlayerObject): void => {}
    window.room.onPositionReset = (): void => {}
    window.room.onPlayerActivity = (player: PlayerObject): void => {}
    window.room.onStadiumChange = (newStadiumName: string, byPlayer: PlayerObject): void => eventListener.onStadiumChangeListner(newStadiumName, byPlayer);
    window.room.onRoomLink = (url: string): void => eventListener.onRoomLinkListener(url);
    window.room.onKickRateLimitSet = (min: number, rate: number, burst: number, byPlayer: PlayerObject): void => {}
}

function getCookieFromHeadless(name: string): string {
    var result = new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)').exec(document.cookie);
    return result ? result[1] : '';
}