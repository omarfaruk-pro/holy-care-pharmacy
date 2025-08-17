import { ReTitle } from "re-title";
import BannerSlider from "./BannerSlider";
import CategorySection from "./CategorySection";
import DiscountProducts from "./DiscountProducts";
import FeaturedProduct from "./FeatureProduct";
import HealthTips from "./HealthTips";
import TopRatedMedicines from "./TopRatedMedicines";
import FeatureSection from "./FeatureSection";
import Offer from "./Offer";
import ProductSec from "./ProductSec";


export default function Home() {
  return (
    <>
      <ReTitle title="Holy Care Pharmacy"></ReTitle>
      <BannerSlider></BannerSlider>
      <CategorySection></CategorySection>
      <DiscountProducts></DiscountProducts>
      <ProductSec></ProductSec>
      <FeatureSection></FeatureSection>
      <Offer></Offer>
      {/* <FeaturedProduct></FeaturedProduct> */}
      <TopRatedMedicines></TopRatedMedicines>
      <HealthTips></HealthTips>
    </>
  )
}
