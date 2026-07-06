export type NearbyDealerRecord = {
  id: string;
  dealerName: string;
  distance: string;
  address: string;
  phone: string;
  availableProducts: string;
  rating: string;
  status: string;
};

export const nearbyDealers: NearbyDealerRecord[] = [
  { id: "NDL-1001", dealerName: "Metro Build Mart", distance: "1.8 km", address: "Andheri Link Road, Mumbai", phone: "+91 98765 84001", availableProducts: "WeatherShield, Primer X, Sealants", rating: "4.8", status: "Open" },
  { id: "NDL-1002", dealerName: "Urban Paint Point", distance: "2.6 km", address: "Bandra West, Mumbai", phone: "+91 98765 84002", availableProducts: "Luxury Emulsion, Tools", rating: "4.7", status: "Open" },
  { id: "NDL-1003", dealerName: "Southern Contractor Store", distance: "3.1 km", address: "OMR, Chennai", phone: "+91 98765 84003", availableProducts: "TileBond, Grout Pro", rating: "4.5", status: "Open" },
  { id: "NDL-1004", dealerName: "Prime Hardware Hub", distance: "4.4 km", address: "Noida Sector 62", phone: "+91 98765 84004", availableProducts: "FixMate, Adhesives", rating: "4.4", status: "Limited Stock" },
];
