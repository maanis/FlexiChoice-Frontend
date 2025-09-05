// src/hooks/useServices.js
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'; // add doc and getDoc
import { db } from '../lib/firebaseConfig';

const fetchServices = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const servicesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return servicesList;
};

// New function to fetch a single document by ID
const fetchServiceById = async (collectionName, id) => {
    if (!id) return null; // Make sure an ID is provided
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        console.log("No such document!");
        return null;
    }
};

export const useLoans = () => {
    return useQuery({
        queryKey: ['loans'],
        queryFn: () => fetchServices('loansServices'),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};

export const useInsurance = () => {
    return useQuery({
        queryKey: ['insurance'],
        queryFn: () => fetchServices('insuranceServices'),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};

export const useQuotes = () => {
    return useQuery({
        queryKey: ['quotes'],
        queryFn: () => fetchServices('quotes'),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};

// ---
export const useServiceById = (collectionName, id) => {
    return useQuery({
        queryKey: ['service', collectionName, id],
        queryFn: () => fetchServiceById(collectionName, id),
        enabled: !!id,
        staleTime: 1000 * 60 * 60, // 1 hour
    });
};