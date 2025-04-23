import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const productCategoryRoutes: TRoute = (t) => ({
  product_category: moduleConfig.enabled
    ? [
        {
          name: "product_category_index",
          label: t("ProductCategory.Routes.index"),
          href: "/product_category",
          icon: <PersonIcon />,
        },
        {
          name: "product_category_create",
          label: t("ProductCategory.Routes.create"),
          href: "/product_category/create",
          icon: <PersonAddIcon />,
        },
        {
          name: "product_category_edit",
          label: t("ProductCategory.Routes.edit"),
          href: "/product_category/:productCategoryId/edit",
          showInNavbar: false,
        },
        {
          name: "product_category_trashed",
          label: t("ProductCategory.Routes.trashed"),
          href: "/product_category/trashed",
          icon: <PersonIcon />,
        },
        {
          name: "product_category_import_excel",
          label: t("ProductCategory.Routes.import_excel"),
          href: "/product_category/import/excel",
          icon: <PublishIcon />,
        },
      ]
    : [],
});

export default productCategoryRoutes;
