interface IJsonArtisan {
  parse: (value: any) => any;
  stringify: (value: any) => string;
}

export const jsonArtisan: IJsonArtisan = {
  parse: function (value) {
    try {
      return JSON.parse(value);
    } catch (err) {
      console.log({ err });
    }
  },
  stringify: (value) => JSON.stringify(value),
};
