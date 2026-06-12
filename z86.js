document.getElementById('btn').onclick = function() {
    const fileInput = document.getElementById('biosInput');
    if (!fileInput.files[0]) {
        alert("BIOS dosyası seç!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const biosData = new Uint8Array(e.target.result);
        const logEl = document.getElementById('console');
        
        logEl.innerText = "BIOS Yüklendi! Toplam " + biosData.length + " bayt.\n";
        logEl.innerText += "İşlemci kodları analiz ediyor...\n";

        // BIOS'un ilk 100 komutunu (opcode) döngüyle ekrana bas
        for (let i = 0; i < 100; i++) {
            let opcode = biosData[i];
            // Eğer dosya biterse döngüden çık
            if (opcode === undefined) break;
            
            let hex = opcode.toString(16).toUpperCase().padStart(2, '0');
            logEl.innerText += "Adres 0x" + i.toString(16).toUpperCase() + ": " + hex + "\n";
        }
        logEl.innerText += "--- ANALİZ TAMAMLANDI ---";
    };
    reader.readAsArrayBuffer(fileInput.files[0]);
};
