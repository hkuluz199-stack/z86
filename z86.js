const RAM = new Uint8Array(2 * 1024 * 1024 * 1024); // 2GB RAM

async function boot() {
    const statusDiv = document.getElementById('status');
    const driveUrl = "https://drive.google.com/uc?export=download&id=1xJfpnLIkM8xGe8CF4jeu3XMWxsUOzurW";
    
    statusDiv.innerText = "BIOS Google Drive'dan indiriliyor...";
    
    try {
        const response = await fetch(driveUrl);
        if (!response.ok) throw new Error("Dosya çekilemedi!");
        
        const buffer = await response.arrayBuffer();
        const biosData = new Uint8Array(buffer);
        
        // BIOS'u RAM'in sonuna (Reset Vektörü) yerleştir
        const biosStart = 0xFFFF0000 - biosData.length + 1;
        RAM.set(biosData, biosStart);
        
        statusDiv.innerText = "Başarılı! BIOS Boyutu: " + biosData.length + " byte. İşlemci başlıyor...";
        console.log("BIOS RAM'e yüklendi. Başlangıç: 0x" + biosStart.toString(16).toUpperCase());
        
        runCpu(biosStart);
    } catch (e) {
        statusDiv.innerText = "HATA: " + e.message;
        console.error(e);
    }
}

function runCpu(ip) {
    let opcode = RAM[ip];
    console.log("İşlemci BIOS'tan ilk komutu okudu: 0x" + opcode.toString(16).toUpperCase());
    
    const ctx = document.getElementById('screen').getContext('2d');
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("BIOS YÜKLENDİ: " + ip.toString(16).toUpperCase(), 50, 50);
}
