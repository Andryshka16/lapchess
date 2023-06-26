import { Router } from 'express'

import drawGame from './handlers/drawGame.js'
import restartGame from './handlers/restartGame.js'
import resignGame from './handlers/resignGame.js'
import updateChessBoard from './handlers/updateChessBoard.js'

const updateRouter = Router()

updateRouter.post('/drawGame/:gameId', drawGame)
updateRouter.post('/restartGame/:gameId', restartGame)
updateRouter.post('/resignGame/:gameId', resignGame)
updateRouter.post('/updateChessBoard/:gameId', updateChessBoard)

export default updateRouter