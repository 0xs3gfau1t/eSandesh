import React from "react";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { deleteSavedArticles, listSavedArticles } from "../../../redux/actions/user";
import { FiTrash } from "react-icons/fi";

export default function SavedPosts() {
	const savedArticles = useSelector(state => state.user.savedArticles)
	const dispatch = useDispatch()


  const handleDelete = (id) =>{
    dispatch(deleteSavedArticles(id));
  }

  console.log(savedArticles)
  return (
    <div>
      <h2 className="font-bold text-base font-english leading-loose">
        Saved Posts
      </h2>
      <ul className="flex items-center gap-4">
      <li className="w-48 flex flex-col my-4 shadow-md hover:shadow-lg duration-200 rounded-md bg-white p-4">
          <img className="w-full h-24 object-cover rounded-sm"  alt="This is Title" />
          <div className="flex items-center gap-5 ">
            <h3 className="font-english font-bold leading-none my-4">"This is Title"</h3>
            <FiTrash 
                className=" cursor-pointer  hover:text-red duration-200" 
                onClick={() => handleDelete(index)}
              />
          </div>
        </li>
      {savedArticles?.map((article) => (
        <li key={article._id} className=" w-48 flex flex-col my-4 shadow-md hover:shadow-lg duration-200 rounded-md bg-white p-4">
          <img className="w-full h-24 object-cover rounded-sm" src = {article.img} alt={article.title} />
          <div className="flex items-center ">
            <h3 className="font-english font-bold leading-none my-4">
              <Link
                to={`/news/${article.year}/${article.month}/${article.slug}`}
                className="hover:text-rose-600 duration-300"
              >
              {article.title.slice(0, 50)}{article.title.length > 50 ? '...' : ''}
              </Link>
            </h3>
            <FiTrash 
                className=" cursor-pointer w-20 hover:text-red duration-200" 
                onClick={() => handleDelete(article._id)}
              />
          </div>
        </li>
      ))}
    </ul>
    </div>
  );
}
