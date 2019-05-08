drop database if exists ecommerce ;

create database if not exists ecommerce CHARACTER SET utf8 COLLATE utf8_general_ci;

use ecommerce ;

create table roles
(
    role_id int not null,
    role_name varchar(255),
    primary key(role_id)
);

create table users
(
    user_id int not null auto_increment,
    user_email varchar(255) not null,
    user_password varchar(255) not null,
    user_phone varchar(20) not null,
    role_id int not null,
    is_female TINYINT(1) not null,
    user_firstname varchar(255) not null,
    user_lastname varchar(255) not null,
    user_address varchar(255) not null,

    foreign key (role_id) references roles(role_id),
    primary key (user_id)
);

create table products
(
    product_id varchar(50) not null,
--    product_id int not null,
    product_name varchar(255),
    product_description longtext,
    product_type varchar(255),
    product_brand varchar(255),
    product_price varchar(255),
    product_created varchar(255),
    product_rating int,
    product_amount int,
    product_reviews varchar(50),
    product_image_url varchar(255),
    primary key (product_id),
    UNIQUE(product_id)
);

create table reviews
(
  review_id varchar(50) not null,
  product_id varchar(50) not null,
  user_id varchar(50) not null,
  review_content longtext,
  review_created varchar(50) not null,

  primary key (review_id),
  foreign key (product_id) references products(product_id),
  foreign key (user_id) references users(user_id)

);
create table orders
(
    order_id int not null auto_increment,
    order_date varchar(255) not null,
    order_status int not null,
    order_sum_value float,
    user_id int not null,
    foreign key(user_id) references users(user_id),
    primary key(order_id)
);

create table products_orders
(
--    product_id int not null,
    product_id varchar(50) not null,
    order_id int not null,
    order_quantity int not null,

    foreign key(product_id) references products(product_id),
    foreign key(order_id) references orders(order_id)
);

create table wishList
(
    user_id int not null,
--    product_id int not null,
    product_id varchar(50) not null,
    product_quantity int not null,
    foreign key(user_id) references users(user_id),
    foreign key(product_id) references products(product_id)
);
