    

# 获取购物车信息
DELIMITER $

CREATE PROCEDURE getShopcar(IN userId INT)
BEGIN
    SELECT
    shopcar.shopCar_id,
    stores.store_id,
    stores.store_name,
    bookdata.book_id,
    bookdata.book_name,
    bookdata.book_imgUrl,
    storebookdata.book_price,
    shopcar.book_count
FROM
    shopCar
JOIN
    stores ON stores.store_id = shopcar.store_id
JOIN
    bookdata  ON   bookdata.book_id = shopcar.book_id
JOIN
	storebookdata ON storebookdata.store_id = shopcar.store_id AND storebookdata.book_id = shopcar.book_id
WHERE
	shopCar.user_id = userId ;
END $

DELIMITER ;

# 获取今日特价
DELIMITER $

CREATE PROCEDURE getSpecial()
BEGIN
    SELECT
		t1.book_id,
        t1.book_price,
        t3.store_id,
		t3.store_name,
		t1.msg,
		t2.book_name,
		t2.book_press,
		t2.book_imgUrl,
		t2.book_class
	FROM
		storebookdata t1
	JOIN
		bookdata t2 ON t2.book_id = t1.book_id
	JOIN
		stores t3 ON t3.store_id = t1.store_id
	ORDER BY t1.book_price  
	LIMIT 0,5 ;
END $

DELIMITER ;

# 获取top5
DELIMITER $

CREATE PROCEDURE getTop5()
BEGIN
    SELECT
		t1.book_id,
        t1.book_price,
		t3.store_id,
		t3.store_name,
		t1.msg,
		t2.book_name,
		t2.book_press,
		t2.book_imgUrl,
		t2.book_class
	FROM
		storebookdata t1
	JOIN
		bookdata t2 ON t2.book_id = t1.book_id
	JOIN
		stores t3 ON t3.store_id = t1.store_id
	ORDER BY t1.book_count DESC
	LIMIT 0,5 ;
END $

DELIMITER ;

# 获取小说榜
DELIMITER $

CREATE PROCEDURE getNovel()
BEGIN
    SELECT
		t1.book_id,
        t1.book_price,
		t3.store_id,
		t3.store_name,
		t1.msg,
		t2.book_name,
		t2.book_press,
		t2.book_imgUrl,
		t2.book_class
	FROM
		storebookdata t1
	JOIN
		bookdata t2 ON t2.book_id = t1.book_id
	JOIN
		stores t3 ON t3.store_id = t1.store_id
	WHERE 
		t2.book_class like "%小说%"
	LIMIT 0,5 ;
END $

DELIMITER ;

# 搜索
DELIMITER $

CREATE PROCEDURE search(IN val VARCHAR(100))
BEGIN
    SELECT
		t1.book_id,
        t1.book_price,
        t3.store_id,
		t3.store_name,
		t1.msg,
		t2.book_name,
		t2.book_press,
		t2.book_imgUrl,
		t2.book_class
	FROM
		storebookdata t1
	JOIN
		bookdata t2 ON t2.book_id = t1.book_id
	JOIN
		stores t3 ON t3.store_id = t1.store_id
	WHERE 
		t2.book_name like val ;
END $

DELIMITER ;

# 获取商家的用户订单
DELIMITER $

CREATE PROCEDURE get_userorder(v_store_id INT)
BEGIN
    SELECT 
		userorder_id,
		t4.book_id,
		book_name,
		book_price,
		book_imgUrl,
        t4.msg,
		t1.count,
        t3.user_id,
		count * book_price AS book_allPrice,
		user_name,
		userorder_state -- 订单状态
    FROM 
		userorder t1
	JOIN
		bookdata t2 ON t2.book_id = t1.book_id
	JOIN
		users t3 ON t3.user_id = t1.user_id
	JOIN
		storebookdata t4 ON t4.store_id = t1.store_id AND t4.book_id = t1.book_id 
	WHERE 
		t1.store_id = v_store_id ;
END $

DELIMITER ;


# 获取用户所有订单
DELIMITER $

CREATE PROCEDURE get_userorders(v_user_id INT)
BEGIN
    SELECT 
		userorder_id, -- 订单id
		t4.book_id, -- 书id
		book_name, -- 书名
		book_price, -- 单价
		book_imgUrl, -- 图片
        t4.msg,
		t1.count, -- 数量
        t1.user_id, -- 用户id
        t5.store_name, -- 商家名
		count * book_price AS book_allPrice, -- 总价
        userorder_state -- 订单状态
    FROM 
		userorder t1
	JOIN
		bookdata t2 ON t2.book_id = t1.book_id
	JOIN
		users t3 ON t3.user_id = t1.user_id
	JOIN 
		stores t5 ON t5.store_id = t1.store_id
	JOIN
		storebookdata t4 ON t4.store_id = t1.store_id AND t4.book_id = t1.book_id 
	WHERE 
		t1.user_id = v_user_id ;
END $

DELIMITER ;
