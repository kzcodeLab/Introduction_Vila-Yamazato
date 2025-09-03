document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS (Animate on Scroll) Library
  AOS.init({
      duration: 800,
      once: true,
      offset: 50,
  });

  // Function to load recommended spots
  const loadSpots = () => {
    const spotsContainer = document.querySelector('#spots-container');
    if (!spotsContainer) return;

    // Data is expected to be available in `window.spotsData`
    const data = window.spotsData || [];
    if (data.length === 0) return;

    try {
      const sectionOrder = [
        {key:'breakfast', ja:'朝ご飯', en:'breakfast'},
        {key:'lunch',     ja:'ランチ', en:'lunch'},
        {key:'dinner',    ja:'ディナー', en:'dinner'},
        {key:'cafe',      ja:'カフェ', en:'cafe'},
        {key:'spots',     ja:'観光',   en:'sightseeing'},
        {key:'others',    ja:'その他', en:'others'}
      ];

      let finalHtml = '';

      for (const sec of sectionOrder) {
        const items = data.filter(d => d.category === sec.key);
        if (items.length === 0) continue;

        items.sort((a, b) => (a.sort || a.drive_min || 0) - (b.sort || b.drive_min || 0));

        let cardsHtml = '';
        for (const s of items) {
          cardsHtml += `
            <article class="card" data-aos="fade-up">
              <figure>
                <img src="${s.img}" alt="${s.alt||s.title_ja}" loading="lazy" decoding="async">
                <figcaption class="sr-only">${s.title_en||''}</figcaption>
              </figure>
              <div>
                <div class="badge" aria-hidden="true">${s.drive_label || (s.drive_min ? `車で${s.drive_min}分` : '徒歩圏内')}</div>
                <h3 class="title-ja">${s.title_ja}</h3>
                <p class="title-en">${s.title_en||''}</p>
                <p class="desc">${s.desc||''}</p>
                ${s.map_url ? `<a class="map" href="${s.map_url}" target="_blank" rel="noopener">Googleマップで見る</a>` : ''}
                <p class="sr-only">山里の家から ${s.drive_label || (s.drive_min ? `車で${s.drive_min}分` : '徒歩圏内')} のスポットです。</p>
              </div>
            </article>`;
        }

        finalHtml += `
          <section class="section">
            <h2>${sec.ja}</h2>
            <p class="en">${sec.en}</p>
            <div class="grid">${cardsHtml}</div>
          </section>`;
      }

      spotsContainer.innerHTML = finalHtml;
      AOS.refresh();

    } catch (error) {
      console.error("An error occurred while rendering spots:", error);
      spotsContainer.innerHTML = `<p style="text-align: center; padding: 40px; color: red;">エラー：スポットの表示中に問題が発生しました。</p>`;
    }
  };

  loadSpots();
});