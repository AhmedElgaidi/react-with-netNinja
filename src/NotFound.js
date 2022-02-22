import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>

                That page can't be found
            </h2>
            <Link to="/">
                Back to home page...
            </Link>
        </div>
    );
}
 
export default NotFound;