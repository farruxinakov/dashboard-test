import { create } from "zustand";

type BankModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useBankModal = create<BankModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useBankModal;
