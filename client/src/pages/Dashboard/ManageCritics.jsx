const ManageCritics = () => {
    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-px-6 lg:-px-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="newsListTable min-w-full table-auto">
                                <thead className="border-b">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">News Title</th>
                                        <th scope="col">Person Name</th>
                                        <th scope="col">Likes</th>
                                        <th scope="col">Categories</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageCritics
