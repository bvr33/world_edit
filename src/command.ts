import { events } from "bdsx/event";
import { command } from "bdsx/command";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { plugin } from ".";
import { int32_t } from "bdsx/nativetype";
import { Player, ServerPlayer } from "bdsx/bds/player";
import { bedrockServer } from "bdsx/launcher";
import { BlockPos } from "bdsx/bds/blockpos";
import { Block } from "bdsx/bds/block";
import { UpdateBlockPacket } from "bdsx/bds/packets";

events.serverOpen.on(
    () => {

        const cmd = command.register( '/up', 'world edit Up', CommandPermissionLevel.Operator )

        cmd.overload(
            ( param, origin, _output ) => {
                if( origin.isServerCommandOrigin() ) return console.log( 'This command can only be executed by players'.red );
                const player = origin.getEntity()
                if( !player?.isPlayer() ) return

                const playerPos = player.getPosition()
                const pos = player.getPosition()
                if( param.value ) playerPos.y += param.value
                else playerPos.y += 1
                pos.y = playerPos.y - 1
                const region = player.getRegion()
                const blockPos = BlockPos.create( pos )
                const block = Block.create( 'minecraft:glass' )!


                player.teleport( pos )
                region.setBlock( blockPos, block )

            },
            {
                value: [int32_t, true]
            }
        )
    }
)