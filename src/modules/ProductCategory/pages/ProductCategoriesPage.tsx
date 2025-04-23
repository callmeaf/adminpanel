"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import ProductCategoriesWrapper from "../widgets/ProductCategoriesWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IProductCategoriesPageProps {}

const ProductCategoriesPage: React.FC<IProductCategoriesPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <ProductCategoriesWrapper />
    </DashboardLayout>
  );
};

export default ProductCategoriesPage;
