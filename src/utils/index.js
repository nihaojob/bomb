function getF(now, start, end) {
    function g(nowItem, startItem) {
        let a = startItem.x - nowItem.x
        let b = startItem.y - nowItem.y
        return Math.sqrt(a*a + b*b)
    }
    function h(nowItem, endItem) {
        let a = endItem.x - nowItem.x
        let b = endItem.y - nowItem.y
        return Math.sqrt(a*a + b*b)
    }
    return g(now,start) + h(now,end)
}


function getChild({x = 0, y = 0},map) {
    console.log(x,y,map)
}

export { getF, getChild }