document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    const performSearch = () => {
        const query = searchInput.value.trim(); // Ambil nilai input & hapus spasi ekstra

        if (query === "") {
            // Bisa diganti dengan notifikasi yang lebih halus jika diinginkan
            searchInput.focus(); // Fokuskan kembali ke input
            searchInput.style.borderColor = '#ff4d4d'; // Contoh: border merah
             // Hapus border merah setelah beberapa saat
            setTimeout(() => {
                 searchInput.style.borderColor = '#d2d2d7';
            }, 1500);
            return; // Hentikan jika input kosong
        }

        // Reset border jika sebelumnya error
        searchInput.style.borderColor = '#d2d2d7';

        // Encode query agar aman digunakan di URL
        const encodedQuery = encodeURIComponent(query);

        // Buat URL pencarian
        const googleUrl = `https://www.google.com/search?q=${encodedQuery}`;
        const bingUrl = `https://www.bing.com/search?q=${encodedQuery}`;
        const braveUrl = `https://search.brave.com/search?q=${encodedQuery}`;

        // Buka setiap URL di tab baru (Popup)
        window.open(googleUrl, '_blank');
        window.open(bingUrl, '_blank');
        window.open(braveUrl, '_blank');
    };

    // Tambahkan event listener untuk tombol klik
    searchButton.addEventListener('click', performSearch);

    // Tambahkan event listener untuk tombol Enter di input field
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
        // Hapus indikator error saat user mulai mengetik lagi
        searchInput.style.borderColor = '#d2d2d7';
    });
});
