import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { listCommentsByArticle, dltComments, addComments, editComments, addSubComments } from "../redux/actions/comments"
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdModeEditOutline, MdDelete } from "react-icons/md"
import { BiLike, BiReply, BiChat} from "react-icons/bi";

const initialValue= {
	txtvalue: "",
	a: 1,
	editting: false,
	comId: "",
    sub: false
}

function Comments(props) {
    const comments = useSelector(state => state.comments.comments)
	const dispatch = useDispatch()
	const [value, setValue] = useState({initialValue});

    useEffect(() => {
		dispatch(listCommentsByArticle(props.articleId, 0, 30))
	}, [value.a])


	const handleSubmit = (e) => {
		e.preventDefault();
		if(value.editting){
			dispatch(editComments({commentId: value.comId, content: value.txtvalue}))
			setValue({...value, txtvalue: "", a: value.a + 1, editting: false});
			return;
		}
        if(value.sub){
            dispatch(addSubComments({ content: value.txtvalue, commentId: value.comId}))
            setValue({...value, txtvalue: "", a: value.a + 1, sub: false})
            return;
        }
		dispatch(addComments({articleId: props.articleId, content: value.txtvalue}))
		setValue({...value, txtvalue: "", a: value.a + 1});
	}

	const handleDltCmnt = (cmnt) =>{
		dispatch(dltComments({commentId: cmnt._id }));
		setValue({...value, a: value.a+1});
	}
	

	const handleChange = (e)=>{
		setValue({...value, txtvalue: e.target.value});
	}

    const handleSubCmnt = (cmnt)=>{
        setValue({...value, sub: true})
    }


	const handleEditComment =(cmnt)=>{
		setValue({...value, txtvalue: cmnt.content, editting: true, comId: cmnt._id});
	}
    return (
        <div>
            {comments && comments.comments?.map(comment=>{
                if(comment.article === props.articleId){
                    return(
                        <div key={comment._id} className="flex flex-row p-4 box-border border-4">
                            <div className="pr-2">
                                <Link to="userProfie">
                                    <FaUserCircle className="text-5xl" />
                                </Link>
                            </div>
                            <div className='w-full'>
                                <div className="flex justify-between">
                                    <h1 className=' justify-start text-base font-medium'>{comment.user.slice(0,10)}</h1>
                                    <div className='flex justify-end w-full space-x-2'>
                                        <span>{comment.createdAt.slice(0,4)}</span>
                                        <span onClick = {()=> handleEditComment(comment)}><MdModeEditOutline/></span>
                                        <span onClick = {()=> handleDltCmnt(comment)}><MdDelete/></span>
                                    </div>
                                    
                                </div>
                                <div>
                                    <p>{comment.content}</p>
                                    <div className="flex justify-between w-full gap-2">
                                    <span onClick = {()=> handleSubCmnt(comment)} className="flex items-end cursor-pointer  transition-all duration-200 hover:text-orange-500">
                                            <BiReply />
                                        </span>
                                        <span onClick = {() => handleLikeCmnt(comment)} className="flex items-end content-center cursor-pointer transition-all duration-200 hover:text-green-500">
                                            <BiLike />
                                        <span className="text-xs">{comment.likes}</span>
                                        </span>
                                        
                                        <span className="flex items-end cursor-pointer transition-all duration-200 hover:text-sky-500 ">
                                            <BiChat />
                                            <span className="text-xs">10</span>
                                        </span>
                                    </div>
                                </div>
                                <div className=''>
                                    {comments.subComments?.map(comment=>{

                                    })}
                                </div>
                            </div>
                        </div>
                    )
                }  
            })}
            <div>
                <form onSubmit={handleSubmit}>
                    <input type = "text" value = {value.txtvalue} onChange = {handleChange} placeholder = "Type your Comment"/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

export default Comments