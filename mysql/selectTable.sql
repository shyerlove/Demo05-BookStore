
select * from books.bookdata ;
select * from books.shopcar ;
select * from books.users ;

# 插入用户数据
insert into users(user_phone,user_name,user_password) values('15590789','shyerlove','pp0421') ;

# 插入图书信息
insert into books.bookdata(book_name,book_press,book_imgUrl,book_cost,book_price,book_inventory,store_name)
values(
	'三国演义',
    '新华出版社',
    'https://img12.360buyimg.com/n1/jfs/t1/64086/8/8785/546559/5d67653eE2cf46e45/dc1d9bd2c746e3f5.png',
	19.90,
	39.90,
	200,
    '新华书店'
) ;

# 查询用户的购物车信息
select store_name "商家",book_name "书名",book_count "购买数量" from books.bookdata,books.shopcar
where books.bookdata.book_id = books.shopcar.book_id and books.shopcar.user_id = 1;






