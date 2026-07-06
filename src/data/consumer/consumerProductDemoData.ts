export type ConsumerProductRecord = {
  id: string;
  product: string;
  brand: string;
  manufacturer: string;
  sku: string;
  batch: string;
  serialNumber: string;
  manufacturedOn: string;
  expiresOn: string;
  imageTone: string;
  trustMarks: string[];
};

export const consumerProducts: ConsumerProductRecord[] = [
  { id: "CPR-1001", product: "WeatherShield Pro Paint", brand: "Apex Coatings", manufacturer: "Apex Industrial Coatings", sku: "WSP-20L-EXT", batch: "BAT-WSP-742", serialNumber: "SN-WSP-882901", manufacturedOn: "2026-04-22", expiresOn: "2028-04-22", imageTone: "from-cyan-300 to-emerald-300", trustMarks: ["Tamper checked", "Batch verified", "Warranty eligible"] },
  { id: "CPR-1002", product: "Luxury Emulsion", brand: "Apex Coatings", manufacturer: "Apex Industrial Coatings", sku: "LUX-10L-IV", batch: "BAT-LUX-384", serialNumber: "SN-LUX-441092", manufacturedOn: "2026-03-18", expiresOn: "2028-03-18", imageTone: "from-violet-300 to-cyan-300", trustMarks: ["Batch verified", "Registered product"] },
  { id: "CPR-1003", product: "TileBond Ultra", brand: "BuildChem", manufacturer: "BuildChem Manufacturing", sku: "TBU-25KG", batch: "BAT-TBU-992", serialNumber: "SN-TBU-761882", manufacturedOn: "2026-02-11", expiresOn: "2027-02-11", imageTone: "from-amber-300 to-orange-300", trustMarks: ["Manual review needed"] },
  { id: "CPR-1004", product: "FixMate Adhesive", brand: "BuildChem", manufacturer: "BuildChem Manufacturing", sku: "FIX-5KG", batch: "BAT-FIX-141", serialNumber: "SN-FIX-119020", manufacturedOn: "2026-01-08", expiresOn: "2027-01-08", imageTone: "from-rose-300 to-orange-300", trustMarks: ["Security review"] },
  { id: "CPR-1005", product: "Primer X Recall Batch", brand: "Apex Coatings", manufacturer: "Apex Industrial Coatings", sku: "PRX-5L", batch: "BAT-PRX-RECALL", serialNumber: "SN-PRX-000128", manufacturedOn: "2025-12-14", expiresOn: "2027-12-14", imageTone: "from-red-300 to-amber-300", trustMarks: ["Recall active"] },
];

export const getConsumerProduct = (productId: string) => consumerProducts.find((item) => item.id === productId) || consumerProducts[0];
