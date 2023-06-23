# WebHoiDoanhNhan
## Add your files


```
cd existing_repo
git remote add origin http://gitlab.bkt.net.vn/web_hoidoanhnhanthanhhoa/webhoidoanhnhan.git
git branch -M main
git push -uf origin main
```
## Tên dự án
- Dự án phát triển website Tin tức về Hội Doanh Nhân Thanh Hóa tại Hà Nội

## Mô tả
- Là một trang web dưới dạng đọc và giới thiệu về Hội Doanh Nhân, người dùng có thể đọc, tìm kiếm, đưa ra các ý kiến, phản hồi để biết thông tin nhiều hơn về các tin tức, sự kiện, lãnh đạo của Hội Doanh Nhân.
- `Project gồm 2 source client và server`


## Installation
- Phần mềm sử dụng 
    1.  Visual Studio Code  -> https://code.visualstudio.com/
    2.  Xampp hoặc Laragon để kết nối CSDl -> https://www.apachefriends.org/download.html 
                                                & https://laragon.org/download/
            *Chú ý: Sử dụng phiên bản MySql ^5.7.33 trở lên và Php tương thích
- Sau khi clone để cài đặt các bạn cần nhập lệnh ở Terminal trong VS Code:
    
        1. cd client để cài đặt các phần liên quan đến Front-end
    
        2. cd server để cài đặt các phần liên quan đến Back-end
    `&Nếu sử dụng npm : npm install`
    `&Nếu sử dụng yarn : yarn install`
`- Để cài đặt dự án này bạn cần có những điều kiện:`
    `*Front-end:
        + Sử dụng NodeJS v12 trở lên https://nodejs.org/en
        + Sử dụng ReactJs > 18.2.0 https://react.dev/learn/installation`
        
    `*Back-end:
        + Sử dụng Nestjs : https://github.com/nestjs/nest
            npm i -g @nestjs/cli
        + Các cơ sở dữ liệu mà TypeOrm hỗ trợ: https://typeorm.io/
            npm install typeorm --save
            *Chú ý: - Trong dự án này tôi đã sử dụng phiên bản TypeOrm^0.2.37 để cài đặt các thư viện liên quan
                        trong tệp package.json
    `
        
        

## Cách sử dụng
- Sau khi cài đặt thành công:
    `Trong mỗi source đều có phần hướng dẫn cách sử dụng riêng hãy đọc file README trong mỗi source
        *Chú ý: hãy cài đặt và bật trước localhost ảo trong máy của bạn để kết nối tới database
    


## Đóng góp
- Nếu có vướng mắc hoặc muốn bạn muốn đóng góp hãy đưa ra thông tin cho tôi tại ...

## Tác giả và lời cảm ơn
- Cảm ơn các bạn đã sử dụng và đưa ra các tính năng, các lỗi để chúng tôi phát triển và sửa chữa nhanh chóng...

## Giấy phép
- Là một mã nguồn mở

## Tình trạng dự án
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
