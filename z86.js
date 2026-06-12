window.onload = function() {
    const output = document.getElementById('output');
    const btn = document.getElementById('startBtn');

    btn.onclick = function() {
        const fileInput = document.getElementById('biosInput');
        if (!fileInput.files[0]) { alert("BIOS dosyası seç!"); return; }

        const reader = new FileReader();
        reader.onload = function(e) {
            const biosData = new Uint8Array(e.target.result);
            output.innerHTML = "BIOS boyutu: " + biosData.length + " bayt.<br>";

            // İşlemci Döngüsü (BIOS'un ilk 256 baytını analiz et)
            for (let i = 0; i < 256; i++) {
                let opcode = biosData[i];
                let hex = opcode.toString(16).toUpperCase().padStart(2, '0');
                
                output.innerHTML += `Adres: 0x${i.toString(16).toUpperCase().padStart(4, '0')} | Opcode: 0x${hex}<br>`;
            }
            output.innerHTML += "--- Analiz Tamamlandı ---";
        };
        reader.readAsArrayBuffer(fileInput.files[0]);
    };
};
