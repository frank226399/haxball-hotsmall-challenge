import {
    Logger
} from "../Logger";
const logger: Logger = Logger.getInstance();

export function onRoomLinkListener(url: string): void {
    // Event called when the room link is created.
    logger.c(`This room has a link now: ${url}`);
}