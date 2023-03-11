import { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useSession } from 'next-auth/react'

import './App.css'
import {
    Home,
    Login,
    UserAuth,
    Category,
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
    NotFound,
} from './pages'
import {
    UserInfo,
    UserPreference,
    UserPosts,
    SavedPosts,
    Subscription,
} from './pages/UserProfile'

import { PrivateRoute, Alert } from './components/common'

const LazyAdmin = lazy(() => import('./pages/Dashboard/Layout'))
const LazyManageNews = lazy(() => import('./pages/Dashboard/ManageNews'))
const LazyEditNews = lazy(() => import('./pages/Dashboard/EditNews'))
const LazyManageArchive = lazy(() => import('./pages/Dashboard/Archive'))
const LazyManageAds = lazy(() => import('./pages/Dashboard/AdsMan'))
const LazyManageCritics = lazy(() => import('./pages/Dashboard/ManageCritics'))
const LazyManagePolls = lazy(() => import('./pages/Dashboard/PollsMan'))
const LazyManageMods = lazy(() => import('./pages/Dashboard/ManageMods'))
const LazyManageStats = lazy(() => import('./pages/Dashboard/ViewSiteStats'))

const LazyReadersArticles = lazy(() =>
    import('./pages/Dashboard/ReaderArticles')
)

const LazyAdmins = [
    { url: '/admin/dashboard', comp: LazyManageNews },
    { url: 'readers', comp: LazyReadersArticles },
    { url: 'critics', comp: LazyManageCritics },
    { url: 'archive', comp: LazyManageArchive },
    { url: 'ads', comp: LazyManageAds },
    { url: 'polls', comp: LazyManagePolls },
    { url: 'stats', comp: LazyManageStats },
]
function App() {
    const misc = useSelector(state => state.misc)
    const session = useSession()
    return (
        <Router>
            {misc.showAlert && <Alert />}
            <Routes>
                <Route path="/userauth" element={<UserAuth />} />
                <Route path="/admin" element={<Login />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <PrivateRoute session={session}>
                            <Suspense fallback="Loading Admin Dashboard">
                                <LazyAdmin session={session} />
                            </Suspense>
                        </PrivateRoute>
                    }
                >
                    {(session?.data?.user?.roles.isRoot ||
                        session?.data?.user?.roles.canPublish) &&
                        LazyAdmins.map(item => {
                            return (
                                <Route
                                    key={item.url}
                                    path={item.url}
                                    element={
                                        <Suspense>
                                            <item.comp />
                                        </Suspense>
                                    }
                                />
                            )
                        })}
                    <Route
                        path="addnews"
                        element={
                            <Suspense>
                                <LazyEditNews />
                            </Suspense>
                        }
                    />
                    <Route
                        path="editnews/:year/:month/:slug"
                        element={
                            <Suspense>
                                <LazyEditNews isEdit={true} />
                            </Suspense>
                        }
                    />
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
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App
