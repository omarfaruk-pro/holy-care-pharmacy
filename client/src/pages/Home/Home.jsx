import { ReTitle } from "re-title";
import BannerSlider from "./BannerSlider";
import CategorySection from "./CategorySection";
import DiscountProducts from "./DiscountProducts";
import FeaturedProduct from "./FeatureProduct";
import HealthTips from "./HealthTips";
import TopRatedMedicines from "./TopRatedMedicines";


export default function Home() {
  return (
    <>
      <ReTitle title="Holy Care Pharmacy"></ReTitle>
      <BannerSlider></BannerSlider>
      <CategorySection></CategorySection>
      <DiscountProducts></DiscountProducts>
      <FeaturedProduct></FeaturedProduct>
      <HealthTips></HealthTips>
      <TopRatedMedicines></TopRatedMedicines>
    </>
  )
}
