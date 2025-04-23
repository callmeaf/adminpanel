import { TErrorGroup } from "../components/imports/ImportWrapper";

interface IImportArtisan {
  errors: (responseErrors: (string[] | string)[]) => TErrorGroup;
}

const importArtisan: IImportArtisan = {
  errors: (responseErrors) => {
    const groupedErrors: TErrorGroup = {};

    if (!responseErrors) {
      return groupedErrors;
    }

    responseErrors.forEach((error: string[] | string) => {
      if (Array.isArray(error)) {
        error = error[0];
      }
      const match = error.match(/row (\d+)/); // استخراج شماره ردیف
      if (match) {
        const row = match[1];
        if (!groupedErrors[row]) {
          groupedErrors[row] = [];
        }
        groupedErrors[row].push(error);
      }
    });

    return groupedErrors;
  },
};

export default importArtisan;
