// Actions
class DataActions {
  public static changeDictionaryData = (data = '') => ({
    data,
    type: 'changeDictionaryData'
  });
}

export default DataActions;
