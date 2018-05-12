// Actions
class DataActions {
  public static applyDictionaryData = (data = '') => ({
    data,
    type: 'applyDictionaryData'
  });

  public static updateDictionary = (data) => ({
    data,
    type: 'updateDictionary'
  });
}

export default DataActions;
