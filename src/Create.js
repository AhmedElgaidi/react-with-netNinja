import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    // our states
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIsPending] = useState(false);
    //let's invoke our useHistory hook for going back/forward and redirecting users
    const navigate = useNavigate();

    const handleSubmit = event => {

        event.preventDefault();
        const blog = {
            title,
            body,
            author
        };
        setIsPending(true);

        // we don't have to use our usefetch function as we only will use only one post
        // request in the whole application
        setTimeout(() => {
            fetch('http://localhost:8000/blogs', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blog)
            })
            .then(() => {
                setIsPending(false);
                // navigate(-1);    // go backward (one step)
                navigate('/'); // to redirect.
                console.log('new blog added')
            })
            .catch(error => {
                setIsPending(true);
                console.log(error.message)
            });
        },1000);
    };


    return ( 
        <div className="create">
            <h2>
                Add a new blog
            </h2>
            <form onSubmit={ handleSubmit }>
                <label> Blog title: </label>
                <input
                    type="text"
                    value={ title }
                    onChange={ event => setTitle(event.target.value) }
                    required
                />
                <label>Blog body: </label>
                <textarea 
                    value={ body }
                    onChange={ event => setBody(event.target.value) }
                    required
                ></textarea>
                <label>Blog author: </label>
                <select 
                    value={ author }
                    onChange={ event => setAuthor(event.target.value) }
                    required>
                        <option value="mario">mario</option>
                        <option value="yoshi">yoshi</option>
                </select>
                { !isPending && <button>Add blog</button> }
                { isPending && <button disabled>Adding blog.....</button> }

            </form>
        </div>
    );
}
 
export default Create;