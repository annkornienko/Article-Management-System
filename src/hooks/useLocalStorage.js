import { useState } from "react"

const useLocalStorage = (key, defaultValue) => {
    const [data, setData] = useState(() => {

        try {
            const value = localStorage.getItem(key);

            if (value) {
                return JSON.parse(value)
            } else {
                localStorage.setItem(key, defaultValue)
                return defaultValue;
            }
        } catch (err) {
            return defaultValue
        }
    })

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error('Error accessing local storage:', error);
        }
    }, [key, storedValue]);

    return [data, setData]
}

export default useLocalStorage