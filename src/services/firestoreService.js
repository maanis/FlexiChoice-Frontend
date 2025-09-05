// // src/services/firestoreService.js
// import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
// import { db } from '../lib/firebaseConfig';

// // ---------------- ADD NEW QUOTE ----------------
// export const saveQuoteRequest = async (quoteData) => {
//     try {
//         const quotesCollectionRef = collection(db, 'quotes');
//         const docRef = await addDoc(quotesCollectionRef, {
//             ...quoteData,
//             submittedAt: serverTimestamp(),
//         });
//         console.log('Document successfully written with ID:', docRef.id);
//         return docRef.id;
//     } catch (error) {
//         console.error('Error writing document to Firestore:', error);
//         throw new Error('Could not submit your quote. Please try again.');
//     }
// };

// // ---------------- ADD NEW LOAN ----------------
// export const saveLoanRequest = async (loanData) => {
//     try {
//         const loansCollectionRef = collection(db, 'loansServices');
//         const docRef = await addDoc(loansCollectionRef, {
//             ...loanData,
//             submittedAt: serverTimestamp(),
//         });
//         console.log('Loan successfully written with ID:', docRef.id);
//         return docRef.id;
//     } catch (error) {
//         console.error('Error writing loan to Firestore:', error);
//         throw new Error('Could not submit your loan. Please try again.');
//     }
// };

// // ---------------- ADD NEW INSURANCE ----------------
// export const saveInsuranceRequest = async (insuranceData) => {
//     try {
//         const insuranceCollectionRef = collection(db, 'insuranceServices');
//         const docRef = await addDoc(insuranceCollectionRef, {
//             ...insuranceData,
//             submittedAt: serverTimestamp(),
//         });
//         console.log('Insurance successfully written with ID:', docRef.id);
//         return docRef.id;
//     } catch (error) {
//         console.error('Error writing insurance to Firestore:', error);
//         throw new Error('Could not submit your insurance. Please try again.');
//     }
// };

// // ---------------- UPDATE LOAN ----------------
// export const updateLoanRequest = async (id, loanData) => {
//     try {
//         const loanDocRef = doc(db, 'loansServices', id);
//         await updateDoc(loanDocRef, {
//             ...loanData,
//             updatedAt: serverTimestamp(), // track update time
//         });
//         console.log('Loan successfully updated with ID:', id);
//         return id;
//     } catch (error) {
//         console.error('Error updating loan in Firestore:', error);
//         throw new Error('Could not update the loan. Please try again.');
//     }
// };

// // ---------------- UPDATE INSURANCE ----------------
// export const updateInsuranceRequest = async (id, insuranceData) => {
//     try {
//         const insuranceDocRef = doc(db, 'insuranceServices', id);
//         await updateDoc(insuranceDocRef, {
//             ...insuranceData,
//             updatedAt: serverTimestamp(), // track update time
//         });
//         console.log('Insurance successfully updated with ID:', id);
//         return id;
//     } catch (error) {
//         console.error('Error updating insurance in Firestore:', error);
//         throw new Error('Could not update the insurance. Please try again.');
//     }
// };

// src/services/firestoreService.js
import { collection, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";

const storage = getStorage();

// ---------------- ADD NEW QUOTE ----------------
export const saveQuoteRequest = async (quoteData) => {
    try {
        const quotesCollectionRef = collection(db, 'quotes');
        const docRef = await addDoc(quotesCollectionRef, {
            ...quoteData,
            submittedAt: serverTimestamp(),
        });
        console.log('Document successfully written with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error writing document to Firestore:', error);
        throw new Error('Could not submit your quote. Please try again.');
    }
};

// ---------------- ADD NEW LOAN ----------------
export const saveLoanRequest = async (loanData) => {
    try {
        const loansCollectionRef = collection(db, 'loansServices');
        const docRef = await addDoc(loansCollectionRef, {
            ...loanData,
            submittedAt: serverTimestamp(),
        });
        console.log('Loan successfully written with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error writing loan to Firestore:', error);
        throw new Error('Could not submit your loan. Please try again.');
    }
};

// ---------------- ADD NEW INSURANCE ----------------
export const saveInsuranceRequest = async (insuranceData) => {
    try {
        const insuranceCollectionRef = collection(db, 'insuranceServices');
        const docRef = await addDoc(insuranceCollectionRef, {
            ...insuranceData,
            submittedAt: serverTimestamp(),
        });
        console.log('Insurance successfully written with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error writing insurance to Firestore:', error);
        throw new Error('Could not submit your insurance. Please try again.');
    }
};

// ---------------- UPDATE LOAN ----------------
export const updateLoanRequest = async (id, loanData) => {
    try {
        const loanDocRef = doc(db, 'loansServices', id);
        await updateDoc(loanDocRef, {
            ...loanData,
            updatedAt: serverTimestamp(), // track update time
        });
        console.log('Loan successfully updated with ID:', id);
        return id;
    } catch (error) {
        console.error('Error updating loan in Firestore:', error);
        throw new Error('Could not update the loan. Please try again.');
    }
};

// ---------------- UPDATE INSURANCE ----------------
export const updateInsuranceRequest = async (id, insuranceData) => {
    try {
        const insuranceDocRef = doc(db, 'insuranceServices', id);
        await updateDoc(insuranceDocRef, {
            ...insuranceData,
            updatedAt: serverTimestamp(), // track update time
        });
        console.log('Insurance successfully updated with ID:', id);
        return id;
    } catch (error) {
        console.error('Error updating insurance in Firestore:', error);
        throw new Error('Could not update the insurance. Please try again.');
    }
};

// ---------------- DELETE LOAN ----------------
export const deleteLoanRequest = async (id) => {
    try {
        const loanDocRef = doc(db, 'loansServices', id);
        await deleteDoc(loanDocRef);
        console.log('Loan successfully deleted with ID:', id);
        return id;
    } catch (error) {
        console.error('Error deleting loan in Firestore:', error);
        throw new Error('Could not delete the loan. Please try again.');
    }
};

// ---------------- DELETE INSURANCE ----------------
export const deleteInsuranceRequest = async (id) => {
    try {
        const insuranceDocRef = doc(db, 'insuranceServices', id);
        await deleteDoc(insuranceDocRef);
        console.log('Insurance successfully deleted with ID:', id);
        return id;
    } catch (error) {
        console.error('Error deleting insurance in Firestore:', error);
        throw new Error('Could not delete the insurance. Please try again.');
    }
};


// ---------------- UPLOAD AND COMPRESS IMAGE ----------------
export const uploadImageToFirebase = async (file, folder = "uploads") => {
    try {
        // Compress the image more aggressively
        const options = {
            maxSizeMB: 0.2,         // 200 KB max
            maxWidthOrHeight: 720,  // resize to max 720px
            useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        const uniqueName = `${folder}/${uuidv4()}-${file.name}`;
        const storageRef = ref(storage, uniqueName);

        await uploadBytes(storageRef, compressedFile);
        const downloadURL = await getDownloadURL(storageRef);

        return downloadURL;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Could not upload the image. Please try again.");
    }
};
