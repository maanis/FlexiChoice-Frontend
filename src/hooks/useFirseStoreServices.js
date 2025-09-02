// src/hooks/useServices.js
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

const fetchServices = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const servicesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return servicesList;
};

    // const fetchServices = async (collectionName) => {
    //     const querySnapshot = await getDocs(collection(db, collectionName));
    //     const servicesList = querySnapshot.docs.map(doc => ({
    //         id: doc.id,
    //         ...doc.data()
    //     }));
    //     return servicesList;
    // };


export const useLoans = () => {
    return useQuery({
        queryKey: ['loans'],
        queryFn: () => fetchServices('loansServices'),
        staleTime: 1000 * 60 * 5, // Data will be fresh for 5 minutes
        gcTime: 1000 * 60 * 10,   // Data will be garbage collected after 10 minutes of inactivity
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