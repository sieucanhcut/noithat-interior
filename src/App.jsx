import { useState } from 'react';
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X,
  Phone, MapPin, Mail, Ruler, Hammer, Sofa, Layers, ShieldCheck,
  Clock3, BadgeCheck, Plus, Minus, Send
} from 'lucide-react';

const projects = [
  { number: '01', category: 'CĂN HỘ', title: 'Căn hộ An Yên', meta: 'Đà Nẵng · 92 m²',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85',
    alt: 'Phòng khách căn hộ hiện đại với vật liệu gỗ và tông màu trung tính' },
  { number: '02', category: 'NHÀ PHỐ', title: 'Nhà phố Ánh Sáng', meta: 'Hội An · 145 m²',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85',
    alt: 'Không gian nhà phố hiện đại, thoáng sáng' },
  { number: '03', category: 'PHÒNG NGỦ', title: 'Chốn Nghỉ Riêng', meta: 'Đà Nẵng · 28 m²',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=85',
    alt: 'Phòng ngủ thiết kế tối giản với màu sắc ấm áp' }
];

const services = [
  { icon: Ruler, number: '01', title: 'Thiết kế nội thất', text: 'Bố trí công năng, định hình phong cách và triển khai bản vẽ phù hợp nhu cầu thực tế.' },
  { icon: Hammer, number: '02', title: 'Thi công trọn gói', text: 'Điều phối các hạng mục từ phần thô đến hoàn thiện, thống nhất bản vẽ và công trình.' },
  { icon: Sofa, number: '03', title: 'Sản xuất đồ nội thất', text: 'Tủ, kệ và đồ gỗ theo kích thước, chất liệu và thói quen sử dụng của gia đình.' },
  { icon: Layers, number: '04', title: 'Cải tạo không gian', text: 'Làm mới căn hộ, nhà phố hoặc không gian kinh doanh theo mục tiêu và ngân sách.' }
];

const steps = [
  ['01', 'Lắng nghe nhu cầu', 'Tìm hiểu hiện trạng, mong muốn, phong cách và ngân sách dự kiến.'],
  ['02', 'Đề xuất thiết kế', 'Thống nhất phương án bố trí, vật liệu, màu sắc và phạm vi công việc.'],
  ['03', 'Báo giá & thi công', 'Làm rõ hạng mục, tiến độ, chi phí trước khi triển khai thực tế.'],
  ['04', 'Nghiệm thu & bàn giao', 'Kiểm tra các hạng mục hoàn thiện và hướng dẫn sử dụng, bảo quản.']
];

const faqs = [
  ['Thi công nội thất trọn gói bao gồm những gì?', 'Phạm vi có thể gồm khảo sát, thiết kế, sản xuất đồ nội thất và thi công hoàn thiện. Hạng mục cụ thể sẽ được xác định theo hiện trạng và báo giá của từng công trình.'],
  ['Chi phí thi công được tính như thế nào?', 'Chi phí phụ thuộc diện tích, hiện trạng, phong cách, vật liệu và khối lượng công việc. Sau khi trao đổi nhu cầu, đội ngũ sẽ đề xuất phạm vi và báo giá phù hợp.'],
  ['Tôi đã có bản vẽ thiết kế, --- có thể thi công không?', 'Có thể xem xét thi công theo bản vẽ sẵn có sau khi kiểm tra hồ sơ, hiện trạng và mức độ phù hợp kỹ thuật.'],
  ['Bao lâu thì hoàn thành một công trình?', 'Thời gian phụ thuộc quy mô và độ phức tạp của từng dự án. Tiến độ dự kiến cần được thống nhất sau khi xác định hạng mục.']
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({
    name: '', phone: '', propertyType: 'Căn hộ', service: 'Thiết kế & thi công trọn gói', message: ''
  });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const goToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submitForm(e) {
    e.preventDefault();
    setSending(true);
    setStatus('');
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Không gửi được thông tin.');
      setStatus(result.message);
      setForm({ name: '', phone: '', propertyType: 'Căn hộ', service: 'Thiết kế & thi công trọn gói', message: '' });
    } catch {
      setStatus('Chưa kết nối được máy chủ. Hãy kiểm tra backend Node.js đang chạy.');
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <div className="topline">THIẾT KẾ CHỈN CHU <span>·</span> THI CÔNG MINH BẠCH <span>·</span> KHÔNG GIAN DÀNH RIÊNG CHO BẠN</div>
      <header className="header">
        <a href="#home" className="brand" aria-label="W--- Interior - trang chủ">
          <span className="brand-symbol">W<span>.</span></span>
          <span className="brand-text">---<small>INTERIOR STUDIO</small></span>
        </a>
        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Điều hướng chính">
          {[['#about','Về chúng tôi'],['#services','Dịch vụ'],['#projects','Dự án'],['#process','Quy trình'],['#faq','Câu hỏi']].map(([href,label]) =>
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          )}
          <button className="nav-cta" onClick={() => { setMenuOpen(false); goToContact(); }}>Nhận tư vấn <ArrowUpRight size={16}/></button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-photo" role="img" aria-label="Không gian phòng khách hiện đại, ấm áp" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow eyebrow-light"><span /> THIẾT KẾ & THI CÔNG NỘI THẤT TRỌN GÓI</p>
            <h1>Nhà không chỉ đẹp.<br/><em>Nhà phải là nơi thuộc về bạn.</em></h1>
            <p className="hero-desc">Từ ý tưởng đến hoàn thiện, chúng tôi giúp bạn biến nhu cầu sống thành không gian có công năng, thẩm mỹ và dấu ấn riêng.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={goToContact}>Tư vấn công trình <ArrowRight size={17}/></button>
              <a href="#projects" className="hero-link">Khám phá dự án <span>↘</span></a>
            </div>
            <div className="hero-trust"><span><Check size={14}/> Tư vấn theo nhu cầu</span><span><Check size={14}/> Phạm vi rõ ràng</span><span><Check size={14}/> Đồng hành từ đầu đến cuối</span></div>
          </div>
          <div className="hero-side-note">THIẾT KẾ · VẬT LIỆU · HOÀN THIỆN</div>
          <div className="hero-bottom"><span>01 / KHÔNG GIAN SỐNG</span><span className="hero-line"/><span>CUỘN ĐỂ KHÁM PHÁ ↓</span></div>
        </section>

        <section className="intro section" id="about">
          <div className="section-kicker"><span>01</span><i/> VỀ W---</div>
          <div className="intro-copy">
            <h2>Một không gian tốt<br/>bắt đầu từ việc <em>hiểu bạn.</em></h2>
            <p>Chúng tôi tin rằng nội thất không chỉ là những món đồ đẹp. Đó là cách ánh sáng đi vào nhà, cách mỗi mét vuông được sử dụng và cảm giác bạn có khi trở về.</p>
            <p>W---- hướng đến giải pháp thiết kế và thi công rõ ràng, cân bằng giữa công năng, thẩm mỹ, vật liệu và ngân sách thực tế.</p>
            <a href="#services" className="under-link">Tìm hiểu dịch vụ <ArrowRight size={16}/></a>
          </div>
          <div className="intro-image">
            <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85" alt="Phòng khách với bảng màu trung tính và đồ nội thất hiện đại" loading="lazy"/>
            <div className="image-tag">TỐI GIẢN TRONG HÌNH THỨC<br/>CHỈN CHU TRONG TỪNG CHI TIẾT</div>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="section-head">
            <div><div className="section-kicker"><span>02</span><i/> DỊCH VỤ</div><h2>Từ ý tưởng<br/>đến <em>không gian thật.</em></h2></div>
            <p>Một quy trình phối hợp rõ ràng để bạn chủ động hơn trong từng quyết định — từ lựa chọn phong cách đến ngày bàn giao.</p>
          </div>
          <div className="service-grid">
            {services.map(({icon:Icon,number,title,text}) => <article className="service-card" key={number}>
              <div className="service-top"><span>{number}</span><Icon size={27} strokeWidth={1.3}/></div>
              <h3>{title}</h3><p>{text}</p>
              <a href="#contact" aria-label={`Tư vấn ${title}`}><ArrowUpRight size={19}/></a>
            </article>)}
          </div>
        </section>

        <section className="projects section" id="projects">
          <div className="section-head project-head">
            <div><div className="section-kicker"><span>03</span><i/> CÔNG TRÌNH THAM KHẢO</div><h2>Không gian thật.<br/><em>Câu chuyện riêng.</em></h2></div>
            <p>Mỗi công trình là một bài toán riêng về nhu cầu, diện tích, chất liệu và thói quen sinh hoạt.</p>
          </div>
          <div className="project-grid">
            {projects.map(p => <article className="project-card" key={p.number}>
              <a className="project-photo" href="#contact" aria-label={`Trao đổi dự án ${p.title}`}>
                <img src={p.image} alt={p.alt} loading="lazy"/><span className="project-open"><ArrowUpRight size={20}/></span>
              </a>
              <div className="project-meta"><span>{p.category}</span><span>{p.number}</span></div>
              <h3>{p.title}</h3><p>{p.meta}</p>
            </article>)}
          </div>
          <p className="sample-note">Hình ảnh minh họa phong cách nội thất. Thay bằng hình ảnh công trình thực tế của doanh nghiệp trước khi xuất bản.</p>
        </section>

        <section className="benefits section">
          <div className="benefit-heading"><div className="section-kicker"><span>04</span><i/> CAM KẾT LÀM VIỆC</div><h2>Rõ ràng ở từng bước,<br/><em>an tâm trong từng quyết định.</em></h2></div>
          <div className="benefit-grid">
            <article><Ruler/><h3>Giải pháp phù hợp</h3><p>Thiết kế dựa trên nhu cầu sử dụng, diện tích và ngân sách đã trao đổi.</p></article>
            <article><ShieldCheck/><h3>Hạng mục minh bạch</h3><p>Phạm vi công việc, vật liệu và các khoản chi phí cần được thống nhất trước khi thực hiện.</p></article>
            <article><Clock3/><h3>Tiến độ rõ ràng</h3><p>Kế hoạch triển khai và các mốc bàn giao được trao đổi theo từng công trình.</p></article>
            <article><BadgeCheck/><h3>Chú trọng hoàn thiện</h3><p>Quan tâm đến chi tiết sử dụng hằng ngày, sự đồng bộ và chất lượng bàn giao.</p></article>
          </div>
        </section>

        <section className="process section" id="process">
          <div className="section-head">
            <div><div className="section-kicker"><span>05</span><i/> QUY TRÌNH</div><h2>Bốn bước để<br/><em>bắt đầu đúng cách.</em></h2></div>
            <p>Trước khi thi công, hai bên thống nhất nhu cầu, phạm vi và chi phí để hạn chế phát sinh không rõ ràng.</p>
          </div>
          <div className="process-list">
            {steps.map(([n,title,text]) => <article className="process-item" key={n}><span className="process-num">{n}</span><h3>{title}</h3><p>{text}</p><ArrowUpRight className="process-arrow" size={18}/></article>)}
          </div>
        </section>

        <section className="faq section" id="faq">
          <div className="faq-intro"><div className="section-kicker"><span>06</span><i/> CÂU HỎI THƯỜNG GẶP</div><h2>Điều bạn muốn<br/><em>biết trước khi bắt đầu.</em></h2><p>Chưa thấy câu trả lời phù hợp? Gửi nhu cầu của bạn để chúng tôi cùng trao đổi cụ thể.</p><button className="btn btn-dark" onClick={goToContact}>Hỏi về công trình <ArrowRight size={16}/></button></div>
          <div className="faq-list">{faqs.map(([q,a],i) => <article className={openFaq===i?'faq-item faq-active':'faq-item'} key={q}>
            <button onClick={() => setOpenFaq(openFaq===i?-1:i)} aria-expanded={openFaq===i}><span>{q}</span>{openFaq===i?<Minus size={18}/>:<Plus size={18}/>}</button>
            {openFaq===i && <p>{a}</p>}
          </article>)}</div>
        </section>

       <section className="contact section" id="contact">
  <div className="contact-info">
    <div className="section-kicker section-kicker-light">
      <span>07</span>
      <i />
      LIÊN HỆ
    </div>

    <h2>
      Cùng tạo nên
      <br />
      không gian <em>bạn mong muốn.</em>
    </h2>

    <p>
      Bạn đang tìm kiếm giải pháp thiết kế và thi công
      nội thất phù hợp? Hãy liên hệ trực tiếp với W---
      để cùng trao đổi về không gian sống của bạn.
    </p>

    <div className="contact-lines">
      <a href="tel:0900000000">
        <Phone size={18} />
        0900 000 000
      </a>

      <a href="mailto:hello@w---.vn">
        <Mail size={18} />
        hello@w---.vn
      </a>

      <span>
        <MapPin size={18} />
        Việt Nam
      </span>
    </div>
  </div>

  <div className="contact-direct">
    <span className="direct-label">
      W--- INTERIOR STUDIO
    </span>

    <h3>
      Không gian đẹp bắt đầu từ một cuộc trò chuyện.
    </h3>

    <p>
      Liên hệ với chúng tôi để trao đổi về phong cách,
      nhu cầu thiết kế, vật liệu và phương án thi công
      cho công trình của bạn.
    </p>

    <a
      className="btn btn-primary"
      href="tel:0900000000"
    >
      Gọi tư vấn
      <Phone size={17} />
    </a>

    <a
      className="direct-email"
      href="mailto:hello@w---.vn"
    >
      Gửi email
      <ArrowUpRight size={17} />
    </a>

    <small>
      W--- luôn sẵn sàng lắng nghe ý tưởng của bạn.
    </small>
  </div>
</section>
      </main>

      <footer className="footer">
        <a href="#home" className="brand footer-brand"><span className="brand-symbol">W<span>.</span></span><span className="brand-text">W---<small>INTERIOR STUDIO</small></span></a>
        <p>Thiết kế có chủ đích. Không gian có dấu ấn.</p>
        <div className="footer-links"><a href="#services">Dịch vụ</a><a href="#projects">Dự án</a><a href="#contact">Liên hệ</a></div>
        <span className="copyright">© {new Date().getFullYear()} W--- INTERIOR. ALL RIGHTS RESERVED.</span>
      </footer>
      <a href="#contact" className="floating-cta"><Phone size={16}/><span>Nhận tư vấn</span></a>
    </>
  );
}

export default App;