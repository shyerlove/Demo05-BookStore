import type Book from "@/types/book";

const fenlei = (data: Book[]) => {
    let arr = data.reduce((prev, cur) => {
        const name = cur.store_name;
        /* 初次执行 */
        if (prev.length == 0) {
            (prev as Book[][]).push([cur]);
        } else {
            prev.map(item => {
                if (item[0] && (item[0] as Book).store_name == name) {
                    (item as Book[]).push(cur);
                } else {
                    (prev as Book[][]).push([cur]);
                }
            })
        }
        return prev;
    }, [])
    return arr;
}

export default fenlei;