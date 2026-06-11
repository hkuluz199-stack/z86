async function boot() {
    const fileInput = document.getElementById('biosInput');
    const statusDiv = document.getElementById('status');

    if (!fileInput.files[0]) {
        alert("Lütfen önce BIOS dosyasını seç!");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    statusDiv.innerText = "BIOS RAM'e yükleniyor, lütfen bekle...";

    reader.onload = function(e) {
        const biosData = new Uint8Array(e.target.result);
        const biosStart = 0xFFFF0000 - biosData.length + 1;
        
        // RAM'e yaz
        RAM.set(biosData, biosStart);
        
        statusDiv.innerText = "Başarılı! " + biosData.length + " bayt RAM'e yazıldı.";
        console.log("BIOS başarıyla RAM'e yüklendi. Başlangıç adresi: 0x" + biosStart.toString(16).toUpperCase());
        
        runCpu(biosStart);
    };

    reader.readAsArrayBuffer(file);
}
