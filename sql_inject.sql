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
    product_url varchar(255),
    product_meaningful_url varchar(255), /* for data analysis and product model url */
    product_store varchar(255),
    product_price varchar(255),
    product_created varchar(255),

    /*product_model_id varchar(20),*/
    product_model_id int ,

    primary key (product_id),

    UNIQUE(product_url),
    UNIQUE(product_id)
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
    product_quantity int not null,

    foreign key(product_id) references products(product_id),
    foreign key(order_id) references orders(order_id)
);

create table carts
(
    user_id int not null,
--    product_id int not null,
    product_id varchar(50) not null,

    foreign key(user_id) references users(user_id),
    foreign key(product_id) references products(product_id)
);

create table product_images
(
    image_id int not null auto_increment,
--    product_id int,
    product_id varchar(50),
    image_url varchar(255),

	foreign key (product_id) references products(product_id),
    primary key (image_id)

);
