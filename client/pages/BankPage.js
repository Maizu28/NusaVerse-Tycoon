import React, { useState } from 'react';
import gameService from '../services/gameService';

const BankPage = () => {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleDeposit = async () => {
        setMessage('');
        try {
            const result = await gameService.deposit(parseInt(amount));
            setMessage(`Successfully deposited $${amount}. New balance: $${result.new_bank_balance}. Pajak: $${result.tax_paid}`);
            setAmount('');
        } catch (error) {
            setMessage('Deposit failed. Not enough funds or invalid amount.');
        }
    }

    const handleWithdraw = async () => {
        // Implementasi mirip dengan deposit
        setMessage('Fungsi withdraw belum diimplementasikan.');
    }

    return (
        <div>
            <h1>Bank Internasional</h1>
            <div className="info-box">
                <p>Simpan uangmu di sini agar aman dari pencuri. Dikenakan pajak admin 2% untuk setiap setoran.</p>
            </div>
            <div className="action-box">
                <h3>Transaksi</h3>
                <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Masukkan jumlah"
                    style={{padding: '8px', marginRight: '10px'}}
                />
                <button onClick={handleDeposit} className="btn btn-primary" style={{marginRight: '10px'}}>Setor</button>
                <button onClick={handleWithdraw} className="btn btn-secondary">Tarik</button>
                {message && <p style={{marginTop: '15px'}}>{message}</p>}
            </div>
        </div>
    );
};

export default BankPage;