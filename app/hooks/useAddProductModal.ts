import { create } from 'zustand';

interface addProductModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const addProductModalStore = create<addProductModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));


export default addProductModalStore;
