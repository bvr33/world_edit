import { events } from "bdsx/event"
import { command } from "bdsx/command"
import { CommandPermissionLevel } from "bdsx/bds/command"
import { int32_t } from "bdsx/nativetype"
import { worldedit } from "./modules/worldedit"


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
