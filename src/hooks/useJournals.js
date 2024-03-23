import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import useSWR from 'swr';
import {db} from '../plugins/firebase.js'

export default function useJournals() {
    const { data, isLoading, error } = useSWR(
        '/api/journals/list',
        getJournals,
        {
            revalidateOnFocus: false,
            errorRetryInterval: 10000,
        }
    );

    return {
        data,
        isLoading,
        error,
    };
}

async function getJournals() {
    const q = query(
        collection(db, 'journals'),
        limit(40),
        orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);

    const result = [];
    querySnapshot.forEach((doc) => {
        result.push(doc.data());
    });

    return result;
}
