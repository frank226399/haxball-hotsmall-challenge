import {  } from "../../resources/lang";

export function onPositionsResetListener(): void {
    window.afkDetector.tickCounter = 0; // reset counter init
    switch(window.afkDetector.teamPicker) {
        case 1: { // turn for red kicks the ball
            window.afkDetector.redActivity = false;
            break;
        }
        case 2: { // turn for blue kicks the ball
            window.afkDetector.blueActivity = false;
            break;
        }
    }
}