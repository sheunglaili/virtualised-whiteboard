"use client";
import Rbush from "rbush";
import { Memo } from "./memo";
import { useMemo } from "react";

type Memo = {
    id: string
    bgColour: string
    x: number
    y: number
}

type WhiteboardProps = {
    viewportHeight: number
    viewportWidth: number
    viewportTop: number
    viewportLeft: number
    MEMOs: Memo[]
}

type BoundingBox = {
    minX: number 
    minY: number
    maxX: number
    maxY: number
}

type MemoMetadata = {
    id: string
    bgColour: string
}

export function Whiteboard({
    viewportHeight,
    viewportWidth,
    viewportTop,
    viewportLeft,
    MEMOs,
}: WhiteboardProps) {

    const rtree = useMemo(() => {
        const anchors = []
        for (const memo of MEMOs) {
            anchors.push({
                minX: memo.x,
                minY: memo.y,
                maxX: memo.x + 80, // memo left position plus it's width
                maxY: memo.y + 80, // memo top position plus it's height
                id: memo.id,
                bgColour: memo.bgColour
            })
        }
        const rbush = new Rbush<BoundingBox & MemoMetadata>();
        return rbush.load(anchors);
    }, [MEMOs]);

    const visibleMEMOs = useMemo(() => {
        return rtree.search({
            minX: viewportLeft,
            minY: viewportTop,
            maxX: viewportWidth + viewportLeft,
            maxY: viewportHeight + viewportTop,
        })
    }, [rtree, viewportHeight, viewportLeft, viewportTop, viewportWidth])

    return (
        <div className="w-[10000px] h-[10000px] relative">
            {visibleMEMOs.map(({ id, bgColour, minX, minY }) => (
                <div
                    key={id}
                    className="absolute"
                    style={{
                        top: minY,
                        left: minX
                    }}
                >
                    <Memo bgColour={bgColour}/>
                </div>
            ))}
        </div>
    )
}