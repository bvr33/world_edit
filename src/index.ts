import { Plugin } from "./utils/plugin"
import { events } from "bdsx/event"
import './modules/events'
import './command'
import { command } from "bdsx/command"

export enum langs {
    PL = "PL_pl"
}

export interface Language {
}
export interface Configuration {
    language: langs,
}

export const plugin = new Plugin(
    'World Edit',
    {
        language: langs.PL,
    },
    {}
)

events.serverOpen.on( () => {
    plugin.log( `launching` )
} )

events.serverClose.on( () => {
    plugin.log( `closed` )
} )



/**
 * test
 */
events.serverOpen.on(
    () => {
        command.register( '\.xxx', '' )
            .overload(
                ( _param, origin, _out ) => {
                    if( origin.isServerCommandOrigin() ) return console.log( 'This command can only be executed by players'.red )
                    const player = origin.getEntity()
                    if( !player?.isPlayer() ) return
                    player.sendMessage( 'xxxxxxxxxxxxxxxxxxx' )
                },
                {}
            )
    }
)