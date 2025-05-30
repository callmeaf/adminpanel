import * as React from "react";
import useHttp from "@/modules/Base/hooks/use-http";
import roleModuleConfig from "@/modules/Role/module.config";
import AutoComplete, {
  IOption,
} from "@/modules/Base/components/forms/AutoComplete";
import useValidation from "@/modules/Base/hooks/use-validation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form, { IForm } from "@/modules/Base/components/forms/Form";
import { useTranslations } from "next-intl";
import { Grid2 } from "@mui/material";
import { getRoles } from "@/modules/Role/requests/role-requests";
import toRole from "@/modules/Role/models/Role";
import { IUserModel } from "../models/User";

interface IUserRolesFormProps extends IForm {
  user: IUserModel;
}

const UserRolesForm: React.FC<IUserRolesFormProps> = ({
  user,
  loading,
  onSubmit,
}) => {
  const t = useTranslations("User.Widgets.Form");

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      roles_ids: yup.array().required(v("required")),
    })
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      roles_ids: [],
    },
  });

  const [roles, setRoles] = React.useState<IOption[]>([]);
  const { handle: handleGetRoles, loading: loadingGetRoles } = useHttp(
    roleModuleConfig,
    getRoles,
    {
      onSuccess: (res) => {
        setRoles(
          res.data
            .map((item) => toRole(item))
            .map((item) => ({
              id: item.id,
              label: item.name,
              value: item.id,
            }))
        );
      },
    }
  );

  React.useEffect(() => {
    handleGetRoles({
      per_page: 100,
    });
  }, []);

  React.useEffect(() => {
    if (user && roles.length) {
      setValue("roles_ids", user.rolesArray(roles) ?? []);
    }
  }, [roles.length]);

  const submitHandler = (data: any) =>
    onSubmit({
      ...data,
      roles_ids: data.roles_ids.map((item: IOption) => item.value),
    });

  return (
    <Form onSubmit={handleSubmit(submitHandler)} loading={loading}>
      <Grid2 size={12}>
        <Controller
          control={control}
          name="roles_ids"
          render={({ field }) => (
            <AutoComplete
              {...field}
              label={t("roles_ids_inp_label")}
              error={errors.roles_ids}
              options={roles}
              loading={loadingGetRoles}
              multiple
            />
          )}
        />
      </Grid2>
    </Form>
  );
};

export default UserRolesForm;
