document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const googleCheckbox = document.getElementById('googleCheckbox');
    const bingCheckbox = document.getElementById('bingCheckbox');
    const braveCheckbox = document.getElementById('braveCheckbox');

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
            // Coba buka di jendela saat ini (mungkin akan ditangani oleh sistem Android untuk dibuka di browser default)
            if (googleCheckbox.checked) window.location.href = googleUrl;
            if (bingCheckbox.checked && !googleCheckbox.checked) window.location.href = bingUrl; // Jika Google tidak dipilih
            else if (bingCheckbox.checked && googleCheckbox.checked) window.open(bingUrl, '_blank'); // Buka di tab baru jika Google juga dipilih
            if (braveCheckbox.checked && !googleCheckbox.checked && !bingCheckbox.checked) window.location.href = braveUrl; // Jika Google dan Bing tidak dipilih
            else if (braveCheckbox.checked) window.open(braveUrl, '_blank'); // Buka di tab baru jika ada yang lain dipilih
        } else {
            // Perilaku untuk PC (buka di tab baru)
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
