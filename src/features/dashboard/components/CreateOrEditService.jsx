import React, { useState, useMemo, useEffect } from "react";
import { serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { saveInsuranceRequest, saveLoanRequest, updateInsuranceRequest, updateLoanRequest, uploadImageToFirebase } from "../../../services/firestoreService";
import { useServiceById } from "../../../hooks/useFirseStoreServices";
import { uploadImageToCloudinary } from "../../../services/uploadImageToCloudinary";

// --- Mock Sidebar ---

// --- Icon utilities ---
const iconNames = Object.keys(LucideIcons).filter(
    (key) => typeof LucideIcons[key] === "object" && LucideIcons[key]?.displayName
);

const DynamicIcon = ({ name, ...props }) => {
    const IconComponent = LucideIcons[name];
    if (!IconComponent) return <LucideIcons.HelpCircle {...props} />;
    return <IconComponent {...props} />;
};

// --- Reusable Inputs ---
const FloatingLabelInput = ({ id, label, value, onChange, ...props }) => (
    <div className="relative w-full">
        <input
            id={id}
            value={value}
            onChange={onChange}
            placeholder={label}
            className="peer block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-transparent focus:border-gray-500 focus:ring-2 focus:ring-gray-900/20 transition"
            {...props}
        />
        <label
            htmlFor={id}
            className={`absolute left-4 bg-white px-1 transition-all 
        ${value
                    ? "top-[-0.6rem] text-xs text-gray-800"
                    : "top-3.5 text-base text-gray-400 peer-focus:top-[-0.6rem] peer-focus:text-xs peer-focus:text-gray-800"}
      `}
        >
            {label}
        </label>
    </div>
);

const FloatingLabelTextarea = ({ id, label, value, onChange, ...props }) => (
    <div className="relative w-full">
        <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={label}
            rows="3"
            className="peer block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-transparent focus:border-gray-500 focus:ring-2 focus:ring-gray-900/20 transition"
            {...props}
        />
        <label
            htmlFor={id}
            className={`absolute left-4 bg-white px-1 transition-all 
        ${value
                    ? "top-[-0.6rem] text-xs text-gray-800"
                    : "top-3.5 text-base text-gray-400 peer-focus:top-[-0.6rem] peer-focus:text-xs peer-focus:text-gray-800"}
      `}
        >
            {label}
        </label>
    </div>
);


// --- Banner Upload Field ---
const BannerUpload = ({ banner, setBanner }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBanner({
                file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
                Banner Image
            </label>
            <div className="flex flex-col items-start gap-3">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-700 cursor-pointer"
                />
                {banner?.preview && (
                    <div className="relative">
                        <button onClick={() => setBanner(null)} className="absolute right-1 top-1"><LucideIcons.X className="font-semibold text-red-500" /></button>
                        <motion.img
                            src={banner.preview}
                            alt="Banner Preview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-lg border border-gray-200 max-h-40 object-cover"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Icon Picker Modal ---
const IconPickerModal = ({ isOpen, onClose, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredIcons = useMemo(() => {
        if (!searchTerm) return iconNames;
        return iconNames.filter((name) =>
            name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white w-full max-w-3xl h-[80vh] rounded-2xl shadow-xl flex flex-col border border-gray-200"
                    >
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-800">Select an Icon</h2>
                            <div className="relative mt-2">
                                <LucideIcons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search icons..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/20 focus:border-gray-500"
                                />
                            </div>
                        </div>
                        <div className="p-4 flex-1 overflow-y-auto grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                            {filteredIcons.map((name) => (
                                <motion.button
                                    key={name}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onSelect(name)}
                                    className="flex flex-col items-center gap-1 p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
                                >
                                    <DynamicIcon name={name} />
                                    <span className="text-xs text-center truncate w-full">
                                        {name}
                                    </span>
                                </motion.button>
                            ))}
                            {filteredIcons.length === 0 && (
                                <p className="col-span-full text-center text-gray-400">
                                    No icons found.
                                </p>
                            )}
                        </div>
                        <div className="p-3 bg-gray-50 border-t border-gray-200 text-right">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- Live Preview ---
const ServicePreview = ({ formData, features, banner }) => (
    <div className="w-full h-full bg-gray-50 p-8 flex items-center justify-center">
        <motion.div
            key={formData.icon}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { delay: 0.2 } }}
            className="w-full max-w-sm bg-white relative z-50 border border-gray-200 rounded-2xl p-6 space-y-4 shadow-md"
        >
            {banner?.preview && (
                <img
                    src={banner.preview}
                    alt="Banner"
                    className="w-full rounded-lg border border-gray-200 object-cover max-h-32"
                />
            )}
            <div className="flex items-center gap-4">
                <div className="bg-gray-100 text-gray-700 p-3 rounded-lg">
                    <DynamicIcon name={formData.icon || "HelpCircle"} size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                    {formData.title || "Service Title"}
                </h3>
            </div>
            <p className="text-gray-600 text-sm min-h-[40px]">
                {formData.description || "Your service description will appear here."}
            </p>
            <div className="space-y-2">
                <AnimatePresence>
                    {features.map(
                        (feature, index) =>
                            feature && (
                                <motion.div
                                    key={index}
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="flex items-center gap-2 text-sm text-gray-700"
                                >
                                    <LucideIcons.CheckCircle2
                                        size={16}
                                        className="text-yellow-500"
                                    />
                                    <span>{feature}</span>
                                </motion.div>
                            )
                    )}
                </AnimatePresence>
            </div>
            <motion.button className="w-full mt-4 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-700 transition-all duration-300">
                {formData.buttonText || "Button Text"}
            </motion.button>
        </motion.div>
    </div>
);

// --- Main Component ---
export default function CreateOrEditService() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        buttonText: "",
        icon: "Landmark",
    });
    const [features, setFeatures] = useState([""]);
    const [banner, setBanner] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formMessage, setFormMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate()
    const { service, id } = useParams();
    console.log(service, id)
    const isEditMode = Boolean(id)

    const { data: serviceData } = useServiceById(
        service === "loan" ? "loansServices" : "insuranceServices",
        id
    );

    useEffect(() => {
        if (serviceData) {
            setFormData({
                title: serviceData?.title,
                description: serviceData?.description,
                buttonText: serviceData?.buttonText,
                icon: serviceData?.icon,
            });
            setFeatures(serviceData?.features);
            setBanner(serviceData?.banner ? { preview: serviceData.banner, file: serviceData.banner } : null);
        }
    }, [serviceData]);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleFeatureChange = (index, value) =>
        setFeatures(features.map((f, i) => (i === index ? value : f)));
    const addFeature = () => setFeatures([...features, ""]);
    const removeFeature = (index) =>
        features.length > 1 &&
        setFeatures(features.filter((_, i) => i !== index));
    const handleIconSelect = (iconName) => {
        setFormData((prev) => ({ ...prev, icon: iconName }));
        setIsModalOpen(false);
    };

    const showMessage = (text, type) => {
        setFormMessage({ text, type });
        setTimeout(() => setFormMessage({ text: "", type: "" }), 4000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = null;

        try {
            if (banner?.file) {
                if (banner.preview?.startsWith("http")) {
                    // Already uploaded (existing URL)
                    imageUrl = banner.file;
                } else {
                    // New upload
                    const folder = service === "loan" ? "loanServices" : "insuranceServices";
                    imageUrl = await uploadImageToCloudinary(banner.file, folder);
                }
            }

            if (banner && !imageUrl) {
                return toast.error("Failed to upload image. Please try again.");
            }
        } catch (err) {
            console.error("Image upload failed:", err);
            return toast.error("Something went wrong while uploading image.");
        }

        const Data = {
            ...formData,
            features: features.filter((f) => f.trim() !== ""),
            banner: imageUrl || null,
        };



        setIsSubmitting(true);
        try {
            // await new Promise((resolve) => setTimeout(resolve, 1000));
            if (isEditMode) {
                const res = await (
                    service === "loan"
                        ? updateLoanRequest(id, Data)
                        : updateInsuranceRequest(id, Data)
                );
                navigate(service === "loan" ? "/loans" : "/insurance")


            } else {
                // const res = await service === "loan" ? saveLoanRequest(Data) : saveInsuranceRequest(Data);
                const res = await (
                    service === "loan"
                        ? saveLoanRequest(Data)
                        : saveInsuranceRequest(Data)
                );
                navigate(service === "loan" ? "/loans" : "/insurance")

            }
            console.log("Document would be written with data: ", Data);
            showMessage("Service created successfully!", "success");
            setFormData({
                title: "",
                description: "",
                buttonText: "",
                icon: "Landmark",
            });
            setFeatures([""]);
            setBanner(null);
        } catch (error) {
            console.error("Error adding document: ", error);
            showMessage("Failed to create service. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex md:h-screen max-md:flex-col h-screen relative text-gray-900 font-sans">

            <Sidebar />
            <main className="flex-1 grid grid-cols-1 lg:grid-cols-5">
                <div className="p-2 lg:col-span-3  overflow-y-auto">
                    <motion.form
                        onSubmit={handleSubmit}
                        className="w-full px-4 py-3 space-y-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div>
                            <div className="flex items-center gap-2">
                                <LucideIcons.ChevronLeft name={formData.icon} onClick={() => navigate(-1)} className="text-gray-600 cursor-pointer hover:text-gray-400 transition" />
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {isEditMode ? "Update" : "Create"} {service === "loan" ? 'a' : 'an'} {service?.charAt(0).toUpperCase() + service?.slice(1)} Service
                                </h1>
                            </div>
                            <p className="text-gray-500 mt-1">Live preview on the right.</p>
                        </div>

                        <div className="space-y-6 w-full">
                            <FloatingLabelInput
                                id="title"
                                name="title"
                                label={`${service?.charAt(0).toUpperCase() + service?.slice(1)} Title`}
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                            <FloatingLabelTextarea
                                id="description"
                                name="description"
                                label={`${service?.charAt(0).toUpperCase() + service?.slice(1)} Description`}
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="w-full flex gap-4">
                                <FloatingLabelInput
                                    id="buttonText"
                                    name="buttonText"
                                    label="Button Text"
                                    value={formData.buttonText}
                                    onChange={handleInputChange}
                                    required
                                />

                                <div className="w-full">
                                    {/* <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Icon
                                    </label> */}
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(true)}
                                        className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition"
                                    >
                                        <div className="flex items-center gap-3">
                                            <DynamicIcon
                                                name={formData.icon}
                                                className="text-gray-700"
                                            />
                                            <span>{formData.icon}</span>
                                        </div>
                                        <span className="text-sm text-gray-400">Change</span>
                                    </button>
                                </div>
                            </div>

                            <BannerUpload banner={banner} setBanner={setBanner} />



                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Features
                                </label>
                                <div className="space-y-3">
                                    <AnimatePresence>
                                        {features.map((feature, index) => (
                                            <motion.div
                                                key={index}
                                                layout
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                className="flex items-center gap-2"
                                            >
                                                <div className="flex-grow">
                                                    <FloatingLabelInput
                                                        id={`feature-${index}`}
                                                        label={`Feature #${index + 1}`}
                                                        value={feature}
                                                        onChange={(e) =>
                                                            handleFeatureChange(index, e.target.value)
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <motion.button
                                                    whileTap={{ scale: 0.9 }}
                                                    type="button"
                                                    onClick={() => removeFeature(index)}
                                                    disabled={features.length <= 1}
                                                    className="text-gray-400 hover:text-red-500 disabled:opacity-30"
                                                >
                                                    <LucideIcons.MinusCircle className="w-5 h-5" />
                                                </motion.button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="mt-3 text-sm font-semibold text-gray-700 hover:text-gray-900 transition flex items-center gap-1"
                                >
                                    <LucideIcons.PlusCircle className="w-4 h-4" />
                                    Add Feature
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4">
                            {formMessage.text && (
                                <p
                                    className={`text-sm font-medium ${formMessage.type === "error"
                                        ? "text-red-500"
                                        : "text-green-600"
                                        }`}
                                >
                                    {formMessage.text}
                                </p>
                            )}
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-900/20 transition flex items-center justify-center min-w-[150px] disabled:bg-gray-400"
                            >
                                {isSubmitting ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    isEditMode ? "Update Service" : "Create Service"
                                )}
                            </motion.button>
                        </div>
                    </motion.form>
                </div>

                <div className="hidden lg:col-span-2 overflow-hidden relative lg:block">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-20 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
                    </div>
                    <ServicePreview formData={formData} features={features} banner={banner} />
                </div>
            </main>

            <IconPickerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleIconSelect}
            />
        </div>
    );
}
