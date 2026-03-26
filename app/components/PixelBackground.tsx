'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const PixelBackground = () => {
    const [numberOfBlocks, setNumberOfBlocks] = useState(0);
    const block = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const { innerWidth, innerHeight } = window;
        const blockSize = innerWidth * 0.02;
        setNumberOfBlocks(Math.floor(innerHeight / blockSize));
    }, []);

    useGSAP(() => {
        gsap.set(block.current, { backgroundColor: "transparent" });
    }, [numberOfBlocks]);

    const handleMouseEnter = (index: number) => {
        gsap.to(block.current[index], { duration: 0.1, backgroundColor: "#3b82f6" });
    };

    const handleMouseLeave = (index: number) => {
        gsap.to(block.current[index], { duration: 0.1, backgroundColor: "transparent" });
    };

    const createBlocks = (colIndex: number) => {
        return [...Array(numberOfBlocks)].map((_, i) => {
            const index = colIndex * numberOfBlocks + i;
            return (
                <div
                    key={i}
                    className="w-full h-[2vw] bg-blue-500"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    ref={(el) => { block.current[index] = el }}
                />
            )
        });
    }

    return (
        <div className='w-full flex h-full'>
            {[...Array(50)].map((_, i) => (
                <div key={i} className="w-[2vw] h-full">
                    {createBlocks(i)}
                </div>
            ))}
        </div>
    )
}

export default PixelBackground