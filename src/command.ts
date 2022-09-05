import { events } from "bdsx/event"
import { command } from "bdsx/command"
import { Command, CommandPermissionLevel, CommandPosition } from "bdsx/bds/command"
import { int32_t } from "bdsx/nativetype"
import { worldedit } from "./modules/worldedit"
import { Block } from "bdsx/bds/block"
import { BlockPos, RelativeFloat, Vec3 } from "bdsx/bds/blockpos"
import { helpers } from "./utils/helpers"


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
                    const block = Block.create( param.block.getName(), param.variant || 0 )
                    if( !block ) return
                    worldedit.fillBlocks( player, block )

                },
                {
                    block: Command.Block,
                    variant: [int32_t, true]
                }
            )

        command.register( 'pos1', 'World Edit set POS1', CommandPermissionLevel.Operator )
            .alias( 'p1' )
            .overload(
                async ( param, origin, _out ) => {
                    if( origin.isServerCommandOrigin() ) return console.log( 'This command can only be executed by players'.red )
                    const player = origin.getEntity()
                    if( !player?.isPlayer() ) return
                    const playerPos = player.getFeetPos().floor()
                    const pos = param.position
                        ? helpers.relativeToCoords( playerPos, param.position )
                        : playerPos
                    worldedit.setPos( player, worldedit.POS_ID.pos1, BlockPos.create( pos ) )
                },
                {
                    position: [CommandPosition, true]
                }
            )

        command.register( 'pos2', 'World Edit set POS2', CommandPermissionLevel.Operator )
            .alias( 'p2' )
            .overload(
                async ( param, origin, _out ) => {
                    if( origin.isServerCommandOrigin() ) return console.log( 'This command can only be executed by players'.red )
                    const player = origin.getEntity()
                    if( !player?.isPlayer() ) return
                    const playerPos = player.getFeetPos().floor()
                    const pos = param.position
                        ? helpers.relativeToCoords( playerPos, param.position )
                        : playerPos
                    worldedit.setPos( player, worldedit.POS_ID.pos2, BlockPos.create( pos ) )
                },
                {
                    position: [CommandPosition, true]
                }
            )





    }
)