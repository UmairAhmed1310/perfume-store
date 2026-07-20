export type PaymentMethod = {
  id: string;
  label: string;
  instructions: string;
  accountNumber: string;
  accountName: string;
  isManual: boolean;
  enabled: boolean;
};

export const paymentMethods: PaymentMethod[] = [
  {
    id: "jazzcash",
    label: "JazzCash",
    instructions:
      "Send the total amount via JazzCash mobile app to the account below, then enter your Transaction ID.",
    accountNumber: process.env.JAZZCASH_ACCOUNT_NUMBER ?? "0300-0000000",
    accountName:
      process.env.JAZZCASH_ACCOUNT_NAME ?? "Essence Perfumes (Placeholder)",
    isManual: true,
    enabled: true,
  },
  {
    id: "easypaisa",
    label: "EasyPaisa",
    instructions:
      "Send the total amount via EasyPaisa mobile app to the account below, then enter your Transaction ID.",
    accountNumber: process.env.EASYPAISA_ACCOUNT_NUMBER ?? "0300-0000000",
    accountName:
      process.env.EASYPAISA_ACCOUNT_NAME ?? "Essence Perfumes (Placeholder)",
    isManual: true,
    enabled: true,
  },
  {
    id: "stripe",
    label: "Card (Stripe)",
    instructions: "Pay securely with your card.",
    accountNumber: "",
    accountName: "",
    isManual: false,
    enabled: process.env.ENABLE_STRIPE === "true", // false until you add a real account
  },
];
