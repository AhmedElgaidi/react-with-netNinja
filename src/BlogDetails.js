import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    // for getting the url parameter
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    const navigate = useNavigate();

    const handleDelete = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {// or just id
            method: "DELETE"
        })
        .then(() => {
            navigate('/'); // redirect to home page.
            console.log('deleted...')
        })
        .catch(error => {
            console.log(error.message);
        })
    };

    return (
        <div className="blog-details">
            { isPending && <div> Is loading.........</div> }
            { error && <div> {error}</div> }
            { blog && (
                <article>
                    <h2> { blog.title }</h2>
                    <p> By: { blog.author }</p>
                    <p>
                        { blog.body }
                    </p>
                    <button onClick={ handleDelete }>delete</button>
                </article>
            ) }
        </div>
    );
}
 
export default BlogDetails;