import React from 'react'

export default function SavedPosts() {
    return (
        <div>
            <h2 className="font-bold text-base font-english leading-loose">
                Saved Posts
            </h2>
            <ul className="flex items-center gap-4">
                <li className="w-48 flex flex-col my-4 shadow-md hover:shadow-lg duration-200 rounded-md bg-white p-4">
                    <img className="w-full h-24 object-cover rounded-sm" />
                    <h3 className="font-english font-bold leading-none my-4">
                        Syal ra Bagh ko katha
                    </h3>
                    <p className="text-xs">
                        -by Bagheshwori Pathak. Ekadesh ma euta jungle ma bagh
                        ra syal...
                    </p>
                </li>
                <li className="w-48 flex flex-col my-4 shadow-md hover:shadow-lg duration-200 rounded-md bg-white p-4">
                    <img className="w-full h-24 object-cover rounded-sm" />
                    <h3 className="font-english leading-none my-4 font-bold">
                        Syal ra Bagh ko katha
                    </h3>
                    <p className="text-xs">
                        -by Bagheshwori Pathak. Ekadesh ma euta jungle ma bagh
                        ra syal...
                    </p>
                </li>
                <li className="w-48 flex flex-col my-4 shadow-md hover:shadow-lg duration-200 rounded-md bg-white p-4">
                    <img className="w-full h-24 object-cover rounded-sm" />
                    <h3 className="font-english leading-none my-4 font-bold">
                        Syal ra Bagh ko katha
                    </h3>
                    <p className="text-xs">
                        -by Bagheshwori Pathak. Ekadesh ma euta jungle ma bagh
                        ra syal...
                    </p>
                </li>
            </ul>
        </div>
    )
}
