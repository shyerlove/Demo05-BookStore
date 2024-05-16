# 图书表： 图书信息
create table bookData(
	book_id int auto_increment primary key , -- 图书唯一id
    book_name varchar(30) , -- 图书名
    book_press varchar(50) , -- 出版社
    book_imgUrl text ,-- 图片链接
    book_cost decimal(3,2) ,  -- 进货价
    book_price decimal(3,2) , -- 定价
    book_inventory int not null default(0) , -- 库存
    store_name varchar(100) not null -- 商家名字
) ;

# 用户表：用户信息
create table users(
	user_id int auto_increment primary key , -- 用户idbookdatabookdata
	user_phone varchar(100) not null , -- 用户电话号码
    user_name varchar(100) not null, -- 用户名
    user_password varchar(100) not null , -- 密码
    user_identity int check(user_identity in (0,1)) default(1), -- 管理员（0） 用户（1）
    token varchar(200) -- token
) ;


# 购物车：购物车的信息
create table shopCar(
	shopCar_id int auto_increment primary key , -- 购物车id 
    store_name varchar(100) , -- 商家名字
	user_id int, -- 用户id
    book_id int, -- 图书id
    book_count int not null -- 图书购买数量
) ;