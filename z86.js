const RAM = new Uint8Array(2 * 1024 * 1024 * 1024); // 2GB RAM

function boot() {
    const fileInput = document.getElementById('biosInput');
    const statusDiv = document.getElementById('status');

    if (!fileInput.files.length) {
        alert("Lütfen önce bir BIOS dosyası (.bin) seç!");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    statusDiv.innerText = "Yükleniyor...";

    reader.onload = function(e) {
        const biosData = new Uint8Array(e.target.result);
        
        // BIOS Vektörü: RAM'in sonuna (0xFFFF0000) yerleştiriyoruz
        const biosStart = 0xFFFF0000 - biosData.length + 1;
        RAM.set(biosData, biosStart);
        
        statusDiv.innerText = "Başarılı! " + biosData.length + " bayt yüklendi.";
        console.log("BIOS Başlangıç Adresi: 0x" + biosStart.toString(16).toUpperCase());
        
        // İşlemciyi tetikle
        runCpu(biosStart);
    };

    reader.readAsArrayBuffer(file);
}

function runCpu(ip) {
    let opcode = RAM[ip];
    console.log("İşlemci ilk komutu okudu: 0x" + opcode.toString(16).toUpperCase());
    
    // Ekrana yazdır
    const canvas = document.getElementById('screen');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillText("CPU Başlatıldı! İlk Opcode: 0x" + opcode.toString(16).toUpperCase(), 20, 50);
}
