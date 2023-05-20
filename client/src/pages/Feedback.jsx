import React, { useState } from 'react'

function Feedback() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        console.log('Submitting feedback:', { name, email, message })
        setName('')
        setEmail('')
        setMessage('')
    }

    return (
        <div className="p-2">
            <h2 className="font-bold text-3xl mt-4">तपाईको प्रतिक्रिया</h2>
            <div className="mt-10">
                हामीलाई आफ्नो अनुभव, प्रतिक्रिया र सुझावहरू दिनुहोस् र हाम्रो
                सेवाहरूलाई बेहतर बनाउनका लागि आवश्यक बदलहरू प्रस्तुत गर्नुहोस्।
                कृपया आफ्नो प्रतिक्रिया, सुझाव वा कुनै पनि अन्य विचार तल दिइएको
                ठेगानामा पठाउन सक्नुहुन्छ । तपाईंको योगदान महत्वपूर्ण छ र हामी
                तपाईंलाई धन्यवाद दिन चाहान्छौं।
            </div>
            <div className="flex flex-col mt-8">
                <strong>सम्पर्क</strong>
                <span>eSandesh प्रकाशन</span>
                <span>पोखरा- १६, कास्की (३३७००)</span>
                <span> पो वं: ३३७७७</span>
                <span> ९८८ १४४ २४४१, ०६१-५६७८९० </span>
                <span>contact@esandesh.com.np</span>
            </div>
        </div>
    )
}

export default Feedback
