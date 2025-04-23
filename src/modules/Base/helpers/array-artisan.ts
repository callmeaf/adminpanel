interface IArrayArtisan {
  unique: <T>(data: T[], key?: keyof T) => T[];
}

const arrayArtisan: IArrayArtisan = {
  unique: (data, key) => {
    if (key) {
      return Array.from(
        new Map(data.map((item) => [item[key], item])).values()
      );
    } else {
      return [...new Set(data)];
    }
  },
};

export default arrayArtisan;
