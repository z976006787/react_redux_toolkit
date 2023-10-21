import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAllPosts,getPostsStatus,selectPostById, updatePost, deletePost } from './postsSlice'
import { selectAllUsers } from "../users/usersSlice";
import { useParams, useNavigate } from 'react-router-dom'

const EditPostForm = () => {
    const { postId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const post = useSelector((state) => selectPostById(state, Number(postId)))||''
    const users = useSelector(selectAllUsers)
   
    const [title, setTitle] = useState(post.title||'')
    const [content, setContent] = useState(post.body||'')
    const [userId, setUserId] = useState(post.userId||'')
    const [RequestStatus, setRequestStatus] = useState('idle')
   
     useEffect(() => {
        setTitle(post.title||'')
        setContent(post.body||'')
        setUserId(post.userId||'')
    }, [post])

    
    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)


    const canSave = [title, content, userId].every(Boolean) && RequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${post.id}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setRequestStatus('idle')
            }
        }

    }


    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setRequestStatus('idle')
        }
    }


    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
                <button className="deleteButton"
                    type="button"
                    onClick={onDeletePostClicked}
                >
                    Delete Post
                </button>
                
            </form>
        </section>
    )
}
export default EditPostForm