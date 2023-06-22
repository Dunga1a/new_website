# WebHoiDoanhNhan



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin http://gitlab.bkt.net.vn/web_hoidoanhnhanthanhhoa/webhoidoanhnhan.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](http://gitlab.bkt.net.vn/web_hoidoanhnhanthanhhoa/webhoidoanhnhan/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Automatically merge when pipeline succeeds](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README
Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Tên dự án
- Dự án phát triển website Tin tức về Hội Doanh Nhân Thanh Hóa tại Hà Nội

## Mô tả
- Là một trang web dưới dạng đọc và giới thiệu về Hội Doanh Nhân, người dùng có thể đọc, tìm kiếm, đưa ra các ý kiến, phản hồi để biết thông tin nhiều hơn về các tin tức, sự kiện, lãnh đạo của Hội Doanh Nhân


## Installation
- Phần mềm sử dụng 
    1.  Visual Studio Code  -> https://code.visualstudio.com/
    2.  Xampp hoặc Laragon để kết nối CSDl -> https://www.apachefriends.org/download.html 
                                                & https://laragon.org/download/
            *Chú ý: Sử dụng phiên bản MySql ^5.7.33 trở lên và Php tương thích
- Sau khi clone để cài đặt các bạn cần nhập lệnh ở Terminal trong VS Code:
    cd web_news để cài đặt các phần liên quan đến Front-end
    cd server_news để cài đặt các phần liên quan đến Back-end
    &Nếu sử dụng npm : npm install
    &Nếu sử dụng yarn : yarn install
- Để cài đặt dự án này bạn cần có những điều kiện:
    *Front-end:
        + Sử dụng NodeJS v12 trở lên https://nodejs.org/en
        + Sử dụng ReactJs > 18.2.0 https://react.dev/learn/installation
        + Và các thư viện liên quan trong phần "dependencies" ở tệp package.json
    *Back-end:
        + Sử dụng Nestjs : https://github.com/nestjs/nest
            npm i -g @nestjs/cli
        + Các cơ sở dữ liệu mà TypeOrm hỗ trợ: https://typeorm.io/
            npm install typeorm --save
            *Chú ý: - Trong dự án này tôi đã sử dụng phiên bản TypeOrm^0.2.37 để cài đặt các thư viện liên quan
                        trong tệp package.json
        
        

## Cách sử dụng
- Sau khi cài đặt thành công:
    1. cd web_news -> npm start
    2. cd server_news -> npm run star:dev
        *Chú ý: hãy cài đặt và bật trước localhost ảo trong máy của bạn để kết nối tới database
    


## Đóng góp
- Nếu có vướng mắc hoặc muốn bạn muốn đóng góp hãy đưa ra thông tin cho tôi tại ...

## Tác giả và lời cảm ơn
- Cảm ơn các bạn đã sử dụng và đưa ra các tính năng, các lỗi để chúng tôi phát triển và sửa chữa nhanh chóng...

## Giấy phép
- Là một mã nguồn mở

## Tình trạng dự án
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
