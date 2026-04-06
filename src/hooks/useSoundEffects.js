import { useEffect, useMemo } from 'react';
import { Howl } from 'howler';

const useSoundEffects = () => {
    const clickSound = useMemo(() => new Howl({
        src: ['/sounds/click.wav'],
        volume: 1.0,
        html5: true,
    }), []);

    useEffect(() => {
        const handleClick = (e) => {
            // Determine if the clicked element or its parent is 'clickable'
            const isClickable = e.target.closest('button, a, input, [role="button"], li, .cursor-pointer');
            
            if (isClickable) {
                clickSound.play();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [clickSound]);
};

export default useSoundEffects;
