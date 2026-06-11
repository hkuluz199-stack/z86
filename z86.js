window.onload = function() {
    const canvas = document.getElementById('screen');
    const logEl = document.getElementById('console');
    function log(m) { logEl.innerText += "> " + m + "\n"; }

    // Klavye Girdisi
    document.addEventListener('keydown', (e) => {
        log("Tuşa basıldı: " + e.key + " (Kod: " + e.keyCode + ")");
        // BIOS'un klavye portuna (0x60) veri gönder
    });

    // Mouse Girdisi
    canvas.addEventListener('mousemove', (e) => {
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        // Mouse koordinatlarını BIOS'a gönder
    });

    // Başlatma
    document.getElementById('btn').onclick = function() {
        log("Emülatör başlatıldı. Ekrana tıkla ve klavyeyi kullan!");
    };
};
