import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowLeft, XCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

// Assuming these are coming from your Shadcn UI components
const Button = ({ children, ...props }) => <button {...props} className={`p-2 rounded-lg transition-colors ${props.className}`}>{children}</button>;
const Input = ({ ...props }) => <input {...props} className="w-full p-2 border rounded-lg bg-gray-100 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />;
const Textarea = ({ ...props }) => <textarea {...props} className="w-full p-2 border rounded-lg bg-gray-100 text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />;
const Card = ({ children, ...props }) => <div {...props} className={`p-6 rounded-2xl shadow-lg border border-gray-200 bg-white ${props.className}`}>{children}</div>;
const Label = ({ children, ...props }) => <label {...props} className="block text-sm font-medium mb-1 text-gray-600">{children}</label>;

// Create a dynamic map of all Lucide icons, filtering for only valid components
const iconMap = Object.keys(LucideIcons)
    .filter(name => typeof LucideIcons[name] === 'function' && name[0] === name[0].toUpperCase())
    .reduce((acc, name) => {
        acc[name] = LucideIcons[name];
        return acc;
    }, {});

const initialServiceState = {
    id: null,
    icon: 'Shield',
    title: '',
    description: '',
    features: [''],
    buttonText: '',
};

export const CreateInsuranceService = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState(initialServiceState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };

    const removeFeature = (index) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const IconComponent = iconMap[formData.icon] || LucideIcons.Home;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full max-w-4xl mx-auto py-8 bg-gray-50"
        >
            <div className="flex items-center justify-between mb-8">
                <Button onClick={onCancel} className="bg-gray-200 hover:bg-gray-300 text-gray-700">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Services
                </Button>
                <h1 className="text-3xl font-bold text-gray-900">Add New Insurance Service</h1>
            </div>

            <Card className="p-8">
                <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="title">Service Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Life Insurance"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="buttonText">Button Text</Label>
                            <Input
                                id="buttonText"
                                name="buttonText"
                                value={formData.buttonText}
                                onChange={handleChange}
                                placeholder="e.g., Plan Your Life Goals"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="A short description of the service."
                            rows={3}
                            required
                        />
                    </div>
                    <div className="space-y-4">
                        <Label>Features</Label>
                        {formData.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-2"
                            >
                                <Input
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    placeholder={`Feature ${index + 1}`}
                                    required
                                />
                                <Button
                                    type="button"
                                    onClick={() => removeFeature(index)}
                                    className="p-1 rounded-full text-red-500 hover:bg-red-500/10"
                                >
                                    <XCircle className="w-5 h-5" />
                                </Button>
                            </motion.div>
                        ))}
                        <Button
                            type="button"
                            onClick={addFeature}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Feature
                        </Button>
                    </div>
                    <div>
                        <Label>Select Icon</Label>
                        <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 overflow-y-auto max-h-96 p-4 border rounded-xl border-gray-300 bg-gray-50">
                            {Object.keys(iconMap).map(iconName => {
                                const IconComp = iconMap[iconName];
                                const isSelected = formData.icon === iconName;
                                return (
                                    <motion.div
                                        key={iconName}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`p-4 rounded-xl cursor-pointer transition-colors ${isSelected ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                            }`}
                                        onClick={() => setFormData(prev => ({ ...prev, icon: iconName }))}
                                    >
                                        <IconComp className="w-8 h-8 mx-auto" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <motion.div
                        className="flex justify-end gap-4 pt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            <Plus className="w-4 h-4 mr-2" /> Create Service
                        </Button>
                    </motion.div>
                </form>
            </Card>
        </motion.div>
    );
};
