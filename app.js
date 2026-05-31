  // ─── CONFIG ────────────────────────────────────────────────────────
  const SITE_NAME = "Avuzwa"; 
  async function loadProducts() {
  try {
    const res = await fetch('./products.json');

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);

    }

    const data = await res.json();
    return data.products;
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}
 let temp = loadProducts();
console.log(temp);
const PRODUCTS = [temp];
console.log(PRODUCTS);
async function init() {
  const result = await loadProducts();

  console.log(result); // full object
  console.log(result.products); // array

  const names = result.products.map(p => p.name);
  console.log(names);
}

init();
  let cart = [];
  document.querySelectorAll('[id^="siteName"]').forEach(el => el.textContent = SITE_NAME);

  // ─── PAGE NAVIGATION ────────────────────────────────────────────────
  function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.textContent.trim().toLowerCase() === pageId || (pageId === 'shop' && l.textContent.trim() === 'Shop'));
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(`[Nav] Navigated to: ${pageId}`);
    if (pageId === 'cart') renderCart();
  }

  // ─── MOBILE NAV ─────────────────────────────────────────────────────
  function toggleMobileNav() { document.getElementById('mobileNav').classList.toggle('open'); }
  function closeMobileNav() { document.getElementById('mobileNav').classList.remove('open'); }

  // ─── STICKY HEADER ──────────────────────────────────────────────────
  window.addEventListener('scroll', () => {
    document.getElementById('mainHeader').classList.toggle('scrolled', window.scrollY > 20);
  });

  // ─── RENDER PRODUCT CARD ────────────────────────────────────────────
  function renderCard(p) {
    const badge = p.badge ? `<div class="product-badge ${p.badge === 'new' ? 'new' : ''}">${p.badge}</div>` : '';
    return `
      <div class="product-card" data-cat="${p.category}" data-id="${p.id}">
        <div class="product-img-wrap">
          <div class="art-placeholder" style="height:100%;position:relative;">
            <img src="images/${p.id}.jpg" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; display:block;" />
          </div>
          ${badge}
        </div>
        <div class="product-body">
          <div class="product-name">${p.name}</div>
          <div class="product-desc">${p.desc}</div>
          <div class="product-footer">
            <span class="product-price">R ${p.price.toLocaleString()}</span>
            <button class="add-cart-btn" onclick="addToCart(${p.id})">Add to Cart</button>
          </div>
        </div>
      </div>`;
  }

  // ─── RENDER GRIDS ───────────────────────────────────────────────────
  function renderHomeGrid() {
  const grid = document.getElementById('productsGrid');
  if (!grid || !PRODUCTS.length) return;

  grid.innerHTML = PRODUCTS.slice(0, 6).map(renderCard).join('');
}
  function renderShopGrid(filter = 'all') {
  const grid = document.getElementById('shopGrid');
  if (!grid || !PRODUCTS.length) return;

  const filtered =
    filter === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(renderCard).join('');
}

  // ─── FILTER ─────────────────────────────────────────────────────────
  function filterProducts(cat, btn) {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const isShopPage = document.getElementById('shop').classList.contains('active');
    if (isShopPage) renderShopGrid(cat);
    else {
      const grid = document.getElementById('productsGrid');
      const cards = grid ? grid.querySelectorAll('.product-card') : [];
      cards.forEach(c => {
        c.style.display = (cat === 'all' || c.dataset.cat === cat) ? 'block' : 'none';
      });
    }
    console.log(`[Filter] Category: ${cat}`);
  }

  // ─── CART LOGIC ─────────────────────────────────────────────────────
  function addToCart(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    const existing = cart.find(i => i.id === id);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      cart.push({ ...p, qty: 1 });
    }
    updateCartCount();
    showToast(`🖼️ "${p.name}" added to cart`);
    console.log(`[Cart] Added: ${p.name}`, cart);
  }

  function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartCount();
    renderCart();
    console.log(`[Cart] Removed item ${id}`, cart);
  }

  function updateCartCount() {
    const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
    const el = document.getElementById('cartCount');
    el.textContent = total;
    el.classList.toggle('hidden', total === 0);
  }

  function getCartTotal() {
    return cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  }

  // ─── RENDER CART PAGE ───────────────────────────────────────────────
  function renderCart() {
    const layout = document.getElementById('cartLayout');
    if (!layout) return;

    if (cart.length === 0) {
      layout.innerHTML = `
        <div class="empty-cart" style="grid-column:1/-1;">
          <div class="empty-cart-icon">🎨</div>
          <h3>Your cart is empty</h3>
          <p>Discover original artworks ready for their new home.</p>
          <button class="btn-primary" onclick="showPage('shop')">Browse the Gallery →</button>
        </div>`;
      return;
    }

    const itemsHtml = cart.map(i => `
      <div class="cart-item">
        <div class="cart-item-img">
          <div class="art-placeholder" style="height:100%;position:relative;">
              <img src="${i.image}" alt="${i.name}" style="width:100%; height:100%; object-fit:cover; display:block;" />
          </div>
        </div>
        <div>
          <div class="cart-item-name">${i.name}</div>
          <div class="cart-item-meta">${i.category} · Qty: ${i.qty || 1}</div>
          <div class="cart-item-price">R ${(i.price * (i.qty || 1)).toLocaleString()}</div>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${i.id})" title="Remove">✕</button>
      </div>`).join('');

    const total = getCartTotal();
    const shipping = total > 5000 ? 0 : 350;

    layout.innerHTML = `
      <div class="cart-items">${itemsHtml}</div>
      <div class="order-summary">
        <h3>Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>R ${total.toLocaleString()}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free 🎉' : 'R ' + shipping}</span></div>
        <div class="summary-row"><span>VAT (15%)</span><span>R ${Math.round(total * 0.15).toLocaleString()}</span></div>
        <div class="summary-row total"><span>Total</span><span>R ${(total + shipping + Math.round(total * 0.15)).toLocaleString()}</span></div>
        <div class="promo-row">
          <input class="promo-input" placeholder="Promo code" id="promoCode"/>
          <button class="promo-btn" onclick="applyPromo()">Apply</button>
        </div>
        <button class="checkout-btn" onclick="openCheckout()">Proceed to Checkout →</button>
        <div class="payment-icons">
          <span class="payment-icon">💳 Card</span>
          <span class="payment-icon">📱 EFT</span>
          <span class="payment-icon">🏦 Bank</span>
          <span class="payment-icon">🔐 Secure</span>
        </div>
      </div>`;
    console.log('[Cart] Rendered, total: R', total);
  }

  // ─── PROMO ──────────────────────────────────────────────────────────
  function applyPromo() {
    const code = document.getElementById('promoCode')?.value?.trim().toUpperCase();
    if (code === 'FARM10') { showToast('🎉 10% discount applied!'); }
    else { showToast('❌ Invalid promo code'); }
    console.log(`[Promo] Entered: ${code}`);
  }

  // ─── CHECKOUT MODAL ─────────────────────────────────────────────────
  let checkoutStep = 1;
  let selectedPayment = 'card';

  function openCheckout() {
    checkoutStep = 1;
    renderCheckoutStep();
    document.getElementById('checkoutModal').classList.add('open');
    document.body.style.overflow = 'hidden';
    console.log('[Checkout] Opened');
  }

  function closeModal() {
    document.getElementById('checkoutModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  function closeModalOutside(e) {
    if (e.target === document.getElementById('checkoutModal')) closeModal();
  }

  function renderCheckoutStep() {
    const content = document.getElementById('checkoutContent');
    const title = document.getElementById('modalTitle');
    const total = getCartTotal();
    const shipping = total > 5000 ? 0 : 350;
    const finalTotal = total + shipping + Math.round(total * 0.15);

    const stepsBar = `
      <div class="checkout-steps">
        <div class="checkout-step ${checkoutStep >= 1 ? 'active' : ''}">1. Details</div>
        <div class="checkout-step ${checkoutStep >= 2 ? 'active' : ''}">2. Payment</div>
        <div class="checkout-step ${checkoutStep >= 3 ? 'active' : ''}">3. Confirm</div>
      </div>`;

    if (checkoutStep === 1) {
      title.textContent = 'Delivery Details';
      content.innerHTML = `
        ${stepsBar}
        <div class="form-row">
          <div class="form-group"><label>First Name</label><input class="form-control" id="f_first" placeholder="Clara" /></div>
          <div class="form-group"><label>Last Name</label><input class="form-control" id="f_last" placeholder="van der Berg" /></div>
        </div>
        <div class="form-group"><label>Email Address</label><input class="form-control" id="f_email" type="email" placeholder="you@example.com" /></div>
        <div class="form-group"><label>Phone Number</label><input class="form-control" id="f_phone" placeholder="+27 82 000 0000" /></div>
        <div class="form-group"><label>Delivery Address</label><input class="form-control" id="f_addr" placeholder="12 Farm Lane, Beaufort West" /></div>
        <div class="form-row">
          <div class="form-group"><label>City</label><input class="form-control" id="f_city" placeholder="Cape Town" /></div>
          <div class="form-group"><label>Postal Code</label><input class="form-control" id="f_zip" placeholder="8000" /></div>
        </div>
        <div class="modal-footer">
          <button class="modal-btn-back" onclick="closeModal()">Cancel</button>
          <button class="modal-btn-next" onclick="nextCheckoutStep()">Continue to Payment →</button>
        </div>`;
    } else if (checkoutStep === 2) {
      title.textContent = 'Payment';
      content.innerHTML = `
        ${stepsBar}
        <p style="font-size:0.88rem;color:var(--text-light);margin-bottom:20px;">Choose how you'd like to pay for your artwork.</p>
        <div class="payment-methods">
          <button class="pay-method ${selectedPayment === 'card' ? 'selected' : ''}" onclick="selectPayment('card', this)">💳 Credit / Debit Card</button>
          <button class="pay-method ${selectedPayment === 'eft' ? 'selected' : ''}" onclick="selectPayment('eft', this)">📱 Instant EFT</button>
          <button class="pay-method ${selectedPayment === 'bank' ? 'selected' : ''}" onclick="selectPayment('bank', this)">🏦 Bank Transfer</button>
        </div>
        ${selectedPayment === 'card' ? `
          <div class="form-group" style="margin-top:20px;"><label>Card Number</label><input class="form-control" placeholder="•••• •••• •••• ••••" maxlength="19" /></div>
          <div class="form-row">
            <div class="form-group"><label>Expiry</label><input class="form-control" placeholder="MM / YY" /></div>
            <div class="form-group"><label>CVV</label><input class="form-control" placeholder="•••" maxlength="4" /></div>
          </div>
          <div class="form-group"><label>Cardholder Name</label><input class="form-control" placeholder="Clara van der Berg" /></div>` : ''}
        ${selectedPayment === 'eft' ? `<div style="background:var(--green-pale);padding:20px;border-radius:12px;margin-top:16px;font-size:0.88rem;color:var(--green-dark);">You'll be redirected to your bank's secure portal to complete the payment instantly.</div>` : ''}
        ${selectedPayment === 'bank' ? `<div style="background:var(--cream);padding:20px;border-radius:12px;margin-top:16px;font-size:0.85rem;color:var(--text-mid);">
          <strong style="color:var(--green-dark);">Bank Details</strong><br/><br/>
          Bank: First National Bank<br/>Account: Farmer Art Studio<br/>Account No: 6200 1234 567<br/>Branch: 250 655<br/>Reference: YOUR EMAIL
        </div>` : ''}
        <div class="summary-row total" style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(45,74,30,0.1);">
          <span>Order Total</span><span>R ${finalTotal.toLocaleString()}</span>
        </div>
        <div class="modal-footer">
          <button class="modal-btn-back" onclick="prevCheckoutStep()">← Back</button>
          <button class="modal-btn-next" onclick="nextCheckoutStep()">Review Order →</button>
        </div>`;
    } else if (checkoutStep === 3) {
      title.textContent = 'Confirm Order';
      const itemsList = cart.map(i => `
        <div class="summary-row"><span>${i.name} ×${i.qty||1}</span><span>R ${(i.price*(i.qty||1)).toLocaleString()}</span></div>`).join('');
      content.innerHTML = `
        ${stepsBar}
        <p style="font-size:0.88rem;color:var(--text-light);margin-bottom:20px;">Review your order before placing it.</p>
        ${itemsList}
        <div class="summary-row" style="border-top:1px solid rgba(45,74,30,0.1);margin-top:8px;padding-top:12px;">
          <span>Shipping</span><span>${shipping === 0 ? 'Free' : 'R '+shipping}</span>
        </div>
        <div class="summary-row"><span>VAT (15%)</span><span>R ${Math.round(total*0.15).toLocaleString()}</span></div>
        <div class="summary-row total"><span>Total</span><span>R ${finalTotal.toLocaleString()}</span></div>
        <div style="background:var(--green-pale);padding:14px 18px;border-radius:10px;margin-top:16px;font-size:0.82rem;color:var(--green-dark);">
          🚚 Estimated delivery: 5–10 business days · Tracked & insured
        </div>
        <div class="modal-footer">
          <button class="modal-btn-back" onclick="prevCheckoutStep()">← Back</button>
          <button class="modal-btn-next" onclick="placeOrder()">Place Order 🌿</button>
        </div>`;
    } else if (checkoutStep === 4) {
      title.textContent = 'Order Placed!';
      content.innerHTML = `
        <div class="success-screen">
          <div class="success-icon">🌾</div>
          <h2>Thank you for your order!</h2>
          <p>Your artwork is in Clara's hands now. You'll receive a confirmation email shortly with tracking details.</p>
          <p style="font-size:0.85rem;color:var(--text-light);">Order reference: #FRM-${Math.floor(Math.random()*90000+10000)}</p>
          <button class="btn-primary" style="margin-top:24px;" onclick="closeModal(); cart=[]; updateCartCount(); showPage('home');">Back to Gallery →</button>
        </div>`;
    }
  }

  function nextCheckoutStep() {
    checkoutStep++;
    renderCheckoutStep();
    console.log(`[Checkout] Step: ${checkoutStep}`);
  }
  function prevCheckoutStep() {
    checkoutStep--;
    renderCheckoutStep();
  }
  function selectPayment(method, btn) {
    selectedPayment = method;
    renderCheckoutStep();
    console.log(`[Payment] Selected: ${method}`);
  }
  function placeOrder() {
    checkoutStep = 4;
    renderCheckoutStep();
    console.log('[Order] Placed!', cart);
  }

  // ─── TOAST ──────────────────────────────────────────────────────────
  let toastTimer;
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
  }

  // ─── NEWSLETTER ─────────────────────────────────────────────────────
  function subscribeNewsletter(e) {
    e.preventDefault();
    showToast('🌿 You\'re subscribed! Welcome to the farm.');
    e.target.reset();
    console.log('[Newsletter] Subscribed');
  }

  // ─── INIT ────────────────────────────────────────────────────────────
  document.getElementById("productsGrid").innerHTML =
  PRODUCTS.map(renderCard).join('');
  console.log(`[Init] ${SITE_NAME} website loaded`);
