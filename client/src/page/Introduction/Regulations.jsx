import React from "react";

import Category from "../../components/list/Category";
import RightBar from "../../components/list/RightBar";
import Social from "./Social";
import MenuIntroduction from "./MenuIntroduction";
import Breadcrumbs from "../../components/Breadcrumb";
const Regulations = () => {
  return (
    <div className="bg-white pt-6">
      <Breadcrumbs title={"Giới Thiệu"} />

      <div className="grid grid-cols-4 gap-3 p-7">
        <div className="px-3 py-4 laptop:col-span-3 desktop:col-span-3 tablet:col-span-4 phone:col-span-4">
          <div className="border-[1px] border-solid border-[#4f4f4f] px-6 py-4 rounded">
            <h2 className="font-semibold text-[20px] mb-5">Giới thiệu chung</h2>
            <Social
              url={
                "https://doanhnhanthanhhoahanoi.com/vi/about/Dieu-le-hoat-dong.html"
              }
            />
            <div className="leading-[1.7em] mb-3">
              <p className="text-center">
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong>
                  </span>
                </span>
              </p>

              <p className="text-center">
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Độc lập - Tự do - Hạnh phúc</strong>
                  </span>
                </span>
              </p>

              <p className="text-center">
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>ĐIỀU LỆ</strong>
                  </span>
                </span>
              </p>

              <p className="text-center">
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>HỘI DOANH NHÂN THANH HÓA TẠI HÀ NỘI</strong>
                  </span>
                </span>
              </p>

              <p className="text-center">
                <span className="text-[14px]">
                  <span className=" font-regu">
                    (Được thông qua tại đại hội nhiệm kỳ V: 2022 - 2027)
                  </span>
                </span>
              </p>

              <p className="text-center">
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Chương I</strong>
                  </span>
                </span>
              </p>

              <p className="text-center">
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>QUY ĐỊNH CHUNG</strong>
                  </span>
                </span>
              </p>

              <p className="text-justify">&nbsp;</p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 1: Tên gọi, biểu tượng</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    1. Tên tiếng Việt: Hội Doanh nhân Thanh Hóa tại Hà Nội
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    2. Tên tiếng Anh: Thanh Hoa Business Association in Ha Noi
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    3. Tên viết tắt tiếng Anh: HTBA
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 2.Tôn chỉ, mục đích</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    Hội Doanh nhân Thanh Hóa tại Hà Nội tự nguyện thành lập hoạt
                    động trên nguyên tắc của điều lệ này, nhằm mục đích tập hợp,
                    đoàn kết hội viên có mong muốn tham gia hoạt động hội
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    1. Kết nối các doanh nhân xứ Thanh tại Hà Nội nhằm mục đích
                    giao lưu, chia sẻ kinh nghiệm, và hợp tác phát triển trong
                    công việc
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    2. Là cầu nối với quê hương để các doanh nhân Thanh Hóa tại
                    Hà Nội có thể đóng góp ý tưởng, trực tiếp hoặc kêu gọi các
                    Doanh nhân, doanh nghiệp đầu tư nhằm phát triển quê hương
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    3. Cùng chung tay với Hội đồng hương Thanh Hóa tại Hà Nội để
                    gánh vác nhiều trách nhiệm của đồng hương
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    4. Kêu gọi các doanh nhân hỗ trợ tài chính, định hướng học
                    tập và cung cấp việc làm cho các sinh viên là con em xứ
                    Thanh đang học tập tại Hà Nội, hỗ trợ các trường hợp có hoàn
                    cảnh khó khăn.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 3: Tên gọi, biểu tượng</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>1. Nhiêm vụ</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Hợp tác, kết nối các thành viên để xây dựng, phát triển
                    hội đúng tôn chỉ mục đích hoạt động;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Thường xuyên cung cấp cho thành viên của hội các thông tin
                    liên quan đến hoạt động của hội ;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Tổ chức các hội nghị, hội thảo để trao đổi kinh nghiệm đầu
                    tư, quản lý, khai thác, kinh doanh, kết nối kinh doanh;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>1. Quyền hạn</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    Hội hoạt động trên nguyên tắc tự chủ về tài chính, tổ chức
                    gây quỹ của hội trên cơ sở tự nguyện tham gia đóng góp của
                    các thành viên và từ các nguồn tài trợ. Các nguồn thu của
                    hội sẽ được quy định tại Điều 16 bản Điều lệ này;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Chương II</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>TỔ CHỨC HOẠT ĐỘNG</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 4: Nguyên tắc hoạt động</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    Hội Doanh nhân Thanh Hóa tại Hà Nội hoạt động dưới sự bảo
                    trợ và định hướng của Hội đồng hương Thanh Hoá tại Hà Nội
                    hoạt động trên nguyên tắc tự nguyện, tập trung dân chủbiểu
                    quyết theo đa số và tự trang trải kinh phí; phát huy điểm
                    tương đồng, tôn trọng sự khác biệt, giữ gìn đoàn kết, hợp
                    tác cùng có lợi, giải quyết bất đồng thông qua thương lượng
                    và tôn trọng phán quyết của Ban thường vụ; thỏa thuận song
                    phương giữa các thành viên không vi phạm nguyên tắc của hội,
                    không tổn hại đến lợi ích chung.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 5: Tổ chức hoạt động</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    Hội Doanh nhân Thanh Hóa tại Hà Nội được tổ chức và hoạt
                    động theo mô hình:
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">1. Đại hội;</span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">2. Ban chấp hành</span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">3. Ban thường vụ;</span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    4. Cơ quan giúp việc và đơn vị trực thuộc, bao gồm: Văn
                    phòng Hội và các ban chuyên môn: Ban kiểm tra; Ban hội viên;
                    Ban tài chính; Ban xúc tiến đầu tư; Ban truyền thông. Các
                    câu lạc bộ trực thuộc hội: Câu lạc bộ golf doanh nhân Thanh
                    Hoá tại Hà Nội; Câu lạc bộ nữ DNTH tại Hà Nội và các Hội
                    doanh nhân đồng hương các huyện tự nguyện đăng ký gia nhập
                    Hội Doanh nhân Thanh Hoá tại Hà Nội.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 6: Đại hội</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    1. Cơ quan lãnh đạo cao nhất của Hội là Đại hội (Đại hội
                    nhiệm kỳ hoặc Đại hội bất thường). Đại hội được tổ chức 05
                    (năm) năm một lần, do Ban Chấp hành triệu tập. Đại hội bất
                    thường được triệu tập khi có ít nhất 2/3 (hai phần ba) tổng
                    số ủy viên Ban Chấp hành có đề nghị bằng văn bản.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    2. Đại hội nhiệm kỳ hoặc Đại hội bất thường được tổ chức
                    dưới hình thức Đại hội toàn thể hoặc Đại hội đại biểu, số
                    lượng, thành phần đại biểu do Ban Chấp hành quyết định. Đại
                    hộitoàn thể hoặc Đại hội đại biểu được coi là hợp lệ khi có
                    trên 1/2 (một phần hai) số hội viên chính thức hoặc có trên
                    1/2 (một phần hai) số đại biểu chính thức được triệu tập có
                    mặt.
                  </span>
                </span>
              </p>

              <p>&nbsp;</p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 7: Ban chấp hành</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    1. Ban Chấp hành Hội do Đại hội bầu trong số các hội viên
                    chính thức của Hội. Số lượng, cơ cấu, tiêu chuẩn ủy viên Ban
                    Chấp hành được quy định tại điều lệ này. Số lượng uỷ viên
                    BCH không quá 25 người. Trong quá trình hoạt động nếu cần
                    thiết có thể bổ sung thêm và có thể thay thế những uỷ viên
                    ban chấp hành không đáp ứng yêu cầu và tiêu chuẩn hoạt động.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    2. Nhiệm vụ của Ban Chấp hành:
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    a) Tổ chức triển khai thực hiện nghị quyết Đại hội, Điều lệ
                    Hội, lãnh đạo mọi hoạt động của Hội giữa hai kỳ Đại hội;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    b) Chuẩn bị nội dung và quyết định triệu tập Đại hội;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    c) Quyết định chương trình, kế hoạch công tác hàng năm của
                    Hội;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    d) Quyết định cơ cấu tổ chức bộ máy của Hội, ban hành Quy
                    chế hoạt động của Ban Chấp hành, Ban Thường vụ; quy chế quản
                    lý, sử dụng tài chính của Hội;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    đ) Bầu, miễn nhiệm Chủ tịch, các Phó Chủ tịch, ủy viên Ban
                    Thường vụ, bầu bổ sung ủy viên Ban Chấp hành. Số lượng ủy
                    viên Ban Chấp hành bầu bổ sung không được quá 1/3 (một phần
                    ba) số lượng ủy viên Ban Chấp hành đã được Đại hội quyết
                    định.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    3. Nguyên tắc hoạt động của Ban Chấp hành:
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    a) Ban Chấp hành hoạt động theo Quy chế của Ban Chấp hành,
                    tuân thủ quy định của Điều lệ Hội;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    b) Ban Chấp hành họp mỗi năm 02 (hai) lần, có thể họp bất
                    thường khi có yêu cầu của Ban Thường vụ hoặc trên 1/2 (một
                    phần hai) tổng số ủy viên Ban Chấp hành đề nghị;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    c) Các cuộc họp Ban Chấp hành là hợp lệ khi có ít nhất trên
                    1/2 (một phần hai) số ủy viên Ban Chấp hành tham gia dự họp.
                    Ban Chấp hành có thể biểu quyết bằng hình thức giơ tay hoặc
                    bỏ phiếu kín. Việc quy định hình thức biểu quyết do Ban Chấp
                    hành quyết định;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    d) Các nghị quyết, quyết định của Ban Chấp hành được thông
                    qua khi có ít nhất 2/3 (hai phần ba) tổng số ủy viên Ban
                    Chấp hành dự họp biểu quyết tán thành
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    4. Tiêu chuẩn uỷ viên Ban chấp hành
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    Ủy viên Ban chấp hành Hội phải là người có đầy đủ các yếu tố
                    sau:
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Có điều kiện về thời gian và kinh tế tham gia tự nguyện,
                    nhiệt tình, trách nhiệm trong các hoạt động hội
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Có uy tín, hình ảnh trong cộng đồng doanh nghiệp, xã hội ;
                    Tinh thần đoàn kết tập thể, tính phối hợp cao
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Chấp hành nghiêm chỉnh điều lệ, nội quy, quy chế của Hội
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Tôn trọng và thực hiện nghiêm túc các nghị quyết của BCH,
                    BTV, lãnh đạo hội.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Hội phí tối thiểu 10.000.000 đồng/ năm hỗ trợ hoạt động tự
                    giác, đầy đủ, đúng hạn và thiện tâm;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Phản hồi đầy đủ các thông tin của Ban thường trực khi nhận
                    được qua các kênh quản lý Hội như Điện thoại, Mail, Group
                    (Zalo, Viber, Facebook…)
                  </span>
                </span>
              </p>

              <p>&nbsp;</p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 8: Ban thường vụ</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    1. Ban Thường vụ Hội do Ban Chấp hành bầu trong số các ủy
                    viên Ban Chấp hành; số lượng Ban Thường vụ Hội không quá 9
                    người gồm: Chủ tịch, các Phó Chủ tịch các trưởng ban chuyên
                    môn và các ủy viên. Nhiệm kỳ của Ban Thường vụ cùng với
                    nhiệm kỳ Đại hội.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    2. Nhiệm vụ và quyền hạn của Ban Thường vụ:
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    a) Giúp Ban Chấp hành triển khai thực hiện nghị quyết Đại
                    hội, Điều lệ Hội; tổ chức thực hiện nghị quyết, quyết định
                    của Ban Chấp hành; lãnh đạo hoạt động của Hội giữa hai kỳ
                    họp Ban Chấp hành;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    b) Chuẩn bị nội dung và quyết định triệu tập họp Ban Chấp
                    hành;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    c) Kết nạp, xem xét cho ra hội; khen thưởng, kỷ luật hội
                    viên.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    3. Nguyên tắc hoạt động của Ban Thường vụ:
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    a) Ban Thường vụ hoạt động theo Điều lệ Hội;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    b) Ban Thường vụ họp mỗi quý lần, có thể họp bất thường khi
                    có yêu cầu của Chủ tịch Hội hoặc trên 2/3 (hai phần ba) số
                    ủy viên Ban Thường vụ có ý kiến;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    c) Các cuộc họp của Ban Thường vụ là hợp lệ khi có ít nhất
                    2/3 (hai phần ba) số ủy viên Ban Thường vụ tham gia dự họp.
                    Ban Thường vụ có thể biểu quyết bằng hình thức giơ tay hoặc
                    bỏ phiếu kín. Việc quy định hình thức biểu quyết do Ban
                    Thường vụ quyết định;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    d) Các nghị quyết, quyết định của Ban Thường vụ được thông
                    qua khi có ít nhất 2/3 (hai phần ba) tổng số ủy viên Ban
                    Thường vụ dự họp biểu quyết tán thành.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    3. Tiêu chuẩn Ban thường vụ
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    Ủy viên Ban thường vụ Hội phải là người có đầy đủ các yếu tố
                    sau:
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Đáp ứng các tiêu chuẩn của UV BCH;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Đối với chức danh Người đứng đầu Hội và trong Ban thường
                    vụ phải là người có khả năng lãnh đạo, điều hành, quản lý,
                    tập hợp, quy tụ được hội viên, có uy tín, sức khỏe, có thời
                    gian, tâm huyết;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Là người có tâm, tầm, tài, tinh, tụ
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 9: Chủ tịch và Phó Chủ tịch</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    1. Chủ tịch Hội là người đại diện của Hội. Chủ tịch Hội do
                    Ban Chấp hành bầu trong số các ủy viên Ban Chấp hành Hội.
                    Tiêu chuẩn Chủ tịch Hội do Ban Chấp hành Hội quy định.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    2. Nhiệm vụ, quyền hạn của Chủ tịch Hội:
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    a) Thực hiện nhiệm vụ, quyền hạn theo quy chế hoạt động của
                    Ban Chấp hành, Ban Thường vụ Hội;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    b) Chịu trách nhiệm trước Ban Chấp hành, Ban Thường vụ Hội;
                    chỉ đạo, điều hành mọi hoạt động của Hội theo quy định của
                    Điều lệ Hội, nghị quyết, quyết định của Ban Chấp hành, Ban
                    Thường vụ Hội;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    c) Chủ trì các phiên họp của Ban Chấp hành; chỉ đạo chuẩn
                    bị, triệu tập và chủ trì các cuộc họp của Ban Thường vụ;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    d) Thay mặt Ban Chấp hành, Ban Thường vụ ký các văn bản của
                    Hội;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    đ) Khi Chủ tịch Hội vắng mặt, việc chỉ đạo, điều hành giải
                    quyết công việc của Hội được ủy quyền cho một Phó Chủ tịch
                    Hội.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    3. Phó Chủ tịch Hội do Ban Chấp hành bầu trong số các ủy
                    viên Ban Chấp hành Hội. Tiêu chuẩn Phó Chủ tịch Hội do Ban
                    Chấp hành Hội quy định. Số lượng gồm 06 phó chủ tịch hội.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    Phó Chủ tịch Hội giúp Chủ tịch chỉ đạo, điều hành công tác
                    của Hội theo sự phân công của Chủ tịch Hội; chịu trách nhiệm
                    trước Chủ tịch Hội về công việc được Chủ tịch phân công hoặc
                    ủy quyền. Phó Chủ tịch Hội thực hiện nhiệm vu, quyền hạn
                    theo điều lệ hội.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 10: Tổng thư ký</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    a) Tổng thư ký Hội là người giúp việc cho Chủ tịch Hội, Các
                    Phó Chủ tịch, BTV và BCH Hội. điều hành công việc hàng ngày
                    của Hội theo nghị quyết, chương trình, kế hoạch công tác và
                    theo điều lệ của Hội đã được Đại hội, Ban Chấp hành, Ban
                    Thường vụ Hội thông qua.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    b) Tổng thư ký do Ban Chấp hành Hội bầu, miễn nhiệm làm việc
                    theo chế độ kiêm nhiệm.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    c) Tổng thư ký là người điều hành trực tiếp mọi hoạt động
                    của Văn phòng Hội và ban thư ký và có những nhiệm vụ sau:
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Xây dựng quy chế hoạt động của Văn phòng Hội, quy chế quản
                    lý tài chính của Hội trình Ban Thường vụ thông qua và báo
                    cáo Ban Chấp hành Hội;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Định kỳ báo cáo Ban Chấp hành, Ban Thường vụ Hội các hoạt
                    động của Hội theo quy định của Điều lệ Hội;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Lập báo cáo hàng năm, báo cáo nhiệm kỳ của Ban Chấp hành
                    Hội;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Quản lý tài liệu của Hội theo quy định của Điều lệ Hội;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Thư ký các kỳ Đại hội, các cuộc họp của Ban Chấp hành, Ban
                    Thường vụ Hội;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Chịu trách nhiệm trước Ban Chấp hành, Ban Thường vụ Hội về
                    các hoạt động của Văn phòng Hội.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>
                      Điều 11: Văn phòng hội và các ban chuyên môn của hội
                    </strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    1. Văn phòng Hội và các ban chuyên môn của Hội là bộ phận
                    giúp việc các hoạt động của Hội và Ban Chấp hành Hội, Ban
                    Thường vụ Hội.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    2. Văn phòng Hội được tổ chức và hoạt động theo quy chế do
                    Ban Thường vụ Hội ban hành theo Điều lệ Hội phù hợp với các
                    quy định của pháp luật.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    3. Kinh phí hoạt động của Văn phòng Hội, và các ban chuyên
                    môn của Hội do Tổng thư ký Hội dự trù trình Ban Thường vụ
                    Hội phê duyệt theo quy định Điều lệ Hội
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 12: Gia nhập hội</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    1. Các tổ chức, cá nhân là người có nguồn gốc thanh hoá có
                    nguyện vọng gia nhập hội tự nguyện đăng ký gia nhập (theo
                    mẫu đăng ký tại phụ lục 1).
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    2. Căn cứ vào điều lệ hoạt động và tiêu chuẩn thành viên của
                    hội, Ban hội viên phối hợp với văn phòng hội đề xuất với Ban
                    thường vụ ra quyết định công nhận thành viên chính thức.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    3. Thành viên của hội được công nhận thành viên của hội,
                    hoạt động tuân thủ điều lệ, được hưởng các quyền theo quy
                    định tại Điều 14 và thực hiện các nghĩa vụ theo quy định tại
                    Điều 14.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    4. Thành viên của hội được được thông báo tới tất cả thành
                    viên của hội, và được thực hiện nghi thức kết nạp thành viên
                    mới.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 13: Rút tên khỏi hội viên của hội</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    Thành viên của hội có thể rút tên ra khỏi hội trong trường
                    hợp sau:
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    1. Tự nguyện rút tên ra khỏi hội.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    2. Tổ chức bị giải thể, cá nhân bị qua đời.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    3. Vi phạm điều lệ hoạt động;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>
                      Điều 14: Quyền lợi của các thành viên của hội
                    </strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    1. Được gắn logo, giới thiệu về đơn vị trên Website, các
                    trang thông tin của hội và sử dụng website của hội phục vụ
                    cho các hoạt động kinh doanh của đơn vị.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    2. Được Hội công nhận thành viên của hội
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    3. Được tham gia các hoạt động của hội, các hoạt động do Ban
                    thường vụ tổ chức.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    4. Được giới thiệu, mở rộng cơ hội hợp tác với các thành
                    viên của hội trong các hoạt động sản xuất, kinh doanh.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    5. Được hỗ trợ kết nối với hội viên và các lãnh đạo tỉnh về
                    công tác đầu tư.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    6. Được tự nguyện đăng ký gia nhập hoặc xin rút tên khỏi
                    hội.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    7. Được hội thăm hỏi khi ốm đau, gia đình có tứ thân phụ mẫu
                    qua đời, chúc mừng sinh nhật và được.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 15. Tên gọi, biểu tượng</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    1. Nghiêm chỉnh chấp hành đường lối, chính sách pháp luật
                    của nhà nước và tuân thủ các quy định của điều lệ.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    2. Tham gia tích cực các hoạt động, đoàn kết xây dựng hội
                    ngày càng phát triển, vững mạnh.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    3. Tuyên truyền, vận động để phát triển các hội viên mới;
                    đoàn kết, giúp đỡ các thành viên phát huy mọi khả năng, tiềm
                    lực để phát triển và nâng cao hiệu quả hoạt động.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    4. Chấp hành nghiêm chỉnh chỉ đạo của Ban chấp hành, Ban
                    thường vụ.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    5. Đóng góp đầy đủ phí hội viên tối thiểu 5.000.000 đồng/
                    năm.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Chương III</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>KINH PHÍ HOẠT ĐỘNG</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 16.Kinh phí hoạt động</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    Kinh phí hoạt động của Câu lạc bộ được huy động từ các
                    nguồn:
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Đóng góp kinh phí hoạt động của các hội viên cụ thể như
                    sau:
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    + Hội viên: tối thiểu 5.000.000 đồng / năm;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    + Uỷ viên BCH tối thiểu 10.000.000 đồng / năm;
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Ủng hộ của các hội viên, các nhà tài trợ
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Các khoản thu từ hoạt động của hội (trang Web, hoạt động
                    chung).
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 17. Quản lý tài chính, tài sản của hội</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    1. Ban chấp hành quy định việc quản lý sử dụng tài chính của
                    hội phù hợp với quy định của nhà nước.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">Các khoản chi của hội</span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    Hội sử dụng kinh phí của mình để chi cho những việc sau đây:
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Trang trải các chi phí cho hoạt động của hội theo quy định
                    của điều lệ hoạt động của hội như hoạt động thông tin, hội
                    nghị, hội thảo, tuyên truyền, báo chí, thuê văn phòng, nhân
                    sự văn phòng hội…
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    - Các khoản chi phí cần thiết, hợp lý khác do Ban chấp hành
                    quyết định trên cơ sở đề xuất của Ban thường vụ theo điều lệ
                    hoạt động của hội.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Chương IV</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>KHEN THƯỞNG VÀ KỶ LUẬT</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 18. Khen thưởng</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    Những thành viên của hội, thành viên Ban chấp hành có nhiều
                    thành tích đóng góp cho hoạt động của hội, có tinh thần
                    trách nhiệm, tích cực hỗ trợ, giúp đỡ các thành viên khác
                    trong hội, được Ban chấp hành bộ khen thưởng bằng các hình
                    thức về vật chất và tinh thần. đề nghị UBND tỉnh khen
                    thưởng.
                  </span>
                </span>
              </p>

              <p>&nbsp;</p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 19. Kỷ luật</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    Các thành viên của hội vi phạm đạo đức, hoạt động trái pháp
                    luật, vi phạm các quy định về nội dung thông tin đưa vào,
                    lưu trữ, truyền đi trên trang Web của hội và vi phạm các quy
                    định của điều lệ này thì tuỳ theo tính chất, mức độ vi phạm
                    sẽ bị đình chỉ quyền truy cập cung cấp thông tin và xem xét
                    tư cách thành viên của hội.
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Chương V</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>ĐIỀU KHOẢN THI HÀNH</strong>
                  </span>
                </span>
              </p>

              <p>
                <span className="text-[14px]">
                  <span className=" font-regu">
                    <strong>Điều 20.</strong>Điều lệ này có hiệu lực kể từ ngày
                    ký, việc điều chỉnh, bổ sung điều lệ do Đại hội quyết
                    định./.
                  </span>
                </span>
              </p>
            </div>
          </div>
          <MenuIntroduction />
        </div>
        <div className="phone:hidden laptop:block desktop:block tablet:hidden">
          <Category />
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Regulations;
