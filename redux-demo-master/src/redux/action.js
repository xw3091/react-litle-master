let nextAddId = 0

export function add(text) {
    return {
        type: 'add',
        id: nextAddId++,
        text
    }
}

export function deleteItem(id){
    return {
        type: 'delete',
        id
    }
}

export function replace() {
}
