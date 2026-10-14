// Central image asset registry for BOTEQ
// Bundled via Vite static asset imports for production Vercel deployment guarantees.
// Also mirrors to public directory paths as fail-safe fallbacks.

import aboutBoteqModel from '../assets/images/about_boteq_model_1791899602823.jpg';
import categoryTopsFusion from '../assets/images/category_tops_fusion_1791909498342.jpg';
import heroIndianSareeModel from '../assets/images/hero_indian_saree_model_1791899599685.jpg';
import productBlushBanarasi from '../assets/images/product_blush_banarasi_1791909499984.jpg';
import productDesignerBlouse from '../assets/images/product_designer_blouse_1791909500299.jpg';
import productDesignerKurti from '../assets/images/product_designer_kurti_1791899602944.jpg';
import productFestiveBridal from '../assets/images/product_festive_bridal_1791899604334.jpg';
import productFestiveEthnic from '../assets/images/product_festive_ethnic_1791899638891.jpg';
import productFuturisticSaree from '../assets/images/product_futuristic_saree_1791909500548.jpg';
import productHalfSareeBlouse from '../assets/images/product_half_saree_blouse_1791899640565.jpg';
import productPartyWear from '../assets/images/product_party_wear_1791899641289.jpg';
import productSareeCollection from '../assets/images/product_saree_collection_1791899602709.jpg';

export const BOTEQ_IMAGES = {
  aboutBoteqModel,
  categoryTopsFusion,
  heroIndianSareeModel,
  productBlushBanarasi,
  productDesignerBlouse,
  productDesignerKurti,
  productFestiveBridal,
  productFestiveEthnic,
  productFuturisticSaree,
  productHalfSareeBlouse,
  productPartyWear,
  productSareeCollection,
} as const;

export default BOTEQ_IMAGES;
