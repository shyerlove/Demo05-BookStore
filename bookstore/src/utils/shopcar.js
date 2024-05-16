const fenlei = (data) => {
    let arr = data.reduce((prev, cur) => {
        const name = cur.store_name;
        /* 初次执行 */
        if (prev.length == 0) {
            prev.push([cur]);
        } else {
            prev.map(item => {
                if (item[0] && item[0].store_name == name) {
                    item.push(cur);
                } else {
                    prev.push([cur]);
                }
            })
        }
        return prev;
    }, [])
    return arr;
}

export default fenlei;