import { motion } from 'framer-motion';
import {
    Home, User, Briefcase, Coins, Building2, Shield, Heart, Clock, Car, Plane, Edit, Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const iconMap = {
    Home, User, Briefcase, Coins, Building2, Shield, Heart, Clock, Car, Plane,
};

export function ServiceCard({ service, index, onEdit, onDelete }) {
    const IconComponent = iconMap[service.icon] || Home;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
            className="group h-full"
        >
            {/* The main card container now uses CSS Grid */}
            <Card className="h-full bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 border-0 rounded-2xl overflow-hidden grid grid-rows-[1fr_auto]">
                <div className="p-6">
                    <CardHeader className="p-0 pb-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300">
                                        {service.title}
                                    </CardTitle>
                                </div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onEdit}
                                    className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                                >
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onDelete}
                                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0 space-y-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {service.description}
                        </p>
                        <div className="space-y-2">
                            {service.features.map((feature, featureIndex) => (
                                <motion.div
                                    key={featureIndex}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                                    <span className="text-sm text-card-foreground">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </div>

                {/* The button is now a separate grid item in the second row */}
                <div className="p-6 pt-0">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                            size="lg"
                        >
                            {service.buttonText}
                        </Button>
                    </motion.div>
                </div>
            </Card>
        </motion.div>
    );
}