import React, { useEffect, useRef, useState } from 'react';

/**
 * Calculates the dimensions of a components that uses the provided ref.
 * Only recalculates on window resizes.
 * You may need to use a ts-ignore when applying the ref to an element.
 *
 * Losely based on implementation of the following source:
 * https://stackoverflow.com/questions/49058890/how-to-get-a-react-components-size-height-width-before-render
 *
 * @returns An array where the first value is the ref to be added to the component
 * that requires calculation, and the second/third values are the width/height values as numbers.
 */
const useComponentDimensions = (): {
    ref: React.MutableRefObject<HTMLDivElement>;
    width: number;
    height: number;
} => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

    const handleRecalculation = () => {
        if (ref.current) {
            const { offsetWidth, offsetHeight } = ref.current;

            const isNewWidth = offsetWidth !== width;
            if (isNewWidth) setWidth(offsetWidth);

            const isNewHeight = offsetHeight !== height;
            if (isNewHeight) setHeight(offsetHeight);
        }
    };

    useEffect(() => {
        // Attach event listener on resize; run once
        window.addEventListener('resize', handleRecalculation);
        handleRecalculation();
    }, []);

    return { ref, width, height };
};

export default useComponentDimensions;
