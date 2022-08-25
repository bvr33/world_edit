import { Plugin } from "./utils/plugin";
import { events } from "bdsx/event";
import { TextFormat } from "bdsx/util";
import './command';

export enum langs {
    PL = "PL_pl"
}

export interface Language {
    name: string

}
export interface Configuration {
    language: langs,
}

export const plugin = new Plugin(
    {
        language: langs.PL,
    },
    {
        name: 'World Edit',
    },
);

events.serverOpen.on( () => {
    plugin.log( `launching` );
} );

events.serverClose.on( () => {
    plugin.log( `closed` );
} );