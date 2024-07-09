# 图书表： 图书信息
create table bookData (
    book_id int auto_increment primary key, -- id
    book_name varchar(30), -- 图书名
    book_press varchar(50), -- 出版社
    book_imgUrl text, -- 图片链接
    book_cost decimal(3, 2), -- 成本价
    book_inventory int not null default(0), -- 库存
    store_name varchar(100) not null -- 商家名字
);

# 用户表：用户信息
create table users (
    user_id int auto_increment primary key, -- 用户idbookdatabookdata
    realname varchar(50) not null, -- 真实姓名
    sex int check (sex in (0, 1)) default(1), -- 性别
    user_phone varchar(100) not null, -- 用户电话号码
    user_name varchar(100) not null, -- 用户名
    site text, -- 地址
    user_password varchar(100) not null, -- 密码
    user_identity int check (user_identity in (0, 1, 2)) default(1), -- 管理员（0） 用户（1） 商家（2）
    token varchar(200), -- token
    money decimal(7, 2) default(0)
);

# 商家表
create table stores (
    store_id int auto_increment primary key, -- ID
    boss_name varchar(50) not null, -- 注册人
    store_phone varchar(100) not null, -- 商家电话
    store_name varchar(100) not null, -- 商家名
    store_password varchar(100) not null, -- 密码
    store_site text, -- 地址
    property decimal(9, 2) default(0), -- 资产
    token varchar(200) -- token
);

# 商家销售表
create table sales (
    sales_id int auto_increment primary key, -- id
    now_time datetime not null, -- 交易时间
    store_id int not null, -- 商家id
    user_id int not null, -- 用户id
    book_id int not null, -- 图书id
    book_count int not null, -- 数量
    allPrice decimal(9, 2) -- 总价
);

# 商家库存
create table storebookdata (
    storebookdata_id int auto_increment primary key, -- id
    user_id int, -- 商家id
    book_id int, -- 图书id
    book_price decimal(3, 2), -- 定价
    book_count int not null -- 数量
);
# 黑名单
create table blacklist (
    blacklist_id int auto_increment primary key,
    user_id int not null -- 用户id
);

# 购物车：购物车的信息
create table shopCar (
    shopCar_id int auto_increment primary key, -- 购物车id 
    store_id int, -- 商家id
    user_id int, -- 用户id
    book_id int, -- 图书id
    book_count int default(1) -- 数量
);

# 路由表
create table menus (
    menu_id int auto_increment primary key,
    user_role int check (user_role in (0, 1)) default(1),
    menu_name varchar(50) not null,
    menu_src varchar(100) not null
);

# 商家订单表
create table stocktable (
    stock_id int auto_increment primary key,
    user_id int not null,
    book_id int not null,
    count int check (100 <= count <= 9999),
    stock_state int check (stock_state in (0, 1, 2)) default(1)
);

# 用户订单表
# userorder_state -2:退款中 -1:退款 0:待发货 1:配送中 2:已送达
create table userorder (
    userorder_id int auto_increment primary key,
    user_id int not null,
    store_id int not null,
    book_id int not null,
    count int check (0 < count <= 9999),
    userorder_state int check (
        userorder_state in (-2, -1, 0, 1, 2)
    ) default(0)
);