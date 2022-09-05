import { events } from "bdsx/event"
import { command } from "bdsx/command"
import { Command, CommandPermissionLevel } from "bdsx/bds/command"
import { int32_t } from "bdsx/nativetype"
import { worldedit } from "./modules/worldedit"
import { Block } from "bdsx/bds/block"
import { BlockPos } from "bdsx/bds/blockpos"


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
                async ( param, origin, _output ) => {
                    if( origin.isServerCommandOrigin() ) return console.log( 'This command can only be executed by players'.red )
                    const player = origin.getEntity()
                    if( !player?.isPlayer() ) return

                    worldedit.getWand( player )
                }
                , {}
            )

        command.register( '.fill', 'Wordld Edit fill blocks', CommandPermissionLevel.Operator )
            .alias( '.' )
            .overload(
                async ( param, origin, _out ) => {
                    if( origin.isServerCommandOrigin() ) return console.log( 'This command can only be executed by players'.red )
                    const player = origin.getEntity()
                    if( !player?.isPlayer() ) return

                    if( param.data ) param.block.data = param.data
                    worldedit.fillBlocks( player, param.block )

                },
                {
                    block: Command.Block,
                    data: [int32_t, true]
                }
            )
        command.register( 'pos', 'Wordld Edit set POSITION', CommandPermissionLevel.Operator )
            .overload(
                async ( param, origin, _out ) => {
                    if( origin.isServerCommandOrigin() ) return console.log( 'This command can only be executed by players'.red )
                    const player = origin.getEntity()
                    if( !player?.isPlayer() ) return
                    const playerPos = player.getFeetPos().floor()
                    let posId
                    if( param.Posid == '2' ) posId = worldedit.POS_ID.pos2
                    else posId = worldedit.POS_ID.pos1

                    worldedit.setPos( player, posId, BlockPos.create( playerPos ) )
                },
                {
                    Posid: [command.enum( 'id', '1', '2' ), true]
                }
            )

    }
)
