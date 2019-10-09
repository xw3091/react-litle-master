const data = {
    target: 10000,
    text: '继续保持: 不错哦'
}

//这是action
// export const increase = {
//     type: '涨工资'
// }
// export const decrease = {
//     type: '扣工资'
// }
//这是reducer
export function reducer(state = [], action) {
    switch (action.type) {
        case '涨工资':
            return [
                {
                    target: data.target += 100,
                    text: action.text
                }
            ]
        case '扣工资':
            return [
                {
                    target: data.target -= 100,
                    text: action.text
                }
            ]
        default:
            return [
                {
                    target: data.target,
                    text: data.text
                }
            ]
    }
}