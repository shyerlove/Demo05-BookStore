type Book = {
    book_id: number,
    book_name: string,
    book_press: string,
    book_class: string,
    book_imgUrl: string,
    store_id: number,
    store_name: string,
    book_cost: number,
    book_price: number,
    msg: string,
    stock_state?: number
}

export default Book;