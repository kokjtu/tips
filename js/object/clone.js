const obj = {}

const copyObj = obj; // shallow copy
const copyObj = {...obj} //shallow copy (1 layer)
const copyObj = JSON.parse(JSON.stringify(obj)) // shallow copy (remove key which has undefined value in copyObj)

const copyObj = structuredClone(obj) // deep copy