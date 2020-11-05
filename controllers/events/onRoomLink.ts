import { Logger } from "../Logger";

const logger: Logger = Logger.getInstance();

export function onRoomLinkListener(url: string): void {
    logger.c(`This room has a link now: ${url}`);
}