import BlogList from "./BlogList";
import useFetch from "./useFetch";

// Our home component
const Home = () => {
    // handler function for click event
    const handleClick = () => {
        console.log('clicked')
    };

    const sayHello = name => {
        console.log('Hello, ' + name + '!');
    };
    
    // this means bring the data but call it blogs.
    const { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs');



    return ( 
        <div className="home">
            <h2>Home Page</h2>
            <button onClick={handleClick}> Click me</button>
            {/* demo for passing data in a function without invoking it (runing it) */}
            <button onClick={() => {
                // we need to use anonymous function and invoke our function in it
                sayHello('Ahmed');
            }}>Say hello</button>
            <hr />
            {/* pass the blogs as props */}
            {/* you also can send a function as a prop */}
            {/*  Always delcare functions in the same file with intialized props */}

            {/* conditional rendering */}
            {error && <div> {error}</div>}
            {isPending && <div> Is loading.........</div>}
            {blogs && <BlogList blogs={blogs} />}
        </div>
    );
}
 
export default Home;