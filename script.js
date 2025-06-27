// Variabel Game
let money = 0;
let wheat = 0;
let wheatPrice = 1; // Harga jual gandum per unit
let autoHarvesters = 0;
const autoHarvesterCost = 100;

// Referensi Elemen HTML
const moneyDisplay = document.getElementById('money');
const wheatDisplay = document.getElementById('wheat');
const wheatPriceDisplay = document.getElementById('wheatPrice');
const harvestWheatButton = document.getElementById('harvestWheat');
const sellWheatButton = document.getElementById('sellWheat');
const buyAutoHarvesterButton = document.getElementById('buyAutoHarvester');
const autoHarvestersDisplay = document.getElementById('autoHarvesters');

// Fungsi untuk memperbarui tampilan game
function updateDisplay() {
    moneyDisplay.textContent = money;
    wheatDisplay.textContent = wheat;
    wheatPriceDisplay.textContent = wheatPrice;
    autoHarvestersDisplay.textContent = autoHarvesters;

    // Nonaktifkan tombol jual jika tidak ada gandum
    if (wheat <= 0) {
        sellWheatButton.disabled = true;
    } else {
        sellWheatButton.disabled = false;
    }

    // Nonaktifkan tombol beli pemanen otomatis jika uang tidak cukup
    if (money < autoHarvesterCost) {
        buyAutoHarvesterButton.disabled = true;
    } else {
        buyAutoHarvesterButton.disabled = false;
    }
}

// Event Listener untuk Tombol Panen Gandum
harvestWheatButton.addEventListener('click', () => {
    wheat += 1; // Tambah 1 gandum setiap kali klik
    updateDisplay();
});

// Event Listener untuk Tombol Jual Gandum
sellWheatButton.addEventListener('click', () => {
    if (wheat > 0) {
        money += wheat * wheatPrice; // Tambah uang berdasarkan jumlah gandum dan harga
        wheat = 0; // Reset gandum setelah dijual
        updateDisplay();
    }
});

// Event Listener untuk Tombol Beli Pemanen Otomatis
buyAutoHarvesterButton.addEventListener('click', () => {
    if (money >= autoHarvesterCost) {
        money -= autoHarvesterCost;
        autoHarvesters += 1;
        updateDisplay();
    }
});

// Fungsi untuk Pemanen Otomatis (berjalan setiap detik)
setInterval(() => {
    if (autoHarvesters > 0) {
        wheat += autoHarvesters; // Setiap pemanen otomatis menambah 1 gandum per detik
        updateDisplay();
    }
}, 1000); // 1000 milidetik = 1 detik

// Inisialisasi tampilan saat game pertama kali dimuat
updateDisplay();