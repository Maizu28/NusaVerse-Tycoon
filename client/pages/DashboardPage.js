import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import gameService from '../services/gameService';

const DashboardPage = () => {
  const { user } = useAuth();
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ganti dengan service yang mengambil semua data user (profesi, uang, dll)
        // Untuk sekarang kita gunakan data dari context
        setGameData({
            profile: user.profile,
            wallet: user.wallet,
            inventory: user.inventory || []
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleAction = async () => {
    setMessage('Performing action...');
    try {
        const result = await gameService.performProfessionAction();
        setMessage(result.message); // Backend harus mengembalikan pesan hasil aksi
        // Refresh data user setelah aksi berhasil
        // const updatedData = await gameService.getDashboardData();
        // setGameData(updatedData);
    } catch (error) {
        setMessage('Action failed!');
    }
  };

  if (loading) {
    return <div>Loading Dashboard...</div>;
  }
  
  if (!gameData) {
    return <div>Could not load game data.</div>;
  }

  const getActionText = () => {
    switch(user.profile.profession) {
        case 'petani': return 'Tanam Bibit Digital';
        case 'streamer': return 'Go Live!';
        case 'hacker': return 'Retas Jaringan';
        default: return 'Pilih Profesi';
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="info-box">
        <h2>Welcome, {user.username}!</h2>
        <p><strong>Profesi:</strong> {gameData.profile.profession || 'Belum dipilih'}</p>
        <p><strong>Level:</strong> {gameData.profile.level}</p>
        <p><strong>Uang di Tangan:</strong> ${gameData.wallet.on_hand.toLocaleString()}</p>
        <p><strong>Uang di Bank:</strong> ${gameData.wallet.in_bank.toLocaleString()}</p>
      </div>

      <div className="action-box">
        <h3>Aksi Profesi</h3>
        <button onClick={handleAction} className="btn btn-primary">{getActionText()}</button>
        {message && <p>{message}</p>}
      </div>

      <div className="inventory-box" style={{marginTop: '20px'}}>
        <h3>Inventaris</h3>
        {gameData.inventory.length > 0 ? (
            <ul>
                {gameData.inventory.map(item => (
                    <li key={item.itemId}>Item ID: {item.itemId} - Kuantitas: {item.quantity}</li>
                ))}
            </ul>
        ) : (
            <p>Inventaris Anda kosong.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;