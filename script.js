document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const googleCheckbox = document.getElementById('googleCheckbox');
    const bingCheckbox = document.getElementById('bingCheckbox');
    const braveCheckbox = document.getElementById('braveCheckbox');
    const yahooCheckbox = document.getElementById('yahooCheckbox');
    const ecosiaCheckbox = document.getElementById('ecosiaCheckbox');
    const aolCheckbox = document.getElementById('aolCheckbox');
    const yandexCheckbox = document.getElementById('yandexCheckbox');
    const startpageCheckbox = document.getElementById('startpageCheckbox');

    // Fungsi untuk menyimpan status checkbox ke localStorage
    const saveCheckboxState = () => {
        localStorage.setItem('googleChecked', googleCheckbox.checked);
        localStorage.setItem('bingChecked', bingCheckbox.checked);
        localStorage.setItem('braveChecked', braveCheckbox.checked);
        localStorage.setItem('yahooChecked', yahooCheckbox.checked);
        localStorage.setItem('ecosiaChecked', ecosiaCheckbox.checked);
        localStorage.setItem('aolChecked', aolCheckbox.checked);
        localStorage.setItem('yandexChecked', yandexCheckbox.checked);
        localStorage.setItem('startpageChecked', startpageCheckbox.checked);
    };

    // Fungsi untuk memuat status checkbox dari localStorage
    const loadCheckboxState = () => {
        googleCheckbox.checked = localStorage.getItem('googleChecked') === 'true';
        bingCheckbox.checked = localStorage.getItem('bingChecked') === 'true';
        braveCheckbox.checked = localStorage.getItem('braveChecked') === 'true';
        yahooCheckbox.checked = localStorage.getItem('yahooChecked') === 'true';
        ecosiaCheckbox.checked = localStorage.getItem('ecosiaChecked') === 'true';
        aolCheckbox.checked = localStorage.getItem('aolChecked') === 'true';
        yandexCheckbox.checked = localStorage.getItem('yandexChecked') === 'true';
        startpageCheckbox.checked = localStorage.getItem('startpageChecked') === 'true';
    };

    // Muat status checkbox saat halaman dimuat
    loadCheckboxState();

    // ========= PERUBAHAN 1: Simpan state saat tab ditutup =========
    window.addEventListener('beforeunload', saveCheckboxState);

    // Tambahkan event listener untuk menyimpan status saat checkbox berubah
    [googleCheckbox, bingCheckbox, braveCheckbox].forEach(checkbox => {
        checkbox.addEventListener('change', saveCheckboxState);
    });

    const performSearch = () => {
        const query = searchInput.value.trim();

        if (!query) {
            searchInput.focus();
            searchInput.classList.add('border-red-500');
            setTimeout(() => searchInput.classList.remove('border-red-500'), 1500);
            return;
        }

        searchInput.classList.remove('border-red-500');
        const encodedQuery = encodeURIComponent(query);
        
        // ========= PERUBAHAN 2: Logika pencarian disederhanakan =========
        const urls = {
            google: `https://www.google.com/search?q=${encodedQuery}`,
            bing: `https://www.bing.com/search?q=${encodedQuery}`,
            brave: `https://search.brave.com/search?q=${encodedQuery}`,
            yahoo: `https://search.yahoo.com/search?p=${encodedQuery}`,
            ecosia: `https://www.ecosia.org/search?method=index&q=${encodedQuery}`,
            aol: `https://search.aol.com/aol/search?q=${encodedQuery}`,
            yandex: `https://yandex.com/search/?text=${encodedQuery}`,
            startpage: `https://www.startpage.com/sp/search?query=${encodedQuery}`
        };

        // Buka semua tab baru dengan parameter khusus
        const openSearch = (url) => {
            window.open(url, '_blank', 'noopener,noreferrer'); // Parameter untuk menghindari pemblokiran
        };

        // ========= PERUBAHAN 3: Standarisasi perilaku di semua platform =========
        if (googleCheckbox.checked) openSearch(urls.google);
        if (bingCheckbox.checked) openSearch(urls.bing);
        if (braveCheckbox.checked) openSearch(urls.brave);
        if (yahooCheckbox.checked) openSearch(urls.yahoo);
        if (ecosiaCheckbox.checked) openSearch(urls.ecosia);
        if (aolCheckbox.checked) openSearch(urls.aol);
        if (yandexCheckbox.checked) openSearch(urls.yandex);
        if (startpageCheckbox.checked) openSearch(urls.startpage);
    };

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => e.key === 'Enter' && performSearch());
});
