import { Block, BlockSource } from "bdsx/bds/block"
import { BlockPos, Vec3 } from "bdsx/bds/blockpos"
import { ItemStack } from "bdsx/bds/inventory"
import { ByteTag, CompoundTag, NBT } from "bdsx/bds/nbt"
import { Player, ServerPlayer } from "bdsx/bds/player"
import { StructureManager } from "bdsx/bds/structure"
import { bedrockServer } from "bdsx/launcher"
import { TextFormat } from "bdsx/util"

export namespace worldedit {

    type POS = Vec3 | BlockPos

    export enum POS_ID {
        pos1,
        pos2
    }

    const playerCanSetPost2 = new Map<string, null>()

    export const POS_MAP = new Map<string, [POS | null, POS | null]>()

    export function canSetPos( xuid: string ): boolean {
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

    export function setPos( player: Player, posId: POS_ID, pos: POS ): void {
        if( !player.isPlayer() ) return
        const xuid = player.getXuid()
        if( !POS_MAP.has( xuid ) ) POS_MAP.set( xuid, [null, null] )
        let postions = POS_MAP.get( xuid )!
        postions[posId] = BlockPos.create( pos )
        POS_MAP.set( xuid, postions )
        player.sendMessage( `${TextFormat.GREEN}POS${posId + 1} ${TextFormat.RED}=> ${TextFormat.GREEN}X:${TextFormat.RESET}${pos.x} ${TextFormat.GREEN}Y:${TextFormat.RESET}${pos.y} ${TextFormat.GREEN}Z:${TextFormat.RESET}${pos.z}` )
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
        wand.setCustomName( `${TextFormat.RED}WorldEdit Wand` )
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
        if( amount ) playerPos.y += amount - 1

        const region = player.getRegion()
        const blockPos = BlockPos.create( playerPos.floor() )
        blockPos.y -= 1
        const block = Block.create( 'minecraft:glass' )!

        player.teleport( playerPos )
        player.sendTip( `Up ${amount || 1}` )
        region.setBlock( blockPos, block )
    }

    export function fillBlocks( player: Player, block: Block ) {
        if( !player.isPlayer() ) return
        const xuid = player.getXuid()
        if( !POS_MAP.has( xuid ) ) return
        const area = POS_MAP.get( xuid )
        if( area === undefined || area[0] === null || area[1] === null ) {
            player.sendMessage( 'You must set POS1 & POS2 to execute this command' )
            return
        }
        const pos = {
            x: [area[0].x, area[1].x].sort( ( a, b ) => a - b ),
            y: [area[0].y, area[1].y].sort( ( a, b ) => a - b ),
            z: [area[0].z, area[1].z].sort( ( a, b ) => a - b )
        }
        for( let y = pos.y[0]; y <= pos.y[1]; y++ ) {
            bedrockServer.executeCommand( `fill ${pos.x[0]} ${y} ${pos.z[0]} ${pos.x[1]} ${y} ${pos.z[1]} ${block.getName()} ${block.getVariant()}`, true )
        }
        const blockAmount = ( pos.x[1] - pos.x[0] + 1 ) * ( pos.y[1] - pos.y[0] + 1 ) * ( pos.z[1] - pos.z[0] + 1 )
        player.sendMessage( `You place ${TextFormat.YELLOW}${blockAmount}${TextFormat.RESET} blocks `)
    }





}