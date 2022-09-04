import { Plugin } from "./utils/plugin"
import { events } from "bdsx/event"
import './modules/wand_events'
import './command'

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