import { useState, useEffect, useRef } from 'react';

export default function useMenu() {
    const ref = useRef(null);
    const [open, setOpen] = useState(false);

    const handle = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handle, true);
        return () => {
            document.removeEventListener('click', handle, true);
        };
    });

    return { ref, open, setOpen };
}
