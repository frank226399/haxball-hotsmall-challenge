export function calcWinsRate(totalGames: number, winGames: number): number {
    // calculate the given Player's winning games rate
    if(totalGames == 0 || totalGames === undefined) {
        return 0;
    }
    return Math.round((winGames / totalGames) * 100);
}

export function calcGoalsPerGame(totalGames: number, totalGoals: number): number {
    // calculate the given Player's goal rate per game
    if(totalGames == 0 || totalGames === undefined) {
        return 0;
    }
    return parseFloat((totalGoals / totalGames).toFixed(1));
}

export function calcOGsPerGame(totalGames: number, totalOGs: number): number {
    // calculate the given Player's goal rate per game
    if(totalGames == 0 || totalGames === undefined) {
        return 0;
    }
    return parseFloat((totalOGs / totalGames).toFixed(1));
}

export function calcLoseGoalsPerGame(totalGames: number, totalLosePoints: number): number {
    // calculate the given Player's lost goals rate per game
    if(totalGames == 0 || totalGames === undefined) {
        return 0;
    }
    return parseFloat((totalLosePoints / totalGames).toFixed(1));
}