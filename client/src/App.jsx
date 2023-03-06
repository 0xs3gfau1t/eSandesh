import { useSelector } from 'react-redux'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './App.css'
import {
    Home,
    Login,
    UserAuth,
    Category,
    AdminDash,
    ManageNews,
    EditNews,
    ReaderArticles,
    Archive,
    AdsMan,
    ViewSiteStats,
    SingleNews,
    Landing,
    PollsMan,
    ManageCritics,
    UserProfile,
    Polls,
    ArchiveNews,
} from './pages'
import {
    UserInfo,
    UserPreference,
    UserPosts,
    SavedPosts,
    Subscription,
} from './pages/UserProfile'

import { PrivateRoute, Alert } from './components/common'

function App() {
    const misc = useSelector(state => state.misc)

    return (
        <Router>
            {misc.showAlert && <Alert />}
            <Routes>
                <Route path="/userauth" element={<UserAuth />} />
                <Route path="/admin" element={<Login />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <PrivateRoute>
                            <AdminDash />
                        </PrivateRoute>
                    }
                >
                    <Route path="/admin/dashboard" element={<ManageNews />} />
                    <Route path="readers" element={<ReaderArticles />} />
                    <Route path="addnews" element={<EditNews />} />
                    <Route path="critics" element={<ManageCritics />} />
                    <Route
                        path="editnews/:year/:month/:slug"
                        element={<EditNews isEdit={true} />}
                    />
                    <Route path="archive" element={<Archive />} />
                    <Route path="ads" element={<AdsMan />} />
                    <Route path="polls" element={<PollsMan />} />
                    <Route path="stats" element={<ViewSiteStats />} />
                </Route>
                <Route path="/profile" element={<UserProfile />}>
                    <Route path="/profile/" element={<UserInfo />} />
                    <Route path="saved" element={<SavedPosts />} />
                    <Route path="preference" element={<UserPreference />} />
                    <Route path="subscription" element={<Subscription />} />
                    <Route path="myposts" element={<UserPosts />} />
                </Route>
                <Route path="/saved" element={<SavedPosts />} />

                <Route path="/" element={<Home />}>
                    <Route path="/archive" element={<ArchiveNews />} />
                    <Route path="/polls" element={<Polls />} />
                    <Route path="" element={<Landing />} />
                    <Route
                        path="/news/:year/:month/:slug"
                        element={<SingleNews />}
                    />
                    <Route path="/category/:cat" element={<Category />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
