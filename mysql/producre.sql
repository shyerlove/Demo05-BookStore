use books; 
desc bookdata ;
desc shopcar ;
# 加入\减少购物车 
delimiter $
	create procedure update_shopcar(user_id int, book_id int, count int )
		begin
			# 判断购物车中是否有该书
			if (select exists(select * from shopcar where shopcar.user_id = user_id and shopcar.book_id = book_id)) then 
				update shopcar set book_count = (book_count + count) where (shopcar.user_id = user_id and shopcar.book_id = book_id);
				# 该书在购物车中的数量为0，从购物车中删除
				if((select book_count from shopcar where (shopcar.user_id = user_id and shopcar.book_id = book_id)) <= 0) then
					call del_shopcar(user_id,book_id);
				end if ;
			else
				if(count > 0) then
					insert into books.shopcar(user_id,book_id,book_count) values(user_id,book_id,count) ;
				end if ;
			end if ;
		end $
delimiter ;

# 从购物车中删除 
delimiter $
	create procedure del_shopcar(user_id int, book_id int)
		begin 
			delete from shopcar where (shopcar.user_id = user_id and shopcar.book_id = book_id);
		end $
delimiter ;

desc bookdata;
# 添加书的信息 
delimiter $
	create procedure add_book(book_name varchar(30),book_press varchar(50),book_imgUrl text,book_cost decimal(4,2),book_price decimal(4,2),book_inventory int,store_name varchar(100))
		begin
			if(select not exists(select * from bookdata where (bookdata.book_name = book_name and bookdata.store_name=store_name))) then
				insert into bookdata(book_name,book_press,book_imgUrl,book_cost,book_price,book_inventory,store_name)
                values(book_name,book_press,book_imgUrl,book_cost,book_price,book_inventory,store_name);
            end if ;
        end $
delimiter ;

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
delimiter ;

 
# 购买书(书id、数量)

delimiter $
	create procedure buy_book(user_id int, book_id int, count int)
		begin
			if(select exists(select * from bookdata where book_id = book_id)) then
				if((select book_inventory from bookdata where bookdata.book_id = book_id ) >= count) then
					update bookdata set book_inventory = (book_inventory - count) where bookdata.book_id = book_id ;
                    call update_shopcar(user_id , book_id , -count );
                end if ;
			end if ;
        end $
delimiter ;
