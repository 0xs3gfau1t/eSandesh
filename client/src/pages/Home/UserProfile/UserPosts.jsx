import React from "react";

import { FiEdit, FiTrash } from "react-icons/fi";

export default function UserPosts() {
  return (
    <div>
      <h2 className="font-bold text-base font-secondary leading-loose">
        My Posts
      </h2>
      <ul>
        <ul className="grid grid-cols-7 gap-4">
          <li className="font-bold">S.N.</li>
          <li className="font-bold">Title</li>
          <li className="font-bold">Description</li>
          <li className="font-bold">Category</li>
          <li className="font-bold">Date Created</li>
          <li className="font-bold">Edit</li>
          <li className="font-bold">Delete</li>
          {/* row 1 */}
          <li>1</li>
          <li className="font-bold">gohi ra badar ko katha</li>
          <li>ekadesh ma euta badar thiyo. Usko euta gohi sathi thiyo</li>
          <li>Story</li>
          <li>2022-12-12</li>
          <li>
            <FiEdit className="text-blue" />
          </li>
          <li>
            <FiTrash className="text-red" />
          </li>
          {/* row 2 */}
          <li>2</li>
          <li className="font-bold">gohi ra badar ko katha</li>
          <li>ekadesh ma euta badar thiyo. Usko euta gohi sathi thiyo</li>
          <li>Story</li>
          <li>2022-12-12</li>
          <li>
            <FiEdit className="text-blue" />
          </li>
          <li>
            <FiTrash className="text-red" />
          </li>
        </ul>
      </ul>
    </div>
  );
}
