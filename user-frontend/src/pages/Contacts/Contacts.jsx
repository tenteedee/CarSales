import React from 'react'
import './Contacts.css'; // Import CSS file

const Contacts = () => {
    return (
        <div className='contacts-container'>
            <h1>Trang bản đồ</h1>
            <div className='map-container'>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238324.47864185067!2d105.42553511983284!3d21.039887920719636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453e2a492fcad%3A0xe66a0e3c449c19c6!2zTuG7mWkgdGjhuqV0IMO0dMO0IExvbmcgxq_hu5tjIEF1dG8!5e0!3m2!1sen!2s!4v1727711391766!5m2!1sen!2s"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
            <div className="row row-flex">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="ps-contact__block">
                        <header>
                            <h3>AUTO CLUB Trang Thông Tin Chính Thức<span> Thông tin liên hệ</span></h3>
                        </header>
                        <footer>
                            <p><strong>AUTOCLUB Trang Thông Tin Chính Thức.</strong></p>
                            <p>⛪&nbsp;<strong>Địa chỉ:Đ. Lê Trọng Tấn, La Dương, Hà Đông, Hà Nội 100000, Vietnam</strong></p>
                            <p><strong>Email : cskh.autoclub.vn@gmail.com</strong></p>
                            <p>☎️&nbsp;<strong>Hotline Bán Hàng: </strong></p>
                            <p>☎️&nbsp;<strong>Hotline CSKH:</strong></p>
                            <div contentEditable="false" tabIndex="-1">

                            </div>
                        </footer>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-flex">
                    <div className="ps-section__header mb-50">
                        <h2 className="ps-section__title" data-mask="Liên hệ">- Với chúng tôi</h2>
                        <form id="fcontact" name="fcontact" className="pl-lg-2" action="" noValidate="novalidate">
                            <input type="hidden" name="_token" value="a8641a042353cd1d3288f3562724d0f9" />
                            <input name="link" type="hidden" value="https://kingshoes.vn/lien-he.html" />
                            <div className="row mb-2">
                                <div className="col-12 mb-4">
                                    <textarea className="form-control" name="fmessenger" id="fmessenger" placeholder="Nôi dung"></textarea>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <input name="fname" id="fname" className="form-control" type="text" placeholder="Tên bạn *" required="" />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <input className="form-control" type="email" name="femail" id="femail" placeholder="Email *" required="" data-msg-required="Chưa nhập email" data-rule-email="true" data-msg-email="" />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <input className="form-control" type="text" name="fphone" id="fphone" placeholder="Điện thoại *" required="" maxLength="12" minLength="10" data-msg-required="Chưa nhập số điện thoại" rangelength="[10,12]" data-msg-rangelength="Số điện thoại từ 10-12" data-rule-number="true" data-msg-number="Chỉ nhập số" onKeyPress="inputNumberInt(this);" onKeyUp="inputNumberInt(this);" onBlur="inputNumberInt(this);" />
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="ps-btn">Gửi ngay<i className="ps-icon-next"></i></button>
                                <button type="reset" className="ps-btn">Nhập lại<i className="ps-icon-next"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contacts