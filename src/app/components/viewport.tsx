"use client";
import type { ReactNode } from "react";
import { cloneElement, isValidElement, useState, useCallback } from "react";

type ViewportRenderArgs = {
    viewportHeight: number
    viewportWidth: number
    viewportTop: number
    viewportLeft: number
}

type ViewportProps = {
    render: (args: ViewportRenderArgs) => ReactNode
}

export function Viewport({ render }: ViewportProps) {
    // callback reference for calculating viewport height & view
    const [viewportDimensions, setViewportDimensions] = useState({ height: 0, width: 0 });
    const [viewportLocation, setViewportLocation] = useState({ top: 0, left: 0 })

    const calculateViewportDimensions = useCallback((el: HTMLDivElement) => {
        setViewportDimensions({
            height: el.clientHeight,
            width: el.clientWidth
        });
    }, [])

    const onScroll = useCallback((evt: React.UIEvent<HTMLDivElement>) => {
        const el = evt.target;
        if (el instanceof HTMLDivElement) {
            setViewportLocation({ top: el.scrollTop, left: el.scrollLeft });
        }
    }, []);

    return (
        <div
            ref={calculateViewportDimensions}
            onScroll={onScroll}
            className="h-screen w-screen overflow-scroll">
            {/* render children with renderProps and pass in viewport constraints */}
            {render({
                viewportHeight: viewportDimensions.height,
                viewportWidth: viewportDimensions.width,
                viewportLeft: viewportLocation.left,
                viewportTop: viewportLocation.top
            })}
        </div>
    )
}