/**
 * COMPONENTE: MessagesChart
 * 
 * Gráfico de mensagens mostrando:
 * - Mensagens recebidas nos últimos 7 dias (gráfico de barras)
 * - Distribuição por área de interesse (gráfico de pizza)
 */

import { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { getMessagesStats } from '../services/adminApi';
import '../styles/MessagesChart.css';

// Cores para o gráfico de pizza
const COLORS = ['#771220', '#cfa750', '#38a169', '#3b82f6', '#8b5cf6', '#ec4899'];

function MessagesChart() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const data = await getMessagesStats();
            setStats(data);
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error('Error loading stats:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="messages-chart">
                <div className="chart-loading">Carregando estatísticas...</div>
            </div>
        );
    }

    if (!stats) {
        return null;
    }

    return (
        <div className="messages-chart">
            {/* Gráfico de Barras - Últimos 7 Dias */}
            <div className="chart-section">
                <div className="chart-header">
                    <TrendingUp size={24} />
                    <h3>Mensagens dos Últimos 7 Dias</h3>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={stats.last7Days}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="label"
                            stroke="#6b7280"
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis
                            stroke="#6b7280"
                            style={{ fontSize: '12px' }}
                            allowDecimals={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            labelStyle={{ color: '#1f2937', fontWeight: '600' }}
                        />
                        <Bar
                            dataKey="count"
                            fill="#771220"
                            radius={[8, 8, 0, 0]}
                            name="Mensagens"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default MessagesChart;
