import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const productCategoryRoutes: TRoute = (t) => ({
    product_categories: moduleConfig.enabled
    ? [
        {
            name: "product_categories_index",
          label: t("ProductCategory.Routes.index"),
            href: "/product_categories",
          icon: <PersonIcon />,
        },
        {
            name: "product_categories_create",
          label: t("ProductCategory.Routes.create"),
            href: "/product_categories/create",
          icon: <PersonAddIcon />,
        },
        {
            name: "product_categories_edit",
          label: t("ProductCategory.Routes.edit"),
            href: "/product_categories/:productCategoryId/edit",
          showInNavbar: false,
        },
        {
            name: "product_categories_trashed",
          label: t("ProductCategory.Routes.trashed"),
            href: "/product_categories/trashed",
          icon: <PersonIcon />,
        },
        {
            name: "product_categories_import_excel",
          label: t("ProductCategory.Routes.import_excel"),
            href: "/product_categories/import/excel",
          icon: <PublishIcon />,
        },
      ]
    : [],
});

export default productCategoryRoutes;
