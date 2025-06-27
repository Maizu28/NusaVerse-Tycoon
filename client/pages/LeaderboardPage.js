import React from 'react';

const LeaderboardPage = () => {
    // Fetch dan tampilkan data leaderboard dari API
    // const [leaders, setLeaders] = useState([]);
    
    return (
        <div>
            <h1>Papan Peringkat</h1>
            <p>Peringkat pemain berdasarkan total kekayaan bersih.</p>
            <table>
                <thead>
                    <tr>
                        <th>Peringkat</th>
                        <th>Nama Pemain</th>
                        <th>Kekayaan Bersih</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Loop data leaderboard di sini */}
                    <tr>
                        <td>1</td>
                        <td>SultanAndara</td>
                        <td>$9,123,456,789</td>
                    </tr>
                     <tr>
                        <td>...</td>
                        <td>(Fitur sedang dikembangkan)</td>
                        <td>...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default LeaderboardPage;