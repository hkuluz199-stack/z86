// MSI Z790'da 64MB RAM alanı, modern UEFI'nin ilk katmanı için yeterlidir.
const RAM = new Uint8Array(64 * 1024 * 1024);
const logEl = document.getElementById('console');

function log(msg) { logEl.innerText += "> " + msg + "\n"; }

function boot() {
    const file = document.getElementById('biosInput').files[0];
    if (!file) return alert("BIOS dosyasını seç!");

    const reader = new FileReader();
    reader.onload = function(e) {
        const biosData = new Uint8Array(e.target.result);
        
        // Z790 BIOS, SPI Flash'ta (0xFF000000 - 0xFFFFFFFF) bulunur.
        // Emülasyonda BIOS'u RAM'in en sonuna yerleştiriyoruz.
        const biosStart = RAM.length - biosData.length;
        RAM.set(biosData, biosStart);
        
        log("MSI MAG Z790 BIOS imajı yüklendi.");
        log("SPI Flash Başlangıç: 0xFF000000");
        
        // Modern x86 işlemci "Reset Vector"u 0xFFFFFFF0'dır.
        const resetVector = 0xFFFFFFF0;
        const relativeAddress = biosStart + (resetVector - 0xFF000000);
        
        log("CPU Reset Vektörü: 0x" + resetVector.toString(16).toUpperCase());
        runCpu(relativeAddress);
    };
    reader.readAsArrayBuffer(file);
}

function runCpu(ip) {
    // İşlemci o noktadaki ilk komutu çekiyor
    let opcode = RAM[ip];
    log("İşlemci BIOS'tan ilk komutu okudu: 0x" + (opcode ? opcode.toString(16).toUpperCase() : "00"));
    log("Status: POST (Power-On Self Test) başlatılıyor...");
}
