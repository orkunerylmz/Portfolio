"use client";

import React, { useEffect, useRef } from "react";

interface InteractiveGridProps {
    dotColor?: string;
    dotSize?: number;
    gap?: number;
    forceRadius?: number;
}

const InteractiveGrid: React.FC<InteractiveGridProps> = ({
    dotColor = "rgba(255, 255, 255, 0.58)",
    dotSize = 0.3,
    gap = 15,
    forceRadius = 100,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const dpr = window.devicePixelRatio || 1;

        const setCanvasSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.scale(dpr, dpr);
        };

        setCanvasSize();

        const handleResize = () => {
            setCanvasSize();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        const draw = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = dotColor;

            for (let x = gap / 2; x < width; x += gap) {
                for (let y = gap / 2; y < height; y += gap) {
                    const dx = mouseRef.current.x - x;
                    const dy = mouseRef.current.y - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    let offsetX = 0;
                    let offsetY = 0;

                    if (dist < forceRadius) {
                        const force = (forceRadius - dist) / forceRadius;
                        offsetX = (dx / dist) * force * -20;
                        offsetY = (dy / dist) * force * -20;
                    }

                    ctx.beginPath();
                    ctx.arc(x + offsetX, y + offsetY, dotSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [dotColor, dotSize, gap, forceRadius]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                pointerEvents: "none",
                background: "transparent",
            }}
        />
    );
};

export default InteractiveGrid;

