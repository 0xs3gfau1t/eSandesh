import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useParams } from 'react-router-dom'

import EditorToolbar, { modules, formats } from './EditorTools'
import { FormText } from '../../components/common'
import { addNews } from '../../redux/actions/dashNews'
import { getSingleNews } from '../../redux/actions/publicNews'
import { setEditing } from '../../redux/reducers/misc'
import { setAlert } from '../../redux/actions/misc'

const initState = {
    title: '',
    category: '',
    tags: '',
    priority: 10,
    socials: '',
}

const EditNews = ({ isEdit }) => {
    const params = useParams()
    const [content, setNews] = useState('')
    const [property, setProp] = useState(initState)
    const singleNews = useSelector(state => state.news.singleNews)
    const isEditing = useSelector(state => state.misc.isEditing)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.year && isEdit) {
            dispatch(setEditing(true))
            dispatch(getSingleNews({ params: params, noAudio: true }))
        }
    }, [])

    useEffect(() => {
        if (isEditing == 'done') navigate('/admin/dashboard')
    })
    useEffect(() => {
        if (singleNews) {
            setNews(singleNews.content)
            setProp({
                ...property,
                title: singleNews.title,
                priority: singleNews.priority,
                tags: singleNews?.tags?.join(','),
                category: singleNews.category.join(','),
            })
        }
    }, [singleNews])

    const handleChange = e => {
        setProp({ ...property, [e.target.name]: e.target.value })
    }

    const onPublish = e => {
        if (!property.title || !content) {
            dispatch(setAlert('Title and content required', 'danger'))
            return
        }
        let tags = property.tags
            ? property.tags
                  .split(',')
                  .map(tag => tag.trim())
                  .map(tag => tag.toUpperCase())
            : []
        let category = property.category
            .split(',')
            .map(category => category.trim())
            .map(cat => cat.toUpperCase())
        dispatch(
            addNews({
                data: {
                    ...property,
                    content: content,
                    tags: tags,
                    category: category,
                },
                isEdit: isEdit,
                id: singleNews ? singleNews._id : false,
            })
        )
    }
    return (
        <div className="ml-4 flex gap-8">
            <div className="max-w-3xl">
                <FormText
                    type="text"
                    name="title"
                    value={property?.title ?? ''}
                    labelText="Title"
                    handleChange={handleChange}
                />
                <EditorToolbar />
                <ReactQuill
                    theme="snow"
                    value={content ?? ''}
                    onChange={setNews}
                    placeholder={"What's hot?..."}
                    modules={modules}
                    formats={formats}
                />
            </div>
            <div className="mt-4">
                <button
                    onClick={onPublish}
                    className="bg-darkblue text-white mb-2"
                >
                    Publish
                </button>
                <FormText
                    type="text"
                    name="category"
                    value={property?.category ?? ''}
                    labelText="Categories"
                    handleChange={handleChange}
                />
                <FormText
                    type="text"
                    name="tags"
                    value={property?.tags}
                    labelText="Tags"
                    handleChange={handleChange}
                />
                {!params.year && (
                    <FormText
                        type="text"
                        name="socials"
                        value={property?.socials ?? ''}
                        labelText="Share to socials"
                        handleChange={handleChange}
                    />
                )}
                <FormText
                    type="number"
                    name="priority"
                    value={property.priority ?? ''}
                    labelText="Priority"
                    handleChange={handleChange}
                />
            </div>
        </div>
    )
}

export default EditNews
