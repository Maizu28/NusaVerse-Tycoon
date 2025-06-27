import React from 'react';

const MyShopPage = () => {
    // Di sini user bisa melihat item di inventarisnya dan menjualnya
    // Akan ada form untuk menentukan item, kuantitas, dan harga
    
    return (
        <div>
            <h1>Toko Saya</h1>
            <p>Jual item dari inventaris Anda ke pemain lain.</p>
            <div className="action-box">
                <h3>Jual Item</h3>
                 <p>Fitur toko sedang dalam pengembangan.</p>
                {/* Form untuk menjual item */}
            </div>
        </div>
    );
};

export default MyShopPage;