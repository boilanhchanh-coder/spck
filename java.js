window.addEventListener('load', function(){
    document.getElementById("regUser").value = "";
    document.getElementById("regPass").value = "";
    document.getElementById("confirmPass").value = "";
});
//ĐĂNG KÝ
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
function registerUser(){
    let tk = document.getElementById("regUser").value;
    let mk = document.getElementById("regPass").value;
    let cfmk = document.getElementById("confirmPass").value;
    let accounts = getData("accounts");
    let regSuccess = document.querySelector(".regSuccess");
    let existence = document.querySelector(".existence");
    let cfPass1 = document.querySelector(".cfPass1");
    let cfPass2 = document.querySelector(".cfPass2");
    let nhac = document.querySelector(".nhac");
    if (tk && mk && !cfmk){
        cfPass1.style.display = "block";
        setTimeout(function(){cfPass1.style.display = "none";}, 1000);
        return;
    }
    if (tk && mk && cfmk && (mk != cfmk)){
        cfPass2.style.display = "block";
        setTimeout(function(){cfPass2.style.display = "none";}, 1000);
        return;
    }
    if (!tk || !mk){
        nhac.style.display = "block";
        setTimeout(function(){nhac.style.display = "none";}, 1000);
        return;
    }
    if (accounts.some(a => a.username === tk)){
        existence.style.display = "block";
        setTimeout(function(){existence.style.display = "none";}, 1000);
        return;
    }
    accounts.push({
        username: tk,
        password: mk,
        role: "User",
        created: new Date().toLocaleString()
    });
    saveData("accounts", accounts)
    regSuccess.style.display = "block";
    setTimeout(function(){regSuccess.style.display = "none";}, 1000);
}
function registerAdmin(){
    let tk = document.getElementById("regAdmin").value;
    let mk = document.getElementById("regPass").value;
    let role = document.querySelector(".selectrole").value;
    let regSuccess = document.querySelector(".regSuccess");
    let existence = document.querySelector(".existence");
    let nhac = document.querySelector(".nhac");
    let accounts = getData("accounts");
    if (!tk || !mk){
        nhac.style.display = "block";
        setTimeout(function(){nhac.style.display = "none";}, 1000);
        return;
    }
    if (accounts.some(a => a.username === tk)){
        existence.style.display = "block";
        setTimeout(function(){existence.style.display = "none";}, 1000);
        return;
    }
    accounts.push({
        username: tk,
        password: mk,
        role: role,
        created: new Date().toLocaleString()
    });
    saveData("accounts", accounts)
    regSuccess.style.display = "block";
    setTimeout(function(){regSuccess.style.display = "none";}, 1000);
    hienthidanhsachtaikhoan()
}
//Danh sách tài khoản
function hienthidanhsachtaikhoan(){
    let accounts = getData("accounts");
    let NguoiDung = localStorage.getItem("NguoiDung");
    let html = "";
    accounts.forEach((element, index) => {
        html += `
            <div style="display: flex; align-items: center; margin: 13px 0px">
                <div class="taikhoan1">${element.username}</div>
                <div class="taikhoan2">${element.role}</div>
                <div class="taikhoan3">${element.created}</div>
                <div class="taikhoan4">${element.username === NguoiDung
                        ? `<span style="color: green;">Đang đăng nhập</span>`
                        : `<button onclick="xoataikhoan(${index})" class="delete">Xóa</button>`
                    }</div>
            </div>`
    });
    document.getElementById("danhsachtaikhoan").innerHTML = html;
}
//ĐĂNG NHẬP
function login(){
    let loginUser = document.getElementById("loginUser").value;
    let loginPass = document.getElementById("loginPass").value;
    let accounts = getData("accounts");
    let acc = accounts.find(a => a.username === loginUser && a.password === loginPass);
    let nhacnho = document.querySelector(".nhacnho");
    if (!acc){
        nhacnho.style.display = "block";
        setTimeout(function(){nhacnho.style.display = "none";}, 1000);
        return;
    }
    localStorage.setItem("NguoiDung", loginUser);
    if (acc.role === "Admin") location.href = "admin.html";
    else location.href = "user.html";
}
//ĐĂNG XUẤT
function logout(){
    localStorage.removeItem("NguoiDung");
    location.href = "dangnhap.html";
}
//Tiêu đề trang user
let xinchao = localStorage.getItem("NguoiDung");
document.querySelector(".xinchao").innerText = "Xin chào, " + xinchao +"!";
//USER ĐĂNG BÀI
function dangbai(){
    let NguoiDung = localStorage.getItem("NguoiDung");
    let tieude = document.getElementById("tieude").value;
    let chude = document.getElementById("chude").value;
    let mota = document.getElementById("mota").value;
    let noidung = document.getElementById("noidung").value;
    let status = document.querySelector(".status").value;
    let baiviet = getData("baiviet");
    let now = new Date();
    let thoigian = now.toLocaleString();
    let baivietmoi = {
        tieude: tieude,
        chude: chude,
        mota: mota,
        noidung: noidung,
        status: status,
        thoigian: thoigian,
        NguoiDung: NguoiDung,
        tym: 0,
        NguoiTym: [],
        binhluan: []
    };
    baiviet.push(baivietmoi);
    saveData("baiviet", baiviet);
    hienthibai();
    lammoi();
}
function hienthibai(danhsach = null){
    let NguoiDung = localStorage.getItem("NguoiDung");
    let baiviet = danhsach || getData("baiviet");
    let html = "";
    baiviet.forEach((element, index) => {
        if (element.status === "Riêng tư" && element.NguoiDung !== NguoiDung) {
            return;
        }
        else{html += `
            <div class="newfeed" onclick="">
                <div style="display: flex;">
                    <p>${element.thoigian}</p>
                    <p style="margin-left: 30px">Người đăng: ${element.NguoiDung}</p>
                </div>
                <h3 style="margin: 15px 0px 10px 0px;">${element.tieude}</h3>
                <div style="margin: 20px 0px 10px 0px;">${element.mota}</div>
                <div class="newfeed1" style="display: flex; height: 30px; align-items: center">
                    <div style="margin: 10px 20px 0px 0px">Chủ đề: <b>${element.chude}</b></div>
                    <div class="trangthai">${element.status}</div>
                    <div id="soluongtym_${index}">${element.tym}</div>❤️
                    <div style="margin-left:5px" id="soluongbinhluan_${index}">${element.binhluan.length}</div>🗨️
                </div>
                <button onclick="chitiet(${index})" class="xemchitiet" >Xem chi tiết</button>
                ${element.NguoiDung === NguoiDung ? `<button onclick="xoabaiviet(${index})" class="xoabai">Xóa</button>` : ""}
            </div>`}
    });
    document.getElementById("feed").innerHTML = html;
}
function chitiet(index){
    let NguoiDung = localStorage.getItem("NguoiDung");
    let baiviet = getData("baiviet");
    let element = baiviet[index];
    let html = `
        <div style="padding: 25px 2% 25px 2%;">
            <div style="margin-bottom: 10px;display:flex;">
                <div style="width:95%;">
                    <h2 style="white-space: normal;">${element.tieude}</h2>
                </div style="display: inline-block">
                <div>
                    <div style="font-weight:bolder; cursor: pointer; font-size: 20px;position:fixed" onclick="dongchitiet()">×</div>
                </div>
            </div>
            <div style="display: flex; margin-bottom: 10px;">
                <div>${element.NguoiDung} •</div>
                <div style="margin-left:3px">${element.thoigian} •</div>
                <div style="margin-left:3px">${element.chude}</div>
            </div>
            <div>${element.noidung}</div>
            <div style="width: 96%; height: auto; padding: 10px 0px 13px 0px;border: 1px solid gray; border-radius: 20px; margin-top: 10px;">
                <div>${NguoiDung === element.NguoiDung
                    ? `<button class="cantlike">Không thể thích</button> ${element.tym} lượt thích`
                    : `<button class="liked" id="datym_${index}" onclick="tymbaiviet(${index})">${element.NguoiTym.includes(NguoiDung) ? "Đã thích" : "Thích"}</button> ${element.tym} lượt thích`              
                }</div>
            </div>
        </div>
        <hr>
        <div style="margin:20px 0px 0px 2%">
            <h2 style="">Bình luận</h2>
        </div>
        <div style="display:flex;">
            <textarea id="inputbinhluan_${index}" style="width:77%;margin: 15px 2% 25px 2%;border-radius:20px;padding: 8px 10px 0px 10px"></textarea>
            <button onclick="guibinhluan(${index})" style="width:15%;height:50px;margin:13px 2% 25px 2%;border-radius:20px;border:1px solid gray;background-color:blue; color:white;font-weight:bolder">Gửi</button>
        </div>
        <div>
            ${element.binhluan.length === 0
                ? `<div style="margin: 5px 0px 30px 20px;">Chưa có bình luận nào</div>` 
                : element.binhluan.map((bl, i) => `
                    <div style="margin:5px 0px 10px 10px">
                    <b>${bl.NguoiDung}</b> • <i style="color:gray">${bl.time}</i>
                    ${NguoiDung === bl.NguoiDung || NguoiDung === element.NguoiDung ? `<button style="width:50px;height:25px;border:1px solid gray;border-radius:20px;background-color:#f70076;color:white" onclick="xoabinhluan(${index},${i})">Xóa</button>`: ""}
                    <div style="margin-top:5px;">${bl.text}</div>
                    </div>`).join("")} 
        </div>
        `;
    document.getElementById("popup").innerHTML = html;
    document.getElementById("postPopup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}
function guibinhluan(index){
    let text = document.getElementById(`inputbinhluan_${index}`).value.trim();
    if (text === "") return;
    let NguoiDung = localStorage.getItem("NguoiDung");
    let baiviet = getData("baiviet");
    baiviet[index].binhluan.push({
        NguoiDung: NguoiDung,
        text: text,
        time: new Date().toLocaleString()
    });
    saveData("baiviet", baiviet);
    chitiet(index);
    document.getElementById(`soluongbinhluan_${index}`).innerText = baiviet[index].binhluan.length;
}
function tymbaiviet(index){
    let NguoiDung = localStorage.getItem("NguoiDung");
    let baiviet = getData("baiviet");
    let post = baiviet[index];
    let datym = document.getElementById(`datym_${index}`);
    if (post.NguoiTym.includes(NguoiDung)){
        post.tym--;
        post.NguoiTym = post.NguoiTym.filter(u => u !== NguoiDung);
        datym.innerText = "Thích";
        datym.style.color = "Black";
        document.getElementById(`soluongtym_${index}`).innerText = post.tym;
    }
    else{
        post.tym++;
        post.NguoiTym.push(NguoiDung);
        datym.innerText = "Đã thích";
        datym.style.color = "blue";
        document.getElementById(`soluongtym_${index}`).innerText = post.tym;
    }
    saveData("baiviet", baiviet);
}
function dongchitiet(){
    document.getElementById("postPopup").style.display = "none";
    document.getElementById("popup").innerHTML = "";
    document.getElementById("overlay").style.display = "none";
}
//Làm mới
function lammoi(){
    document.getElementById("tieude").value = "";
    document.getElementById("chude").value = "";
    document.getElementById("mota").value = "";
    document.getElementById("noidung").value = "";
}
//Xóa bài viết
function xoabaiviet(index){
    let baiviet = getData("baiviet");
    baiviet.splice(index, 1);
    saveData("baiviet", baiviet);
    hienthibai();
}
//Xóa tài khoản
function xoataikhoan(index){
    let accounts = getData("accounts")
    accounts.splice(index, 1);
    saveData("accounts", accounts);
    hienthidanhsachtaikhoan();
}
//Xóa bình luận
function xoabinhluan(index, i){
    let baiviet = getData("baiviet")
    let bv = baiviet[index];
    bv.binhluan.splice(i, 1)
    saveData("baiviet", baiviet)
    chitiet(index, i);
}
//Thống kê
function thongkebaivietcuatoi() {
    let NguoiDung = localStorage.getItem("NguoiDung");
    let baiviet = getData("baiviet");
    let BaiViet = baiviet.filter(bv => bv.NguoiDung === NguoiDung);
    let soBaiViet = BaiViet.length;
    let soBaiCongKhai = 0;
    let soBaiRiengTu = 0;
    let soTym = 0;
    let soBinhLuan = 0;
    let dsChuDe = [...new Set(baiviet.map(bv => bv.chude))];
    let soChuDe = dsChuDe.length;
    BaiViet.forEach(element =>{
        if (element.status === "Công khai"){
            soBaiCongKhai++;
        }
        if (element.status === "Riêng tư"){
            soBaiRiengTu++;
        }
        soTym += element.tym;
        soBinhLuan += element.binhluan.length;
    });
    document.getElementById("thongkebaiviet").innerText = soBaiViet;
    document.getElementById("thongkepublic").innerText = soBaiCongKhai;
    document.getElementById("thongkeprivate").innerText = soBaiRiengTu;
    document.getElementById("thongketym").innerText = soTym;    
    document.getElementById("thongkebinhluan").innerText = soBinhLuan;
    document.getElementById("thongkechude").innerText = soChuDe;
}
function thongkeadmin() {
    let accounts = getData("accounts");
    let baiviet = getData("baiviet");
    let tongUser = 0;
    let tongBaiViet = baiviet.length;
    let tongCongKhai = 0;
    let tongTym = 0;
    let tongBinhLuan = 0;
    accounts.forEach(acc =>{
        if (acc.role === "User") tongUser++;
    });
    baiviet.forEach(bv => {
        if (bv.status === "Công khai") tongCongKhai++;
        tongTym += bv.tym;
        tongBinhLuan += bv.binhluan.length;
    })
    document.getElementById("tonguser").innerText = tongUser;
    document.getElementById("tongbaiviet").innerText = tongBaiViet;
    document.getElementById("tongpublic").innerText = tongCongKhai;
    document.getElementById("tongluotthich").innerText = tongTym;
    document.getElementById("tongbinhluan").innerText = tongBinhLuan;
}
//Lọc chủ đề
function locChuDe(){
    let baiviet = getData("baiviet");
    let dsChuDe = [...new Set(baiviet.map(bv => bv.chude))];
    let locchude = document.getElementById("locchude");
    dsChuDe.forEach(cd => {
        let option = document.createElement("option");
        option.value = cd;
        option.textContent = cd;
        locchude.appendChild(option);
    });
}
function locBaiTheoChuDe(){
    let baiviet = getData("baiviet");
    let chude = document.getElementById("locchude").value;
    let ketqua = (chude === "Tất cả") 
        ? baiviet 
        : baiviet.filter(bv => bv.chude === chude);
    hienthibai(ketqua);
}
//Tìm kiếm theo tiêu đề
function timkiemTieuDe(){
    let baiviet = getData("baiviet");
    let tieude = document.getElementById("timkiemtieude").value.toLowerCase();
    let ketqua = (tieude === "")
        ? baiviet
        : baiviet.filter(bv => bv.tieude.toLowerCase().includes(tieude));
    hienthibai(ketqua);
}