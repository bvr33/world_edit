import { BlockPos } from "bdsx/bds/blockpos"
import { events } from "bdsx/event"
import { BlockAttackEvent } from "bdsx/event_impl/blockevent"
import { ItemUseOnBlockEvent } from "bdsx/event_impl/entityevent"
import { worldedit } from "./worldedit"

events.attackBlock.on(
    async ( ev: BlockAttackEvent ) => {
        if( !ev.player?.isPlayer() || !worldedit.IsWand( ev.player.getMainhandSlot() ) ) return
        worldedit.setPos( ev.player, worldedit.WE_POS_ID.pos1, ev.blockPos )
    }
)

events.itemUseOnBlock.on(
    ( ev: ItemUseOnBlockEvent ) => {
        if( !ev.actor.isPlayer() || !worldedit.IsWand( ev.actor.getMainhandSlot() ) ) return
        if( !worldedit.canSetPos( ev.actor.getXuid() ) ) return
        worldedit.setPos( ev.actor, worldedit.WE_POS_ID.pos2, BlockPos.create( ev.x, ev.y, ev.z ) )
    }
)
