import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage"
import Layout from "./components/Layout";
import EditPostForm from "./features/posts/EditPostForm";
import { Routes, Route,Navigate } from 'react-router-dom'
import UsersList from './features/users/UsersList'
import UserPage from "./features/users/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm></AddPostForm>} />

          <Route path=":postId" element={<SinglePostPage></SinglePostPage>} />

          <Route path="edit/:postId" element={<EditPostForm />} />

        </Route>
        <Route path="user">
          <Route index element={<UsersList />} />

          <Route path=":userId" element={<UserPage />} />

        </Route>

        {/* Catch all - replace with 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace />} />


      </Route>
    </Routes>
  );
}

export default App;
