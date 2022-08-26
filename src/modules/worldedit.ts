import { Block } from "bdsx/bds/block"
import { BlockPos, Vec3 } from "bdsx/bds/blockpos"
import { CommandItem } from "bdsx/bds/command"
import { ItemStack } from "bdsx/bds/inventory"
import { ByteTag, CompoundTag, NBT } from "bdsx/bds/nbt"
import { Player, ServerPlayer } from "bdsx/bds/player"
import { bedrockServer } from "bdsx/launcher"
import { TextFormat } from "bdsx/util"
import { type } from "os"
import { plugin } from ".."

export namespace worldedit {
    const playerCanSetPost2 = new Map<string, null>()

    export function canSetPos( player: ServerPlayer ): boolean {
        const xuid = player.getXuid()
        if( playerCanSetPost2.has( xuid ) ) return false
        playerCanSetPost2.set( xuid, null )
        setTimeout(
            () => {
                playerCanSetPost2.delete( xuid )
            }
            ,
            500
        )
        return true
    }

    type POS = Vec3 | BlockPos
    const POS_MAP = new Map<string, { pos1: POS | undefined, pos2: POS | undefined }>()

    export enum WE_POS_ID {
        pos1,
        pos2
    }

    export function setPos( player: Player, posId: WE_POS_ID, pos: POS ): void {
        if( !player.isPlayer() ) return
        const xuid = player.getXuid()
        if( !POS_MAP.has( xuid ) ) POS_MAP.set( xuid, { pos1: undefined, pos2: undefined } )
        let message
        const postions = POS_MAP.get( xuid )!
        switch( posId ) {
            case WE_POS_ID.pos1:
                postions.pos1 = pos
                message = `${TextFormat.GREEN}POS1`
                break
            case WE_POS_ID.pos2:
                postions.pos2 = pos
                message = `${TextFormat.GREEN}POS2`
                break
        }
        player.sendMessage( message + ` ${TextFormat.RED}=> ${TextFormat.GREEN}X:${TextFormat.RESET}${pos.x} ${TextFormat.GREEN}Y:${TextFormat.RESET}${pos.y} ${TextFormat.GREEN}Z:${TextFormat.RESET}${pos.z}` )
        console.log( JSON.stringify( POS_MAP.get( xuid ) ) )
    }



    export function IsWand( item: ItemStack ): boolean {
        const tag = item.allocateAndSave()
        const data = tag.get<CompoundTag>( "tag" )?.get<ByteTag>( "isWorldEditWand" )?.data
        const condition = Boolean( data )
        tag.dispose()
        return condition
    }

    export function getWand( player: ServerPlayer ): void {
        const wand = ItemStack.constructWith( 'minecraft:wooden_sword', 1 )
        wand.setCustomName( `${TextFormat.RED}Wand` )
        wand.setCustomLore( `${TextFormat.GRAY}WorldEdit ${TextFormat.YELLOW}Tool` )
        const oldTag = wand.save()
        const wandTag = NBT.allocate( {
            ...oldTag,
            tag: {
                ...oldTag.tag,
                isWorldEditWand: true,
                ench: [{ id: NBT.short( -1 ), lvl: NBT.short( 1 ) },],
            }
        } ) as CompoundTag
        wand.load( wandTag )
        player.addItem( wand )
        player.sendInventory()
        wand.destruct()
        wandTag.dispose()
    }

    export function up( player: ServerPlayer, amount: number | undefined ): void {
        const playerPos = player.getPosition()
        const message = amount || 1
        if( amount ) playerPos.y += amount - 1

        const region = player.getRegion()
        const blockPos = BlockPos.create( playerPos.floor() )
        blockPos.y -= 1
        const block = Block.create( 'minecraft:glass' )!

        player.teleport( playerPos )
        player.sendTip( `Up ${message}` )
        region.setBlock( blockPos, block )
    }
}

