import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage"
import Layout from "./components/Layout";
import EditPostForm from "./features/posts/EditPostForm";
import { Routes, Route } from 'react-router-dom'

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

      </Route>
    </Routes>
  );
}

export default App;
