const siteName = "Avuzwa";

class SpecialHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header id="mainHeader">
            <div class="header-inner">

                <a class="logo" href="index.html#heroSection">
                    <i class="fa-solid fa-bread-slice"></i>
                    <span>${siteName}</span>
                </a>

                <nav>
                    <a class="nav-link active" href="index.html#heroSection">Home</a>
                    <a class="nav-link" href="index.html#about-artist">Artist</a>
                    <a class="nav-link" href="index.html#productsGrid">Shop</a>
                </nav>

                <div class="header-actions">

                    <a href="cart.html"><button class="cart-btn">
                        <span>🛒 Buy Art</span>
                        <span class="cart-count hidden" id="cartCount">0</span>
                    </button></a>

                    <button class="hamburger" id="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                </div>
            </div>

            <div class="mobile-nav" id="mobileNav">
                <a class="nav-link active" href="index.html#heroSection">Home</a>
                <a class="nav-link" href="index.html#about-artist">Artist</a>
                <a class="nav-link" href="index.html#productsGrid">Shop</a>
                <a href="cart.html" class="nav-link">Cart</a>
            </div>
        </header>
        `;
    }
}
class SpecialHeroSection extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section class="hero" id="heroSection">
            <div class="container hero-content">
            <div class="hero-inner">
                <div>
                <div class="hero-eyebrow">Handcrafted from South Africa</div>
                <h1>The artist<br><em>${siteName}</em><br>make it real</h1>
                <p class="hero-desc">Each piece carries the spirit of the land — painted in open fields, inspired by seasons, soil, and the quiet beauty of farm life.</p>
                <div class="hero-actions">
                    <a href="#productsGrid"><button class="btn-primary">Explore the Gallery →</button></a>
                    <a href="#about-artist"><button class="btn-outline">Meet the Artist</button></a>
                </div>
                </div>
                <div class="hero-visual">
                <div class="art-grid" style="display:none;">
                    <img src="" alt="" style="object-fit: auto;">
                    </div>
                    <div class="art-card-hero">
                    
                    </div>
                    <div class="art-card-hero">
                    
                    </div>
                    <div class="art-card-hero">
                
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section> 
        `;
    }
}
class SpecialProducts extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section class="products-section">
    <div class="container">
      <div class="section-header">
        <span class="section-label">Curated collection</span>
        <h2 class="section-title">From Field to Frame</h2>
        <p>Every piece is made by hand, sourced from the land, and shipped with care.</p>
      </div>

      <!--div class="filter-tabs">
        <button class="filter-tab active" onclick="filterProducts('all', this)">All Works</button>
        <button class="filter-tab" onclick="filterProducts('oil', this)">Oil Paintings</button>
        <button class="filter-tab" onclick="filterProducts('watercolour', this)">Watercolour</button>
        <button class="filter-tab" onclick="filterProducts('print', this)">Prints</button>
        <button class="filter-tab" onclick="filterProducts('textile', this)">Textiles</button>
      </div-->

      <div class="products-grid" id="productsGrid">
        <!-- injected by JS -->
      </div>
    </div>
  </section>
        `;
    }
}
class SpecialAbout extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section id='about-artist' class="about-banner">
    <div class="container">
      <div class="about-banner-inner">
        <div>
          <span class="section-label" style="color:var(--purple-light)">The maker behind the art</span>
          <h2>A lifetime with, <em>${siteName}</em></h2>
          <p>From eXolobe (Tsomo), I ${siteName} a  fine artist and an illustrator. For the past few months I've been working on a project titled "Apho Umoya Uya Ngakhona" . This is a special project that reflects on my up bringing as it contains images that reveals how we live on a daily basis. This project is not based on the lack of resources or opportunities as a community, it is a way of showing happiness and freedom as we make use of everything we see and value. It has been a peaceful journey for me especially as someone that experienced the daily life of elalini.
I am proud to announce that this is my first digital exhibition with hopes that it will expand and reach the right audience. remember that art doesn't just decorate your room, it changes how the room behaves.
Buy art and save lives.</p>
        
        </div>
        <div class="banner-img-wrap">
          <img src="images/9.jpg">
        </div>
      </div>
    </div>
  </section>
        `;
    }
}
class SpecialNews extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section class="newsletter-section">
    <div class="container">
      <div class="newsletter-box">
        <span class="section-label">From the studio</span>
        <h2>Follow ${siteName}'s Journey</h2>
        <p>Get studio updates, behind-the-scenes notes, and early access to new works.</p>
        <form class="newsletter-form" onsubmit="subscribeNewsletter(event)">
          <input class="newsletter-input" type="email" placeholder="your@email.com" required />
          <button class="newsletter-submit" type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  </section> 
        `;
    }
}
class SpecialFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
            <div class="container">
                <div class="footer-inner">
                <div class="footer-brand">
                    <a href="index.html" class="logo">
                    <i class="fa-solid fa-bread-slice"></i>
                    <span>${siteName}</span>
                    </a>
                    <p>Handcrafted rural art made on a working farm in South Africa. Each piece carries the soul of the countryside.</p>
                    <div class="social-links">
                    <a class="social-link" target="_blank href="https://www.instagram.com/eslice_eskhulu" aria-label="Instagram" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
                    <a class="social-link" target="_blank" href="https://www.facebook.com/avuziwearnesto.ntshoza" aria-label="Facebook" title="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                    <!--a class="social-link" href="#" aria-label="TikTok" title="TikTok"><i class="fa-brands fa-tiktok"></i></a-->
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Explore</h4>
                    <ul>
                    <li><a href="index.html#heroSection">Home</a></li>
                    <li><a href="index.html#productsGrid">Shop All</a></li>
                    <li><a href="index.html#about-artist" ">The Artist</a></li>
                    <li><a href="cart.html">Cart</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Info</h4>
                    <ul>
                    <li><a href="#">Shipping Policy</a></li>
                    <li><a href="#">Returns</a></li>
                    <li><a href="#">Care Guide</a></li>
                    <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                </div>
                <div class="footer-bottom">
                <span>© 2026 <span>${siteName}</span>. All rights reserved.</span>
                <span>Made with <i class="fa-brands fa-facebook-f"></i> in South Africa</span>
                </div>
            </div>
        </footer>
        `;
    }
}

customElements.define("special-header", SpecialHeader);
customElements.define("special-hero", SpecialHeroSection);
customElements.define("special-products", SpecialProducts);
customElements.define("special-footer", SpecialFooter);
customElements.define("special-about", SpecialAbout);
customElements.define("special-news", SpecialNews);
