import React from 'react';

const MarketPage = () => {
    // Di sini Anda akan fetch data dari API untuk semua item yang dijual user lain
    // const [listings, setListings] = useState([]);
    // useEffect(() => { fetch listings... }, []);
    
    return (
        <div>
            <h1>Pasar Global</h1>
            <p>Beli item yang dijual oleh pemain lain.</p>
            <div className="listings-container">
                {/* Tampilkan daftar item di sini */}
                <p>Fitur pasar sedang dalam pengembangan.</p>
            </div>
        </div>
    );
};

export default MarketPage;