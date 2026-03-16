import React from "react";
import HeroSection from "../components/home/HeroSection";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import NewArrivals from "../components/home/NewArrivals";
import ShopViaVideoCall from "../components/home/ShopViaVideoCall";
import ShippingInfo from "../components/business/ShippingInfo";
import InstagramFeed from "../components/mobile/InstagramFeed";
import LiveVisitorCounter from "../components/home/LiveVisitorCounter";
import RecentActivityFeed from "../components/home/RecentActivityFeed";
import AnimatedStats from "../components/home/AnimatedStats";
import ScrollProgress from "../components/common/ScrollProgress";
import PageTransition from "../components/common/PageTransition";

const Home = () => {
  return (
    <PageTransition>
      <ScrollProgress />
      <LiveVisitorCounter />
      <RecentActivityFeed />
      <HeroSection />
      <Categories />
      <AnimatedStats />
      <FeaturedProducts />
      <InstagramFeed />
      <WhyChooseUs />
      <NewArrivals />
      <ShippingInfo />
      <ShopViaVideoCall />
    </PageTransition>
  );
};

export default Home;