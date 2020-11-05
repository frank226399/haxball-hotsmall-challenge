// haxball-hotsmall-chllange by dapucita
// This is the main part of the bot

// import modules
import {
    Logger
} from "./controllers/Logger";
import {
    RoomConfig
} from "./models/RoomConfig";
import {
    gameRule
} from "./models/gamerules/onebyone.rule";

const logger: Logger = Logger.getInstance();

const botRoomConfig: RoomConfig = JSON.parse(getCookieFromHeadless('botConfig'));

logger.c("====");
logger.c("haxball-hotsmall-challange");
logger.c(`The authentication token is conveyed via cookie(${botRoomConfig.token})`);
logger.c("====");

var room: any = window.HBInit(botRoomConfig);
initialiseRoom();

function initialiseRoom(): void {
    // Write initialising processes here.
    const nowDate: Date = new Date();
    logger.c(`The game room is opened at ${nowDate.toString()}.`);

    room.setCustomStadium(gameRule.defaultMap);
    room.setScoreLimit(gameRule.requisite.scoreLimit);
    room.setTimeLimit(gameRule.requisite.timeLimit);
    room.setTeamsLock(gameRule.requisite.teamLock);

    room.onRoomLink = function(url: string): void {
        // Event called when the room link is created.
        logger.c(`This room has a link now: ${url}`);
    }
}

function getCookieFromHeadless(name: string): string {
    var result = new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)').exec(document.cookie);
    return result ? result[1] : '';
}