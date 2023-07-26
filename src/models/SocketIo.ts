

export enum socketEvents {
    connectToServer = "connect",
    connectError = "connect_error",
    disconnect = "disconnect",
    login = "loginEvent",
    responseLogin = "responseLogin",
    gameEnd = "gameWin",
    reroll = "oneMoreTime",
    turnLoss = "loseThisOne",
    takePoints = "myChoice",
    refreshListStatus = "refreshListStatus"
}

interface ClientToServer {}

interface ServerToClient<I> {
    reason:errorCode,
    payload:I
}

export interface socketPayload {}

type errorCode = number;

type errorCodeType<E> = E

enum loginErrorCode {
    noError = 0,
    usernameNotAvailable = 1,
    playersAlreadyFilled = 2,
    someError = 3,
    gameStartedAlready = 4
}

export interface loginInfo extends socketPayload {
    name:string // playername
    roomId: string
}

export interface loginResponse extends socketPayload {
    state:boolean,
    reason:errorCodeType<loginErrorCode>
}

interface endGame extends ServerToClient<endGame> {}

interface endGameState extends socketPayload {
    reason:errorCodeType<endGameErrorCode>
    objOfWinner? : User
}

enum endGameErrorCode {
    lastPlayerInPlay = 0,
    noErrorExpectPayload = 1
}

interface Room {
    [key:string]:User|boolean|number
}

interface User {
    idRoom              : string,
    ready2play          : false,
    currentScore        : number,
    scoreTotal          : number,
    myTurn              : false,
    isAlive             : true,
    name                : string,
    position            : number,
    canPlay             : false,
    nbDice              : number,
    remainingDices     : number[],
    scoringDices        : number[],
}

interface myTurnOrNot {
    state:boolean
}
