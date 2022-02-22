import { Link } from 'react-router-dom';

// Remember: 
// A component is just a function that returns a jsx template and that function
// is exported at the bottom of the file 

// we can use arrow or regular functions.
const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>
                Blog
            </h1>
            <div className="links">
                <Link to="/">
                    Home
                </Link>
                <Link to="/create" style={{ // inline sytling (parentheses one for dynamic
                    color: "white",     // value and another for object value)
                    backgroundColor: "#f1356d",
                    borderRadius: "8px"
                }}>
                    New Blog
                </Link>
            </div>
        </nav>
    );
}
 
export default Navbar;