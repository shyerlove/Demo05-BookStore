type Book = {
    book_id: number,
    book_name: string,
    book_press: string,
    book_class: string,
    book_imgUrl: string,
    book_inventory: number,
    book_cost: number,
    stock_state?: number
}

export default Book;