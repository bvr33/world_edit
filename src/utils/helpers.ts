import { Vec3 } from "bdsx/bds/blockpos"
import { CommandPosition } from "bdsx/bds/command"
import { ServerPlayer } from "bdsx/bds/player"

export namespace helpers {

    export function relativeToCoords( playerPos: Vec3, relPos: CommandPosition ): Vec3 {
        playerPos.x += relPos.isXRelative ? relPos.x : 0
        playerPos.y += relPos.isXRelative ? relPos.y : 0
        playerPos.z += relPos.isXRelative ? relPos.z : 0
        return playerPos
    }



}