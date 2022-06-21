[![ktltweb](https://github.com/npv2k1/ktltweb/actions/workflows/main.yml/badge.svg?branch=develop)](https://github.com/npv2k1/ktltweb/actions/workflows/main.yml)
# Lập trình web

Trang web bán hàng thực phẩm


## Công nghệ sử dụng

**Client:** HTML, CSS, JS

**Server:** Springboot, mysql

**Tool:** Docker


## Cài đặt
### Cài đặt backend
#### Yêu cầu môi trường
Môi trường yêu cầu để chạy backend:

* Java 11
* mysql:5.7

Chạy springboot

```bash
  mvn spring-boot:run
```

### Cài đặt frontend

Fontend là web tĩnh nên có thể dùng các công cụ chạy file index.html lên

## Cấu trúc thư mục

```
|   docker-compose.yml
|   README.md
|   tree.txt
|   
|           
+---backend
|   |   .gitignore
|   |   Dockerfile
|   |   local.env
|   |   mvnw
|   |   mvnw.cmd
|   |   my-app.7z
|   |   my-app.iml
|   |   pom.xml
|   |       
|   +---.mvn
|   |   \---wrapper
|   |           maven-wrapper.jar
|   |           maven-wrapper.properties
|   |           
|   +---.vscode
|   |       launch.json
|   |       settings.json
|   |       
|   \---src
|       \---main
|           +---java
|           |   \---com
|           |       \---app
|           |           \---my_app
|           |               |   MyAppApplication.java
|           |               |   
|           |               +---config
|           |               |   |   AppConfig.java
|           |               |   |   DomainConfig.java
|           |               |   |   ModelMapperConfig.java
|           |               |   |   OpenAPI30Configuration.java
|           |               |   |   WebConfig.java
|           |               |   |   WebSecurityConfig.java
|           |               |   |   
|           |               |   \---jwt
|           |               |           JwtAuthenticationEntryPoint.java
|           |               |           JwtRequestFilter.java
|           |               |           JwtTokenUtil.java
|           |               |           
|           |               +---domain
|           |               |       CartItem.java
|           |               |       Category.java
|           |               |       Order.java
|           |               |       OrderItem.java
|           |               |       OrderStatus.java
|           |               |       Product.java
|           |               |       User.java
|           |               |       
|           |               +---model
|           |               |       CartItemDTO.java
|           |               |       CategoryDTO.java
|           |               |       JwtRequest.java
|           |               |       JwtResponse.java
|           |               |       OrderDTO.java
|           |               |       OrderItemDTO.java
|           |               |       OrderStatusDTO.java
|           |               |       ProductDTO.java
|           |               |       UserDetailsImpl.java
|           |               |       UserDTO.java
|           |               |       
|           |               +---repos
|           |               |       CartItemRepository.java
|           |               |       CategoryRepository.java
|           |               |       OrderItemRepository.java
|           |               |       OrderRepository.java
|           |               |       OrderStatusRepository.java
|           |               |       ProductRepository.java
|           |               |       UserRepository.java
|           |               |       
|           |               +---rest
|           |               |       AuthResource.java
|           |               |       CartItemResource.java
|           |               |       CategoryResource.java
|           |               |       OrderItemResource.java
|           |               |       OrderResource.java
|           |               |       OrderStatusResource.java
|           |               |       ProductResource.java
|           |               |       UserResource.java
|           |               |       
|           |               \---service
|           |                       AuthService.java
|           |                       CartItemService.java
|           |                       CategoryService.java
|           |                       OrderItemService.java
|           |                       OrderService.java
|           |                       OrderStatusService.java
|           |                       ProductService.java
|           |                       UserService.java
|           |                       
|           \---resources
|               |   application.properties
|               |   
|               +---static
|               \---templates
+---frontend
|   |   dangnhap.html
|   |   donhang.html
|   |   giohang.html
|   |   index.html
|   |   lienhe.html
|   |   orders.html
|   |   react.html
|   |   script.js
|   |   thanhtoan.html
|   |    
|   +---components
|   |       header.html
|   |       
|   +---css
|   |       bocuc.css
|   |       dangnhap.css
|   |       donhang.css
|   |       giohang.css
|   |       hoadon.css
|   |       lienhe.css
|   |       reset.css
|   |       sanpham.css
|   |       style.css
|   |       thanhtoan.css
|   |       
|   \---js
|           chung.js
|           config.js
|           dangnhap.js
|           giohang.js
|           script.js
|           service.js
|           thanhtoan.js
|           
\---seed
        product.sql
        

```

#### Thư mục backend chưa code springboot


**config** Chứa các cấu hình cho springboot

**domain** Chứa các lơp dùng để định nghia các đối tượng tương ứng với các bảng trong sql

**model** Chứa các lớp dùng để trao đổi dữ liệu như DTO

**repos** Dùng định nghĩa các hàm thao tác với csdl

**rest** Định nghĩa các restAPI

**service** Định nghĩa các service

**resources** Định nghia resources

**application.properties** Chứa các thuộc tính cấu hình cho springboot

#### Thư mục frontend chưa code frontend




## Thành viên nhóm

Phạm Văn Nguyên - B19DCCN479: Backend

Trần Quang Minh - B19DCCN443: Backend

Hoàng Thị Mỹ Linh - B19DCCN371: Frontend

Nông Thị Thùy Dung - B19DCCN149: Frontend

Nguyễn Thị Thêu - B18DCCN636: Frontend

## Triển khai sử dụng docker-compose

Để chạy ta sử dụng lênh

```bash
  docker-compose up
```




