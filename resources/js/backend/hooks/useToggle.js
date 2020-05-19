import { useState, useEffect } from 'react';

export default function useToggle(ref = null) {
    const [open, setOpen] = useState(false);

    function handle(event) {
        if (ref !== null && ref.current && !ref.current.contains(event.target)) {
            setOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handle, true);
        return () => {
            document.removeEventListener('click', handle, true);
        };
    });

    return { open, setOpen };
}
