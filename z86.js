// 2GB RAM Bloğu
const RAM = new Uint8Array(2 * 1024 * 1024 * 1024);

async function boot() {
    console.log("z86: MSI BIOS yükleniyor...");
    
    try {
        // BIOS dosyasını klasörden çekiyoruz
        const response = await fetch('./bios/msi_bios.bin');
        if (!response.ok) throw new Error("BIOS dosyası bulunamadı!");
        
        const biosBuffer = await response.arrayBuffer();
        const biosData = new Uint8Array(biosBuffer);

        // MSI BIOS'u reset vektörüne (0xFFFF0000 civarına) yerleştir
        const biosStart = 0xFFFF0000 - biosData.length + 1;
        RAM.set(biosData, biosStart);

        console.log("BIOS Başarıyla yüklendi! Boyut: " + biosData.length + " byte");
        console.log("Başlangıç Adresi: 0x" + biosStart.toString(16).toUpperCase());
        
        // İşlemciyi başlat
        runCpu(biosStart);
        
    } catch (e) {
        console.error("HATA: ", e.message);
    }
}

function runCpu(ip) {
    console.log("z86: İşlemci reset vektörüne atladı...");
    
    // İşlemci döngüsü (Fetch)
    let opcode = RAM[ip]; 
    console.log("BIOS'tan okunan ilk komut (Opcode): 0x" + opcode.toString(16).toUpperCase());
    
    if (opcode !== 0) {
        console.log("BAŞARILI: İşlemci BIOS kodlarını okumaya başladı!");
    } else {
        console.log("UYARI: İşlemci boş veri (0x00) okuyor. BIOS adreslemesi yanlış olabilir.");
    }
}