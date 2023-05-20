import React from 'react'

function AboutUs() {
    return (
        <div className="p-2">
            <h1 className="font-bold text-3xl">हाम्रो बारेमा</h1>
            <p className="pt-5 text-red text-3xl">
                A Minor Sixth Semester Project by <u>segFault</u>
            </p>
            <hr className="border-2 border-slate-900 my-4 opacity-40" />
            <p className="text-lg text-justify">
                <strong>eSandesh</strong> पाठकहरूलाई एक अद्वितीय समाचार पढ्ने
                अनुभव प्रदान गर्न विकसित गरिएको नेपालमा आधारित अनलाइन न्यूज
                पोर्टल हो। यो सामान्य अनलाइन समाचार पोर्टलहरूको तुलनामा व्यापक
                दर्शकहरूको अपेक्षाहरू पूरा गर्न डिजाइन गरिएको हो। हामी प्रकाशक र
                विज्ञापनदाता दुवैलाई फाइदा हुने सान्दर्भिक विज्ञापनहरूको साथसाथै
                प्रयोगकर्ताहरूको पठन इतिहासमा आधारित व्यक्तिगत सामग्री प्रस्ताव
                गर्छौं।
            </p>
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

export default AboutUs
