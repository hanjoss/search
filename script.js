document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const googleCheckbox = document.getElementById('googleCheckbox');
    const bingCheckbox = document.getElementById('bingCheckbox');
    const braveCheckbox = document.getElementById('braveCheckbox');

    // Fungsi untuk menyimpan status checkbox ke localStorage
    const saveCheckboxState = () => {
        localStorage.setItem('googleChecked', googleCheckbox.checked);
        localStorage.setItem('bingChecked', bingCheckbox.checked);
        localStorage.setItem('braveChecked', braveCheckbox.checked);
    };

    // Fungsi untuk memuat status checkbox dari localStorage
    const loadCheckboxState = () => {
        const googleChecked = localStorage.getItem('googleChecked');
        const bingChecked = localStorage.getItem('bingChecked');
        const braveChecked = localStorage.getItem('braveChecked');

        if (googleChecked !== null) {
            googleCheckbox.checked = googleChecked === 'true';
        }
        if (bingChecked !== null) {
            bingCheckbox.checked = bingChecked === 'true';
        }
        if (braveChecked !== null) {
            braveCheckbox.checked = braveChecked === 'true';
        }
    };

    // Muat status checkbox saat halaman dimuat
    loadCheckboxState();

    // Tambahkan event listener untuk menyimpan status saat checkbox berubah
    googleCheckbox.addEventListener('change', saveCheckboxState);
    bingCheckbox.addEventListener('change', saveCheckboxState);
    braveCheckbox.addEventListener('change', saveCheckboxState);

    const performSearch = () => {
        const query = searchInput.value.trim(); // Ambil nilai input & hapus spasi ekstra

        if (query === "") {
            searchInput.focus();
            searchInput.classList.add('border-red-500');
            setTimeout(() => {
                searchInput.classList.remove('border-red-500');
            }, 1500);
            return;
        }

        searchInput.classList.remove('border-red-500');
        const encodedQuery = encodeURIComponent(query);
        const googleUrl = `https://www.google.com/search?q=${encodedQuery}`;
        const bingUrl = `https://www.bing.com/search?q=${encodedQuery}`;
        const braveUrl = `https://search.brave.com/search?q=${encodedQuery}`;

        const isAndroid = /Android/i.test(navigator.userAgent);

        if (isAndroid) {
            if (googleCheckbox.checked) window.location.href = googleUrl;
            if (bingCheckbox.checked && !googleCheckbox.checked) window.location.href = bingUrl;
            else if (bingCheckbox.checked && googleCheckbox.checked) window.open(bingUrl, '_blank');
            if (braveCheckbox.checked && !googleCheckbox.checked && !bingCheckbox.checked) window.location.href = braveUrl;
            else if (braveCheckbox.checked) window.open(braveUrl, '_blank');
        } else {
            if (googleCheckbox.checked) window.open(googleUrl, '_blank');
            if (bingCheckbox.checked) window.open(bingUrl, '_blank');
            if (braveCheckbox.checked) window.open(braveUrl, '_blank');
        }
    };

    // Tambahkan event listener untuk tombol klik
    searchButton.addEventListener('click', performSearch);

    // Tambahkan event listener untuk tombol Enter di input field
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch(); // Emulasi klik pada tombol Cari
        }
        searchInput.classList.remove('border-red-500');
    });
});
