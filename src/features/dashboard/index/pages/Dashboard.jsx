import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, CreditCard, DollarSign, FileText } from 'lucide-react';
import Sidebar from '../../../../components/Sidebar';

const Dashboard = () => {
    // Sample data for charts
    const pieData = [
        { name: 'Personal Loans', value: 45, color: '#3b82f6' },
        { name: 'Auto Insurance', value: 30, color: '#10b981' },
        { name: 'Home Insurance', value: 15, color: '#f59e0b' },
        { name: 'Life Insurance', value: 10, color: '#ef4444' }
    ];

    const barData = [
        { month: 'Jan', loans: 120, insurance: 85 },
        { month: 'Feb', loans: 135, insurance: 92 },
        { month: 'Mar', loans: 148, insurance: 108 },
        { month: 'Apr', loans: 162, insurance: 115 },
        { month: 'May', loans: 175, insurance: 128 },
        { month: 'Jun', loans: 188, insurance: 142 }
    ];

    const lineData = [
        { month: 'Jan', customers: 1240 },
        { month: 'Feb', customers: 1380 },
        { month: 'Mar', customers: 1520 },
        { month: 'Apr', customers: 1680 },
        { month: 'May', customers: 1850 },
        { month: 'Jun', customers: 2020 }
    ];

    const metrics = [
        {
            title: 'Total Loans',
            value: '$2.4M',
            change: '+12.5%',
            icon: CreditCard,
            color: 'text-blue-600'
        },
        {
            title: 'Insurance Requests',
            value: '1,247',
            change: '+8.2%',
            icon: FileText,
            color: 'text-green-600'
        },
        {
            title: 'Active Quotes',
            value: '342',
            change: '+24.1%',
            icon: TrendingUp,
            color: 'text-purple-600'
        },
        {
            title: 'Revenue',
            value: '$187K',
            change: '+15.3%',
            icon: DollarSign,
            color: 'text-orange-600'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="min-h-screen overflow-y-auto flex-1 bg-gray-50 p-4 lg:p-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto space-y-6"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
                        <p className="text-sm text-gray-600">Welcome back! Here's what's happening with your business today.</p>
                    </motion.div>

                    {/* Metrics Cards */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
                    >
                        {metrics.map((metric, index) => (
                            <motion.div
                                key={metric.title}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                className="transform transition-all duration-200"
                            >
                                <Card className="shadow-sm hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-medium text-gray-600 mb-1">{metric.title}</p>
                                                <p className="text-xl font-bold text-gray-900">{metric.value}</p>
                                                <p className="text-xs text-green-600 font-medium">{metric.change}</p>
                                            </div>
                                            <div className={`p-2 rounded-lg bg-gray-100 ${metric.color}`}>
                                                <metric.icon className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Charts Grid */}
                    <div className="flex flex-wrap gap-4">
                        {/* Pie Chart */}
                        <motion.div variants={itemVariants} className="flex-1 min-w-[320px]">
                            <Card className="shadow-sm h-80 pb-16">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-semibold">Product Distribution</CardTitle>
                                </CardHeader>
                                <CardContent className="p-3 pt-0 h-full flex flex-col">
                                    <div className="flex-1">
                                        <ResponsiveContainer width="100%" height={200}>
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={70}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    {pieData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    formatter={(value) => [`${value}%`, '']}
                                                    labelStyle={{ fontSize: '11px' }}
                                                    contentStyle={{ fontSize: '11px', border: 'none', borderRadius: '6px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 mt-2">
                                        {pieData.map((item, index) => (
                                            <div key={index} className="flex items-center text-xs">
                                                <div
                                                    className="w-2 h-2 rounded-full mr-2"
                                                    style={{ backgroundColor: item.color }}
                                                ></div>
                                                <span className="text-gray-600 text-[10px]">{item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Bar Chart */}
                        <motion.div variants={itemVariants} className="flex-1 min-w-[320px]">
                            <Card className="shadow-sm h-80 pb-10">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-semibold">Monthly Requests</CardTitle>
                                </CardHeader>
                                <CardContent className="p-3 pt-0 h-full flex flex-col">
                                    <div className="flex-1">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={barData} barGap={8}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                <XAxis
                                                    dataKey="month"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 10, fill: '#6b7280' }}
                                                />
                                                <YAxis
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 10, fill: '#6b7280' }}
                                                />
                                                <Tooltip
                                                    contentStyle={{ fontSize: '11px', border: 'none', borderRadius: '6px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                />
                                                <Bar dataKey="loans" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                                                <Bar dataKey="insurance" fill="#10b981" radius={[2, 2, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;