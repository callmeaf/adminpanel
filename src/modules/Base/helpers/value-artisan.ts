interface IValueArtisan {
  merge: (joinBy: string, defaultValue: string, ...values: string[]) => string;
}

const valueArtisan: IValueArtisan = {
  merge: (joinBy, defaultValue, ...values) => {
    values = values
      .filter(Boolean)
      .map((val) => val.toString().trim())
      .filter(Boolean);
    if (values.length === 0) {
      return defaultValue;
    }
    return values
      .map((val) => val.trim())
      .filter(Boolean)
      .join(joinBy);
  },
};

export default valueArtisan;
