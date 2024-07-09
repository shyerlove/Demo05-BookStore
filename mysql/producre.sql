use books;

desc bookdata;

desc shopcar;
# 加入购物车
delimiter $

create procedure add_shopcar(v_user_id INT, v_book_id INT,v_store_id INT, v_count INT )
		begin
			# 判断购物车是否存在该商品
            DECLARE x_num INT ;
            SELECT count(*)
            INTO x_num
            FROM shopcar
            WHERE user_id = v_user_id 
            AND book_id = v_book_id 
            AND store_id = v_store_id ;

            IF x_num > 0 THEN
				# 存在商品
				UPDATE shopcar 
				SET book_count = book_count + v_count 
				WHERE user_id = v_user_id 
				AND book_id = v_book_id 
				AND store_id = v_store_id ;
            ELSE 
				# 不存在商品
				INSERT INTO shopcar(store_id,user_id,book_id,book_count)
                VALUES(v_user_id, v_book_id,v_store_id, v_count);
            END IF ;
		end $

delimiter;

desc bookdata;
# 添加书的信息
delimiter $

create procedure add_book(book_name varchar(30),book_press varchar(50),book_imgUrl text,book_cost decimal(4,2),book_inventory int,book_class varchar(30))
		begin
			if(select not exists(select * from bookdata where bookdata.book_name = book_name)) then
				insert into bookdata(book_name,book_press,book_imgUrl,book_cost,book_inventory,book_class)
                values(book_name,book_press,book_imgUrl,book_cost,book_inventory,book_class);
			else 
				signal sqlstate "45000" set message_text = "已存在该图书";
            end if ;
        end $

delimiter;

# 删除书
delimiter $

create procedure del_book(book_id int)
		begin
			if(select exists(select * from bookdata where bookdata.book_id = book_id)) then
				delete from bookdata where bookdata.book_id = book_id ;
                if(select exists(select * from shopcar where shopcar.book_id = book_id)) then
					delete from shopcar where shopcar.book_id = book_id ;
                end if ;
            end if ;
        end $

delimiter;

# 购买书(商家id,图书id,用户id,数量)
delimiter $

create procedure buy_book(v_shopcar_id INT,v_store_id INT, v_book_id INT, v_user_id INT, v_count INT)
		begin
			# 查询数量 
            DECLARE x_count INT ;
			SELECT book_count 
            INTO x_count
            FROM storebookdata
            WHERE store_id = v_store_id 
            AND book_id = v_book_id ;
            
            # 库存不足，退出
            IF x_count < v_count THEN
			SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "库存不足" ;
            END IF ;
            
            # 添加订单
            desc userorder ;
            INSERT INTO userorder(user_id,store_id,book_id,count)
            VALUES(v_user_id,v_store_id,v_book_id,v_count) ;
            
            # 从购物车删除
            DELETE FROM shopcar WHERE shopCar_id = v_shopcar_id ;
        end $

delimiter;

# 处理用户订单
delimiter $

create procedure deliver(v_userorder_id INT, v_tem INT)
		begin
			# 获取图书id，商家id ,数量
			DECLARE x_book_id INT ;
            DECLARE x_store_id INT ;
            DECLARE x_count INT ;
            
            SELECT t1.book_id, t1.store_id, t1.count 
            INTO x_book_id,x_store_id, x_count
            FROM userorder t1
            WHERE t1.userorder_id = v_userorder_id ;
            
            IF v_tem = 1 THEN
				# 从商家库存中取货
				UPDATE storebookdata t2
				SET t2.book_count = t2.book_count - x_count 
				WHERE store_id = x_store_id 
				AND t2.book_id = x_book_id ;
				
				# 修改订单状态
				UPDATE userorder 
				SET userorder_state = 1
				WHERE userorder_id = v_userorder_id ;
			ELSE 
				# 拒绝交易
				UPDATE userorder 
				SET userorder_state = -1
				WHERE userorder_id = v_userorder_id ;
			END IF ;
        end $

delimiter;

# 加入黑名单

delimiter $

create procedure updateBlackList(id int, c int)
		begin
			set sql_safe_updates = off ;
			if(c <= 0) then
				update users set isBlack = 0 where user_id = id ;
				insert into blacklist(user_id) values(id) ;
			else 
				update users set isBlack = 1 where user_id = id ;
				delete from blacklist where user_id = id ;
			end if ;
            set sql_safe_updates = on ;
        end $

delimiter;

# 订单状态
delimiter $

create procedure addStockState(v_store_id INT, v_book_id INT,v_count INT)
		begin
			DECLARE x_count INT ;
            SELECT count(*) 
            INTO x_count
            FROM stocktable t1
            WHERE t1.stock_id = v_store_id
            AND t1.book_id = v_book_id ;
            
            IF x_count > 0 THEN
				SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "订单已存在" ;
			ELSE
				INSERT INTO stocktable(store_id,book_id,count) values(v_store_id,v_book_id,v_count);
			END IF ;
		end $

delimiter;

# 入库
delimiter $

create procedure stock(v_stock_id int, v_price decimal(5,2), v_msg text)
		begin
			# 定义变量
			DECLARE x_store_id INT;
			DECLARE x_book_id INT;
			DECLARE x_count INT;
			
            # 获取用户id，图书id，订单量
            SELECT t1.store_id,t1.book_id,t1.count
            INTO x_store_id,x_book_id,x_count
            FROM stocktable t1
            WHERE stock_id = v_stock_id ;
            
            # 判断库中是否存在该书
            IF (SELECT EXISTS (SELECT * FROM storebookdata WHERE book_id = x_book_id AND store_id = x_store_id)) THEN
				UPDATE storebookdata  SET book_count = book_count + x_count WHERE book_id = x_book_id AND store_id = x_store_id ; 
			ELSE 
				INSERT INTO storebookdata(store_id,book_id,book_price,book_count,msg)
                VALUES(x_store_id,x_book_id,v_price,x_count,v_msg);
                DELETE FROM stocktable WHERE stock_id = v_stock_id ;
			END IF ;
		end $

delimiter;

select * from stocktable;
# 管理员处理订单
DELIMITER $

CREATE PROCEDURE adminDoOrder(v_stock_id INT,v_val INT) -- v_val: 0 拒绝 2 接收
		BEGIN
			DECLARE x_inventory INT ;
            DECLARE x_count INT ;
            DECLARE x_book_id INT ;
            DECLARE x_store_id INT ;
            
            SELECT t1.count, t2.book_inventory,t2.book_id, t1.store_id
            INTO x_count, x_inventory, x_book_id, x_store_id
            FROM stocktable t1 
            JOIN bookdata t2 ON t2.book_id = t1.book_id 
            AND t1.store_id = v_stock_id ;
            
            # 库存不足
            IF (x_inventory - x_count < 0) THEN 
				SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "库存不足" ;
			END IF ;
            
             # 拒绝发货
            IF v_val = 0 THEN 
				UPDATE stocktable SET stock_state = 0 WHERE stock_id = v_stock_id ;
			ELSEIF v_val = 2 THEN
				# 同意发货
                UPDATE bookdata SET book_inventory = book_inventory - x_count WHERE book_id = x_book_id ;
				UPDATE storebookdata SET book_count = book_count - x_count WHERE store_id = x_store_id ;
                UPDATE stocktable SET stock_state = 2 WHERE stock_id = v_stock_id ;
			ELSE 
				SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "第二个参数只能为0和2" ;
			END IF ;
            
		END $

DELIMITER;

# 获取路由

DELIMITER $

CREATE PROCEDURE get_routes(v_role INT)
	BEGIN 
		SELECT * 
        FROM menus
        WHERE menu_role IN(0) 
        AND redirect = NULL
        order by case when menu_name = "个人中心" then 1 else 0 end ;
    END $

DELIMITER;

# 用户处理订单状态

DELIMITER $

CREATE PROCEDURE dealUserorder(v_userorder_id INT, v_state VARCHAR(50))
	    BEGIN
            IF v_state in('DELETE','OK') THEN
				DELETE FROM books.userorder WHERE userorder_id = v_userorder_id;
			ELSE 
				UPDATE books.userorder 
				SET userorder_state = -2 
				WHERE userorder_id = v_userorder_id;
			END IF ;
		END $

DELIMITER ;