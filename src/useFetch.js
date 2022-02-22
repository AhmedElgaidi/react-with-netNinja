import { useState, useEffect } from "react";

// our custom hook
const useFetch = url => {
    // let's use some react hooks (useState => for updated data)
    const [data, setdata] = useState(null);// let the intial value be null.
    const [isPending, setIsPending] = useState(true);// for conditional loading message.
    const [error, setError] = useState(null); // for error messages

    // this function (hook) runs every time there is a need to render
    useEffect(() => {
        // let's abort the fetch request
        const abortCont = new AbortController();

        // we can use the state values in here as "blogs" but don't use setBlogs 
        // to provent the happening of continous loop as the useEffect runs on every
        // change in data/ rendering (updating) which makes the data changes and so on.

        // Let's setTimeOut to make it more realistic
        setTimeout( () => {
            // Let's do a fetch request
            fetch(url, { signa: abortCont.signal })
                .then(res => {
                    if(!res.ok) {// if connection establised, but the data is not fetched
                        throw Error ("Couldn't fetch data from that resource");
                    }
                    return res.json(); // this return another promise
                })
                .then(data => {
                    if(Array.isArray(data)){
                        data = data.reverse();
                    }
                    setError(null);
                    setdata(data);
                    setIsPending(false);
                })
                .catch(error => {// any connection/ network errors
                    if(!error.name === 'AbortError'){
                        setError(error.message);
                        // to stop the is loading message
                        setIsPending(false);
                    }
                });
        }, 1000);

        // Let's let's abort
        return () => abortCont.abort();
    }, [url]);// this empty array means only fire this hook on the initial render and
    // not on the further rendering (updating data) 
    // now after putin the url in the array, we makes it run this function/hook if the 
    // url is changed => to fetch the endpoint data.

    // let's make this custom hook return some values
    return {
        data,
        isPending,
        error
    }
};

// let's export our custom hook
export default useFetch;