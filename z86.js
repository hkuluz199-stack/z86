const RAM = new Uint8Array(2 * 1024 * 1024 * 1024);

async function boot() {
    const fileInput = document.getElementById('biosInput');
    if (fileInput.files.length === 0) {
        alert("Önce BIOS dosyasını seç!");
        return;
    }

    const file = fileInput.files[0];
    const buffer = await file.arrayBuffer();
    const biosData = new Uint8Array(buffer);

    // RAM'e yaz
    const biosStart = 0xFFFF0000 - biosData.length + 1;
    RAM.set(biosData, biosStart);

    console.log("BIOS Yüklendi! Boyut: " + biosData.length);
    console.log("CPU 0x" + biosStart.toString(16) + " adresinden başlıyor.");
    
    // Ekrana ilk komutu bas
    document.getElementById('screen').getContext('2d').fillStyle = "white";
    document.getElementById('screen').getContext('2d').fillText("MSI BIOS Z86 LOADED...", 50, 50);
}
