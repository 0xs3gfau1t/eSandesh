import { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useSession } from 'next-auth/react'

import './App.css'
import {
    Home,
    Login,
    UserAuth,
    ForgotPassword,
    Category,
    AdsMan,
    ViewSiteStats,
    SingleNews,
    Landing,
    PollsMan,
    ManageCritics,
    UserProfile,
    Polls,
    ArchiveNews,
    SearchPage,
    NotFound,
} from './pages'

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
    { url: 'readers', comp: LazyReadersArticles },
    { url: 'critics', comp: LazyManageCritics },
    { url: 'archive', comp: LazyManageArchive },
    { url: 'polls', comp: LazyManagePolls },
]
const adminOnly = [
    { url: 'ads', comp: LazyManageAds },
    { url: 'stats', comp: LazyManageStats },
    { url: 'mods', comp: LazyManageMods },
]

function App() {
    const misc = useSelector(state => state.misc)
    const session = useSession()
    return (
        <Router>
            {misc.showAlert && <Alert />}
            <Routes>
                <Route
                    path="/userauth"
                    element={<UserAuth session={session} />}
                />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/admin" element={<Login session={session} />} />
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
                    {session?.data?.user?.roles &&
                        (session?.data?.user?.roles?.isRoot ||
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
                    {session?.data?.user?.roles?.isRoot &&
                        adminOnly.map(item => {
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
                        path="/admin/dashboard"
                        element={
                            <Suspense>
                                <LazyManageNews />
                            </Suspense>
                        }
                    />
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
                <Route
                    path="/profile"
                    element={<UserProfile session={session} />}
                />

                <Route path="/" element={<Home session={session} />}>
                    <Route path="/archive" element={<ArchiveNews />} />
                    <Route
                        path="/polls"
                        element={<Polls session={session} />}
                    />
                    <Route path="" element={<Landing />} />
                    <Route
                        path="/news/:year/:month/:slug"
                        element={<SingleNews />}
                    />
                    <Route path="/category/:cat" element={<Category />} />
                    <Route path="search" element={<SearchPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App
