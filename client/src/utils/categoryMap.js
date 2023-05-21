const catMap = {
    politics: 'राजनीति',
    global: 'विश्व',
    finance: 'अर्थ/वाणिज्य',
    business: 'व्यापार',
    sports: 'खेलकुद',
    entertainment: 'मनोरञ्जन',
    technology: 'प्रविधि',
    health: 'स्वास्थ्य',
    agriculture: 'कृषि',
    lifestyle: 'जीवनशैली',
    story: 'विचार/रचना ',
    preference: 'तपाईंको रोजाइ',
}

const getCatMap = cat => {
    if (!cat) return catMap
    return catMap[cat?.toLowerCase()] ? catMap[cat.toLowerCase()] : 'अन्य'
}

export { getCatMap }
