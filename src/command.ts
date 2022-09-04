import { events } from "bdsx/event"
import { command } from "bdsx/command"
import { CommandPermissionLevel } from "bdsx/bds/command"
import { plugin } from "."
import { int32_t } from "bdsx/nativetype"
import { Player, ServerPlayer } from "bdsx/bds/player"
import { bedrockServer } from "bdsx/launcher"
import { BlockPos, Vec3 } from "bdsx/bds/blockpos"
import { Block } from "bdsx/bds/block"
import { LevelSoundEventPacketV1, PackType, PlayerActionPacket, UpdateBlockPacket } from "bdsx/bds/packets"
import { worldedit } from "./modules/worldedit"
import { ItemUseEvent, ItemUseOnBlockEvent, PlayerAttackEvent, PlayerUseItemEvent } from "bdsx/event_impl/entityevent"
import { CANCEL } from "bdsx/common"
import { Actor } from "bdsx/bds/actor"
import { MinecraftPacketIds } from "bdsx/bds/packetids"
import { BlockAttackEvent } from "bdsx/event_impl/blockevent"

events.serverOpen.on(
    () => {

        command.register( 'up', 'world edit Up', CommandPermissionLevel.Operator )
            .overload(
                async ( param, origin, _output ) => {
                    if( origin.isServerCommandOrigin() ) return console.log( 'This command can only be executed by players'.red )
                    const player = origin.getEntity()
                    if( !player?.isPlayer() ) return

                    worldedit.up( player, param.value )
                },
                {
                    value: [int32_t, true]
                }
            )

        command.register( 'worldedit', 'get world edit wand', CommandPermissionLevel.Operator )
            .alias( 'we' )
            .overload(
                async ( _params, origin, _output ) => {
                    if( origin.isServerCommandOrigin() ) return console.log( 'This command can only be executed by players'.red )
                    const player = origin.getEntity()
                    if( !player?.isPlayer() ) return

                    worldedit.getWand( player )
                }
                , {}
            )

    }
)
